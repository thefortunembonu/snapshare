from django.db import models
from accounts.models import Account


class Feed(models.Model):
    img = models.ImageField(upload_to='images/',  null=True, blank=True)
    caption = models.CharField()
    user = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    num_of_like = models.IntegerField(blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    
    
    class Meta:
        ordering = ['-date_created']
    
    def image_url(self):
        return f"http://localhost:8000{self.img.url}"
    

    
    def __str__(self):
        return f"Post by  {self.user.first_name }  {self.user.last_name}  on  {self.date_created}"
 
 

class Comment(models.Model):
    feed = models.ForeignKey(Feed,null=True, blank=True, related_name='comments', on_delete=models.CASCADE)  # Link comment to feed
    comment = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    
       
    class Meta:
        ordering = ['-date_created']
        
    def __str__(self):
     return f"Comment by  {self.user.first_name }  {self.user.last_name}"