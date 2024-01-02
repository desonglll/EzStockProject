# Generated by Django 5.0 on 2024-01-01 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_product_created_date_alter_product_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('1', '服饰'), ('2', '电子'), ('3', '家居'), ('4', '汽车')], max_length=255),
        ),
    ]
