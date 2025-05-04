import json
import uuid
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Mangas')

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        url = body.get('url')

        if not url:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'url' in request body"})
            }

        # Simulated scraping
        manga_data = {
            "id": str(uuid.uuid4()),
            "title": "Naruto",
            "chapters": 72,
            "source_url": url
        }

        table.put_item(Item=manga_data)

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Manga added", "manga": manga_data})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
