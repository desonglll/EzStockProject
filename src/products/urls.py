# -*- coding: utf-8 -*-
"""
File: urls
Description: 
Author: mikeshinoda
Date: 2024/1/7
"""

# TODO: Add your code here

from django.urls import path

from .views import ProductAPIView

urlpatterns = [
    # 列表： / get
    # 新增： / post
    # 详情： /[pid]/ get
    # 修改： /[pid]/ put
    # 删除： /[pid]/ delete
    path("", ProductAPIView.as_view()),
    path("<int:pid>/", ProductAPIView.as_view()),
]
