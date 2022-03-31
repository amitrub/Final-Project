from rest_framework import serializers, status
from rest_framework.exceptions import APIException, ValidationError


class MySerializer(serializers.ModelSerializer):

    def is_valid(self, raise_exception=False):
        valid_data = super().is_valid()
        if not valid_data and raise_exception:
            raise ValidationError(detail={"Error": self.errors})
        return valid_data
