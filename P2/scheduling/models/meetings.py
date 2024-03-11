from django.db import models
from django.contrib.auth.models import User
from .calendars import Calendars

# Create your models here.
class Meetings(models.Model):
    name = models.CharField(max_length=100)
    start = models.DateTimeField()
    end = models.DateTimeField()
    owner = models.ForeignKey('auth.User', related_name='events', on_delete=models.CASCADE)
    participants = models.OneToOneField(User)
    calendar = models.ForeignKey(Calendars, related_name='events', on_delete=models.CASCADE) #TODO: check if this is correct