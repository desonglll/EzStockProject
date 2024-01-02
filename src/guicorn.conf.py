# gunicorn.conf.py

from multiprocessing import cpu_count
import os

bind = "localhost:8000"
workers = cpu_count() * 2 + 1
preload_app = True
timeout = 30

# 静态文件服务配置
static_path = "/static/"
static_folder = os.path.join(os.path.dirname(__file__), "static")
static_url = {"/static/": static_folder}

# 合并配置
web_app_config = {"web_app": {"port": 8000}}
web_app_config.update(static_url)
