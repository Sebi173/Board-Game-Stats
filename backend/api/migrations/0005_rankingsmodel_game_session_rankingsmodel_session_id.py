# Generated by Django 4.0.3 on 2022-04-02 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_boardgamesmodel_playersmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='rankingsmodel',
            name='game_session',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='rankingsmodel',
            name='session_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
