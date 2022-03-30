from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager


# -------------------User-------------------

class UserObjectsManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, email, name, password=None, phone="", **kwargs):
        """Create a new user profile"""
        print("----------------------------")
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, phone=phone)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password, phone="", **kwargs):
        """Create and save a new superuser with given details"""
        user = self.create_user(email, name, password, phone)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255, default="")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserObjectsManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        """Retrieve full name of user"""
        return self.name

    def get_short_name(self):
        """Retrieve short name of user"""
        return self.name

    def __str__(self):
        "Return string representation of our user"
        return self.email


# -------------------EventManager-------------------

class EventManager(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                primary_key=True,
                                default= None)


# TODO: Not in use yet
# -------------------EventOwner-------------------

class EventOwner(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                primary_key=True,
                                default= None)

# TODO: Not in use yet
# -------------------Supplier-------------------


class Supplier(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                primary_key=True,
                                default= None)

    supplier_type = models.CharField(max_length=255)
