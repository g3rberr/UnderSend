from django.urls import path

from .views import PostListCreateView, CommentListCreateView

app_name = 'posts'


urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('<int:post_id>/comments/', CommentListCreateView.as_view()),
]

