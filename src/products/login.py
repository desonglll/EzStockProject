# -*- coding: utf-8 -*-
"""
File: login
Description: 
Author: mikeshinoda
Date: 2024/1/9
"""
import json

# TODO: Add your code here
# views.py
from django.contrib.auth import authenticate, login, logout, get_user, get_user_model
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt


def CsrfView(request):
    return JsonResponse({'token': get_token(request)})


def PingView(request):
    return JsonResponse({'result': True})


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        print(username, password)
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            response = JsonResponse({"message": "登录成功"})
            response.set_cookie('loggedInUser', username, max_age=604800)  # 设置 cookie 过期时间为 7 天
            return response
        else:
            return JsonResponse({'message': 'Login failed'}, status=401)

    # 如果不是POST请求，你可能希望返回一个适当的响应，例如错误信息或重定向
    return JsonResponse({'message': 'Invalid request method'}, status=400)


@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            user = request.user
            logout(request)
            return JsonResponse({"message": f"{user.username} 退出登录成功"})
        else:
            return JsonResponse({"message": "用户未登录"}, status=401)
    return JsonResponse({"message": "仅支持POST请求"}, status=400)


@csrf_exempt
def check_login(request):
    if request.method == 'POST':
        user = get_user(request)
        print(user.is_authenticated)

    return JsonResponse({"message": "仅支持POST请求"}, status=400)
