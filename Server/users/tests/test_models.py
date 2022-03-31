from django.test import TestCase
from django.contrib.auth import get_user_model


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email is successful"""
        email = 'test1@gmail.com'
        name = 'test1'
        password = 'password123'
        phone = "0521234567"
        user = get_user_model().objects.create_user(
            email=email,
            name=name,
            password=password,
            phone=phone
        )

        self.assertEqual(user.email, email)
        self.assertEqual(user.name, name)
        self.assertTrue(user.check_password(password))
        self.assertEqual(user.phone, phone)
