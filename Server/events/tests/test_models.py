from django.test import TestCase, Client
from django.contrib.auth import get_user_model

from events.models import Event, DummyEventOwner, DummySupplier
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


def create_user(**params):
    """Helper function to create new user"""
    return get_user_model().objects.create_user(**params)


class ModelTests(TestCase):

    def create_event(self, event_manager, **params):
        """Helper function to create new user"""
        if 'event_owners' in params:
            event_owners = params.pop('event_owners')
        return Event.objects.create(**params, event_manager=event_manager)

    def setUp(self):
        self.user = create_user(**USER_JSON)
        self.client = Client()
        self.client.force_login(self.user)
        self.event_manager = EventManager.objects.create(pk=self.user.id)
        self.event = self.create_event(self.event_manager, **EVENT_JSON)

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

    def test_create_event_owner_successful(self):
        """Test creating a new user with an email is successful"""
        name = 'reut'
        phone = '0546343178'
        event_owner = DummyEventOwner.objects.create(
            event=self.event,
            name=name,
            phone=phone,
        )

        self.assertEqual(event_owner.name, name)
        self.assertEqual(event_owner.phone, phone)

    def test_add_supplier_successful(self):
        """Test creating a new user with an email is successful"""
        name = 'reut'
        phone = '0546343178'
        job = 'flowers'
        has_paid = False
        price = 10000
        supplier = DummySupplier.objects.create(
            event=self.event,
            name=name,
            phone=phone,
            job=job,
            has_paid=has_paid,
            price=price
        )

        self.assertEqual(supplier.name, name)
        self.assertEqual(supplier.phone, phone)
        self.assertEqual(supplier.job, job)
        self.assertEqual(supplier.has_paid, has_paid)
        self.assertEqual(supplier.price, price)
