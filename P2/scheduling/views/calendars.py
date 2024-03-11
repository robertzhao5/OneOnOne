from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models.meetings import Calendar
from ..serializers import CalendarSerializer

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
    
class CalendarEditView(APIView):#TODO check if user is owner of the calendar, check changes legal
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request, pk):
        user = request.user
        calendar = Calendar.objects.get(pk=pk)
        serializer = CalendarSerializer(calendar, data=request.data)
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
    
