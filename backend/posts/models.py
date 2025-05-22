from django.db import models
from user.models import UnderSendUser

class Post(models.Model):
    '''
    Модель постов в undersend
    '''
    user = models.ForeignKey(to=UnderSendUser, on_delete=models.CASCADE, related_name='posts')
    image = models.ImageField(upload_to='posts/')
    caption = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(to=UnderSendUser, related_name='liked_posts', blank=True)
    
    
    def like(self, user):
        '''
        Метод добавления лайка
        '''
        if user.is_authenticated and user not in self.likrs.all():
            self.likes.add(user)
    
    def unlike(self, user):
        '''
        Метод удаления лайка
        '''
        if user.is_authenticated and user in self.likes.all():
            self.likes.remove(user)
    
    @property
    def likes_count(self):
        '''
        Счетчик лайков у поста
        '''
        return self.likes.count()
    

class Comment(models.Model):
    '''
    Модель комментария к посту
    '''
    user = models.ForeignKey(to=UnderSendUser, on_delete=models.CASCADE, related_name='comments')
    comment = models.CharField(max_length=512)
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name='comments')
    created_at = models.DateTimeField(auto_now_add=True)