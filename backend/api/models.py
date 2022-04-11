from django.db import models

# Create your models here.


class RankingsModel(models.Model):
    game = models.CharField(null=True, blank=True, max_length=20)
    game_session = models.IntegerField(null=True, blank=True)
    number_of_players = models.IntegerField(null=True, blank=True)
    place = models.IntegerField(null=True, blank=True)
    played = models.DateTimeField(auto_now=True)
    player = models.CharField(null=True, blank=True, max_length=20)
    points = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.played) + ' ' + self.game + ' ' + self.player


class BoardGamesModel(models.Model):
    name = models.CharField(null=True, blank=True, max_length=20)

    def __str__(self):
        return self.name


class PlayersModel(models.Model):
    name = models.CharField(null=True, blank=True, max_length=20)

    def __str__(self):
        return self.name
