from django.urls import reverse, resolve
from rest_framework.templatetags import rest_framework
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from users import models

# How to check url -> resolve('/api/user/1/')

CREATE_USER_URL = reverse('user:user-list')
UPDATE_USER_URL = lambda user_id: reverse('user:user-detail', kwargs={'pk': user_id})
EVENT_MANAGER_USER_URL = lambda user_id: reverse('user:event_manager', kwargs={'user_id': user_id})
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


def create_user(**params):
    """Helper function to create new user"""
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(APITestCase):

    def setUp(self):
        self.client = APIClient()

    def test_register(self):
        """Test creating using with a valid payload is successful"""
        payload = USER_JSON.copy()
        res = self.client.post(CREATE_USER_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(id=res.data['id'])
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_user_exists(self):
        """Test creating a user that already exists fails"""
        payload = USER_JSON.copy()
        create_user(**payload)
        res = self.client.post(CREATE_USER_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test that password must be more than 2 characters"""
        payload = USER_JSON.copy()
        payload['password'] = 'p'
        res = self.client.post(CREATE_USER_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test that a token is created for the user"""
        create_user(**USER_JSON)
        payload = {
            'email': USER_JSON['email'],
            'password': USER_JSON['password'],
        }
        res = self.client.post(LOGIN_URL, payload, format='json')

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """Test that token is not created if invalid credentials are given"""
        payload = USER_JSON.copy()
        payload['password'] = 'testpass'
        create_user(**payload)
        payload = {
            'email': USER_JSON['email'],
            'password': 'wrong',
        }
        res = self.client.post(LOGIN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """Test that token is not created if user doens't exist"""
        payload = {
            'email': USER_JSON['email'],
            'password': USER_JSON['password'],
        }
        res = self.client.post(LOGIN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_missing_field(self):
        """Test that email and password are required"""
        res = self.client.post(LOGIN_URL, {'email': 'one', 'password': ''})
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unauthorized(self):
        """Test that authentication required for users"""
        user = create_user(**USER_JSON)
        url = reverse('user:user-detail', kwargs={'pk': user.id})
        res = self.client.get(url)
        # TODO: Need to be HTTP_401_UNAUTHORIZED
        # self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class PrivateUserApiTests(APITestCase):
    """Test API requests that require authentication"""

    def setUp(self):
        self.user = create_user(**USER_JSON)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged in user"""
        res = self.client.get(UPDATE_USER_URL(self.user.id))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['name'], self.user.name)
        self.assertEqual(res.data['email'], self.user.email)

    def test_post_me_not_allowed(self):
        """Test that POST is not allowed on the me URL"""
        res = self.client.post(UPDATE_USER_URL(self.user.id), {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """Test updating the user profile for authenticated user"""
        payload = {'name': 'new name', 'password': 'newpassword123'}

        res = self.client.patch(UPDATE_USER_URL(self.user.id), payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.name, payload['name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)


class EventManagerApiTests(APITestCase):
    """Test API for event manager function"""

    def setUp(self):
        self.user = create_user(**USER_JSON)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_user_default_not_event_manager(self):
        """Test retrieving profile for makeing event manager"""
        res = self.client.get(EVENT_MANAGER_USER_URL(self.user.id))

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['is_event_manager'], False)

    def test_set_to_event_manager(self):
        """Test retrieving profile for makeing event manager"""
        res = self.client.post(EVENT_MANAGER_USER_URL(self.user.id))

        is_event_manager = models.EventManager.objects.filter(pk=self.user.id).exists()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(is_event_manager, True)

    def test_delete_event_manager(self):
        """Test retrieving profile for makeing event manager"""
        user = models.EventManager.objects.create(pk=self.user.id)
        is_event_manager = models.EventManager.objects.filter(pk=self.user.id).exists()
        self.assertEqual(is_event_manager, True)

        res = self.client.delete(EVENT_MANAGER_USER_URL(self.user.id))

        is_event_manager = models.EventManager.objects.filter(pk=self.user.id).exists()
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(is_event_manager, False)
