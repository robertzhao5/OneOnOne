from django.contrib import admin
from .models.calendars import Calendar, CalendarInvite  # Import your model
from .models.meetings import Meetings
from .models.suggested_schedule import SuggestedSchedule, SuggestedMeeting


admin.site.register(Calendar)  # Register your model
admin.site.register(CalendarInvite)
admin.site.register(Meetings)
admin.site.register(SuggestedSchedule)
admin.site.register(SuggestedMeeting)

