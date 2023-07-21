from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from datetime import timedelta
# Create your models here.

class Game(models.Model):
    startdate = models.DateField(auto_now_add=True)
    enddate   = models.DateField(blank=True, null=True)
    player    = models.JSONField(null=True, blank=True)

@receiver(post_save, sender=Game)
def enddate_add(sender, instance, **kwargs):
    if instance.enddate is None:
        instance.enddate = instance.startdate + timedelta(days=7)
        instance.save()
    