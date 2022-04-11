from rest_framework.serializers import ModelSerializer
from .models import RankingsModel


class SerializerRanking(ModelSerializer):
    class Meta:
        model = RankingsModel
        fields = '__all__'
