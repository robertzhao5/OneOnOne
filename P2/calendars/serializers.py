from .models import Calendar
from rest_framework import serializers

class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ['id', 'name', 'owner', 'participants', 'events']
        read_only_fields = ['owner']