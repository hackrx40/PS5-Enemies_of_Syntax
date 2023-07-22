import 'package:flutter/material.dart';
import 'package:financeguru/common/gap.dart';
import 'package:financeguru/common/static.dart';
import 'package:financeguru/style/color.dart';
import 'package:financeguru/style/typography.dart';
import 'package:get_storage/get_storage.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});
  static const routeName = '/settings';

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Column(
            children: [
              profileSection(),
              const VerticalGap10(),
              InkWell(
                onTap: () {
                  GetStorage().erase();
                  Navigator.pop(context);
                },
                child: Container(
                  child: Row(
                    children: [
                      Text(
                        "Logout",
                        style: poppinsBody1.copyWith(color: textColor),
                      ),
                      SizedBox(
                        width: 10,
                      ),
                      Icon(
                        Icons.logout,
                        color: textColor,
                      )
                    ],
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Container profileSection() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              InkWell(
                onTap: () {},
                child: Container(
                  width: 80,
                  height: 80,
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(40),
                    image: const DecorationImage(
                      image: AssetImage(imgProfile),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const HorizontalGap10(),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    GetStorage().read('username') ?? "User",
                    style: poppinsH4.copyWith(color: textColor),
                  ),
                  Text(
                    'omshukla@gmail.com',
                    style: poppinsCaption.copyWith(
                      color: textColor.withOpacity(.75),
                    ),
                  ),
                ],
              ),
            ],
          ),
          InkWell(
            onTap: () {},
            child: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: primaryColor,
              ),
              child: const Icon(
                Icons.edit,
                color: buttonColor,
                size: 24,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
