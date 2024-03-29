from django.contrib.auth.models import User
from rest_framework import serializers

from accounts.serializers import UserProfileSerializer
from .models import Availability, UserContact


class UserContactSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    contact = UserProfileSerializer(read_only=True)

    class Meta:
        model = UserContact
        fields = ('id', 'user', 'contact', 'added_on')


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['day', 'start_time', 'end_time']


class UserContactDetailSerializer(serializers.ModelSerializer):
    availability = AvailabilitySerializer(source='contact.availability_set',
                                          many=True)  # Assuming a reverse relation from User to Availability

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'availability']


# class MeetingInvitationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MeetingInvite
#         fields = ['id', 'meeting', 'invitee', 'status', 'sent_at', 'last_reminder']
