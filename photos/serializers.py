from django.conf import settings
from rest_framework import serializers
from .models import Feed, Comment



class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    profile_img=serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ('id', 'username', 'comment', 'date_created', 'profile_img')
        
    def get_username(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    def get_profile_img(self, obj):
        return f'http://localhost:8000{settings.MEDIA_URL}{obj.user.img}'
    
    

class FeedSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    num_of_like = serializers.CharField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    profile_img=serializers.SerializerMethodField()
    

    class Meta:
        model = Feed
        fields = ('id', 'username', 'img', 'profile_img', 'num_of_like', "date_created", 'caption', 'comments')
        
    def get_username(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    
    def get_profile_img(self, obj):
        return f'http://localhost:8000{settings.MEDIA_URL}{obj.user.img}'


