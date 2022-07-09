from django.test import TestCase, Client
from django.contrib.auth import get_user_model

from events.models import Event
from users.models import EventManager

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

def create_user(**params):
    """Helper function to create new user"""
    return get_user_model().objects.create_user(**params)

class ModelTests(TestCase):

    def setUp(self):
        self.user = create_user(**USER_JSON)
        self.client = Client()
        self.client.force_login(self.user)
        self.event_manager = EventManager.objects.create(pk=self.user.id)


    def test_create_event_successful(self):
        """Test creating a new user with an email is successful"""
        type = 'type'
        event_name = 'event1'
        date = '2011-11-11'
        budget = 1
        location = 'location'
        event = Event.objects.create(
            event_manager=self.event_manager,
            type=type,
            event_name=event_name,
            date=date,
            budget=budget,
            location=location
        )

        self.assertEqual(event.type, type)
        self.assertEqual(event.event_name, event_name)
        self.assertEqual(event.budget, budget)
        self.assertEqual(event.location, location)
