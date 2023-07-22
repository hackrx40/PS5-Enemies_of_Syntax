import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:financeguru/common/function/card_number_gap.dart';
import 'package:financeguru/common/gap.dart';
import 'package:financeguru/common/skeleton.dart';
import 'package:financeguru/common/static.dart';
import 'package:financeguru/data/repository/repository.dart';
import 'package:financeguru/style/color.dart';
import 'package:financeguru/style/typography.dart';
import 'package:get_storage/get_storage.dart';
import 'package:intl/intl.dart';
import 'package:skeletons/skeletons.dart';
import 'package:http/http.dart' as http;

class PocketPage extends StatefulWidget {
  const PocketPage({Key? key}) : super(key: key);
  static const routeName = '/pocket';

  @override
  State<PocketPage> createState() => _PocketPageState();
}

class _PocketPageState extends State<PocketPage> {
  bool _isLoad = true;
  final formKey = GlobalKey<FormState>();
  TextEditingController dateInput = TextEditingController();
  TextEditingController endDateInput = TextEditingController();
  TextEditingController nameInput = TextEditingController();
  TextEditingController budgetLimitInput = TextEditingController();
  TextEditingController descInput = TextEditingController();
  TextEditingController recurrenceInput = TextEditingController();

  void isLoadingSuccess() {
    Future.delayed(const Duration(seconds: 5), () {
      setState(() {
        _isLoad = false;
      });
    });
  }

  @override
  void initState() {
    isLoadingSuccess();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SizedBox(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: SingleChildScrollView(
            physics: const NeverScrollableScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                headerSection(),
                const VerticalGap10(),
                // cardListSection(context),
                const VerticalGap10(),
                // balanceSection(context),
                const VerticalGap10(),
                pocketSection(context),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Skeleton pocketSection(BuildContext context) {
    return Skeleton(
      duration: const Duration(seconds: 2),
      isLoading: _isLoad,
      themeMode: ThemeMode.dark,
      // darkShimmerGradient: LinearGradient(
      //   begin: Alignment.centerLeft,
      //   end: Alignment.centerRight,
      //   colors: [
      //     secondaryColor,
      //     secondaryColor.withOpacity(.75),
      //     secondaryColor,
      //   ],
      //   tileMode: TileMode.repeated,
      // ),
      skeleton: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: const GridViewSkeleton(),
      ),
      child: Container(
        width: MediaQuery.of(context).size.width,
        // height: MediaQuery.of(context).size.height / 2,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Container(
          child: Form(
            key: formKey,
            child: Column(
              children: [
                TextFormField(
                  controller: nameInput,
                  // controller: usernameController,
                  decoration: InputDecoration(
                    hintText: 'Name of Budget',
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
                const SizedBox(
                  height: 30,
                ),
                TextFormField(
                  style: poppinsBody1.copyWith(color: textColor),
                  controller: dateInput,
                  //editing controller of this TextField
                  decoration: InputDecoration(
                    hintText: 'End date of budget',
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
                const SizedBox(
                  height: 30,
                ),
                TextFormField(
                  // controller: usernameController,
                  controller: budgetLimitInput,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'Budget Limit',
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
                const SizedBox(
                  height: 30,
                ),
                TextFormField(
                  // controller: usernameController,
                  controller: descInput,
                  decoration: InputDecoration(
                    hintText: 'Description',
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
                const SizedBox(
                  height: 30,
                ),
                TextFormField(
                  // controller: usernameController,
                  controller: recurrenceInput,
                  decoration: InputDecoration(
                    hintText: 'Recurrence',
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
                // TextFormField(
                //   style: poppinsBody1.copyWith(color: textColor),
                //   controller: endDateInput,
                //   //editing controller of this TextField
                //   decoration: InputDecoration(
                //     hintText: 'Date of birth',
                //     hintStyle: poppinsBody1.copyWith(color: textColor.withOpacity(.5)),
                //     enabledBorder: const OutlineInputBorder(
                //       borderSide: BorderSide(
                //         color: textColor,
                //       ),
                //       borderRadius: BorderRadius.all(
                //         Radius.circular(16),
                //       ),
                //     ),
                //     focusedBorder: const OutlineInputBorder(
                //       borderSide: BorderSide(
                //         color: buttonColor,
                //       ),
                //       borderRadius: BorderRadius.all(
                //         Radius.circular(16),
                //       ),
                //     ),
                //     suffixIcon: Icon(
                //       Icons.calendar_today,
                //       color: textColor.withOpacity(.5),
                //     ), //icon of text field
                //   ),
                //   readOnly: true,
                //   //set it true, so that user will not able to edit text
                //   onTap: () async {
                //     DateTime? pickedDate = await showDatePicker(
                //         context: context,
                //         initialDate: DateTime.now(),
                //         firstDate: DateTime(1950),
                //         //DateTime.now() - not to allow to choose before today.
                //         lastDate: DateTime(2100));

                //     if (pickedDate != null) {
                //       print(pickedDate); //pickedDate output format => 2021-03-10 00:00:00.000
                //       String formattedDate = DateFormat('yyyy-MM-dd').format(pickedDate);
                //       print(formattedDate); //formatted date output using intl package =>  2021-03-16
                //       setState(() {
                //         endDateInput.text = formattedDate; //set output date to TextField value.
                //       });
                //     } else {}
                //   },
                // ),

                InkWell(
                  onTap: () async {
                    DateTime now = DateTime.now();
                    String formattedTodaysDate = DateFormat('yyyy-MM-dd').format(now);
                    print(formattedTodaysDate); //formatted date output using intl package =>  2021-03-16

                    String token = GetStorage().read('token');

                    Uri uri = Uri.parse("https://backend-r677breg7a-uc.a.run.app/api/budget/userbudget/");

                    var res = await http.post(uri,
                        body: jsonEncode(
                          {
                            "account": GetStorage().read('acc_id'),
                            "name": nameInput.text,
                            "start_date": formattedTodaysDate,
                            "end_date": "2023-07-28",
                            "limit": budgetLimitInput.text,
                            "description": descInput.text,
                            "recurrence": recurrenceInput.text,
                          },
                        ),
                        headers: {"Authorization": "Bearer $token", "Content-Type": "application/json"});

                    print(res.body);
                    print(res.statusCode);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Budget created successfully'),
                      ),
                    );
                    Repository().getSavingTarget();
                    // Navigator.pop(context);
                  },
                  child: Container(
                    margin: const EdgeInsets.only(top: 40),
                    width: MediaQuery.of(context).size.width - 32,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      color: buttonColor,
                    ),
                    alignment: Alignment.center,
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 17),
                    child: Text(
                      'Save',
                      style: poppinsH4.copyWith(color: text2Color),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
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
      skeleton: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: const SmallSkeleton(),
      ),
      child: Container(
        width: MediaQuery.of(context).size.width,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Container(
          width: MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
            color: secondaryColor,
            borderRadius: BorderRadius.circular(16),
          ),
          padding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 8,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Total Balance',
                style: poppinsBody2.copyWith(
                  color: textColor.withOpacity(.75),
                ),
              ),
              const VerticalGap5(),
              Text(
                '\$ 590.00',
                style: poppinsH1.copyWith(color: buttonColor),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Skeleton cardListSection(BuildContext context) {
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
      skeleton: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: const MediumSkeleton(),
      ),
      child: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height / 4.5,
        child: FutureBuilder(
          future: Repository().getCreditCard(),
          builder: (context, snapshot) {
            return ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              scrollDirection: Axis.horizontal,
              separatorBuilder: (context, index) => const HorizontalGap10(),
              itemCount: snapshot.data?.length ?? 0,
              itemBuilder: (context, index) {
                final data = snapshot.data![index];
                String separatedNumber = separateNumber(data.cardNumber);
                String hiddenNumber = hideAndSeparateNumber(data.cardNumber);

                return InkWell(
                  onTap: () {
                    showModalBottomSheet(
                      context: context,
                      shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(16),
                          topRight: Radius.circular(16),
                        ),
                      ),
                      builder: (context) => Container(
                        height: MediaQuery.of(context).size.height / 2,
                        width: MediaQuery.of(context).size.width,
                        decoration: const BoxDecoration(
                          color: secondaryColor,
                          borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(16),
                            topRight: Radius.circular(16),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              width: MediaQuery.of(context).size.width / 4,
                              height: 10,
                              decoration: const BoxDecoration(
                                borderRadius: BorderRadius.only(
                                  bottomLeft: Radius.circular(16),
                                  bottomRight: Radius.circular(16),
                                ),
                                color: buttonColor,
                              ),
                            ),
                            Container(
                              width: MediaQuery.of(context).size.width,
                              padding: const EdgeInsets.all(16),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Cardholder Name',
                                    style: poppinsBody2.copyWith(color: textColor),
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        data.name,
                                        style: poppinsH4.copyWith(color: textColor),
                                      ),
                                      InkWell(
                                        onTap: () {},
                                        child: const Icon(
                                          Icons.copy_all_rounded,
                                          color: textColor,
                                          size: 24,
                                        ),
                                      )
                                    ],
                                  ),
                                  Divider(
                                    color: textColor.withOpacity(0.5),
                                    thickness: 1,
                                  ),
                                  const VerticalGap5(),
                                  Text(
                                    'Card Number',
                                    style: poppinsBody2.copyWith(color: textColor),
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        separatedNumber,
                                        style: poppinsH4.copyWith(color: textColor),
                                      ),
                                      InkWell(
                                        onTap: () {},
                                        child: const Icon(
                                          Icons.copy_all_rounded,
                                          color: textColor,
                                          size: 24,
                                        ),
                                      )
                                    ],
                                  ),
                                  Divider(
                                    color: textColor.withOpacity(0.5),
                                    thickness: 1,
                                  ),
                                  const VerticalGap5(),
                                  Text(
                                    'Expired Date',
                                    style: poppinsBody2.copyWith(color: textColor),
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        data.expirationDate,
                                        style: poppinsH4.copyWith(color: textColor),
                                      ),
                                      InkWell(
                                        onTap: () {},
                                        child: const Icon(
                                          Icons.copy_all_rounded,
                                          color: textColor,
                                          size: 24,
                                        ),
                                      )
                                    ],
                                  ),
                                  Divider(
                                    color: textColor.withOpacity(0.5),
                                    thickness: 1,
                                  ),
                                  const VerticalGap5(),
                                  Text(
                                    'CVV',
                                    style: poppinsBody2.copyWith(color: textColor),
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        data.cv,
                                        style: poppinsH4.copyWith(color: textColor),
                                      ),
                                      InkWell(
                                        onTap: () {},
                                        child: const Icon(
                                          Icons.copy_all_rounded,
                                          color: textColor,
                                          size: 24,
                                        ),
                                      )
                                    ],
                                  ),
                                  Divider(
                                    color: textColor.withOpacity(0.5),
                                    thickness: 1,
                                  ),
                                  const VerticalGap5(),
                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 16,
                                vertical: 8,
                              ),
                              child: InkWell(
                                onTap: () {
                                  Navigator.pop(context);
                                },
                                child: Container(
                                  width: MediaQuery.of(context).size.width,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(16),
                                    color: buttonColor,
                                  ),
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 16,
                                    vertical: 8,
                                  ),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      const Icon(
                                        Icons.close_rounded,
                                        color: text2Color,
                                      ),
                                      Text(
                                        'Close',
                                        style: poppinsBody1,
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            )
                          ],
                        ),
                      ),
                    );
                  },
                  child: Container(
                    width: MediaQuery.of(context).size.width / 1.25,
                    height: MediaQuery.of(context).size.height / 1.75,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      color: primaryColor,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            color: data.status == 1
                                ? buttonColor.withOpacity(.75)
                                : (data.status == 2 ? Colors.blue.shade900 : text2Color),
                          ),
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Container(
                                    width: 40,
                                    height: 40,
                                    decoration: const BoxDecoration(
                                      image: DecorationImage(
                                        image: AssetImage(imgChip),
                                      ),
                                    ),
                                  ),
                                  Text(
                                    data.visa == true ? 'VISA' : 'GPN',
                                    style: poppinsH2.copyWith(
                                      color: data.visa == true ? buttonColor : textColor,
                                    ),
                                  ),
                                ],
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  vertical: 16,
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      snapshot.data![index].name,
                                      style: poppinsBody1.copyWith(
                                        color: textColor,
                                      ),
                                    ),
                                    const VerticalGap5(),
                                    Text(
                                      hiddenNumber,
                                      style: poppinsBody1.copyWith(
                                        color: textColor,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    '\$ ${data.balance}',
                                    style: poppinsH3.copyWith(
                                      color: textColor,
                                    ),
                                  ),
                                  Text(
                                    data.expirationDate,
                                    style: poppinsBody2.copyWith(
                                      color: textColor,
                                    ),
                                  ),
                                ],
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            );
          },
        ),
      ),
    );
  }

  Container headerSection() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          const Icon(
            Icons.wallet_rounded,
            size: 28,
            color: textColor,
          ),
          const HorizontalGap5(),
          Text(
            'Set Budgets',
            style: poppinsH1.copyWith(color: textColor),
          ),
        ],
      ),
    );
  }
}
