from django.urls import path
from .views import (ListContactsView, AddContactView, RemoveContactView,
                    RemindContact, ContactDetailView, UpdateContactAvailabilityView)

urlpatterns = [
    path('list-contacts/', ListContactsView.as_view(), name='list_contacts'),
    path('add-contact/', AddContactView.as_view(), name='add_contact'),
    path('remove-contact/<int:contact_id>/', RemoveContactView.as_view(), name='remove_contact'),
    path('remind-contact/', RemindContact.as_view(), name='remind_contact'),
    path('contact-detail/<int:contact_id>/', ContactDetailView.as_view(), name='contact_detail'),
    path('update-availability/', UpdateContactAvailabilityView.as_view(), name='update_availability'),
]
