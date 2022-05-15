from django.db import models
from rest_framework.utils import json

from users.models import EventManager


# -------------------Event-------------------

class Event(models.Model):
    """Profile status update"""
    event_manager = models.ForeignKey(
        EventManager,
        on_delete=models.CASCADE,
        related_name='events',
        default=None
    )
    type = models.CharField(max_length=255)
    event_name = models.CharField(max_length=255)
    date = models.DateField()
    budget = models.PositiveIntegerField()
    location = models.CharField(max_length=255)

    # def __str__(self):
    #     """Return the model as a string"""
    #     return self.id

    def tojson(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


# -------------------DummyEventOwner-------------------

class DummyEventOwner(models.Model):
    """Profile status update"""
    event = models.ForeignKey(Event,
                              on_delete=models.CASCADE,
                              related_name='event_owners',
                              default=None)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)

    def __str__(self):
        """Return the model as a string"""
        return self.name

# -------------------DummySupplier-------------------

class DummySupplier(models.Model):
    """Profile status update"""
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='suppliers',
    )
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    job = models.CharField(max_length=255)
    price = models.PositiveIntegerField()
    has_paid = models.BooleanField(default=False)
    # advance_pay = models.IntegerField(null=True, blank=True)
    # pay_method = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        """Return the model as a string"""
        return self.name


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

#
# # -------------------Meeting-------------------
#
# class Meeting(models.Model):
#     """"""
#     event = models.ForeignKey(
#         Event,
#         on_delete=models.CASCADE,
#         related_name='meetings',
#     )
#     description = models.CharField(max_length=255)
#     date = models.DateField()
#     time = models.TimeField()
#
#     def __str__(self):
#         """Return the model as a string"""
#         return self.description
