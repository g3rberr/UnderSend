from rest_framework import serializers
from .models import Post, Comment
from user.serializers import UnderSendUserSerializer


class PostSerializer(serializers.ModelSerializer):
    '''
    Сериализатор Поста
    '''
    user = UnderSendUserSerializer(read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id', 'user', 'image', 'caption',
            'likes_count'
        ]


class CommentSerializer(serializers.ModelSerializer):
    user = UnderSendUserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'comment',
            'created_at', 'post',
        ]