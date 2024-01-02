from django.contrib import admin

from .models import Product


@admin.action(description="将选中变为未发布")
def make_unreleased(modeladmin, request, queryset):
    queryset.update(status="0")


@admin.action(description="将选中变为已发布")
def make_released(modeladmin, request, queryset):
    queryset.update(status="1")


@admin.action(description="将选中变为未入库")
def make_unstore(modeladmin, request, queryset):
    queryset.update(status="2")


@admin.action(description="将选中变为入库中")
def make_storing(modeladmin, request, queryset):
    queryset.update(status="3")


@admin.action(description="将选中变为已入库")
def make_stored(modeladmin, request, queryset):
    queryset.update(status="4")


@admin.action(description="将选中变为有效")
def make_valid(modeladmin, request, queryset):
    queryset.update(valid=True)


@admin.action(description="将选中变为无效")
def make_invalid(modeladmin, request, queryset):
    queryset.update(valid=False)


class ProductAdmin(admin.ModelAdmin):
    list_filter = ["last_change",
                   "status",
                   "valid"]
    actions = [make_unreleased, make_released, make_unstore, make_storing, make_stored, make_valid, make_invalid]
    list_display = ["id", "title", "price", "category", "valid", "status", "created_date", "last_change"]
    list_display_links = ["id", "title", "price", "category", "valid", "status", "created_date", "last_change"]
    search_fields = ["title", "last_change"]
    # DateField: 2024-01-01

    pass


admin.site.register(Product, ProductAdmin)
