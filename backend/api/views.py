from inspect import getinnerframes
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import BoardGamesModel, PlayersModel, RankingsModel
from .serializersRanking import SerializerRanking
from .serializersPlayers import serializersPlayers
from .serializersBoardGames import serializersBoardGames


# Create your views here.


@api_view(['GET'])
def getRankings(request):
    results = RankingsModel.objects.all()
    serializer = SerializerRanking(results, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRanking(request, pk):
    result = RankingsModel.objects.get(id=pk)
    serializer = SerializerRanking(result, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getPlayers(request):
    players = PlayersModel.objects.all()
    serializer = serializersPlayers(players, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPlayer(request, pk):
    player = PlayersModel.objects.get(id=pk)
    serializer = serializersPlayers(player, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getBoardGames(request):
    games = BoardGamesModel.objects.all()
    serializer = serializersBoardGames(games, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getBoardGame(request, pk):
    game = BoardGamesModel.objects.get(id=pk)
    serializer = serializersBoardGames(game, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def createRankings(request):
    data = request.data
    result = RankingsModel.objects.create(
        game=data['game'],
        game_session=data['game_session'],
        number_of_players=data['number_of_players'],
        place=data['place'],
        player=data['player'],
        points=data['points']
    )
    serializer = SerializerRanking(result, many=False)
    return Response(serializer.data)


@ api_view(['POST'])
def createPlayer(request):
    data = request.data
    player = PlayersModel.objects.create(
        name=data
    )
    serializer = serializersPlayers(player, many=False)
    return Response(serializer.data)


@ api_view(['POST'])
def createGame(request):
    data = request.data
    games = BoardGamesModel.objects.create(
        name=data,

    )
    serializer = serializersBoardGames(games, many=False)
    return Response(serializer.data)
