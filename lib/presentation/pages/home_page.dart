import 'dart:convert';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:intl/intl.dart';
import 'package:financeguru/common/gap.dart';
import 'package:financeguru/common/skeleton.dart';
import 'package:financeguru/common/static.dart';
import 'package:financeguru/data/model/saving_target_model.dart';
import 'package:financeguru/data/model/transaction_model.dart';
import 'package:financeguru/data/repository/repository.dart';
import 'package:financeguru/style/color.dart';
import 'package:financeguru/style/typography.dart';
import 'package:lottie/lottie.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:skeletons/skeletons.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  static const routeName = '/home';

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _isLoad = true;
  bool _isHidden = true;
  bool _isMore = true;
  String? balance;
  String? accountType;
  String? ifscCode;
  String? odLimit;
  int? points;

  static const bajajBanner = [
    "https://cms-assets.bajajfinserv.in/is/image/bajajfinance/doctor-loan-12?scl=1",
    "https://cms-assets.bajajfinserv.in/is/image/bajajfinance/car-insurance-v1-5?scl=1&fmt=png-alpha",
    "https://storage.googleapis.com/5paisa-prod-storage/files/2021-09/Bajaj%20Finserv%20gets%20approval%20for%20Mutual%20Fund.jpg"
  ];
  static const bajaj_urls = [
    "https://www.bajajfinserv.in/doctor-loan",
    "https://www.bajajfinserv.in/marketplace/insurance/car-insurance/car-insurance-premium-calculator/vehicleRegistration",
    "https://www.bajajfinserv.in/investments/mutual-funds"
  ];
  static const bajaj_titles = ["Doctor Loan", "Car Insurance", "Mutual Funds"];

  static const bajajBannerRich = [
    "https://storage.googleapis.com/5paisa-prod-storage/files/2021-09/Bajaj%20Finserv%20gets%20approval%20for%20Mutual%20Fund.jpg",
    "https://cms-assets.bajajfinserv.in/is/image/bajajfinance/gold-loan-banner-9?scl=1&fmt=png-alpha",
    "https://www.bajajfinservsecurities.in/Bajaj/images/demat-account-mobile.jpg"
  ];
  static const bajajUrlsRich = [
    "https://www.bajajfinserv.in/investments/mutual-funds",
    "https://www.bajajfinserv.in/gold-loan",
    "https://ekyc2.bajajfinservsecurities.in/ekyc/?utm_source=BFL-SEO-Pages&utm_medium=organic&utm_campaign=demat-landing-page"
  ];
  static const bajajTitlesRich = ["Mutual Funds", "Gold Loan", "Trading and Demat"];

  Future<void> _launchUrl(String _url) async {
    if (!await launchUrl(Uri.parse(_url))) {
      throw Exception('Could not launch $_url');
    }
  }

  void isLoadingSuccess() async {
    String token = GetStorage().read('token');

    final res = await http.get(Uri.parse('https://backend-r677breg7a-uc.a.run.app/api/bank/account/'),
        headers: {"Authorization": "Bearer $token"});

    final jsonData = jsonDecode(res.body);

    balance = jsonData[0]['balance'];
    ifscCode = jsonData[0]['ifsc'];
    odLimit = jsonData[0]['od_limit'];

    final cash_res = await http.get(Uri.parse('https://backend-r677breg7a-uc.a.run.app/api/accounts/profile/'),
        headers: {"Authorization": "Bearer $token"});
    final jsonDataRes = jsonDecode(cash_res.body);
    print(jsonDataRes);
    points = jsonDataRes['points'];
    // print(typeofEquals(o, type))

    // setState(() {

    // });

    print(jsonData);
    Future.delayed(const Duration(seconds: 3), () async {
      setState(() {
        _isLoad = false;
      });
    });

    String userType = GetStorage().read('type');
    // print(userType);
    if (userType == "M") {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => AlertDialog(
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(8),
              ),
            ),
            // title: Text(
            //   "Enter the amount",
            //   textAlign: TextAlign.center,
            //   style: TextStyle(
            //       // fontSize: getHeight(20),
            //       color: textColor),
            // ),
            content: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 10,
                ),
                InkWell(
                    onTap: () {
                      _launchUrl("https://www.bajajfinserv.in/investments/fixed-deposit");
                    },
                    child: Image.network("https://storage.googleapis.com/hackrx/FD.jpg")),
                SizedBox(
                  height: 15.0,
                ),
                Text(
                  "Great Job! You have saved 25% of your budget this month. We recommend investing these savings and gaining profit via our Bajaj Finserv Services!",
                  textAlign: TextAlign.center,
                  style: poppinsBody1.copyWith(color: textColor),
                ),
              ],
            ),
            backgroundColor: Color(0xFF1F1F21)),
      );
    } else if (userType == "L") {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => AlertDialog(
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(8),
              ),
            ),
            // title: Text(
            //   "Enter the amount",
            //   textAlign: TextAlign.center,
            //   style: TextStyle(
            //       // fontSize: getHeight(20),
            //       color: textColor),
            // ),
            content: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 10,
                ),
                InkWell(
                    onTap: () {
                      _launchUrl("https://www.bajajfinserv.in/personal-loan");
                    },
                    child: Image.network("https://storage.googleapis.com/hackrx/personal-loan.png")),
                SizedBox(
                  height: 15.0,
                ),
                Text(
                  "ALERT! You're about to exhaust your budget earlier than expected. We suggest you checking out our loans curated for you",
                  textAlign: TextAlign.center,
                  style: poppinsBody1.copyWith(color: textColor),
                ),
              ],
            ),
            backgroundColor: Color(0xFF1F1F21)),
      );
    } else {
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => AlertDialog(
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(
                Radius.circular(8),
              ),
            ),
            // title: Text(
            //   "Enter the amount",
            //   textAlign: TextAlign.center,
            //   style: TextStyle(
            //       // fontSize: getHeight(20),
            //       color: textColor),
            // ),
            content: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 10,
                ),
                InkWell(
                    onTap: () {
                      _launchUrl("https://www.bajajfinserv.in/gold-loan");
                    },
                    child: Image.network(
                        "https://www.bajajfinservmarkets.in/content/dam/bajajfinserv/banner-website/GoldLoanThumbnail.jpg")),
                SizedBox(
                  height: 15.0,
                ),
                Text(
                  "WE ROLLING! Since your financial well being, we suggest you to invest your cash flow in streamlines! Check them out",
                  textAlign: TextAlign.center,
                  style: poppinsBody1.copyWith(color: textColor),
                ),
              ],
            ),
            backgroundColor: Color(0xFF1F1F21)),
      );
    }
  }

  @override
  void initState() {
    super.initState();
    isLoadingSuccess();
  }

  TextEditingController _amountController = TextEditingController();
  TextEditingController _paymentCategoryController = TextEditingController();

  Future<bool> pay() async {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(8),
            ),
          ),
          // title: Text(
          //   "Enter the amount",
          //   textAlign: TextAlign.center,
          //   style: TextStyle(
          //       // fontSize: getHeight(20),
          //       color: textColor),
          // ),
          content: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: 10,
              ),
              Text(
                "Enter the amount",
                textAlign: TextAlign.center,
                style: TextStyle(
                    // fontSize: getHeight(20),
                    color: textColor),
              ),
              SizedBox(
                height: 10,
              ),
              TextField(
                keyboardType: TextInputType.number,
                controller: _amountController,
                style: TextStyle(
                  color: textColor,
                ),
                decoration: InputDecoration(
                  isDense: true,
                  contentPadding: const EdgeInsets.fromLTRB(10, 8, 10, 8),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: textColor, width: 1.0),
                  ),
                  focusedErrorBorder: const OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: Colors.red, width: 1.0),
                  ),
                  errorBorder: OutlineInputBorder(
                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: textColor, width: 1.0),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: buttonColor, width: 1.0),
                  ),
                ),
              ),
              SizedBox(
                height: 25,
              ),
              Text(
                "Enter the Category",
                textAlign: TextAlign.center,
                style: TextStyle(
                    // fontSize: getHeight(20),
                    color: textColor),
              ),
              SizedBox(
                height: 10,
              ),
              TextField(
                style: TextStyle(
                  color: textColor,
                ),
                controller: _paymentCategoryController,
                decoration: InputDecoration(
                  isDense: true,
                  contentPadding: const EdgeInsets.fromLTRB(10, 8, 10, 8),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: textColor, width: 1.0),
                  ),
                  focusedErrorBorder: const OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: Colors.red, width: 1.0),
                  ),
                  errorBorder: OutlineInputBorder(
                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: textColor, width: 1.0),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                    borderSide: BorderSide(color: buttonColor, width: 1.0),
                  ),
                ),
              ),
              SizedBox(
                height: 25,
              ),
              Container(
                child: Text(
                  'We will invest 10% of this amount in our cash for exciting benefits',
                  textAlign: TextAlign.center,
                  style: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                ),
              ),
              SizedBox(
                height: 25,
              ),
              Center(
                child: CupertinoButton(
                  child: Text(
                    'Pay',
                    style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  color: buttonColor,
                  onPressed: () {
                    try {
                      // Navigator.pushNamed(context, PaymentScreen.id);
                      Navigator.of(context).pop();

                      int? amount = int.tryParse(_amountController.text);
                      if (amount != null) {
                        payAmount(amount * 100); // to convert rupees to paise
                      }
                    } catch (e) {
                      print("Error");
                      print(e);
                    }
                  },
                ),
              ),
              SizedBox(
                height: 10,
              ),
            ],
          ),
          backgroundColor: Color(0xFF1F1F21)),
    );
    return false;
  }

  void updateUserCredits(double pt) async {
    String token = GetStorage().read('token');
    Uri uri = Uri.parse('https://backend-r677breg7a-uc.a.run.app/api/accounts/pointsincrement/');
    final res = await http.post(uri,
        body: jsonEncode({
          "points": pt,
        }),
        headers: {"Authorization": "Bearer $token", 'Content-Type': 'application/json'});
    final jsonData = jsonDecode(res.body);
    setState(() {
      print(jsonData);
      points = jsonData['points'].toInt();
    });
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(8),
            ),
          ),
          content: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: 10,
              ),
              Lottie.asset('assets/json/money_animation.json'),
              Container(
                child: Text(
                  '₹ $pt have been credited to your cash!!',
                  textAlign: TextAlign.center,
                  style: poppinsBody1.copyWith(color: textColor),
                ),
              ),
            ],
          ),
          backgroundColor: Color(0xFF1F1F21)),
    );
    // print(body);
    if (res.statusCode != 200) {
      print('incorrect');
    }

    print(res.body);
  }

  payAmount(int amount) {
    print(amount);

    //success@razorpay
    _handlePaymentSuccess(PaymentSuccessResponse response) async {
      // Do something when payment succee
      print("Payment success");
      print(response.paymentId);
      updateUserCredits(((amount / 100) * 10) / 100);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Payment Success"),
        ),
      );
    }

    _handlePaymentError(PaymentFailureResponse response) {
      // Do something when payment fails
      print("Payment Fail");
      print(response.code.toString());
      print(response.message);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Payment Fail ${response.message}"),
        ),
      );
    }

    void _handleExternalWallet(ExternalWalletResponse response) {
      // Do something when an external wallet is selected
    }

    Razorpay razorpay = Razorpay();
    razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);

    var options = {
      'key': 'rzp_test_bdduQGHdqKYl9J', // add key here
      // 'callback_url': baseUrl + 'events/v1/participate/payment/verify',
      // key to be added above to ensure transactions
      'amount': amount,
      'theme.color': '#E99B01',
      //add amount here from the api call
      'name': 'Finance Guru',
      'description': 'Payment',
      'timeout': 300, // in seconds
      'prefill': {
        'email': 'community@gmail.com' // email can be changed to one of oculus
      }
    };
    // right now all payments are authorized but not captured automatically
    // for automatic capture backend needs to send an orderId, which needs to be appended in options
    /*
                  *   var options = {
                    'key': "rzp_test_bdduQGHdqKYl9J",
                    'amount':
                    'name': '',
                    'order_id: 'backend',
                    'description': '',
                    'timeout': 300, // in seconds
                    'prefill': {
                      'contact': '',
                      'email': ''
                    }
                  };
                  *
                  * */
    try {
      razorpay.open(options);
    } on Exception catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Payment Failed"),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: SingleChildScrollView(
          child: Column(
            children: [
              profileSection(),
              const VerticalGap20(),
              balanceSection(context),
              const VerticalGap10(),
              paymentSection(context),
              const VerticalGap20(),
              savingTargetSection(context),
              const VerticalGap20(),
              carouselSection(context),
              const VerticalGap20(),
              transactionSection(context),
            ],
          ),
        ),
      ),
    );
  }

  Skeleton transactionSection(BuildContext context) {
    return Skeleton(
      duration: const Duration(seconds: 2),
      isLoading: _isLoad,
      themeMode: ThemeMode.dark,
      darkShimmerGradient: LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: [
          secondaryColor,
          secondaryColor.withOpacity(.75),
          secondaryColor,
        ],
        tileMode: TileMode.repeated,
      ),
      skeleton: const ListViewSkeleton(),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const Icon(
                    Icons.receipt_rounded,
                    color: textColor,
                    size: 24,
                  ),
                  const HorizontalGap5(),
                  Text(
                    'Recent Activities',
                    style: poppinsH4.copyWith(
                      color: textColor,
                    ),
                  ),
                ],
              ),
              InkWell(
                onTap: () {},
                child: const Icon(
                  Icons.arrow_circle_right,
                  color: textColor,
                  size: 28,
                ),
              )
            ],
          ),
          const VerticalGap10(),
          SizedBox(
            width: MediaQuery.of(context).size.width,
            height: 200,
            child: FutureBuilder<List<TransactionModel>>(
              future: Repository().getTransaction(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  final data = snapshot.data;
                  return ListView.separated(
                    separatorBuilder: (context, index) => const VerticalGap10(),
                    itemCount: data!.length,
                    itemBuilder: (context, index) {
                      return Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: secondaryColor,
                        ),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Stack(
                                  children: [
                                    Container(
                                      width: 60,
                                      height: 60,
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(40),
                                        color: primaryColor,
                                        image: DecorationImage(
                                          image: NetworkImage(
                                            data[index].photoUrl,
                                          ),
                                          fit: BoxFit.cover,
                                        ),
                                      ),
                                    ),
                                    Positioned(
                                      bottom: 0,
                                      right: 0,
                                      child: Container(
                                        width: 20,
                                        height: 20,
                                        decoration: BoxDecoration(
                                          borderRadius: BorderRadius.circular(40),
                                          color: data[index].status == true ? Colors.green : Colors.red,
                                        ),
                                        child: Icon(
                                          data[index].status == false
                                              ? Icons.arrow_upward_rounded
                                              : Icons.arrow_downward_rounded,
                                          color: textColor,
                                          size: 16,
                                        ),
                                      ),
                                    )
                                  ],
                                ),
                                const HorizontalGap10(),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      data[index].name,
                                      style: poppinsBody1.copyWith(
                                        color: textColor,
                                      ),
                                    ),
                                    Text(
                                      '${data[index].dateTransfer}, ${data[index].timeTransfer}',
                                      style: poppinsCaption.copyWith(
                                        color: textColor.withOpacity(.75),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            Row(
                              children: [
                                Text(
                                  data[index].status == false
                                      ? '- ₹ ${data[index].totalMoney}'
                                      : '+ ₹ ${data[index].totalMoney}',
                                  style: poppinsH3.copyWith(
                                    color: data[index].status == false ? Colors.red : Colors.green,
                                  ),
                                ),
                              ],
                            )
                          ],
                        ),
                      );
                    },
                  );
                } else if (snapshot.hasError) {
                  return Text('${snapshot.error}');
                } else {
                  return const Center(
                    child: CircularProgressIndicator(
                      color: buttonColor,
                    ),
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }

  Skeleton savingTargetSection(BuildContext context) {
    return Skeleton(
      duration: const Duration(seconds: 2),
      isLoading: _isLoad,
      themeMode: ThemeMode.dark,
      darkShimmerGradient: LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: [
          secondaryColor,
          secondaryColor.withOpacity(.75),
          secondaryColor,
        ],
        tileMode: TileMode.repeated,
      ),
      skeleton: const MediumSkeleton(),
      child: SizedBox(
        width: MediaQuery.of(context).size.width,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    const Icon(
                      Icons.cloud_circle_rounded,
                      color: textColor,
                      size: 24,
                    ),
                    const HorizontalGap5(),
                    Text(
                      'Your Budgets',
                      style: poppinsH4.copyWith(
                        color: textColor,
                      ),
                    ),
                  ],
                ),
                InkWell(
                  onTap: () {},
                  child: const Icon(
                    Icons.arrow_circle_right,
                    color: textColor,
                    size: 28,
                  ),
                )
              ],
            ),
            const VerticalGap10(),
            SizedBox(
              width: MediaQuery.of(context).size.width,
              height: 140,
              child: FutureBuilder<List<SavingTargetModel>>(
                future: Repository().getSavingTarget(),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    final data = snapshot.data;
                    return ListView.separated(
                      padding: EdgeInsets.zero,
                      scrollDirection: Axis.horizontal,
                      separatorBuilder: (context, index) => const HorizontalGap10(),
                      itemCount: data!.length,
                      itemBuilder: (context, index) {
                        // final formatter = NumberFormat('#,###');
                        final savingValue = data[index].currentLimit;
                        final targetValue = data[index].limit;
                        return Container(
                          width: MediaQuery.of(context).size.width / 1.25,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            color: secondaryColor,
                          ),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 8,
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    data[index].budgetName,
                                    style: poppinsBody1.copyWith(
                                      color: textColor.withOpacity(.75),
                                    ),
                                  ),
                                  const VerticalGap5(),
                                  Text(
                                    '₹$savingValue',
                                    style: poppinsBody1.copyWith(
                                      fontSize: 28,
                                      color: buttonColor,
                                    ),
                                  ),
                                  const VerticalGap5(),
                                  Text(
                                    '₹${double.parse(targetValue) - double.parse(savingValue)} spend in 6 months',
                                    style: poppinsBody2.copyWith(
                                      color: textColor.withOpacity(.5),
                                    ),
                                  ),
                                ],
                              ),
                              CircularPercentIndicator(
                                radius: 40,
                                lineWidth: 6,
                                percent: double.parse(data[index].currentLimit) / double.parse(data[index].limit),
                                center: Text(
                                  '${(double.parse(data[index].currentLimit) / double.parse(data[index].limit) * 100).toStringAsFixed(0)}%',
                                  style: poppinsBody1.copyWith(
                                    color: textColor,
                                  ),
                                ),
                                backgroundColor: textColor.withOpacity(.1),
                                progressColor: buttonColor,
                                animation: true,
                                animationDuration: 2000,
                                animateFromLastPercent: true,
                              ),
                            ],
                          ),
                        );
                      },
                    );
                  } else if (snapshot.hasError) {
                    return Text('Error: ${snapshot.error}');
                  } else {
                    return const Center(
                      child: CircularProgressIndicator(
                        color: buttonColor,
                      ),
                    );
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Skeleton carouselSection(BuildContext context) {
    return Skeleton(
      duration: const Duration(seconds: 2),
      isLoading: _isLoad,
      themeMode: ThemeMode.dark,
      darkShimmerGradient: LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: [
          secondaryColor,
          secondaryColor.withOpacity(.75),
          secondaryColor,
        ],
        tileMode: TileMode.repeated,
      ),
      skeleton: const MediumSkeleton(),
      child: SizedBox(
        width: MediaQuery.of(context).size.width,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    const Icon(
                      Icons.cloud_circle_rounded,
                      color: textColor,
                      size: 24,
                    ),
                    const HorizontalGap5(),
                    Text(
                      'Recommendations',
                      style: poppinsH4.copyWith(
                        color: textColor,
                      ),
                    ),
                  ],
                ),
                InkWell(
                  onTap: () {},
                  child: const Icon(
                    Icons.arrow_circle_right,
                    color: textColor,
                    size: 28,
                  ),
                )
              ],
            ),
            const VerticalGap10(),
            SizedBox(
              width: MediaQuery.of(context).size.width,
              height: 140,
              child: CarouselSlider(
                options: CarouselOptions(
                  height: 170,
                  viewportFraction: 0.8,
                  autoPlay: true,
                  autoPlayInterval: const Duration(seconds: 2),
                ),
                items: (GetStorage().read('type') == "M" || GetStorage().read('type') == "L")
                    ? bajajBanner.map((i) {
                        int idx = bajajBanner.indexOf(i);
                        return Builder(
                          builder: (BuildContext context) {
                            return InkWell(
                              onTap: () {
                                _launchUrl(bajaj_urls[idx]);
                              },
                              child: Container(
                                  // height: 100,
                                  width: MediaQuery.of(context).size.width,
                                  margin: EdgeInsets.symmetric(horizontal: 10.0),
                                  // padding: EdgeInsets.all(15.0),
                                  alignment: Alignment.bottomLeft,
                                  decoration: BoxDecoration(
                                    image: DecorationImage(image: NetworkImage("${i}"), fit: BoxFit.cover),
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Colors.grey.withOpacity(0.5),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    width: double.infinity,
                                    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                                    child: Text(
                                      bajaj_titles[idx],
                                      style:
                                          TextStyle(fontSize: 12.0, color: Colors.white, fontWeight: FontWeight.w500),
                                    ),
                                  )),
                            );
                          },
                        );
                      }).toList()
                    : bajajBannerRich.map((i) {
                        int idx = bajajBannerRich.indexOf(i);
                        return Builder(
                          builder: (BuildContext context) {
                            return InkWell(
                              onTap: () {
                                _launchUrl(bajajUrlsRich[idx]);
                              },
                              child: Container(
                                  // height: 100,
                                  width: MediaQuery.of(context).size.width,
                                  margin: EdgeInsets.symmetric(horizontal: 10.0),
                                  // padding: EdgeInsets.all(15.0),
                                  alignment: Alignment.bottomLeft,
                                  decoration: BoxDecoration(
                                    image: DecorationImage(image: NetworkImage("${i}"), fit: BoxFit.cover),
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Colors.grey.withOpacity(0.5),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    width: double.infinity,
                                    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                                    child: Text(
                                      bajajTitlesRich[idx],
                                      style:
                                          TextStyle(fontSize: 12.0, color: Colors.white, fontWeight: FontWeight.w500),
                                    ),
                                  )),
                            );
                          },
                        );
                      }).toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Skeleton paymentSection(BuildContext context) {
    return Skeleton(
      duration: const Duration(seconds: 2),
      isLoading: _isLoad,
      themeMode: ThemeMode.dark,
      darkShimmerGradient: LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: [
          secondaryColor,
          secondaryColor.withOpacity(.75),
          secondaryColor,
        ],
        tileMode: TileMode.repeated,
      ),
      skeleton: const SmallSkeleton(),
      child: Container(
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: secondaryColor,
        ),
        padding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 8,
        ),
        child: Container(
          child: InkWell(
            onTap: () {
              pay();
            },
            child: Row(
              children: [
                Text(
                  "Make Payment",
                  style: poppinsCaption.copyWith(color: textColor.withOpacity(.75), fontSize: 15.0),
                ),
                SizedBox(
                  width: 20.0,
                ),
                Icon(
                  widgetIcons[0],
                  color: textColor,
                ),
              ],
            ),
          ),
        ),
        // child: GridView.builder(
        //   gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        //     crossAxisCount: 4,
        //     mainAxisSpacing: 8,
        //     crossAxisSpacing: 8,
        //   ),
        //   itemCount: 4,
        //   itemBuilder: (context, index) {
        //     return InkWell(
        //       onTap: () {},
        //       splashColor: buttonColor,
        //       highlightColor: buttonColor,
        //       focusColor: buttonColor,
        //       child: Column(
        //         children: [
        //           Container(
        //             width: 56,
        //             height: 56,
        //             decoration: BoxDecoration(
        //               borderRadius: BorderRadius.circular(40),
        //               color: primaryColor,
        //             ),
        //             child: Icon(
        //               widgetIcons[index],
        //               color: textColor,
        //             ),
        //           ),
        //           const VerticalGap5(),
        //           Expanded(
        //             child: Text(
        //               widgetTitles[index],
        //               style: poppinsCaption.copyWith(
        //                 color: textColor.withOpacity(.75),
        //               ),
        //             ),
        //           ),
        //         ],
        //       ),
        //     );
        //   },
        //   shrinkWrap: true,
        //   padding: EdgeInsets.zero,
        // ),
      ),
    );
  }

  Skeleton balanceSection(BuildContext context) {
    return Skeleton(
      duration: const Duration(seconds: 2),
      isLoading: _isLoad,
      themeMode: ThemeMode.dark,
      darkShimmerGradient: LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: [
          secondaryColor,
          secondaryColor.withOpacity(.75),
          secondaryColor,
        ],
        tileMode: TileMode.repeated,
      ),
      skeleton: const MediumSkeleton(),
      child: Container(
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: secondaryColor,
        ),
        padding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 8,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Total Balance',
                  style: poppinsBody2.copyWith(
                    color: textColor.withOpacity(.75),
                  ),
                ),
                InkWell(
                  onTap: () {
                    setState(() {
                      _isMore = !_isMore;
                    });
                  },
                  child: Icon(
                    Icons.info_outline_rounded,
                    color: textColor.withOpacity(.75),
                  ),
                ),
              ],
            ),
            Row(
              children: [
                Text(
                  _isHidden ? '\₹ ${balance}' : '---------',
                  style: poppinsH1.copyWith(
                    color: buttonColor,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const HorizontalGap5(),
                InkWell(
                  onTap: () {
                    setState(() {
                      _isHidden = !_isHidden;
                    });
                  },
                  child: Icon(
                    _isHidden ? Icons.visibility_rounded : Icons.visibility_off_rounded,
                    color: textColor.withOpacity(.75),
                    size: 20,
                  ),
                ),
              ],
            ),
            AnimatedCrossFade(
              duration: const Duration(milliseconds: 300),
              crossFadeState: _isMore ? CrossFadeState.showFirst : CrossFadeState.showSecond,
              firstChild: const SizedBox(),
              secondChild: Column(
                children: [
                  const VerticalGap10(),
                  Container(
                    width: MediaQuery.of(context).size.width,
                    height: 2,
                    color: textColor.withOpacity(.25),
                  ),
                  const VerticalGap10(),
                  // Row(
                  //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  //   children: [
                  //     Text(
                  //       'Investation (0,00%)',
                  //       style: poppinsH5.copyWith(
                  //         color: textColor.withOpacity(.75),
                  //       ),
                  //     ),
                  //     Text(
                  //       'Rp 0',
                  //       style: poppinsH5.copyWith(
                  //         color: textColor.withOpacity(.75),
                  //       ),
                  //     ),
                  //   ],
                  // ),
                  // const VerticalGap5(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Row(
                      //   children: [
                      //     Container(
                      //       width: 20,
                      //       height: 20,
                      //       decoration: BoxDecoration(
                      //         borderRadius: BorderRadius.circular(40),
                      //         color: Colors.white,
                      //         image: const DecorationImage(
                      //           image: AssetImage(imgBibit),
                      //           fit: BoxFit.cover,
                      //         ),
                      //       ),
                      //     ),
                      //     const HorizontalGap5(),
                      //     Text(
                      //       'Reksa Dana Bibit',
                      //       style: poppinsBody2.copyWith(
                      //         color: textColor.withOpacity(.75),
                      //       ),
                      //     ),
                      //   ],
                      // ),
                      // Text(
                      //   'Rp 0',
                      //   style: poppinsBody2.copyWith(
                      //     color: textColor.withOpacity(.75),
                      //   ),
                      // ),
                    ],
                  ),
                  const VerticalGap10(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Cash Money (100.00%)',
                        style: poppinsH5.copyWith(
                          color: textColor.withOpacity(.75),
                        ),
                      ),
                      Text(
                        '\₹ ${balance}',
                        style: poppinsH5.copyWith(
                          color: textColor.withOpacity(.75),
                        ),
                      ),
                    ],
                  ),
                  const VerticalGap5(),
                  // Row(
                  //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  //   children: [
                  //     Row(
                  //       children: [
                  //         Container(
                  //           width: 20,
                  //           height: 20,
                  //           decoration: BoxDecoration(
                  //             borderRadius: BorderRadius.circular(40),
                  //             color: Colors.white,
                  //             image: const DecorationImage(
                  //               image: AssetImage(imgProfile),
                  //               fit: BoxFit.cover,
                  //             ),
                  //           ),
                  //         ),
                  //         const HorizontalGap5(),
                  //         Text(
                  //           'Saving Pocket',
                  //           style: poppinsBody2.copyWith(
                  //             color: textColor.withOpacity(.75),
                  //           ),
                  //         ),
                  //       ],
                  //     ),
                  //     Text(
                  //       'Rp 0',
                  //       style: poppinsBody2.copyWith(
                  //         color: textColor.withOpacity(.75),
                  //       ),
                  //     ),
                  //   ],
                  // ),
                  const VerticalGap5(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            width: 20,
                            height: 20,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(40),
                              color: Colors.white,
                              image: const DecorationImage(
                                image: AssetImage(imgProfile),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          const HorizontalGap5(),
                          Text(
                            'Account Type',
                            style: poppinsBody2.copyWith(
                              color: textColor.withOpacity(.75),
                            ),
                          ),
                        ],
                      ),
                      Text(
                        'Savings',
                        style: poppinsBody2.copyWith(
                          color: textColor.withOpacity(.75),
                        ),
                      ),
                    ],
                  ),
                  const VerticalGap5(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          // const HorizontalGap5(),
                          Text(
                            'IFSC CODE',
                            style: poppinsBody2.copyWith(
                              color: textColor.withOpacity(.75),
                            ),
                          ),
                        ],
                      ),
                      Text(
                        '${ifscCode}',
                        style: poppinsBody2.copyWith(
                          color: textColor.withOpacity(.75),
                        ),
                      ),
                    ],
                  ),
                  const VerticalGap5(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          // const HorizontalGap5(),
                          Text(
                            'OD Limit',
                            style: poppinsBody2.copyWith(
                              color: textColor.withOpacity(.75),
                            ),
                          ),
                        ],
                      ),
                      Text(
                        '${odLimit}',
                        style: poppinsBody2.copyWith(
                          color: textColor.withOpacity(.75),
                        ),
                      ),
                    ],
                  ),
                  const VerticalGap5(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Skeleton profileSection() {
    return Skeleton(
      duration: const Duration(seconds: 2),
      isLoading: _isLoad,
      themeMode: ThemeMode.dark,
      darkShimmerGradient: LinearGradient(
        begin: Alignment.centerLeft,
        end: Alignment.centerRight,
        colors: [
          secondaryColor,
          secondaryColor.withOpacity(.75),
          secondaryColor,
        ],
        tileMode: TileMode.repeated,
      ),
      skeleton: const SmallSkeleton(),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Good Morning!',
                style: poppinsBody2.copyWith(
                  color: textColor.withOpacity(.75),
                ),
              ),
              Text(
                '${GetStorage().read('username')}  🎆',
                style: poppinsBody1.copyWith(
                  color: textColor,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(5.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10.0),
                  border: Border.all(
                    width: 1,
                    color: textColor,
                  ),
                ),
                child: Row(
                  children: [
                    Image.asset(
                      "assets/images/wallet.png",
                      height: 35,
                      width: 35,
                    ),
                    SizedBox(
                      width: 7,
                    ),
                    Text(
                      points.toString(),
                      style: poppinsBody1.copyWith(
                        color: textColor,
                        fontWeight: FontWeight.w600,
                        fontSize: 20.0,
                      ),
                    ),
                    // SizedBox(
                    //   width: 15,
                    // )
                  ],
                ),
              ),
              SizedBox(
                width: 15,
              ),
              InkWell(
                onTap: () {},
                child: Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(40),
                    color: Colors.white,
                    image: const DecorationImage(
                      image: AssetImage(imgProfile),
                      fit: BoxFit.cover,
                    ),
                  ),
                  padding: const EdgeInsets.all(8),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
