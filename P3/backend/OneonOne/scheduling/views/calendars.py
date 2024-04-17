from django.shortcuts import get_object_or_404, render
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models.calendars import Calendar, CalendarInvite
from ..serializer.calendars import *
from django.contrib.auth.models import User

from ..utils import send_invitation_email


# Create your views here.
class CalendarCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = CalendarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalendarListView(APIView):
    serializer_class = CalendarSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        calendars = Calendar.objects.filter(owner=request.user)
        serializer = CalendarSerializer(calendars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CalendarEditView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        user = request.user
        calendar = Calendar.objects.get(pk=pk)
        serializer = CalendarEditSerializer(calendar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalendarDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        user = request.user
        calendar = Calendar.objects.get(pk=pk)
        calendar.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListCalendarInvitationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch invitations where the current user is the invitee
        invitations = CalendarInvite.objects.filter(invitee=request.user)
        serializer = CalendarInviteSerializer(invitations, many=True)
        return Response(serializer.data)


class ListSentInvitationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch invitations where the current user is the invitee
        invitations = CalendarInvite.objects.filter(inviter=request.user)
        serializer = CalendarInviteSerializer(invitations, many=True)
        return Response(serializer.data)


class InviteContactToCalendarView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        calendar_id = request.data.get('calendar_id')
        calendar = Calendar.objects.get(pk=calendar_id)
        invitee_id = request.data.get('invitee_id')
        # Logic to create a MeetingInvitation instance and send email
        invitation = CalendarInvite.objects.create(calendar=calendar,
                                                   inviter_id=request.user.id,
                                                   invitee_id=invitee_id)
        # send_invitation_email(invitation)
        return Response({'message': 'Invitation sent successfully'}, status=200)


class AcceptCalendarInviteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, invitation_id):
        invitation = get_object_or_404(CalendarInvite, id=invitation_id,
                                       invitee=request.user)
        invitation.status = 'accepted'
        invitation.save()
        invitation.calendar.participants.add(request.user)
        return Response({'message': 'Invitation accepted and you are added to '
                                    'the calendar'})
