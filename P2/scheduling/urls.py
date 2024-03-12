from django.urls import path
from .views.calendars import (CalendarCreateView, CalendarListView, CalendarEditView,
                              CalendarDeleteView, InviteContactToCalendarView, AcceptCalendarInviteView)

urlpatterns = [
    path('create/', CalendarCreateView.as_view(), name='calendar_create'),
    path('list/', CalendarListView.as_view(), name='calendar_list'),
    path('edit/<int:pk>/', CalendarEditView.as_view(), name='calendar_edit'),
    path('delete/<int:pk>/', CalendarDeleteView.as_view(), name='calendar_delete'),
    path('invite/', InviteContactToCalendarView.as_view(), name='invite_contact_to_calendar'),
    path('accept-invite/<int:invitation_id>/', AcceptCalendarInviteView.as_view(), name='accept_calendar_invite'),
]
