import json

from django.test import TestCase

# Create your tests here.
from django.test import TestCase, Client

# Create your tests here.
from django.urls import reverse
from rest_framework.templatetags import rest_framework

from addresses.serializers import AddressSerializer
from users import views
from users.models import User, Supplier
from addresses.models import Address
from rest_framework.test import APITestCase, APIClient


class ProductTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        url = reverse('user:user-list')
        data = {
            "country": "israel",
            "city": "timmorim",
            "street": "alon",
            'number': 6
        }

        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            address = serializer.validated_data
        response_register = self.client.post(url,
                                             {'email': 'roeebenhouse@gmail.com',
                                              'name': 'roee',
                                              'password': '8111996',
                                              'phone': '0546343178',
                                              "address": serializer.data}, format='json')
        id = response_register.data['id']
        url = reverse('user:login')
        response_login = self.client.post(url,
                                          {"username": "roeebenhouse@gmail.com",
                                           "password": "8111996", }
                                          , format='json')
        self.token = response_login.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('user:supplier', kwargs={'user_id': id})
        response = self.client.post(url, {"supplier_type": "flowers"}, format='json')
        self.supplier = Supplier.objects.get(user_id=id)

    def test_product(self):
        url = reverse('product-list')
        response = self.client.post(url,
                                    {'supplier': self.supplier.user_id,
                                     'description': 'banana'}, format='json')

        assert response.status_code == 201

    def test_product1(self):
        assert True
