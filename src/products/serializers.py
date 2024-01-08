from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    created_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    last_change = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Product
        # fields = '__all__'
        fields = ["id", "title", "price", "description", "category", "image", "status", "created_date", "last_change",
                  "last_changed_by", "valid"]
