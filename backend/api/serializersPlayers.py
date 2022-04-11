from rest_framework.serializers import ModelSerializer
from .models import PlayersModel


class serializersPlayers(ModelSerializer):
    class Meta:
        model = PlayersModel
        fields = '__all__'
