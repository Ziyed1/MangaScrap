import requests
from bs4 import BeautifulSoup

def scrape_manga_info(manga_url):
    response = requests.get(manga_url)
    if response.status_code != 200:
        raise Exception(f"Erreur lors du scraping : {response.status_code}")

    soup = BeautifulSoup(response.text, 'html.parser')

    # EXEMPLE pour un site style mangakakalot.com
    title = soup.find('h1').text.strip()
    description = soup.find('div', class_='story-intro').text.strip()
    cover_image_url = soup.find('div', class_='story-info-left').find('img')['src']

    chapters = []
    chapter_list = soup.find_all('li', class_='a-h')
    for chap in chapter_list:
        chapter_title = chap.text.strip()
        chapter_link = chap.find('a')['href']
        chapters.append({
            'title': chapter_title,
            'link': chapter_link
        })

    return {
        'title': title,
        'description': description,
        'cover_image': cover_image_url,
        'chapters': chapters
    }

if __name__ == "__main__":
    manga_url = 'https://mangakakalot.com/manga/abc123'  # exemple URL
    manga_info = scrape_manga_info(manga_url)
    print(manga_info)