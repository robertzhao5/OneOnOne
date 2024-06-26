# Generated by Django 4.2 on 2024-04-17 09:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('scheduling', '0002_suggestedmeeting_calendar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='suggestedmeeting',
            name='participant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='suggested_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
