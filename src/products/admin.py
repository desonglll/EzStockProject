from django.contrib import admin
from django.utils.html import format_html
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
    list_filter = [
        "last_change",
        "status",
        "valid"]
    actions = [make_unreleased, make_released, make_unstore, make_storing, make_stored, make_valid, make_invalid]
    list_display = ["get_image", "id", "title", "price", "category", "valid", "status", "created_date", "last_change",
                    "last_changed_by"]
    list_display_links = ["id", "title", "price", "category", "valid", "status", "created_date",
                          "last_change"]
    search_fields = ["title", "last_change"]

    # DateField: 2024-01-01
    def get_image(self, obj):
        return format_html('<img src="{}" width="50%" height="50%" />'.format(obj.image.url))

    # fieldsets = [
    #     (
    #         "Basic",
    #         {
    #             "fields": ["title", "price", "category", "valid", "status", "created_date"]
    #         }
    #     ),
    #     (
    #         "Advanced options",
    #         {
    #             "classes": ["collapse"],
    #             "fields": ["description", "image"],
    #         },
    #     ),
    # ]

    def save_model(self, request, obj, form, change):
        # 在保存之前执行自定义逻辑
        print(f"Saved by {request.user.username}")
        obj.last_changed_by = request.user.username

        # 调用父类的 save_model() 方法，实际进行保存
        super(ProductAdmin, self).save_model(request, obj, form, change)

    pass


admin.site.register(Product, ProductAdmin)

