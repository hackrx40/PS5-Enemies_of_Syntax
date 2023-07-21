import 'dart:convert';

import 'package:get_storage/get_storage.dart';
// import 'package:hack_niche/firebase_controller.dart';
import 'package:http/http.dart' as http;

class AuthController {
  // FirebaseController _firebaseController = FirebaseController();
  Future<String> login(
    String username,
    String password,
  ) async {
    Uri uri = Uri.parse('https://hackrx4prod-r677breg7a-uc.a.run.app//api/accounts/login/');
    final res = await http.post(uri,
        body: jsonEncode({
          "username": username.toString(),
          "password": password.toString(),
        }),
        headers: {'Content-Type': 'application/json'});
    final body = res.body;
    if (res.statusCode != 200) {
      print('incorrect');
      return "incorrect_user_details";
    }

    print(res.body);
    final response = jsonDecode(body);
    init(response);
    return "Success";
  }

  Future<String> signup(
    String email,
    String username,
    String password,
    String firstname,
    String lastName,
    String dob,
    String gender,
    String phoneNumber,
  ) async {
    print(phoneNumber);
    Uri uri = Uri.parse('https://hackrx4prod-r677breg7a-uc.a.run.app/api/accounts/signup/');
    final res = await http.post(uri,
        body: jsonEncode({
          "email": email.toString(),
          "username": username.toString(),
          "password": password.toString(),
          "firstname": firstname.toString(),
          "lastname": lastName.toString(),
          "dateofbirth": dob.toString(),
          "gender": gender.toString(),
          "phonenumber": "+91" + phoneNumber.toString()
        }),
        headers: {'Content-Type': 'application/json'});
    final body = res.body;
    print(res.body);

    if (res.statusCode != 201) {
      print('incorrect');
      return "incorrect_user_details";
    }

    print(res.body);
    final response = jsonDecode(body);
    initSignup(response);
    return "Success";
  }

  void initSignup(res) async {
    try {
      print(res['token']);
      final box = GetStorage();
      box.write('token', res['token']);
      box.write('id', res['user_id']);
    } catch (e) {
      print(e);
    }

    // String? fcmToken = await _firebaseController.fcmToken;
    // if (fcmToken == null) return;

    // _firebaseController.subscribeToTopic("users");
  }

  void init(res) async {
    try {
      final box = GetStorage();
      box.write('token', res['token']);
      // box.write('id', res['user_id']);
    } catch (e) {
      print(e);
    }

    // String? fcmToken = await _firebaseController.fcmToken;
    // if (fcmToken == null) return;

    // _firebaseController.subscribeToTopic("users");
  }
}
