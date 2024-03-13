

from django.db import models
from django.contrib.auth.models import User

from scheduling.models.calendars import Calendar


class SuggestedMeeting(models.Model):
    start = models.DateTimeField()
    end = models.DateTimeField()
    organizer = models.ForeignKey('auth.User', related_name='events',
                                  on_delete=models.CASCADE)
    participant = models.OneToOneField(User, on_delete=models.CASCADE)


class SuggestedSchedule(models.Model):
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE,
                                 related_name='suggested_schedules')
    unmatched_users = models.ManyToManyField(User,
                                             related_name='unmatched_schedules')
    # Assuming `Meeting` is a model you've defined to represent individual meetings.
    proposed_meetings = models.ManyToManyField(SuggestedMeeting,
                                               related_name='included_in_schedules')

    def __str__(self):
        return f"Suggested Schedule for {self.calendar.name}"



