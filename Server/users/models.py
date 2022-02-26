from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager


# -------------------User-------------------

class UserObjectsManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, email, name, password=None, phone=""):
        """Create a new user profile"""
        print("----------------------------")
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, phone=phone)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password, phone=""):
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

class EventManager(User):
    class Meta:
        proxy = False

    objects = UserObjectsManager()


# -------------------EventOwner-------------------

class EventOwner(User):
    class Meta:
        proxy = False

    objects = UserObjectsManager()


# -------------------Supplier-------------------

class SupplierObjectsManager(UserObjectsManager):
    """Manager for supplier profiles"""

    def create_user(self, email, name, password=None, phone="", supplier_type=""):
        """Create a new user profile"""
        user = super().create_user(email, name, password, phone)
        user.supplier_type = supplier_type
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password, phone="", supplier_type=""):
        """Create and save a new superuser with given details"""
        user = super().create_superuser(email, name, password, phone)
        user.supplier_type = supplier_type
        user.save(using=self._db)

        return user


class Supplier(User):
    class Meta:
        proxy = False

    supplier_type = models.CharField(max_length=255)
    objects = SupplierObjectsManager()
