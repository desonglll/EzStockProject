from django.test import TestCase
import requests

from products.models import Product

def import_items():
    response = requests.get("https://fakestoreapi.com/products")
    print(response.json())
    items = response.json()
    for item in items:
        data = {
            "title": item["title"],
            "price": item["price"],
            "description": item["description"],
            "category": item["category"],
            "image": item["image"],
            "rating_rate": item["rating"]["rate"],
            "rating_count": item["rating"]["count"],
        }
        Product.objects.create(**data)

