import json
from datetime import datetime

from django.test import TestCase

# Create your tests here.
from django.test import TestCase, Client

# Create your tests here.
from django.urls import reverse
from rest_framework.templatetags import rest_framework

from addresses.serializers import AddressSerializer
from events.models import Event, EventSchedule
from suppliers.serializers import SupplierSerializer
from tasks.models import Task
from users import views
from users.models import User, EventManager
from addresses.models import Address
from rest_framework.test import APITestCase, APIClient



class MeetingTests(APITestCase):

    event_manager_id = 1

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
        MeetingTests.event_manager_id = response_register.data['id']
        url = reverse('user:login')
        response_login = self.client.post(url,
                                          {"username": "roeebenhouse@gmail.com",
                                           "password": "8111996", }
                                          , format='json')
        self.token = response_login.data['token']
        # self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        # url = reverse('user:event_manager', kwargs={'user_id': MeetingTests.event_manager_id})
        # self.client.post(url)

    def test_add_task(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('user:event_manager', kwargs={'user_id': MeetingTests.event_manager_id})
        self.client.post(url)
        url = reverse('task-list')
        response = self.client.post(url,
                                    {"task_name": "Pick up flowers",
                                     'deadline': '2022-09-23',
                                     'description': 'take flowers'}
                                    , format='json')
        assert response.status_code == 201
        self.assertTrue(Task.objects.get(event_manager=MeetingTests.event_manager_id, task_name="Pick up flowers"))

    def test_add_task_wrong_date(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('user:event_manager', kwargs={'user_id': MeetingTests.event_manager_id})
        self.client.post(url)
        url = reverse('task-list')
        response = self.client.post(url,
                                    {"task_name": "Pick up flowers",
                                     'deadline': '202dasdasd2-09-23',
                                     'description': 'take flowers'}
                                    , format='json')
        assert response.status_code == 400


    def test_add_task_not_event_manager(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('task-list')
        response = self.client.post(url,
                                    {"task_name": "Pick up flowers",
                                     'deadline': '2022-09-23',
                                     'description': 'take flowers'}
                                    , format='json')
        assert response.status_code == 403

    def test_add_task_not_login(self):
        url = reverse('task-list')
        response = self.client.post(url,
                                    {"task_name": "Pick up flowers",
                                     'deadline': '2022-09-23',
                                     'description': 'take flowers'}
                                    , format='json')
        assert response.status_code == 401
