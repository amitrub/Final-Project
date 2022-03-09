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
