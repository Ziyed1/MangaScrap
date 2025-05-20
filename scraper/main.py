import json
from scrape import scrape_manga_by_title 

def lambda_handler(event, context):
    try:
        # Récupère le titre passé dans la query string (?titre=Naruto)
        titre = event.get("queryStringParameters", {}).get("titre")

        if not titre:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Titre manquant"})
            }

        # Appelle la fonction de scraping avec le titre
        manga_data = scrape_manga_by_title(titre)

        return {
            "statusCode": 200,
            "body": json.dumps(manga_data)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
