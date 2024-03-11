from ..models.meetings import Calendar
from rest_framework import serializers

class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ['id', 'name', 'owner', 'participants', 'events']
        read_only_fields = ['owner']

#TODO add serializer for other calendar view.
        
class CalendarEditSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, required=False)
    participants = serializers.ListField(child=serializers.CharField(), required=False)
    events = serializers.ListField(child=serializers.CharField(), required=False)

    def validate(self, data):
        if not data['name'] and not data['participants'] and not data['events']:
            raise serializers.ValidationError("No data to update")
        return data #TODO: verify if this is correct