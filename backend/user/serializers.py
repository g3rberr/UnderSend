from rest_framework import serializers

from .models import UnderSendUser


class UnderSendUserSerializer(serializers.ModelSerializer):
    '''
    Сериализатор пользователя
    '''
    followers_count = serializers.IntegerField(source='followers.count', read_only=True)
    following_count = serializers.IntegerField(source='following.count', read_only=True)
    
    class Meta:
        model = UnderSendUser
        fields = [
            'id', 'username', 'profile_image', 'bio',
            'website', 'followers_count', 'following_count'
        ]

