import json
from datetime import datetime

from django.test import TestCase

# Create your tests here.
from django.test import TestCase, Client

# Create your tests here.
from django.urls import reverse
from rest_framework.templatetags import rest_framework

from addresses.serializers import AddressSerializer
from users import views
from users.models import User, EventManager
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
        url = reverse('user:event_manager', kwargs={'user_id': id})
        self.client.post(url)


    def test_add_event(self):
        url = reverse('events:event-list')
        token = f"Token {self.token}"
        response = self.client.post(url,
                                    {"type": "wedding",
                                     "event_name": "roy&hadas",
                                     'date': '2022-09-23',
                                     'budget': '100000'}
                                    , format='json')
        event_id = response.data['id']
        assert response.status_code == 201

        url = reverse('events:event-event_schedule_router-list', kwargs={'event_pk': event_id})
        response = self.client.post(url,
                                    {"start_time": "2022-09-23 18:00",
                                     "end_time": "2022-09-23 20:00",
                                     'description': 'reception', }
                                    , format='json')
        assert response.status_code == 201

