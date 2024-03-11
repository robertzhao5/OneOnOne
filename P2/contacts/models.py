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
