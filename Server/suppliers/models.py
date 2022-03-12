from django.db import models

# Create your models here.
from events.models import Event


class Supplier(models.Model):
    """Profile status update"""
    name = models.CharField(max_length=255)
    price = models.PositiveIntegerField()
    advance_pay = models.PositiveIntegerField()
    pay_method = models.PositiveIntegerField()
    event = models.ManyToManyField(Event,
                                   related_name='suppliers',
                                   null=True,
                                   blank=True)

    def __str__(self):
        """Return the model as a string"""
        return self.name
