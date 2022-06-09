from rest_framework import serializers


from addresses import models
from my_models.models import MySerializer


# -------------------Address-------------------


class AddressSerializer(MySerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Address
        fields = ('id', 'country', 'city', 'street', 'number')




