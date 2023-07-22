import 'dart:convert';
import 'dart:io';

import 'package:financeguru/common/gap.dart';
import 'package:financeguru/presentation/pages/home_page.dart';
import 'package:financeguru/presentation/widgets/navbar_widget.dart';
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:financeguru/presentation/pages/signin_page.dart';
import 'package:financeguru/style/color.dart';
import 'package:financeguru/style/typography.dart';
import 'package:lottie/lottie.dart';
import 'package:http/http.dart' as http;
import 'package:file_picker/file_picker.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http_parser/http_parser.dart';

// import 'package:lottie/lottie.dart';
// import 'packag';

class IntroductionPage extends StatefulWidget {
  const IntroductionPage({super.key});
  static const routeName = '/introduction';

  @override
  State<IntroductionPage> createState() => _IntroductionPageState();
}

class _IntroductionPageState extends State<IntroductionPage> {
  TextEditingController _govIdController = TextEditingController();
  //  TextEditingController _govIdController = TextEditingController();
  TextEditingController _branchController = TextEditingController();
  TextEditingController _facilityController = TextEditingController();
  TextEditingController _currencyController = TextEditingController();
  TextEditingController _exchangeRateController = TextEditingController();
  TextEditingController _balanceController = TextEditingController();
  TextEditingController _ifscController = TextEditingController();
  TextEditingController _odLimitController = TextEditingController();
  TextEditingController _openingDateController = TextEditingController();
  TextEditingController _drawingLimitController = TextEditingController();
  TextEditingController _micrController = TextEditingController();
  TextEditingController _maskedAccNoController = TextEditingController();

  String? accountType, status;

  File? pfp, govId;

  Future<void> addData() async {
    try {
      print("hello");
      String url = 'https://backend-r677breg7a-uc.a.run.app/api/accounts/profile/';

      http.MultipartRequest request = http.MultipartRequest('PATCH', Uri.parse(url));

      request.headers
          .addAll({"Authorization": "Bearer ${GetStorage().read('token')}", "Content-Type": "multipart/form-data"});

      // if (myProfileImage != null) {
      request.files.add(await http.MultipartFile.fromPath('gov_id_img', govId!.path));
      // }

      // if (myBioData != null) {
      //   request.files.add(await http.MultipartFile.fromPath('biodata', myBioData!.path));
      // }

      // request.fields['name'] = myMatrinomyData['name'];
      // request.fields['about'] = myMatrinomyData['about'];
      // request.fields['dob'] = myMatrinomyData['dob'];
      // request.fields['phone'] = myMatrinomyData['phone'];
      // request.fields['fathers_name'] = myMatrinomyData['fathers_name'];
      // request.fields['gender'] = myMatrinomyData['gender'];

      // print("A request Update profile : ${request.toString()}");
      // print("A request : ${request.fields.toString()}");
      // print("A request : ${request.files.toString()}");
      // print("A request : ${request.headers.toString()}");

      http.StreamedResponse response = await request.send();

      // print("A response Update profile 2: ${response.statusCode}");
      // print("A response Update profile 2: ${response.headers.toString()}");
      // print("A response Update profile 2: ${response.request.toString()}");
      // print("A response Update profile 2: ${response.reasonPhrase}");

      http.Response response1 = await http.Response.fromStream(response);

      // print("A response Update profile3 : ${response1.body}");
      // print("A response Update profile : ${response1.statusCode}");
      // print("A response Update profile : ${response1.headers.toString()}");
      // print("A response Update profile : ${response1.request.toString()}");
      // print("A response Update profile : ${response1.body}");
      // print("A response Update profile : ${response1.toString()}");

      print(response1.body);

      if (response1.statusCode == 200) {
        print(response1.body);

        final responseData = json.decode(response1.body);
      } else {
        print(response1.statusCode);
        // return false;
      }

      // return true;
    } catch (e) {
      // return false;
    }

    // final response = await http.post(
    //   Uri.parse(url),
    //   headers: {"Authorization": "Token ${GetStorage().read('token')}"},

    //   // temporary name in body
    //   body: jsonEncode({
    //     'name': myMatrinomyData['name'],
    //     'about': myMatrinomyData['about'],
    //     'dob': myMatrinomyData['dob'],
    //     'phone': myMatrinomyData['phone'],
    //     'fathers_name': myMatrinomyData['fathers_name'],
    //     'gender': myMatrinomyData['gender'],
    //   }),

    //   // add myProfileImage as a multipart
    // );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: IntroductionScreen(
            onChange: (value) async {
              if (value == 1) {
                // Uri uri = Uri.parse('https://backend-r677breg7a-uc.a.run.app/api/accounts/profile/');

                // var res = await http.patch(uri, body: {
                //   "gov_id_img": "https://burst.shopifycdn.com/photos/blue-lake-and-rocky-mountains.jpg",
                //   // "profilepicurl": "https://burst.shopifycdn.com/photos/ice-cracks-on-a-frozen-sea.jpg"
                // }, headers: {
                //   "Authorization": "Bearer Token ${GetStorage().read('token')}"
                // });

                // print(res.body);
                // print(res.statusCode);
                // ScaffoldMessenger.of(context).showSnackBar(
                //   SnackBar(
                //     content: Text("Data Added successfully"),
                //   ),
                // );
                addData();
              } else if (value == 2) {
                String token = GetStorage().read('token');
                Uri uri = Uri.parse('https://backend-r677breg7a-uc.a.run.app/api/bank/account/');

                var res = await http.post(uri,
                    body: jsonEncode({
                      "account_type": accountType,
                      "status": status,
                      "branch": _branchController.text,
                      "facility": _facilityController.text,
                      "currency": _currencyController.text,
                      "exchange_rate": _exchangeRateController.text,
                      "balance": _balanceController.text,
                      "ifsc": _ifscController.text,
                      "od_limit": _odLimitController.text,
                      "opening_date": _openingDateController.text,
                      "drawing_limit": _drawingLimitController.text,
                      "micr_code": _micrController.text,
                      "masked_account_no": _maskedAccNoController.text,
                    }),
                    headers: {"Authorization": "Bearer $token"});

                print(res.body);
                print(res.statusCode);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text("Bank Added successfully"),
                  ),
                );
              }
            },
            pages: [
              pageViewOne(),
              pageViewTwo(),
              pageViewThree(),
            ],
            onDone: () {
              Navigator.pushReplacementNamed(context, NavigationBarWidget.routeName);
            },
            onSkip: () {
              Navigator.pushReplacementNamed(context, SigninPage.routeName);
            },
            showSkipButton: true,
            skip: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: secondaryColor,
              ),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
              child: Text(
                'Skip',
                style: poppinsH4.copyWith(color: textColor),
              ),
            ),
            next: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: buttonColor,
              ),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
              child: Text(
                'Next',
                style: poppinsH4.copyWith(color: text2Color),
              ),
            ),
            done: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: buttonColor,
              ),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
              child: Text(
                'Done',
                style: poppinsH4.copyWith(color: text2Color),
              ),
            ),
            dotsDecorator: DotsDecorator(
              size: const Size.square(10.0),
              activeSize: const Size(20.0, 10.0),
              activeColor: buttonColor,
              color: secondaryColor,
              spacing: const EdgeInsets.symmetric(horizontal: 3.0),
              activeShape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(25.0),
              ),
            )),
      ),
    );
  }

  PageViewModel pageViewThree() {
    return PageViewModel(
      // titleWidget: Row(
      //   mainAxisAlignment: MainAxisAlignment.center,
      //   children: [
      // Text(
      //   'Kantong',
      //   style: poppinsH1.copyWith(color: textColor),
      // ),
      //     Text(
      //       'Ku',
      //       style: poppinsH1.copyWith(color: buttonColor),
      //     ),
      //   ],
      // ),
      titleWidget:
          Container(margin: EdgeInsets.only(top: 100), child: Lottie.asset('assets/json/money_animation.json')),
      bodyWidget: Column(
        children: [
          Text(
            'Good to go! ',
            style: poppinsH1.copyWith(color: textColor),
          ),
          SizedBox(
            height: 10,
          ),
          Text(
            'You have been credited 1000 app cash! ',
            style: poppinsH1.copyWith(
              color: textColor,
              fontSize: 15,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
      // image: Stack(
      //   children: [
      //     Container(
      //       decoration: BoxDecoration(
      //         borderRadius: BorderRadius.circular(40),
      //         color: secondaryColor,
      //       ),
      //       padding: const EdgeInsets.all(8),
      //       child: const Icon(
      //         Icons.security_rounded,
      //         size: 120,
      //         color: textColor,
      //       ),
      //     ),
      //     Positioned(
      //       bottom: 0,
      //       right: 0,
      //       child: Container(
      //         decoration: BoxDecoration(
      //           borderRadius: BorderRadius.circular(80),
      //           color: secondaryColor,
      //         ),
      //         padding: const EdgeInsets.all(8),
      //         child: const Icon(
      //           Icons.policy_rounded,
      //           size: 40,
      //           color: buttonColor,
      //         ),
      //       ),
      //     ),
      //   ],
      // ),
    );
  }

  PageViewModel pageViewTwo() {
    return PageViewModel(
      titleWidget: Container(),
      // titleWidget: Row(
      //   mainAxisAlignment: MainAxisAlignment.center,
      //   children: [
      //     Text(
      //       'Kantong',
      //       style: poppinsH1.copyWith(color: textColor),
      //     ),
      //     Text(
      //       'Ku',
      //       style: poppinsH1.copyWith(color: buttonColor),
      //     ),
      //   ],
      // ),
      bodyWidget: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 7),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 30,
                ),
                Text(
                  'Set Your Bank Account',
                  style: poppinsH1.copyWith(color: buttonColor, fontSize: 36),
                ),
                Text(
                  'Join us to continue to Kantongku',
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap20(),
                InkWell(
                  onTap: () async {
                    final ImagePicker picker = ImagePicker();
                    final XFile? image = await picker.pickImage(
                      source: ImageSource.gallery,
                    );

                    final File file = File(image!.path);
                    //TODO : remove hardcoded pfp
                  },
                  child: Container(
                    width: MediaQuery.of(context).size.width,
                    margin: const EdgeInsets.symmetric(horizontal: 1, vertical: 2),
                    padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
                    decoration: BoxDecoration(
                      // color: buttonColor,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: textColor),
                    ),
                    child: Text(
                      "Upload Profile Picture",
                      style: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    ),
                  ),
                ),

                const VerticalGap10(),
                Theme(
                  data: Theme.of(context)
                      .copyWith(canvasColor: Color.fromARGB(255, 94, 88, 88), brightness: Brightness.dark),
                  child: Container(
                    margin: EdgeInsets.symmetric(vertical: 8),
                    child: DropdownButtonFormField<String>(
                      decoration: InputDecoration(
                        labelStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                        labelText: "Account type",
                        suffixIconColor: Colors.white,
                        focusColor: Colors.white,
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide: BorderSide(color: buttonColor),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide: BorderSide(color: textColor),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide: BorderSide(color: textColor),
                        ),
                      ),
                      value: accountType,
                      onChanged: (newValue) {
                        setState(() {
                          accountType = newValue;
                        });
                      },
                      items: ["Savings", "Current"].map<DropdownMenuItem<String>>((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(
                            option,
                            style: poppinsBody1.copyWith(color: Colors.white),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ),
                Theme(
                  data: Theme.of(context)
                      .copyWith(canvasColor: Color.fromARGB(255, 94, 88, 88), brightness: Brightness.dark),
                  child: Container(
                    margin: EdgeInsets.symmetric(vertical: 8),
                    child: DropdownButtonFormField<String>(
                      decoration: InputDecoration(
                        suffixIconColor: Colors.white,
                        focusColor: Colors.white,
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide: BorderSide(color: buttonColor),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide: BorderSide(color: textColor),
                        ),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(16),
                          borderSide: BorderSide(color: textColor),
                        ),
                        labelText: "Status",
                        labelStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                      ),
                      value: status,
                      onChanged: (newValue) {
                        setState(() {
                          status = newValue;
                        });
                      },
                      items: ["Active", "Paused", "Deleted"].map<DropdownMenuItem<String>>((String option) {
                        return DropdownMenuItem<String>(
                          value: option,
                          child: Text(
                            option,
                            style: poppinsBody1.copyWith(color: Colors.white),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _branchController,
                  decoration: InputDecoration(
                    hintText: 'Branch',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _facilityController,
                  decoration: InputDecoration(
                    hintText: 'Facility',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _currencyController,
                  decoration: InputDecoration(
                    hintText: 'Currency',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  keyboardType: TextInputType.number,
                  controller: _exchangeRateController,
                  decoration: InputDecoration(
                    hintText: 'Exchange rate',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _balanceController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'Balance',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _ifscController,
                  decoration: InputDecoration(
                    hintText: 'IFSC code',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _odLimitController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'OD Limit',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),

                const VerticalGap10(),
                TextFormField(
                  controller: _openingDateController,
                  decoration: InputDecoration(
                    hintText: 'Opening Date(YYYY-MM-DD)',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _drawingLimitController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'Drawing Limit',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _micrController,
                  decoration: InputDecoration(
                    hintText: 'MICR code',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                TextFormField(
                  controller: _maskedAccNoController,
                  decoration: InputDecoration(
                    hintText: 'Masked Account Number',
                    hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),

                const VerticalGap10(),
                const VerticalGap20(),
                // InkWell(
                //   child: Container(
                //     width: double.infinity,
                //     padding: const EdgeInsets.symmetric(vertical: 16),
                //     decoration: BoxDecoration(
                //       color: buttonColor,
                //       borderRadius: BorderRadius.circular(16),
                //     ),
                //     child: Center(
                //       child: Text(
                //         'Next',
                //         style: poppinsH4.copyWith(color: text2Color),
                //       ),
                //     ),
                //   ),
                // ),
              ],
            ),
          ),
        ],
      ),
      // image: Stack(
      //   children: [
      //     Container(
      //       decoration: BoxDecoration(
      //         borderRadius: BorderRadius.circular(40),
      //         color: secondaryColor,
      //       ),
      //       padding: const EdgeInsets.all(8),
      //       child: const Icon(
      //         Icons.monetization_on_rounded,
      //         size: 120,
      //         color: textColor,
      //       ),
      //     ),
      //     Positioned(
      //       bottom: 0,
      //       right: 0,
      //       child: Container(
      //         decoration: BoxDecoration(
      //           borderRadius: BorderRadius.circular(80),
      //           color: secondaryColor,
      //         ),
      //         padding: const EdgeInsets.all(8),
      //         child: const Icon(
      //           Icons.cloud_circle_rounded,
      //           size: 40,
      //           color: buttonColor,
      //         ),
      //       ),
      //     ),
      //   ],
      // ),
    );
  }

  PageViewModel pageViewOne() {
    return PageViewModel(
      titleWidget: Container(),
      // titleWidget: Row(
      //   mainAxisAlignment: MainAxisAlignment.center,
      //   children: [
      //     Text(
      //       'Kantong',
      //       style: poppinsH1.copyWith(color: textColor),
      //     ),
      //     Text(
      //       'Ku',
      //       style: poppinsH1.copyWith(color: buttonColor),
      //     ),
      //   ],
      // ),
      bodyWidget: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 30,
                ),
                pfp == null
                    ? Column(
                        children: [
                          Center(
                            child: InkWell(
                              borderRadius: BorderRadius.circular(100),
                              onTap: () async {
                                final ImagePicker picker = ImagePicker();
                                final XFile? image = await picker.pickImage(
                                  source: ImageSource.gallery,
                                );

                                setState(() {
                                  pfp = File(image!.path);
                                });
                                // TODO : remove hardcoded pfp
                              },
                              child: Container(
                                  width: 120,
                                  height: 120,
                                  alignment: Alignment.center,
                                  margin: const EdgeInsets.symmetric(horizontal: 1, vertical: 2),
                                  padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
                                  decoration: BoxDecoration(
                                    // color: buttonColor,
                                    shape: BoxShape.circle,
                                    border: Border.all(color: textColor),
                                  ),
                                  child: Icon(
                                    Icons.add_a_photo,
                                    color: textColor,
                                    size: 40,
                                  )),
                            ),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Text(
                            "Upload Profile Picture",
                            style: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                          ),
                        ],
                      )
                    : Center(
                        child: ClipOval(
                          child: Image.file(
                            pfp!,
                            height: 120,
                            width: 120,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                const SizedBox(
                  height: 30,
                ),
                Text(
                  'Set Your Profile',
                  style: poppinsH1.copyWith(color: buttonColor, fontSize: 36),
                ),
                Text(
                  'Join us to continue to FinanceGuru',
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                // const VerticalGap20(),
                // InkWell(
                //   onTap: () async {
                // final ImagePicker picker = ImagePicker();
                // final XFile? image = await picker.pickImage(
                //   source: ImageSource.gallery,
                // );

                // final File file = File(image!.path);
                //     //TODO : remove hardcoded pfp
                //   },
                //   child: Container(
                //     width: MediaQuery.of(context).size.width,
                //     margin: const EdgeInsets.symmetric(horizontal: 1, vertical: 2),
                //     padding:
                //         const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
                //     decoration: BoxDecoration(
                //       // color: buttonColor,
                //       borderRadius: BorderRadius.circular(16),
                //       border: Border.all(color: textColor),
                //     ),
                //     child: Text(
                //       "Upload Profile Picture",
                //       style:
                //           poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                //     ),
                //   ),
                // ),

                const VerticalGap10(),
                const VerticalGap10(),
                TextFormField(
                  onTap: () async {
                    if (govId != null) return;
                    final ImagePicker picker = ImagePicker();
                    final XFile? image = await picker.pickImage(
                      source: ImageSource.gallery,
                    );

                    final File file = File(image!.path);
                    // FilePickerResult? result = await FilePicker.platform.pickFiles(
                    //   allowedExtensions: ['pdf'],
                    //   type: FileType.custom,
                    // );
                    File? file2;

                    if (file != null) {
                      file2 = File(image.path!);
                    } else {
                      return;
                    }
                    setState(() {
                      govId = file2;
                    });
                    //TODO : remove hardcoded pdf
                  },
                  // controller: _govIdController,
                  readOnly: true,
                  decoration: InputDecoration(
                    hintText: govId == null ? 'Upload Government Id' : govId!.path.split('/').last,
                    hintStyle: govId == null
                        ? poppinsBody1.copyWith(color: textColor.withOpacity(.5))
                        : poppinsBody1.copyWith(color: textColor),
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    enabledBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: textColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                        color: buttonColor,
                      ),
                      borderRadius: BorderRadius.all(
                        Radius.circular(16),
                      ),
                    ),
                  ),
                  style: poppinsBody1.copyWith(color: textColor),
                ),
                const VerticalGap10(),
                // InkWell(
                //   onTap: () async {
                //     if (govId != null) return;
                //     FilePickerResult? result = await FilePicker.platform.pickFiles(
                //       allowedExtensions: ['pdf'],
                //       type: FileType.custom,
                //     );
                //     File? file2;

                //     if (result != null) {
                //       file2 = File(result.files.single.path!);
                //     } else {
                //       return;
                //     }
                //     setState(() {
                //       govId = file2;
                //     });
                //     //TODO : remove hardcoded pdf
                //   },
                //   child: Row(
                //     children: [
                //       Container(
                //         margin: const EdgeInsets.symmetric(horizontal: 1, vertical: 2),
                //         padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
                //         child: govId == null
                //             ? Text(
                //                 "Upload Government ID:",
                //                 style: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                //               )
                //             : Row(
                //                 crossAxisAlignment: CrossAxisAlignment.start,
                //                 children: [
                //                   Text(
                //                     "Government ID: ",
                //                     style: poppinsBody1.copyWith(
                //                       color: textColor.withOpacity(.5),
                //                     ),
                //                   ),
                //                   Container(
                //                     width: MediaQuery.of(context).size.width * .4,
                //                     child: Text(
                //                       govId!.path.split('/').last,
                //                       style: poppinsBody1.copyWith(
                //                         color: textColor,
                //                       ),
                //                       overflow: TextOverflow.visible,
                //                     ),
                //                   ),
                //                 ],
                //               ),
                //       ),
                //       // SizedBox(
                //       //   width: 5,
                //       // ),
                //       if (govId == null)
                //         const Icon(
                //           Icons.attach_file,
                //           color: textColor,
                //         )
                //     ],
                //   ),
                // ),
                const VerticalGap20(),
                // InkWell(
                //   onTap: () async {

                //   },
                //   child: Container(
                //     width: double.infinity,
                //     padding: const EdgeInsets.symmetric(vertical: 16),
                //     decoration: BoxDecoration(
                //       color: buttonColor,
                //       borderRadius: BorderRadius.circular(16),
                //     ),
                //     child: Center(
                //       child: Text(
                //         'Next',
                //         style: poppinsH4.copyWith(color: text2Color),
                //       ),
                //     ),
                //   ),
                // ),
              ],
            ),
          ),
        ],
      ),
      // image: Stack(
      //   children: [
      //     Container(
      //       decoration: BoxDecoration(
      //         borderRadius: BorderRadius.circular(40),
      //         color: secondaryColor,
      //       ),
      //       padding: const EdgeInsets.all(8),
      //       child: const Icon(
      //         Icons.account_balance_wallet_rounded,
      //         size: 120,
      //         color: textColor,
      //       ),
      //     ),
      //     Positioned(
      //       bottom: 0,
      //       right: 0,
      //       child: Container(
      //         decoration: BoxDecoration(
      //           borderRadius: BorderRadius.circular(80),
      //           color: secondaryColor,
      //         ),
      //         padding: const EdgeInsets.all(8),
      //         child: const Icon(
      //           Icons.qr_code_rounded,
      //           size: 40,
      //           color: buttonColor,
      //         ),
      //       ),
      //     ),
      //   ],
      // ),
    );
  }
}
