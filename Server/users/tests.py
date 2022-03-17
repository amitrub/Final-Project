import json

from django.test import TestCase

# Create your tests here.
from django.test import TestCase, Client

# Create your tests here.
from django.urls import reverse
from rest_framework.templatetags import rest_framework

from addresses.serializers import AddressSerializer
from users import views
from users.models import User
from addresses.models import Address
from rest_framework.test import APITestCase, APIClient


class UserCreateListTest(APITestCase):

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
        response = self.client.post(url,
                                       {'email': 'roeebenhouse@gmail.com',
                                        'name': 'roee',
                                        'password': '8111996',
                                        'phone': '0546343178',
                                        "address": serializer.data}, format='json')

    def test_register(self):
        url = reverse('user:user-list')
        data = {
            "country": "snifter@gmail.com",
            "city": "outrageous canteloupe",
            "street": "GramDaddyff!!5",
            'number': 6
        }

        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            address = serializer.validated_data
        response = self.client.post(url,
                                       {'email': 'reutlevy30@gmail.com',
                                        'name': 'reut',
                                        'password': '8111996',
                                        'phone': '0546343178',
                                        "address": serializer.data}, format='json')
        assert response.status_code == 201
        self.assertTrue(User.objects.get(email='reutlevy30@gmail.com'))

    def test_login(self):
        url = reverse('user:login')
        response = self.client.post(url,
                                    {"username": "roeebenhouse@gmail.com",
                                    "password": "8111996",}
                                    , format='json')
        assert response.status_code == 200

    def test_register_bad_email(self):
        url = reverse('user:user-list')
        data = {
            "country": "snifter@gmail.com",
            "city": "outrageous canteloupe",
            "street": "GramDaddyff!!5",
            'number': 6
        }

        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            address = serializer.validated_data
        response = self.client.post(url,
                                       {'email': 'dsfdsfsdf',
                                        'name': 'reut',
                                        'password': '8111996',
                                        'phone': '0546343178',
                                        "address": serializer.data}, format='json')
        assert response.status_code == 400

    def test_register_bad_address(self):
        url = reverse('user:user-list')
        data = {
            "country": "snifter@gmail.com",
            "city": "outrageous canteloupe",
            "street": "GramDaddyff!!5",
            'number': "324243243"
        }

        serializer = AddressSerializer(data=data)
        if serializer.is_valid():
            address = serializer.validated_data
        response = self.client.post(url,
                                       {'email': 'dsfdsfsdf',
                                        'name': 'reut',
                                        'password': '8111996',
                                        'phone': '0546343178',
                                        "address": serializer.data}, format='json')
        assert response.status_code == 400

    def test_login_not_exist(self):
        url = reverse('user:login')
        response = self.client.post(url,
                                        {"username": "roeeb11enhouse@gmail.com",
                                         "password": "8111996", }
                                        , format='json')
        assert response.status_code == 400
