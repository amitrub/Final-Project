import json

from django.db import models
from users.models import User


# -------------------Address-------------------

class Address(models.Model):
    """Profile status update"""

    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    number = models.PositiveIntegerField()

    user = models.OneToOneField(User,
                            on_delete=models.CASCADE,
                            related_name='address',
                            null=True,
                            blank=True)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)
    def __str__(self):
        """Return the model as a string"""
        return "{} {}, {}, {}".format(self.street, str(self.number), self.city, self.country)