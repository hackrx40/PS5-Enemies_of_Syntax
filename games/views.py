from django.shortcuts import render
from rest_framework import (mixins, generics, status, permissions)
from django.http.response import HttpResponse, JsonResponse
from django.contrib.auth import get_user_model

from .models import Game
from .serializers import GameSerializer

from datetime import date
# Create your views here.
User = get_user_model()

class GameAPI(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    serializer_class = GameSerializer
    queryset = Game.objects.all()

    def get(self, request, *args, **kwargs):
        res = []
        user = request.user
        games = Game.objects.all()
        for game in games.iterator():
            players_arr = game.player["players"]
            for i in range(1, len(players_arr)+1):
                user_in_arr = User.objects.get(pk=int(players_arr["user"+str(i)]))
                if(user_in_arr == user):
                    res.append(game)
        data = GameSerializer(res, many=True).data
        return JsonResponse({"data": data})
    
    def post(self, request, *args, **kwargs):
        user_id = request.user.pk
        try:
            game = Game.objects.create(
                player = {
                    "players": {
                        "user1": user_id
                    }
                }
            )
            return JsonResponse({"message": "Game created", "game_id": game.pk})
        except Exception as e:
            return JsonResponse({"error": str(e)})
        
class AddUserToGameAPI(mixins.UpdateModelMixin, generics.GenericAPIView):
    
    serializer_class = GameSerializer
    queryset = Game.objects.all()

    def patch(self, request, *args, **kwargs):
        try:
            user_id = request.user.pk
            game = Game.objects.get(player__players__user1 = user_id, enddate__gt = date.today())
            next_user = request.data.get("friend_username")
            next_user_pk = User.objects.get(username = next_user).pk
            players_len = len(game.player["players"])+1
            game.player["players"]["user"+str(players_len)] = next_user_pk
            game.save()
            return JsonResponse({"message": "New user added to game"})
        except Exception as e:
            return JsonResponse({"error": str(e)})