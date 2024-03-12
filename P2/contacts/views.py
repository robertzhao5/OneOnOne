import datetime

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Availability
from .serializers import UserContactDetailSerializer, UserContactSerializer

from P2.contacts.models import MeetingInvite, UserContact
from .utils import send_invitation_email


class ListContactsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserContactSerializer

    def get_queryset(self):
        user = self.request.user
        return UserContact.objects.filter(user=user)


# add new contact based on email
class AddContactView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email address is required'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            contact_user = User.objects.get(email=email)
            UserContact.objects.create(user=request.user, contact=contact_user)
            return Response({'message': 'Contact added successfully'},
                            status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            # TODO: send user an email with link to register new user
            return Response({'message': 'User not found, invitation sent'},
                            status=status.HTTP_404_NOT_FOUND)


# delete contact from logged-in user's contact list with specified <id>
class RemoveContactView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, contact_id, *args, **kwargs):
        try:
            # get contact from contact list with id
            contact = UserContact.objects.get(user=request.user, contact__id=contact_id)
            contact.delete()
            return Response({
                'message': 'Contact removed successfully'
            }, status=status.HTTP_204_NO_CONTENT)
        except UserContact.DoesNotExist:
            return Response({
                'error': 'Contact not found'
            }, status=status.HTTP_404_NOT_FOUND)


# view contact from logged-in user's contact list with specified <id>
class ContactDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, contact_id, *args, **kwargs):
        try:
            contact = UserContact.objects.get(user=request.user, contact__id=contact_id)
            serializer = UserContactDetailSerializer(contact)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserContact.DoesNotExist:
            return Response({
                'error': 'Contact not found'
            }, status=status.HTTP_404_NOT_FOUND)


# request should be sent as a list of availabilities
sample_request = {
    "availability": [
        {"day": "Monday", "start": "09:00", "end": "11:00", "rank": 1},
        {"day": "Wednesday", "start": "14:00", "end": "16:00", "rank": 2},
        # Additional availability periods as needed
    ]
}


# on POST, assume that we override previous availability preferences with new
class UpdateContactAvailabilityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        # get availability assuming request is properly formatted
        availability_data = request.data.get('availability', [])

        # clear existing availability preferences
        Availability.objects.filter(user=user).delete()

        # Create new availability objects based on the submitted data
        for period in availability_data:
            day = period.get('day')
            start = datetime.datetime.strptime(period.get('start'), '%H:%M').time()
            end = datetime.datetime.strptime(period.get('end'), '%H:%M').time()
            rank = period.get('rank')
            Availability.objects.create(user=user, day=day, start_time=start,
                                        end_time=end, rank=rank)
        return Response({"message": "Availability updated successfully"}, status=200)



