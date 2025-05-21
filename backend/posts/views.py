from rest_framework import generics, permissions

from django.shortcuts import render

from .models import Post, Comment
from .serializer import PostSerializer, CommentSerializer


class PostListCreateView(generics.ListCreateAPIView):
    '''
    Логика просмотра списка и создания постов
    '''
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentListCreateView(generics.ListCreateAPIView):
    '''
    Логика просмотра списка и создания комментариев на посте 
    '''
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]    
    
    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(
            post_id=post_id
        ).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user, 
            post_id=self.kwargs['post_id']
        )
