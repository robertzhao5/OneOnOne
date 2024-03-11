from django.db import models
from django.contrib.auth.models import User
from .meetings import Meetings

# Create your models here.
class Calendars(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='calendars', on_delete=models.CASCADE)
    participants = models.ManyToManyField(User)
    events = models.ManyToManyField(Meetings) #TODO: create events model