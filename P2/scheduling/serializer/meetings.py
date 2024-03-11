from ..models.meetings import Meetings
from django.contrib.auth.models import User
from ..models.meetings import Calendars
from rest_framework import serializers

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meetings
        fields = ['id', 'name', 'start', 'end', 'owner', 'participants', 'calendar']
        read_only_fields = ['owner']

class MeetingEditSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, required=False)
    start = serializers.DateTimeField(required=False)
    end = serializers.DateTimeField(required=False)
    participants = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    calendar = serializers.PrimaryKeyRelatedField(queryset=Calendars.objects.all(), required=False)

    def validate(self, data):
        if not data['name'] and not data['start'] and not data['end'] and not data['participants'] and not data['calendar']:
            raise serializers.ValidationError("No data to update")
        return data