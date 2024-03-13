from django.db import models
from django.contrib.auth.models import User
from .meetings import Meetings


# Create your models here.
class Calendar(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, related_name='owned_calendars',
                              on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, related_name='joined_calendars',blank=True)
    meetings = models.ManyToManyField(Meetings,blank=True)


# Invite user to this event/(meeting calendar)
class CalendarInvite(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    ]
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)# TODO: check if correct, was giving errors 
    invitee = models.ForeignKey(User, related_name='invitations',
                                on_delete=models.CASCADE)
    inviter = models.ForeignKey(User, related_name='sent-invites',
                                on_delete=models.CASCADE)
    sent_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES,
                              default='pending')

    def __str__(self):
        return f"name: {self.calendar.name}, invitee: {self.invitee}, inviter: {self.inviter}, sent_at: {self.sent_at}"
