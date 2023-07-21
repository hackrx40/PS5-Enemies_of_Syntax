import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:financeguru/data/model/credit_card_model.dart';
import 'package:financeguru/data/model/pocket_model.dart';
import 'package:financeguru/data/model/saving_target_model.dart';
import 'package:financeguru/data/model/transaction_model.dart';
import 'package:http/http.dart' as http;

class Repository {
  Future<List<SavingTargetModel>> getSavingTarget() async {
    final jsonString =
        await rootBundle.loadString('assets/json/saving_target_dummy.json');
    final jsonData = jsonDecode(jsonString);
    final List<SavingTargetModel> savingTargets = [];

    for (var item in jsonData) {
      final savingTarget = SavingTargetModel.fromJson(item);
      savingTargets.add(savingTarget);
    }

    return savingTargets;
  }

  Future<List<TransactionModel>> getTransaction() async {
    // final jsonString = await rootBundle.loadString('assets/json/transaction_dummy.json');
    String token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwMjAwNjU3LCJpYXQiOjE2ODk5NDE0NTcsImp0aSI6IjM4OTgzY2RiN2E4NjQ2ZDBhODI0NWYxODllNjEzMmM1IiwidXNlcl9pZCI6MX0.Y8xupTUlhL6X506p5uM0-pVeHDZdCmlhXETfqqa44ag";

    final res = await http.get(
        Uri.parse(
            'https://hackrx4prod-r677breg7a-uc.a.run.app/api/bank/transaction/'),
        headers: {"Authorization": "Bearer $token"});
    final jsonData = jsonDecode(res.body);
    final List<TransactionModel> transactions = [];

    for (var item in jsonData) {
      final transaction = TransactionModel.fromJson(item);
      transactions.add(transaction);
    }

    return transactions;
  }

  Future<List<CreditCardModel>> getCreditCard() async {
    final jsonString =
        await rootBundle.loadString('assets/json/credit_card_dummy.json');
    final jsonData = jsonDecode(jsonString);
    final List<CreditCardModel> creditCards = [];

    for (var item in jsonData) {
      final creditCard = CreditCardModel.fromJson(item);
      creditCards.add(creditCard);
    }

    return creditCards;
  }

  Future<List<PocketModel>> getPocket() async {
    final jsonString =
        await rootBundle.loadString('assets/json/pocket_dummy.json');
    final jsonData = jsonDecode(jsonString);
    final List<PocketModel> pockets = [];

    for (var item in jsonData) {
      final pocket = PocketModel.fromJson(item);
      pockets.add(pocket);
    }

    return pockets;
  }
}