from datetime import timedelta

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class UnderSendUser(AbstractUser):
    profile_image = models.ImageField(upload_to='pfps/', default='defaults/default_pfp.png')
    bio = models.TextField(max_length=256, blank=True, null=True)
    website = models.CharField(max_length=64, blank=True, null=True)
    is_privacy = models.BooleanField(default=False)
    hide_active = models.BooleanField(default=False)
    last_active = models.DateTimeField(null=True, blank=True)
    followers = models.ManyToManyField(
        to='self',
        symmetrical=False,
        related_name='following',
        blank=True
    )
    # asd.followers  # те кто на него подписан
    # asd.following # те на кого он подписан
    
    
    def update_last_active(self):
        if not self.hide_active:
            self.last_active = timezone.now()
            self.save(update_fields=['last_active'])

    def is_online(self):
        
        if self.last_active:
            return timezone.now() - self.last_active < timedelta(minutes=2)
        return False
