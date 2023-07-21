from django.urls import path

from .views import  GameAPI, AddUserToGameAPI
urlpatterns = [
    path("game/", GameAPI.as_view(), name="game-get"),
    path("addusergame/", AddUserToGameAPI.as_view(), name="game-add-user"),
]