from django.urls import reverse, resolve
from rest_framework.templatetags import rest_framework
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from events.models import Event, DummySupplier, DummyEventOwner
from users import models
from users.models import EventManager

# How to check url -> resolve('/api/user/1/')

# aa = resolve('/api/events/')

CREATE_EVENT_URL = reverse('events:event-list')
UPDATE_EVENT_URL = lambda event_id: reverse('events:event-detail', kwargs={'pk': event_id})
UPDATE_SUPPLIER_URL = lambda event_id, suppler_id: reverse('events:event-supplier_router-detail',
                                                           kwargs={'event_pk': event_id, 'pk': suppler_id})
UPDATE_EVENT_OWNER_URL = lambda event_id, event_owner_id: reverse('events:event-event_owner_router-detail',
                                                           kwargs={'event_pk': event_id, 'pk': event_owner_id})
LOGIN_URL = reverse('user:login')
USER_JSON = {
    'email': 'test1@gmail.com',
    'name': 'test1',
    'password': 'password123',
    'phone': '0521234567',
    'address': {
        "country": "country",
        "city": "city",
        "street": "street",
        'number': 1
    }
}

EVENT_JSON = {
    'type': 'type',
    'event_name': 'event1',
    'date': '2011-11-11',
    'budget': 1,
    'location': 'location',
    'event_owners': [{
        "name": "name1",
        "phone": "0521234567"
    }]
}

SUPPLIER_JSON = {
    'name': 'reut',
    'phone': '0546343178',
    'job': 'flowers',
    'price': 10000,
    'has_paid': False,
}

EVENT_OWNER_JSON = {
    'name': 'reut',
    'phone': '0546343178',
}

def create_user(**params):
    """Helper function to create new user"""
    return get_user_model().objects.create_user(**params)


def create_event(event_manager, **params):
    """Helper function to create new user"""
    if 'event_owners' in params:
        event_owners = params.pop('event_owners')
    return Event.objects.create(**params, event_manager=event_manager)


def create_supplier(event, **params):
    return DummySupplier.objects.create(**params, event_id=event.id)

def create_event_owner(event, **params):
    return DummyEventOwner.objects.create(**params, event_id=event.id)

class PublicEventApiTests(APITestCase):

    def setUp(self):
        self.user = create_user(**USER_JSON)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.event_manager = EventManager.objects.create(pk=self.user.id)

    def test_new_event(self):
        """Test creating using with a valid payload is successful"""
        payload = EVENT_JSON.copy()
        res = self.client.post(CREATE_EVENT_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        event_exists = Event.objects.filter(
            event_name=payload['event_name']
        ).exists()
        self.assertTrue(event_exists)

    def test_add_event_not_event_manager_fail(self):
        """Test creating using with a valid payload is successful"""
        user_json = USER_JSON.copy()
        user_json['email'] = 'test2@gmail.com'
        user = create_user(**user_json)
        self.client.force_authenticate(user=user)
        payload = EVENT_JSON.copy()
        res = self.client.post(CREATE_EVENT_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    # def test_event_exists(self):
    #     """Test creating a user that already exists fails"""
    #     payload = EVENT_JSON.copy()
    #     create_event(event_manager=self.event_manager, **payload)
    #     res = self.client.post(CREATE_EVENT_URL, payload, format='json')
    #
    #     self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)


class PrivateEventApiTests(APITestCase):
    """Test API requests that require authentication"""

    def setUp(self):
        self.user = create_user(**USER_JSON)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.event_manager = EventManager.objects.create(pk=self.user.id)
        self.event = create_event(self.event_manager, **EVENT_JSON)

    def test_retrieve_event_success(self):
        """Test retrieving event for logged in user"""
        res = self.client.get(UPDATE_EVENT_URL(self.event.id))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['event_name'], self.event.event_name)
        self.assertEqual(res.data['type'], self.event.type)

    def test_retrieve_event_fail(self):
        """Test fail retrieving event for not logged in user"""
        self.client.force_authenticate(user=None)
        res = self.client.get(UPDATE_EVENT_URL(self.event.id))

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_me_not_allowed(self):
        """Test that POST is not allowed on the me URL"""
        res = self.client.post(UPDATE_EVENT_URL(self.event.id), {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_event(self):
        """Test updating the event for authenticated user"""
        payload = {'event_name': 'new name'}

        res = self.client.patch(UPDATE_EVENT_URL(self.event.id), payload)

        self.event.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.event.event_name, payload['event_name'])

    def test_delete_event(self):
        """Test deleting the event for authenticated user"""
        res = self.client.delete(UPDATE_EVENT_URL(self.event.id))
        event_exists = Event.objects.filter(id=self.event.id).exists()

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(event_exists)


class SupplierApiTests(APITestCase):
    """Test API requests that require authentication"""

    def setUp(self):
        self.user = create_user(**USER_JSON)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.event_manager = EventManager.objects.create(pk=self.user.id)
        self.event = create_event(self.event_manager, **EVENT_JSON)
        self.supplier = create_supplier(self.event, **SUPPLIER_JSON)

    def test_add_supplier_success(self):
        """Test retrieving event for logged in user"""
        res = self.client.get(UPDATE_SUPPLIER_URL(self.event.id, self.supplier.id))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['name'], self.supplier.name)
        self.assertEqual(res.data['job'], self.supplier.job)

    def test_retrieve_supplier_fail(self):
        """Test fail retrieving event for not logged in user"""
        self.client.force_authenticate(user=None)
        res = self.client.get(UPDATE_SUPPLIER_URL(self.event.id, self.supplier.id))

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_supplier(self):
        """Test updating the event for authenticated user"""
        payload = {'name': 'new name'}
        res = self.client.patch(UPDATE_SUPPLIER_URL(self.event.id, self.supplier.id), payload)
        self.event.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual('new name', payload['name'])

    def test_delete_supplier(self):
        """Test deleting the event for authenticated user"""
        res = self.client.delete(UPDATE_SUPPLIER_URL(self.event.id, self.supplier.id))
        supplier_exists = DummySupplier.objects.filter(id=self.supplier.id).exists()
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(supplier_exists)

class EventOwnerApiTests(APITestCase):
    """Test API requests that require authentication"""

    def setUp(self):
        self.user = create_user(**USER_JSON)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.event_manager = EventManager.objects.create(pk=self.user.id)
        self.event = create_event(self.event_manager, **EVENT_JSON)
        self.event_owner = create_event_owner(self.event, **EVENT_OWNER_JSON)

    def test_add_event_owner_success(self):
        """Test retrieving event for logged in user"""
        res = self.client.get(UPDATE_EVENT_OWNER_URL(self.event.id, self.event_owner.id))
        print(res.content)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['name'], self.event_owner.name)
        self.assertEqual(res.data['phone'], self.event_owner.phone)

    def test_retrieve_event_owner_fail(self):
        """Test fail retrieving event for not logged in user"""
        self.client.force_authenticate(user=None)
        res = self.client.get(UPDATE_EVENT_OWNER_URL(self.event.id, self.event_owner.id))

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_event_owner(self):
        """Test updating the event for authenticated user"""
        payload = {'name': 'new name'}
        res = self.client.patch(UPDATE_EVENT_OWNER_URL(self.event.id, self.event_owner.id), payload)
        self.event.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual('new name', payload['name'])

    def test_delete_event_owner(self):
        """Test deleting the event for authenticated user"""
        res = self.client.delete(UPDATE_EVENT_OWNER_URL(self.event.id, self.event_owner.id))
        supplier_exists = DummyEventOwner.objects.filter(id=self.event_owner.id).exists()
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(supplier_exists)

