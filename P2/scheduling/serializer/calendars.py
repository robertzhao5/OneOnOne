from ..models.calendars import Calendar
from rest_framework import serializers

class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ['id', 'name', 'owner', 'participants', 'meetings']
        extra_kwargs = {
            'owner': {'read_only': True},
            'participants': {'required': False},
            'meetings': {'required': False}
        }
    def create(self, validated_data):
        calendar = Calendar.objects.create(**validated_data)
        return calendar

        
class CalendarEditSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100, required=False)
    participants = serializers.ListField(child=serializers.CharField(), required=False)
    meetings = serializers.ListField(child=serializers.CharField(), required=False)

    def validate(self, data):
        if not data['name'] and not data['participants'] and not data['meetings']:
            raise serializers.ValidationError("No data to update")
        return data #TODO: verify if this is correct