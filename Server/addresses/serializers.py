from rest_framework import serializers


from addresses import models


# -------------------Address-------------------

class AddressSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Address
        fields = ('id', 'country', 'city', 'street', 'number')




