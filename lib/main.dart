import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:financeguru/presentation/pages/history_page.dart';
import 'package:financeguru/presentation/pages/home_page.dart';
import 'package:financeguru/presentation/pages/introduction_page.dart';
import 'package:financeguru/presentation/pages/signin_page.dart';
import 'package:financeguru/presentation/pages/pocket_page.dart';
import 'package:financeguru/presentation/pages/qr_scanner_page.dart';
import 'package:financeguru/presentation/pages/settings_page.dart';
import 'package:financeguru/presentation/pages/signup_page.dart';
import 'package:financeguru/presentation/pages/splash_page.dart';
import 'package:financeguru/presentation/widgets/navbar_widget.dart';
import 'package:financeguru/style/color.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:get_storage/get_storage.dart';

Future _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print("Handling a background message: ${message.messageId}");
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  flutterLocalNotificationsPlugin.initialize(initializationSettings);
  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(channel);
  await FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(alert: true, badge: true, sound: true);
  await GetStorage.init();
  runApp(const MyApp());
}

const AndroidNotificationChannel channel = AndroidNotificationChannel(
    'high importance channel', 'High Importance Notifications',
    description: 'This channel is used for important Notifications', importance: Importance.high);
final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();
InitializationSettings initializationSettings = InitializationSettings(android: AndroidInitializationSettings('logo'));

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        canvasColor: primaryColor,
      ),
      initialRoute: SplashPage.routeName,
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case NavigationBarWidget.routeName:
            return MaterialPageRoute(builder: (_) => const NavigationBarWidget());
          case SplashPage.routeName:
            return MaterialPageRoute(builder: (_) => const SplashPage());
          case IntroductionPage.routeName:
            return MaterialPageRoute(builder: (_) => const IntroductionPage());
          case SigninPage.routeName:
            return MaterialPageRoute(builder: (_) => const SigninPage());
          case SignupPage.routeName:
            return MaterialPageRoute(builder: (_) => const SignupPage());
          case HomePage.routeName:
            return MaterialPageRoute(builder: (_) => const HomePage());
          case PocketPage.routeName:
            return MaterialPageRoute(builder: (_) => const PocketPage());
          case QRScannerPage.routeName:
            return MaterialPageRoute(builder: (_) => const QRScannerPage());
          case HistoryPage.routeName:
            return MaterialPageRoute(builder: (_) => const HistoryPage());
          case SettingsPage.routeName:
            return MaterialPageRoute(builder: (_) => const SettingsPage());
          default:
            return null;
        }
      },
    );
  }
}
