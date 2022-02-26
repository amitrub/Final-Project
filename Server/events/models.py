from django.db import models

from users.models import EventManager


# -------------------Event-------------------

class Event(models.Model):
    """Profile status update"""
    event_manager = models.ForeignKey(
        EventManager,
        on_delete=models.CASCADE,
        related_name='events',
    )
    type = models.CharField(max_length=255)
    event_name = models.CharField(max_length=255)
    date = models.DateField()
    budget = models.PositiveIntegerField()

    def __str__(self):
        """Return the model as a string"""
        return self.event_name


# -------------------EventSchedule-------------------

class EventSchedule(models.Model):
    """"""
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='event_schedules',
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.CharField(max_length=255)

    def __str__(self):
        """Return the model as a string"""
        return self.description
