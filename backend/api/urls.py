from django.urls import path
from . import views

urlpatterns = [
    path('rankings/', views.getRankings, name='rankings'),
    path('rankings/<str:pk>/', views.getRanking, name='ranking'),
    path('rankings/create', views.createRankings, name='create-ranking'),
    path('players/', views.getPlayers, name='players'),
    path('players/<str:pk>/', views.getPlayer, name='player'),
    path('players/create', views.createPlayer, name='create-player'),
    path('games/', views.getBoardGames, name='games'),
    path('games/<str:pk>/', views.getBoardGame, name='games'),
    path('games/create', views.createGame, name='create-game'),
]
