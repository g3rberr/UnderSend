from django.urls import path

from .views import (
    UnderSendUserDetailView, UnderSendUserUpdateView, FollowView, UnfollowView,
    FollowersView, FollowingView, IsOnlineView
)
app_name = 'users'



urlpatterns = [
    path('<str:username>/', UnderSendUserDetailView.as_view(), name='user-detail'),
    path('me/update/', UnderSendUserUpdateView.as_view(), name='user-update'),
    path('<str:username>/follow/', FollowView.as_view(), name='follow'),
    path('<str:username>/unfollow/', UnfollowView.as_view(), name='unfollow'),
    path('<str:username>/followers/', FollowersView.as_view(), name='followers'),
    path('<str:username>/following/', FollowingView.as_view(), name='following'),
    path('<str:username>/is_online/', IsOnlineView.as_view(), name='is-online'),
]