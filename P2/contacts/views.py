from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserContactSerializer

from P2.contacts.models import UserContact


class ListContactsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserContactSerializer

    def get_queryset(self):
        user = self.request.user
        return UserContact.objects.filter(user=user)
