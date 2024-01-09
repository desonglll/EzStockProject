from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

from products.login import login_view, CsrfView, PingView, logout_view, check_login

urlpatterns = [
    path("admin/", admin.site.urls),
    path("products/", include("products.urls")),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('check-login/', check_login, name='check_login'),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
