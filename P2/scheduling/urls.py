from django.urls import path
from .views.calendars import (CalendarCreateView, CalendarListView,
                              CalendarEditView,
                              CalendarDeleteView, InviteContactToCalendarView,
                              AcceptCalendarInviteView)
from .views.suggested_schedules import GenerateSuggestedSchedulesView
from .views.meetings import MeetingDetailView, MeetingEditView

urlpatterns = [
    path('create/', CalendarCreateView.as_view(), name='calendar_create'),
    path('list/', CalendarListView.as_view(), name='calendar_list'),
    path('edit/<int:pk>/', CalendarEditView.as_view(), name='calendar_edit'),
    path('delete/<int:pk>/', CalendarDeleteView.as_view(),
         name='calendar_delete'),
    path('invite/', InviteContactToCalendarView.as_view(),
         name='invite_contact_to_calendar'),
    path('accept-invite/<int:invitation_id>/',
         AcceptCalendarInviteView.as_view(), name='accept_calendar_invite'),
    path('generate-suggested-schedules/<int:calendar_id>/',
         GenerateSuggestedSchedulesView.as_view(),
         name='generate_suggested_schedules'),
     path('meeting-details/<int:meeting_id>', MeetingDetailView.as_view(), name='meeting_details'),
     path('meeting-details/<int:meeting_id>/edit', MeetingEditView.as_view(), name='meeting_details_edit'),
     
]
