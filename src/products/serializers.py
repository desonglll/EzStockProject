from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        # fields = '__all__'
        fields = ["id", "title", "price", "description", "category", "image", "status", "created_date", "last_change",
                  "last_changed_by", "valid"]
