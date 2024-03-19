from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Meetings(models.Model):
    name = models.CharField(max_length=100)
    start = models.DateTimeField()
    end = models.DateTimeField()
    owner = models.ForeignKey(User, related_name='owned_meetings', on_delete=models.CASCADE)
    participants = models.ForeignKey(User, related_name='participants', on_delete=models.CASCADE)
