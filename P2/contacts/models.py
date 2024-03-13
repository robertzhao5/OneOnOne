import datetime

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models


# a row in this table indicates:
# User has <contact> added as a contact
class UserContact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='contacts')
    contact = models.ForeignKey(User, related_name='contact_of',
                                on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        # user cannot have themselves as contact
        unique_together = ('user', 'contact')

    def __str__(self):
        return f"{self.user.username} has contact {self.contact.username}"


# availability table: user is available from start to end
class Availability(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    day = models.DateField()
    rank = models.IntegerField()

    def clean(self):
        # Ensure that the block is exactly 15 minutes
        expected_end_time = (datetime.datetime.combine(datetime.date.today(), self.start_time) + datetime.timedelta(minutes=15)).time()
        if self.end_time != expected_end_time:
            raise ValidationError('End time must be exactly 15 minutes after start time.')

        # Ensure that the time is between 9 AM and 12 AM
        if not (datetime.time(9, 0) <= self.start_time < datetime.time(0, 0)):
            raise ValidationError('Start time must be between 9 AM and 12 AM.')

        if not (datetime.time(9, 15) <= self.end_time <= datetime.time(0, 0)):
            raise ValidationError('End time must be between 9:15 AM and 12 AM.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username}: {self.start_time} to {self.end_time}, ranking: {self.ranking}"



