from django.contrib import admin

# Register your models here.

from .models import RankingsModel
from .models import BoardGamesModel
from .models import PlayersModel

admin.site.register(RankingsModel)
admin.site.register(BoardGamesModel)
admin.site.register(PlayersModel)
