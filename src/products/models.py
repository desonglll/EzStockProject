import datetime
from django.db import models
from django.contrib import admin
from django.http import JsonResponse
from django.utils import timezone

statusChoice = {
    "0": "未发布",
    "1": "已发布",
    "2": "未入库",
    "3": "入库中",
    "4": "已入库",
}

categoryChoice = {
    "0": "未分类",
    "1": "服饰",
    "2": "电子",
    "3": "家居",
    "4": "汽车"
}


class Product(models.Model):
    @admin.display(
        boolean=True,
        ordering="valid",
        description="是否有效？",
    )
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.created_date <= now

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, verbose_name="产品标题")
    price = models.FloatField(blank=True, default="0", verbose_name="产品价格")
    description = models.TextField(blank=True, verbose_name="产品描述")
    category = models.CharField(blank=True, max_length=255, choices=categoryChoice, default="0",
                                verbose_name="产品分类")
    # file will be saved to MEDIA_ROOT/uploads/2015/01/30
    image = models.ImageField(default='default.jpg', upload_to="images/%Y/%m/%d/",
                              verbose_name="产品图片")
    status = models.CharField(blank=True, default=0, max_length=255, choices=statusChoice, verbose_name="产品状态")
    created_date = models.DateTimeField(blank=True, default=timezone.now, verbose_name="创建时间")
    last_change = models.DateTimeField(blank=True, verbose_name="上次修改在", auto_now=True)
    last_changed_by = models.CharField(blank=True, max_length=255, verbose_name="上次修改人员")
    valid = models.BooleanField(default=False, verbose_name="是否有效")

    def __str__(self):
        return self.title


class Result:

    @classmethod
    def success(cls, data):
        return JsonResponse({"code": 1, "message": "success", "data": data})

    @classmethod
    def error(cls, msg: str):
        return JsonResponse({"code": 0, "message": msg, "data": None})


Product._meta.verbose_name = "产品"
Product._meta.verbose_name_plural = "产品"
