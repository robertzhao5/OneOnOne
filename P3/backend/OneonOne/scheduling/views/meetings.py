from django.db.models import Q
from django.shortcuts import render, get_object_or_404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models.meetings import Meetings
from ..serializer.meetings import MeetingSerializer
from django.contrib.auth.models import User
from ..models.calendars import Calendar


class MeetingCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeetingDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, meeting_id, *args, **kwargs):
        meeting = get_object_or_404(Meetings, id=meeting_id)
        serializer = MeetingSerializer(meeting)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MeetingEditView(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        user = request.user
        meeting = Meetings.objects.get(pk=pk)
        serializer = MeetingSerializer(Calendar, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeetingDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        user = request.user
        meeting = Meetings.objects.get(pk=pk)
        meeting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserMeetingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        meetings = Meetings.objects.filter(
            Q(owner=user) | Q(participants=user)
        ).distinct()  # Ensure unique entries if user is both owner and participant
        serializer = MeetingSerializer(meetings, many=True)
        return Response(serializer.data)
