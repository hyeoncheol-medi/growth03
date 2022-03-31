from django.db import models

class Article(models.Model):
    content = models.TextField()
    created = models.DateTimeField(auto_now=True)