from django.contrib import admin
from .models import UserContact, Availability  # Import your model

admin.site.register(UserContact)  # Register your model
admin.site.register(Availability)

