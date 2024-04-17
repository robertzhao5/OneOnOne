# serializers.py
from rest_framework import serializers

from scheduling.models.suggested_schedule import SuggestedMeeting, SuggestedSchedule
from accounts.serializers import UserSerializer


class SuggestedMeetingSerializer(serializers.ModelSerializer):
    participant = UserSerializer(read_only=True)
    organizer = UserSerializer(read_only=True)
    class Meta:
        model = SuggestedMeeting
        fields = ['start', 'end', 'day', 'calendar', 'organizer', 'participant']


class SuggestedScheduleSerializer(serializers.ModelSerializer):
    proposed_meetings = SuggestedMeetingSerializer(many=True, read_only=True)

    class Meta:
        model = SuggestedSchedule
        fields = ['calendar', 'unmatched_users', 'proposed_meetings']
