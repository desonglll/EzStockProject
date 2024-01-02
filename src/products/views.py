from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Product
from .serializers import ProductSerializer


def detail(request, product_id):
    product = Product.objects.get(id=product_id)
    serializer = ProductSerializer(product)
    return JsonResponse(serializer.data)
