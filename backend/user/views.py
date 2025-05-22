from django.shortcuts import render

from rest_framework import generics, permissions, status, views
from rest_framework.response import Response

from .models import UnderSendUser
from .serializers import UnderSendUserSerializer


class UnderSendUserDetailView(generics.RetrieveAPIView):
    queryset = UnderSendUser.objects.all()
    serializer_class = UnderSendUserSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'username'
    

class UnderSendUserUpdateView(generics.UpdateAPIView):
    queryset = UnderSendUser.objects.all()
    serializer_class = UnderSendUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class FollowView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, username):
        try:
            target_user = UnderSendUser.objects.filter(username=username).first()
            if target_user != request.user:
                request.user.following.add(target_user)
                return Response({'detail': f'Followed {username}'})
            return Response({'detail': 'Cannot follow yourself'}, status=status.HTTP_400_BAD_REQUEST)
        except UnderSendUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


class UnfollowView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, username):
        try:
            target_user = UnderSendUser.objects.filter(username=username).first()
            if target_user != request.user:
                request.user.following.remove(target_user)
                return Response({'detail': f'Unfollowed {username}'})
            return Response({'detail': 'Cannot unfollow yourself'}, status=status.HTTP_400_BAD_REQUEST)    
        except UnderSendUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=404)


class FollowersView(generics.ListAPIView):
    serializer_class = UnderSendUserSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        user = UnderSendUser.objects.filter(username=self.kwargs['username']).first()
        return user.objects.all()

class FollowingView(generics.ListAPIView):
    serializer_class = UnderSendUserSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        user = UnderSendUser.objects.filter(username=self.kwargs['username']).first()
        return user.following.all()

class IsOnlineView(views.APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request, username):
        try:
            user = UnderSendUser.objects.filter(username=username).last()
            if not user.hide_active():
                return Response({'is_online': user.is_online()})
            return Response({'is_online': False})
        except UnderSendUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    