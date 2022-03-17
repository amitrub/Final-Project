import json

from django.test import TestCase

# Create your tests here.
from django.test import TestCase, Client

# Create your tests here.
from django.urls import reverse
from rest_framework.templatetags import rest_framework

from addresses.serializers import AddressSerializer
from products.models import Product
from suppliers.models import Supplier
from users import views
from users.models import User
from addresses.models import Address
from rest_framework.test import APITestCase, APIClient


class SupplierTest(APITestCase):

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

    def test_supplier_no_login(self):
        url = reverse('suppliers:supplier-list')
        response = self.client.post(url,
                                    {'name': 'reut',
                                     "price":"10000",
                                     "advance_pay": "342340",
                                     "pay_method": "bit"}, format='json')
        print(response.status_code)
        assert response.status_code == 401

    def test_supplier_success(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('suppliers:supplier-list')
        response = self.client.post(url,
                                    {'name': 'reut',
                                     "price":"10000",
                                     "advance_pay": "342340",
                                     "pay_method": "bit"}, format='json')
        self.assertTrue(Supplier.objects.get(name='reut',price="10000"))
        assert response.status_code == 201

    def test_supplier_no_name(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        url = reverse('suppliers:supplier-list')
        response = self.client.post(url,
                                    {'name': '',
                                     "price":"10000",
                                     "advance_pay": "342340",
                                     "pay_method": "bit"}, format='json')
        assert response.status_code == 400

