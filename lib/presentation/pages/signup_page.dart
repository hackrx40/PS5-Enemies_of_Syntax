import 'package:financeguru/auth/auth_controller.dart';
import 'package:financeguru/presentation/pages/introduction_page.dart';
import 'package:financeguru/presentation/widgets/navbar_widget.dart';
import 'package:flutter/material.dart';
import 'package:financeguru/common/gap.dart';
import 'package:financeguru/style/color.dart';
import 'package:financeguru/style/typography.dart';
import 'package:flutter_overlay_loader/flutter_overlay_loader.dart';
import 'package:intl/intl.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});
  static const routeName = '/signup';

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  bool _isPasswordHidden = true;
  bool _isPasswordConfirmationHidden = true;
  TextEditingController dateInput = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController userNameController = TextEditingController();
  TextEditingController fullNameController = TextEditingController();
  TextEditingController dobController = TextEditingController();
  TextEditingController phoneNumberController = TextEditingController();
  TextEditingController genderController = TextEditingController();
  AuthController controller = AuthController();

  @override
  void initState() {
    // TODO: implement initState
    dateInput.text = "";
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: ListView(
          // crossAxisAlignment: CrossAxisAlignment.start,
          // mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SizedBox(
              height: 20,
            ),
            Text(
              'Sign Up',
              style: poppinsH1.copyWith(color: buttonColor, fontSize: 36),
            ),
            Text(
              'Join us to continue to financeguru',
              style: poppinsBody1.copyWith(color: textColor),
            ),
            const VerticalGap20(),
            TextFormField(
              controller: emailController,
              decoration: InputDecoration(
                hintText: 'Email',
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
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your email';
                } else if (!value.contains('@')) {
                  return 'Please enter a valid email address';
                } else if (!value.contains('.')) {
                  return 'Please enter a valid email address';
                } else if (value.contains(' ')) {
                  return 'Please enter a valid email address';
                } else if (value.contains('..')) {
                  return 'Please enter a valid email address';
                } else if (value.contains('@.')) {
                  return 'Please enter a valid email address';
                } else if (value.contains('.@')) {
                  return 'Please enter a valid email address';
                }
                return null;
              },
            ),
            const VerticalGap10(),
            TextFormField(
              controller: userNameController,
              decoration: InputDecoration(
                hintText: 'Username',
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
              controller: passwordController,
              decoration: InputDecoration(
                hintText: 'Password',
                hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                suffixIcon: InkWell(
                  onTap: () {
                    setState(() {
                      _isPasswordHidden = !_isPasswordHidden;
                    });
                  },
                  child: Icon(
                    _isPasswordHidden ? Icons.visibility_off : Icons.visibility,
                    color: textColor.withOpacity(.5),
                  ),
                ),
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
              obscureText: _isPasswordHidden ? true : false,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter your password';
                } else if (value.length < 8) {
                  return 'Password must be at least 8 characters';
                } else if (value.contains(' ')) {
                  return 'Password must not contain spaces';
                } else if (value.contains('..')) {
                  return 'Password must not contain double dots';
                }
                return null;
              },
            ),
            const VerticalGap10(),
            TextFormField(
              controller: fullNameController,
              decoration: InputDecoration(
                hintText: 'Full Name',
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
              style: poppinsBody1.copyWith(color: textColor),
              controller: dateInput,
              //editing controller of this TextField
              decoration: InputDecoration(
                hintText: 'Date of birth',
                hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
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
                suffixIcon: Icon(
                  Icons.calendar_today,
                  color: textColor.withOpacity(.5),
                ), //icon of text field
              ),
              readOnly: true,
              //set it true, so that user will not able to edit text
              onTap: () async {
                DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(1950),
                    //DateTime.now() - not to allow to choose before today.
                    lastDate: DateTime(2100));

                if (pickedDate != null) {
                  print(pickedDate); //pickedDate output format => 2021-03-10 00:00:00.000
                  String formattedDate = DateFormat('yyyy-MM-dd').format(pickedDate);
                  print(formattedDate); //formatted date output using intl package =>  2021-03-16
                  setState(() {
                    dateInput.text = formattedDate; //set output date to TextField value.
                  });
                } else {}
              },
            ),
            const VerticalGap10(),
            TextFormField(
              controller: genderController,
              decoration: InputDecoration(
                hintText: 'Gender',
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
              controller: phoneNumberController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                hintText: 'Phone Number',
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
            const VerticalGap20(),
            InkWell(
              onTap: () async {
                Loader.show(context, progressIndicator: CircularProgressIndicator(color: Colors.blue));

                String status = '';
                // Loader.hide();
                try {
                  status = await controller.signup(
                      emailController.text,
                      userNameController.text,
                      passwordController.text,
                      fullNameController.text.split(' ')[0],
                      fullNameController.text.split(' ')[1],
                      dateInput.text,
                      genderController.text,
                      phoneNumberController.text);
                } on Exception catch (e) {
                  Loader.hide();
                }
                Loader.hide();

                if (status == "Success") {
                  Navigator.pushNamed(context, IntroductionPage.routeName);
                }

                if (status == "incorrect_user_details") {
                  setState(() {});
                }

                if (status == "other_issue") {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text("There seems to be some issue"),
                    ),
                  );
                }
              },
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  color: buttonColor,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Center(
                  child: Text(
                    'Sign Up',
                    style: poppinsH4.copyWith(color: text2Color),
                  ),
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'Have an account? ',
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text(
                    'Sign In',
                    style: TextStyle(
                      color: buttonColor,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
