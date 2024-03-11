from django.contrib.auth.models import User
from django.db import models


# a row in this table indicates:
# User has <contact> added as a contact
class UserContact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='contacts')
    contact = models.ForeignKey(User, related_name='cont5act_of',
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
    available = models.BooleanField()

    def __str__(self):
        return f"{self.user.username}: {self.start_time} to {self.end_time}, ranking: {self.ranking}"


class MeetingInvite(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()
    day = models.DateField()
    invitee = models.ForeignKey(User, related_name='invitations',
                                on_delete=models.CASCADE)
    inviter = models.ForeignKey(User, related_name='sent-invites',
                                on_delete=models.CASCADE)
    sent_at = models.DateTimeField(auto_now_add=True)
    last_reminder = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.start_time} to {self.end_time}, invitee: {self.invitee}, inviter: {self.inviter}, sent_at: {self.sent_at}, last_reminder: {self}"
