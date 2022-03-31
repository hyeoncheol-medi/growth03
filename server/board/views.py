from rest_framework import serializers
from board.models import Article
from rest_framework import viewsets
import datetime

def td_format(td_object):
    seconds = int(td_object.total_seconds())
    
    if (seconds == 0):
        return 'now'
    periods = [
        ('year',        60*60*24*365),
        ('month',       60*60*24*30),
        ('day',         60*60*24),
        ('hour',        60*60),
        ('minute',      60),
        ('second',      1)
    ]

    strings=[]
    for period_name, period_seconds in periods:
        if seconds > period_seconds:
            period_value , seconds = divmod(seconds, period_seconds)
            has_s = 's' if period_value > 1 else ''
            strings.append("%s %s%s" % (period_value, period_name, has_s))

    return " ".join(strings) + ' ago'

class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    created_before = serializers.SerializerMethodField()
    class Meta:
        model = Article
        fields = ['content', 'created_before']
        
    def get_created_before(self, obj):
        return td_format(datetime.datetime.now(datetime.timezone.utc) - obj.created)
                
class AritlceViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-created')
    serializer_class = ArticleSerializer