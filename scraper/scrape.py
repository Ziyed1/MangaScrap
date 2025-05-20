import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import boto3
import uuid

S3_BUCKET = "mangascrapper"
s3 = boto3.client("s3")

# Fonction permettant l'UPLOAD VERS S3
def upload_image_to_s3(image_url, manga_title, chapter_number, page_number):
    response = requests.get(image_url)
    if response.status_code == 200:
        key = f"{manga_title}/Chapitre-{chapter_number}/page{page_number}.jpg"
        s3.put_object(Bucket=S3_BUCKET, Key=key, Body=response.content)
        return f"https://{S3_BUCKET}.s3.amazonaws.com/{key}"
    return None

# === SCRAPING PRINCIPAL ===
def scrape_manga_by_title(titre):
    base_url = "https://sushiscan.net"
    search_url = f"{base_url}/?s={titre.replace(' ', '+')}"
    
    # 1. Rechercher le manga
    search_res = requests.get(search_url)
    soup = BeautifulSoup(search_res.text, 'html.parser')
    
    link = soup.find("a", title=lambda t: t and t.lower() == titre.lower())
    if not link:
        raise Exception(f"Manga '{titre}' non trouvé.")
    
    manga_url = link["href"]

    # 2. Page du manga
    res = requests.get(manga_url)
    soup = BeautifulSoup(res.text, 'html.parser')

    # 🖼️ Cover
    cover_img = soup.select_one("img.ts-post-image")
    cover_url = cover_img["src"] if cover_img else ""

    # 📝 Description
    desc_block = soup.select_one("div.postbody.seriestu.seriestere")
    description = desc_block.get_text(strip=True) if desc_block else ""

    # 📚 Chapitres
    chapters = []
    chapter_links = soup.select("div.eph-num > a")

    for chapter_link in chapter_links:
        chapter_title = chapter_link.select_one(".chapternum").text.strip()
        chapter_url = chapter_link["href"]
        chapter_number = chapter_title.split()[-1]  # Exemple : "Volume 70" → "70"

        # 3. Pages du chapitre
        chap_res = requests.get(chapter_url)
        chap_soup = BeautifulSoup(chap_res.text, 'html.parser')

        images = chap_soup.select("div.readercontent img")
        page_urls = []

        for i, img in enumerate(images, start=1):
            img_url = img["src"]
            s3_url = upload_image_to_s3(img_url, titre, chapter_number, i)
            if s3_url:
                page_urls.append(s3_url)

        chapters.append({
            "number": int(chapter_number),
            "title": chapter_title,
            "pages": page_urls
        })

    return {
        "mangaId": str(uuid.uuid4()),
        "title": titre,
        "description": description,
        "coverUrl": cover_url,
        "chapters": chapters
    }