from rest_framework import serializers


from addresses import models
from my_models.models import MyModelSerializer


# -------------------Address-------------------


class AddressSerializer(MyModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Address
        fields = ('id', 'country', 'city', 'street', 'number')




