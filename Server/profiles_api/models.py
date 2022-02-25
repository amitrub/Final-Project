from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.conf import settings


# -------------------Address-------------------

class Address(models.Model):
    """"""

    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    number = models.PositiveIntegerField()

    def __str__(self):
        """Return the model as a string"""
        return self.description


# -------------------User-------------------

class UserProfileManager(BaseUserManager):
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


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255, default="")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

    objects = UserProfileManager()

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

class UserProfileEventManager(UserProfile):
    class Meta:
        proxy = False

    objects = UserProfileManager()


# -------------------EventOwner-------------------

class UserProfileEventOwner(UserProfile):
    class Meta:
        proxy = False

    objects = UserProfileManager()


# -------------------Supplier-------------------

class UserProfileSupplierManager(UserProfileManager):
    """Manager for user profiles"""

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


class UserProfileSupplier(UserProfile):
    class Meta:
        proxy = False

    supplier_type = models.CharField(max_length=255)
    objects = UserProfileSupplierManager()


# -------------------SupplierProduct-------------------

class SupplierProduct(models.Model):
    class Meta:
        proxy = False

    supplier = models.ForeignKey(UserProfileSupplier, on_delete=models.CASCADE)
    product = models.CharField(max_length=255, unique=True)

    def __str__(self):
        """Return the model as a string"""
        return self.product


# -------------------Event-------------------

class Event(models.Model):
    """Profile status update"""
    event_manager = models.ForeignKey(
        'profiles_api.UserProfileEventManager',
        on_delete=models.CASCADE
    )
    type = models.CharField(max_length=255)
    date = models.DateField(null=False)
    budget = models.PositiveIntegerField(null=False)

    def __str__(self):
        """Return the model as a string"""
        return self.type


# -------------------EventSchedule-------------------

class EventSchedule(models.Model):
    """"""
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE
    )
    address = models.ForeignKey(
        Address,
        on_delete=models.CASCADE
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.CharField(max_length=255)

    def __str__(self):
        """Return the model as a string"""
        return self.description


# -------------------EventOwner-------------------

class EventOwner(models.Model):
    """"""
    event_owner = models.OneToOneField(UserProfileEventOwner, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, primary_key=True)


# -------------------EventSupplier-------------------

class EventSupplier(models.Model):
    """"""
    event_supplier = models.OneToOneField(UserProfileSupplier, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, primary_key=True)


# -------------------Payment-------------------

class Payment(models.Model):
    """"""
    from_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='from_user')
    to_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='to_user')
    date = models.DateField(null=False)
    amount = models.PositiveIntegerField(null=False)
