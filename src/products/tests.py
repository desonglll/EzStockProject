from django.test import TestCase
import requests

from products.models import Product, Status
from products.serializers import StatusSerializer


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


def main():
    items = Status.objects.all()
    serializer = StatusSerializer(items, many=True)
    print(serializer.data)


if __name__ == "__main":
    main()
    pass
