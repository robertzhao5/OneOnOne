from django.core.mail import send_mail
from django.conf import settings


def send_invitation_email(invitation, reminder=False):
    subject = 'Meeting Invitation'
    if reminder:
        subject = 'Reminder: ' + subject
    message = (f"You have been invited to a meeting. Please visit the link to "
               f"respond.")

    recipient_list = [invitation.invitee.email]
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)


def send_reminder_email(user, recipient):
    subject = 'Reminder to update your availability'
    message = f"Please visit the following link to update your availability"
    recipient_list = [recipient]
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)

