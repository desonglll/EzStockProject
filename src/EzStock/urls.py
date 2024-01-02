from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from products.views import detail
from django.conf import settings

urlpatterns = [path("admin/", admin.site.urls), path("detail/<int:product_id>", detail)]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
