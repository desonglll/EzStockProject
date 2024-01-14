from django.core.paginator import Paginator, EmptyPage
from django.core.serializers import serialize
from django.db.models import Count
from django.forms import model_to_dict
from django.http import HttpResponse, JsonResponse, Http404
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product, Result, statusChoice, categoryChoice
from .serializers import ProductSerializer


class ProductAPIView(APIView):
    """ProductAPIView class"""

    def get_object(self, pid):
        try:
            return Product.objects.get(id=pid)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pid=None):
        """Get all products

        Args:
            request (Request)

        Returns:
            JsonResponse
            list of products
            {
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 109.95,
                "description": "this is a product",
                "category": "men's clothing",
                "image": "/uploads/...",
                "status": "0",
                "created_date": "2024-01-01T19:52:44.638211+08:00",
                "last_change": "2024-01-01T19:19:43.677946+08:00",
                "last_changed_by": "System",
                "valid": true
            },

        """

        page = request.GET.get("page", 1)
        page_size = request.GET.get("page_size", 10)

        if pid:
            print("PID called")
            product = self.get_object(pid)
            data = model_to_dict(product, exclude="image")
            data["image"] = product.image.url
            data["last_change"] = product.last_change
            if data["last_changed_by"] == "":
                data["last_changed_by"] = "Unknown"
            return Result.success(data=data)
        else:
            # 设定获取所有数据时是按照什么样的排序进行
            products = Product.objects.all().order_by("-id")
            paginator = Paginator(products, page_size)
            try:
                current_page_data = paginator.page(page)
                print(f"Get page: {page}, Current Page: {current_page_data}")
                serialized_data = ProductSerializer(current_page_data, many=True).data
                total_items = paginator.count  # 获取总条目数
                params = {
                    "total_items": total_items,
                }
                return Result.success(data=serialized_data, params=params)
            except EmptyPage:
                return Result.error(msg="Invalid page number")

    def post(self, request):
        """Add a new product

        Add a new product by POST method

        Args:
            request (Request):

                {
                    "title": "title",
                }

        """
        serializer = ProductSerializer(data=request.data)
        try:
            if serializer.is_valid(raise_exception=True):
                print("Creating new product")
                # 手动更新 last_change 字段
                serializer.validated_data["last_change"] = timezone.now()
                serializer.save()
                return Result.success(serializer.data)
        except ValidationError as e:
            return Result.error(e.__str__())

    def delete(self, request, pid):
        """Delete a product

        Delete a product by POST method
        http://localhost:8000/products/39/

        Args:
            request (Request): HttpRequest object
            pid (int): product id

        """
        product = self.get_object(pid)
        product.delete()
        return Result.success(data=product.id)

    def put(self, request, pid):
        """Update a product

        Update a product by PUT method
        http://localhost:8000/products/39/

        Args:
            request (Request): HttpRequest object
            pid (int): product id

        """
        product = self.get_object(pid)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            # 手动更新 last_change 字段
            serializer.validated_data["last_change"] = timezone.now()

            serializer.save()
            return Result.success(serializer.data)
        else:
            return Result.error(serializer.errors)


class StatusAPIView(APIView):
    def get(self, request):
        result = []
        for key, value in statusChoice.items():
            item = {
                "id": key,
                "status_name": value,
                "count": Product.objects.filter(status=key).count(),
            }
            result.append(item)
        return Result.success(result)


class ByStatusAPIView(APIView):
    def get(self, request, sid=None):
        page = request.GET.get("page", 1)
        page_size = request.GET.get("page_size", 10)
        if sid is not None and sid != 0:
            products = Product.objects.filter(status=sid).order_by("-id")
            paginator = Paginator(products, page_size)
            try:
                current_page_data = paginator.page(page)
                print(f"Get page: {page}, Current Page: {current_page_data}")
                serialized_data = ProductSerializer(current_page_data, many=True).data
                total_items = paginator.count  # 获取总条目数
                params = {
                    "total_items": total_items,
                }
                return Result.success(data=serialized_data, params=params)
            except EmptyPage:
                return Result.error(msg="Invalid page number")
        else:
            print("No such status")
            products = Product.objects.all().order_by("-id")
            paginator = Paginator(products, page_size)
            try:
                current_page_data = paginator.page(page)
                print(f"Get page: {page}, Current Page: {current_page_data}")
                serialized_data = ProductSerializer(current_page_data, many=True).data
                total_items = paginator.count  # 获取总条目数
                params = {
                    "total_items": total_items,
                }
                return Result.success(data=serialized_data, params=params)
            except EmptyPage:
                return Result.error(msg="Invalid page number")


class CategoryAPIView(APIView):
    def get(self, request):
        result = []
        for key, value in categoryChoice.items():
            item = {
                "id": key,
                "category_name": value,
                "count": Product.objects.filter(category=key).count(),
            }
            result.append(item)
        return Result.success(result)


class ByCategoryAPIView(APIView):
    def get(self, request, cid=None):
        page = request.GET.get("page", 1)
        page_size = request.GET.get("page_size", 10)
        if cid is not None and cid != 0:
            print(cid)
            products = Product.objects.filter(category=cid).order_by("-id")
            paginator = Paginator(products, page_size)
            try:
                current_page_data = paginator.page(page)
                print(f"Get page: {page}, Current Page: {current_page_data}")
                serialized_data = ProductSerializer(current_page_data, many=True).data
                total_items = paginator.count  # 获取总条目数
                params = {
                    "total_items": total_items,
                }
                return Result.success(data=serialized_data, params=params)
            except EmptyPage:
                return Result.error(msg="Invalid page number")
        else:
            print("No such category")
            products = Product.objects.all().order_by("-id")
            paginator = Paginator(products, page_size)
            try:
                current_page_data = paginator.page(page)
                print(f"Get page: {page}, Current Page: {current_page_data}")
                serialized_data = ProductSerializer(current_page_data, many=True).data
                total_items = paginator.count  # 获取总条目数
                params = {
                    "total_items": total_items,
                }
                return Result.success(data=serialized_data, params=params)
            except EmptyPage:
                return Result.error(msg="Invalid page number")



@api_view(["GET"])
def get_info(request):
    total = Product.objects.all().count()
    valid = Product.objects.filter(valid=True).count()
    invalid = Product.objects.filter(valid=False).count()
    context = {"total": total, "valid": valid, "invalid": invalid}
    return Result.success(data=context)
