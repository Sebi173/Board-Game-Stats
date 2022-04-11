from rest_framework.serializers import ModelSerializer
from .models import BoardGamesModel


class serializersBoardGames(ModelSerializer):
    class Meta:
        model = BoardGamesModel
        fields = '__all__'
