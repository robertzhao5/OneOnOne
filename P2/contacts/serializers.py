from django.contrib.auth.models import User
from rest_framework import serializers

from P2.contacts.models import Availability, MeetingInvite, UserContact
from ..accounts.serializers import UserProfileSerializer


class UserContactSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    contact = UserProfileSerializer(read_only=True)

    class Meta:
        model = UserContact
        fields = ('id', 'user', 'contact', 'added_on')


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['day', 'start_time', 'end_time']


class UserContactDetailSerializer(serializers.ModelSerializer):
    availability = TimeSlotSerializer(source='contact.availability_set',
                                      many=True)  # Assuming a reverse relation from User to Availability

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'availability']


class MeetingInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingInvite
        fields = ['id', 'meeting', 'invitee', 'status', 'sent_at', 'last_reminder']
