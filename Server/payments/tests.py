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
            "city": "beer-sheva",
            "street": "rager",
            'number': 167
        }

        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            address = serializer.validated_data
        self.user1 = self.client.post(url,
                                             {'email': 'reutlevy30@gmail.com',
                                              'name': 'reut',
                                              'password': '8111996',
                                              'phone': '0546343178',
                                              "address": serializer.data}, format='json')

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
        self.response_register = self.client.post(url,
                                             {'email': 'roeebenhouse@gmail.com',
                                              'name': 'roee',
                                              'password': '8111996',
                                              'phone': '0546343178',
                                              "address": serializer.data}, format='json')
        id = self.response_register.data['id']
        url = reverse('user:login')
        response_login = self.client.post(url,
                                          {"username": "roeebenhouse@gmail.com",
                                           "password": "8111996", }
                                          , format='json')
        self.token = response_login.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)


    def test_payment(self):
        url = reverse('payment-list')
        response = self.client.post(url,
                                    {'from_user': self.response_register.data['id'],
                                     'to_user': self.user1.data['id'],
                                     'date': '2022-03-09',
                                     'amount': 10000}, format='json')

        print(response.content)
        assert response.status_code == 201

