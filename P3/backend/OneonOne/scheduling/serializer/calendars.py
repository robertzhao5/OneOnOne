from ..models.calendars import Calendar, CalendarInvite
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
        # remove many to many fields from validated data
        participants_data = validated_data.pop('participants', None)
        meetings_data = validated_data.pop('meetings', None)

        # create calendar object with required fields
        calendar = Calendar.objects.create(**validated_data)

        # set many to many field data
        if participants_data:
            calendar.participants.set(participants_data)
        if meetings_data:
            calendar.meetings.set(meetings_data)
        return calendar


class CalendarEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ['id', 'name', 'owner', 'participants', 'meetings']
        extra_kwargs = {
            'owner': {'read_only': True},
            'participants': {'required': False},
            'meetings': {'required': False}
        }

    def validate(self, data):
        if not data['name'] and not data['participants'] and not data['meetings']:
            raise serializers.ValidationError("No data to update")
        return data


class CalendarInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarInvite
        fields = ['id', 'calendar', 'inviter', 'invitee', 'sent_at', 'status']

