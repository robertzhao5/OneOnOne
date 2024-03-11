from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserContactDetailSerializer, UserContactSerializer

from P2.contacts.models import UserContact


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

