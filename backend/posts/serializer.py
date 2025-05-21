from rest_framework import serializers
from .models import Post, Comment
from user.serializers import UndersendUserSerializer


class PostSerializer(serializers.ModelSerializer):
    '''
    Сериализатор Поста
    '''
    user = UndersendUserSerializer(read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    
    class Meta:
        model = Post
        fields = [
            'id', 'user', 'image', 'caption',
            'likes_count'
        ]


class CommentSerializer(serializers.ModelSerializer):
    user = UndersendUserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = [
            'id', 'user', 'comment',
            'created_at', 'post',
        ]