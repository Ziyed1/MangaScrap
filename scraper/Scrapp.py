import os
import requests
import boto3
from bs4 import BeautifulSoup
from pymongo import MongoClient
from dotenv import load_dotenv
from urllib.parse import urljoin

S3_BUCKET = "mangascrapper"
s3_client = boto3.client('s3', aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"))

# MongoDB
client = MongoClient('mongodb+srv://manga:HFHnmfz500!@mangascrapping.ktzothd.mongodb.net/')
db = client['MangaScrapping']
mangas_collection = db['mangas']

# télécharger une image et la téléverser sur S3
def upload_image_to_s3(image_url, manga_title, chapter_number, page_number):
    response = requests.get(image_url)
    if response.status_code == 200:
        image_data = response.content
        image_filename = f"{manga_title}_{chapter_number}_{page_number}.jpg"
        s3_client.put_object(Bucket=S3_BUCKET, Key=image_filename, Body=image_data)
        return f"https://{S3_BUCKET}.s3.amazonaws.com/{image_filename}"
    return None

# scraper les pages d'un manga
def scrape_manga(manga_url, manga_title):
    response = requests.get(manga_url)
    if response.status_code != 200:
        print(f"Erreur lors du scraping de {manga_url}")
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    chapters = []  # Liste des chapitres du manga

    # Scraper les chapitres et pages du manga (à adapter selon le site)
    for chapter in soup.find_all('a', {'class': 'chapter_link'}):  # Remplace cette ligne avec la logique de ton site
        chapter_url = urljoin(manga_url, chapter['href'])
        chapter_title = chapter.get_text()
        chapter_number = int(chapter['href'].split('/')[-1])

        chapter_images = []  # Liste des images du chapitre

        # Scraper les pages de ce chapitre
        chapter_response = requests.get(chapter_url)
        chapter_soup = BeautifulSoup(chapter_response.text, 'html.parser')

        for page in chapter_soup.find_all('img', {'class': 'scan_image'}):  # Adapte cette ligne
            page_url = page['src']
            page_number = int(page_url.split('/')[-1].split('.')[0])
            image_url = upload_image_to_s3(page_url, manga_title, chapter_number, page_number)
            if image_url:
                chapter_images.append(image_url)

        # Sauvegarder les infos du chapitre dans MongoDB
        manga_doc = {
            'title': manga_title,
            'chapter_number': chapter_number,
            'chapter_title': chapter_title,
            'images': chapter_images,
        }
        mangas_collection.insert_one(manga_doc)

        chapters.append(manga_doc)

    return chapters

# Exemple d'utilisation avec un manga et une URL
manga_url = 'https://example.com/manga/one-piece'  # Remplace par l'URL de ton manga
manga_title = 'One Piece'

# Scraper le manga et sauvegarder dans MongoDB
scrape_manga(manga_url, manga_title)


