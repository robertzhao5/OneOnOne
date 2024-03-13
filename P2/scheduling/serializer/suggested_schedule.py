# serializers.py
from rest_framework import serializers
from .models import SuggestedMeeting, SuggestedSchedule

class SuggestedMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestedMeeting
        fields = ['start', 'end', 'organizer', 'participant']

class SuggestedScheduleSerializer(serializers.ModelSerializer):
    proposed_meetings = SuggestedMeetingSerializer(many=True, read_only=True)

    class Meta:
        model = SuggestedSchedule
        fields = ['calendar', 'unmatched_users', 'proposed_meetings']
