from django.contrib import admin

from events import models

admin.site.register(models.Event)
admin.site.register(models.DummyEventOwner)
admin.site.register(models.DummySupplier)
admin.site.register(models.EventSchedule)
