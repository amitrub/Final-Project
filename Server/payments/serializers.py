from rest_framework import serializers


from payments import models


# -------------------Address-------------------

class PaymentSerializer(serializers.ModelSerializer):
    """Serializer profile feed items"""

    class Meta:
        model = models.Payment
        fields = ('id', 'from_user', 'to_user', 'date', 'amount')




