import 'package:financeguru/presentation/widgets/navbar_widget.dart';
import 'package:flutter/material.dart';
import 'package:financeguru/common/gap.dart';
import 'package:financeguru/presentation/pages/home_page.dart';
import 'package:financeguru/presentation/pages/introduction_page.dart';
import 'package:financeguru/presentation/pages/signin_page.dart';
import 'package:financeguru/style/color.dart';
import 'package:financeguru/style/typography.dart';
import 'package:get_storage/get_storage.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});
  static const routeName = '/splash';

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  void getInitialRoute() {
    if (GetStorage().read('token') == null) {
      Navigator.pushReplacementNamed(context, SigninPage.routeName);
    } else {
      Navigator.pushReplacementNamed(context, NavigationBarWidget.routeName);
    }
  }

  void navigate(BuildContext context) {
    Future.delayed(const Duration(seconds: 3), () {
      getInitialRoute();
    });
  }

  @override
  initState() {
    super.initState();
    navigate(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Stack(
              children: [
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(40),
                    color: secondaryColor,
                  ),
                  padding: const EdgeInsets.all(8),
                  child: const Icon(
                    Icons.account_balance_wallet_rounded,
                    size: 120,
                    color: textColor,
                  ),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(80),
                      color: secondaryColor,
                    ),
                    padding: const EdgeInsets.all(8),
                    child: const Icon(
                      Icons.currency_rupee,
                      size: 40,
                      color: buttonColor,
                    ),
                  ),
                ),
              ],
            ),
            const VerticalGap10(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Finance',
                  style: poppinsH1.copyWith(color: textColor),
                ),
                Text(
                  'Guru',
                  style: poppinsH1.copyWith(color: buttonColor),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
