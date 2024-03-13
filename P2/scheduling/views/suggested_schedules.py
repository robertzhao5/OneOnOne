from calendar import Calendar
from datetime import datetime

from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

from P2.contacts.models import Availability
from P2.scheduling.models.suggested_schedule import SuggestedMeeting, \
    SuggestedSchedule
from P2.scheduling.serializer.suggested_schedule import \
    SuggestedScheduleSerializer


class GenerateSuggestedSchedulesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, calendar_id):
        calendar = Calendar.objects.get(id=calendar_id)
        organizer_availabilities = get_availabilities(calendar.owner_id)
        participants_availabilities = get_participants_availabilities(
            calendar_id)

        suggested_schedules = []
        # Simplified logic for demonstration purposes
        for participant_id, availabilities in participants_availabilities.items():
            for day, times in availabilities.items():
                for start_time, end_time in times:
                    if check_intersection(organizer_availabilities, start_time,
                                          end_time, blocks_needed=1):
                        # Create a SuggestedMeeting
                        participant = User.objects.get(id=participant_id)
                        suggested_meeting = SuggestedMeeting.objects.create(
                            start=start_time,
                            end=end_time,
                            organizer=calendar.owner,
                            participant=participant
                        )
                        suggested_schedules.append(suggested_meeting)
                        break  # Simplification: break after first match

        # Create a SuggestedSchedule with the matched meetings
        suggested_schedule = SuggestedSchedule.objects.create(calendar=calendar)
        suggested_schedule.proposed_meetings.set(suggested_schedules)

        # Serialize and return the suggested schedule
        serializer = SuggestedScheduleSerializer(suggested_schedule)
        return Response(serializer.data)


def find_maximal_matchings(calendar_id, desired_meeting_duration):
    """
    Finds up to 5 sets of maximal matchings for meetings based on weekly
    recurring availabilities. :param calendar_id: ID of the calendar for
    which to generate matchings. :param desired_meeting_duration: Desired
    duration of each meeting, in minutes. :return: A list of up to 5 matching
    sets.
    """
    # get organizer and participants' weekly availabilities
    organizer_availabilities = get_availabilities(calendar_id,
                                                  "organizer")
    participants_availabilities = get_participants_availabilities(
        calendar_id)

    matchings = []
    meeting_blocks_needed = desired_meeting_duration // 15

    for attempt in range(5):  # Limit to 5 unique sets of matchings
        matching_set, unmatched_participants = [], set(
            participants_availabilities.keys())

        for participant_id, weekly_times in participants_availabilities.items():
            for day, times in weekly_times.items():
                for start_time, end_time in times:
                    # Assuming start_time and end_time are datetime.time objects
                    if check_intersection(organizer_availabilities[day],
                                          start_time, end_time,
                                          meeting_blocks_needed):
                        matching_set.append(
                            (participant_id, day, start_time, end_time))
                        unmatched_participants.remove(participant_id)
                        break  # Move to the next participant once matched

        if not matching_set:
            break  # No more matchings could be found
        matchings.append(matching_set)

        # For simplicity, this example doesn't alter availabilities between
        # attempts In a full implementation, we should randomize availabilities
        # to find alternative matchings

    return matchings


def check_intersection(organizer_availabilities, proposed_start, proposed_end,
                       blocks_needed):
    """
    Checks if there's an intersection between organizer's availabilities and a time slot.
    """

    # check if the organizer's availability
    # overlaps with the proposed time slot for the required duration (blocks_needed)
    proposed_start_dt = datetime.combine(datetime.today(), proposed_start)
    proposed_end_dt = datetime.combine(datetime.today(), proposed_end)

    # Calculate the total duration required in minutes
    total_required_duration = blocks_needed * 15

    for day, availabilities in organizer_availabilities.items():
        for start_time, end_time in availabilities:
            start_time_dt = datetime.combine(datetime.today(), start_time)
            end_time_dt = datetime.combine(datetime.today(), end_time)

            # Check if there's an overlap
            latest_start = max(proposed_start_dt, start_time_dt)
            earliest_end = min(proposed_end_dt, end_time_dt)
            delta = (earliest_end - latest_start).seconds / 60  # Duration of
            # overlap in minutes

            if delta >= total_required_duration:
                return True

    return False


def get_availabilities(calendar_id, user_type):
    """
    Placeholder function to fetch weekly recurring availability blocks for a
    specific user type ('organizer' or 'participant'). This function should
    return a structured representation of weekly availability slots.
    """
    # Implement actual fetching logic here
    calendar = Calendar.objects.get(id=calendar_id)
    user = calendar.owner if user_type == "organizer" else None  # Only
    # fetching for organizer in this example

    availabilities = Availability.objects.filter(user=user).order_by('day',
                                                                     'start_time')
    weekly_availabilities = {day: [] for day in
                             ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
                              'Friday', 'Saturday', 'Sunday']}

    for availability in availabilities:
        weekly_availabilities[availability.day].append(
            (availability.start_time, availability.end_time))

    return weekly_availabilities


def get_participants_availabilities(calendar_id):
    """
    Placeholder function to fetch weekly recurring availability blocks for all participants.
    Returns a structured representation of weekly slots.
    """
    # Implement actual fetching logic here
    """
    Fetch weekly recurring availability blocks for all participants of a calendar.
    """
    calendar = Calendar.objects.get(id=calendar_id)
    participants = calendar.participants.all()

    participant_availabilities = {}
    for participant in participants:
        availabilities = Availability.objects.filter(user=participant).order_by(
            'day', 'start_time')
        weekly_availabilities = {day: [] for day in
                                 ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
                                  'Friday', 'Saturday', 'Sunday']}

        for availability in availabilities:
            weekly_availabilities[availability.day].append(
                (availability.start_time, availability.end_time))

        participant_availabilities[participant.id] = weekly_availabilities

    return participant_availabilities
