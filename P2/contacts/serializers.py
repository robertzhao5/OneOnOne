from django.contrib.auth.models import User
from rest_framework import serializers

from P2.contacts.models import UserContact
from ..accounts.serializers import UserProfileSerializer


class UserContactSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    contact = UserProfileSerializer(read_only=True)

    class Meta:
        model = UserContact
        fields = ('id', 'user', 'contact', 'added_on')
