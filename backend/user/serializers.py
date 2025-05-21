from rest_framework import serializers

from .models import UndersendUser


class UndersendUserSerializer(serializers.ModelSerializer):
    '''
    Сериализатор пользователя
    '''
    followers_count = serializers.IntegerField(source='followers.count', read_only=True)
    following_count = serializers.IntegerField(source='following.count', read_only=True)
    
    class Meta:
        model = UndersendUser
        fields = [
            'id', 'username', 'profile_image', 'bio',
            'website', 'followers_count', 'following_count'
        ]

