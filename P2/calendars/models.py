from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Calendar(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='calendars', on_delete=models.CASCADE)
    participants = models.ManyToManyField(User)
    events = models.ManyToManyField(events) #TODO: create events model
