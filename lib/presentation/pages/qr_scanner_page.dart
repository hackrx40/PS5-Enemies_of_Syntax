import 'dart:convert';
import 'dart:io';

import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/material.dart';
import 'package:financeguru/common/gap.dart';
import 'package:financeguru/style/color.dart';
import 'package:financeguru/style/typography.dart';
import 'package:flutter_overlay_loader/flutter_overlay_loader.dart';
import 'package:get_storage/get_storage.dart';
import 'package:image_picker/image_picker.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:http/http.dart' as http;

class QRScannerPage extends StatefulWidget {
  const QRScannerPage({super.key});
  static const routeName = '/qr-scanner-page';

  @override
  State<QRScannerPage> createState() => _QRScannerPageState();
}

class _QRScannerPageState extends State<QRScannerPage> {
  // final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  Barcode? result;
  QRViewController? controller;
  File? imageFile;

  _getFromGallery() async {
    XFile? pickedFile = await ImagePicker().pickImage(
      source: ImageSource.gallery,
      maxWidth: 1800,
      maxHeight: 1800,
    );
    if (pickedFile != null) {
      setState(() {
        imageFile = File(pickedFile.path);
      });
    }
  }

  /// Get from Camera
  _getFromCamera() async {
    XFile? pickedFile = await ImagePicker().pickImage(
      source: ImageSource.camera,
      maxWidth: 1800,
      maxHeight: 1800,
    );
    if (pickedFile != null) {
      setState(() {
        imageFile = File(pickedFile.path);
      });
      Loader.show(context);
      addData();
      Loader.hide();
    }
  }

  Future<void> addData() async {
    try {
      print("hello");
      String url = 'https://hackrx4prod-r677breg7a-uc.a.run.app/api/budget/ocr/';

      http.MultipartRequest request = http.MultipartRequest('POST', Uri.parse(url));

      request.headers
          .addAll({"Authorization": "Bearer ${GetStorage().read('token')}", "Content-Type": "multipart/form-data"});

      // if (myProfileImage != null) {
      request.files.add(await http.MultipartFile.fromPath('image', imageFile!.path));
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
  }

  // @override
  // void reassemble() {
  //   super.reassemble();
  //   if (Platform.isAndroid) {
  //     controller!.pauseCamera();
  //   } else if (Platform.isIOS) {
  //     controller!.resumeCamera();
  //   }
  // }

  // void _onQRViewCreated(QRViewController controller) {
  //   this.controller = controller;
  //   controller.scannedDataStream.listen((scanData) {
  //     setState(() {
  //       result = scanData;
  //     });
  //   });
  // }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: primaryColor,
          centerTitle: true,
          elevation: 0,
          leading: IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: const Icon(
              Icons.arrow_back_ios_new_rounded,
              size: 20,
            ),
          ),
          title: Text(
            'Scan your bill',
            style: poppinsH3,
          ),
        ),
        body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 8,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                children: [
                  imageFile == null
                      ? Container(
                          margin: EdgeInsets.all(12),
                          child: InkWell(
                            child: DottedBorder(
                              color: Colors.grey,
                              borderType: BorderType.RRect,
                              radius: Radius.circular(8),
                              dashPattern: [5, 3],
                              strokeWidth: 1,
                              child: Container(
                                height: 100,
                                // width: MediaQuery.of(context).size.width - 60,
                                child: Container(),
                              ),
                            ),
                          ),
                        )
                      : Container(
                          margin: EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            border: Border.all(color: Colors.blue),
                            borderRadius: BorderRadius.circular(10.0),
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(10.0),
                            // borderRadius: BorderRadius.circular(20.0)
                            child: Container(
                              // margin: EdgeInsets.all(8),
                              // padding: EdgeInsets.all(25),
                              width: MediaQuery.of(context).size.width,
                              // decoration: BoxDecoration(borderRadius: BorderRadius.circular(20.0)),
                              child: Align(
                                alignment: Alignment.center,
                                // widthFactor: 1,
                                heightFactor: 0.5,
                                child: Image.file(
                                  imageFile!,
                                  fit: BoxFit.fill,
                                ),
                              ),
                            ),
                          ),
                        ),
                  SizedBox(
                    height: 15,
                  ),
                  Row(
                    children: [
                      InkWell(
                        onTap: () {
                          print("camera accessed");
                          _getFromCamera();
                        },
                        child: Container(
                          width: 150,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          decoration: BoxDecoration(
                            color: buttonColor,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Center(
                            child: Text(
                              'Scan bill',
                              style: poppinsH4.copyWith(color: text2Color),
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        width: 55,
                      ),
                      InkWell(
                        onTap: () {
                          _getFromGallery();
                        },
                        child: Container(
                          width: 170,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          decoration: BoxDecoration(
                            color: buttonColor,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Center(
                            child: Text(
                              'Choose from gallery',
                              style: poppinsH4.copyWith(color: text2Color),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  // Container(
                  //   width: double.infinity,
                  //   padding: const EdgeInsets.symmetric(vertical: 16),
                  //   decoration: BoxDecoration(
                  //     color: buttonColor,
                  //     borderRadius: BorderRadius.circular(16),
                  //   ),
                  //   child: Center(
                  //     child: Text(
                  //       'Scan your bill',
                  //       style: poppinsH4.copyWith(color: text2Color),
                  //     ),
                  //   ),
                  // ),
                  // Container(
                  //   width: MediaQuery.of(context).size.width,
                  //   height: MediaQuery.of(context).size.height / 2.75,
                  //   decoration: BoxDecoration(
                  //     borderRadius: BorderRadius.circular(10),
                  //     color: secondaryColor,
                  //   ),
                  //   padding: const EdgeInsets.all(16),
                  //   child: QRView(
                  //     cameraFacing: CameraFacing.back,
                  //     formatsAllowed: const [BarcodeFormat.qrcode],
                  //     key: qrKey,
                  //     onQRViewCreated: _onQRViewCreated,
                  //     overlay: QrScannerOverlayShape(
                  //       borderRadius: 10,
                  //       borderColor: textColor,
                  //       borderLength: 30,
                  //       borderWidth: 10,
                  //       cutOutSize: 300,
                  //     ),
                  //   ),
                  // ),
                  const VerticalGap10(),
                  Text(
                    'You can scan QR code from your friend to send money',
                    style: poppinsBody1.copyWith(
                      color: textColor,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
              bottomButton(context)
            ],
          ),
        ),
      ),
    );
  }

  InkWell bottomButton(BuildContext context) {
    return InkWell(
      onTap: () {
        showModalBottomSheet(
          context: context,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              top: Radius.circular(20),
            ),
          ),
          builder: (context) {
            return Container(
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height / 2,
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.vertical(
                  top: Radius.circular(20),
                ),
                color: primaryColor,
              ),
              padding: const EdgeInsets.all(16),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'My QR Code',
                            style: poppinsBody1.copyWith(
                              color: textColor,
                            ),
                          ),
                          InkWell(
                            onTap: () {
                              Navigator.pop(context);
                            },
                            child: const Icon(
                              Icons.close_rounded,
                              color: textColor,
                            ),
                          )
                        ],
                      ),
                      const VerticalGap15(),
                      Container(
                        decoration: const BoxDecoration(
                          border: Border(
                            top: BorderSide(width: 4.0, color: textColor),
                            left: BorderSide(width: 4.0, color: textColor),
                            right: BorderSide(width: 4.0, color: textColor),
                            bottom: BorderSide(width: 4.0, color: textColor),
                          ),
                          borderRadius: BorderRadius.all(Radius.circular(20)),
                          color: primaryColor,
                        ),
                        padding: const EdgeInsets.all(8),
                        child: Container(
                          decoration: const BoxDecoration(
                            borderRadius: BorderRadius.all(Radius.circular(20)),
                            color: textColor,
                          ),
                          padding: const EdgeInsets.all(8),
                          child: QrImageView(
                            data: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                            size: 200,
                            backgroundColor: textColor,
                            errorStateBuilder: (cxt, err) {
                              return const Center(
                                child: Text(
                                  'Uh oh! Something went wrong...',
                                  textAlign: TextAlign.center,
                                ),
                              );
                            },
                            errorCorrectionLevel: QrErrorCorrectLevel.M,
                            padding: const EdgeInsets.all(0),
                          ),
                        ),
                      ),
                      const VerticalGap15(),
                      Text(
                        'You can use this QR Code to receive money from your friends',
                        style: poppinsBody2.copyWith(
                          color: textColor,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                  InkWell(
                    onTap: () {},
                    child: Container(
                      width: MediaQuery.of(context).size.width,
                      decoration: BoxDecoration(
                        color: buttonColor,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: Center(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(
                              Icons.share,
                              color: text2Color,
                            ),
                            const HorizontalGap5(),
                            Text(
                              'Share My QR',
                              style: poppinsBody1,
                            ),
                          ],
                        ),
                      ),
                    ),
                  )
                ],
              ),
            );
          },
        );
      },
      child: Container(
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(
          color: buttonColor,
          borderRadius: BorderRadius.circular(16),
        ),
        padding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 10,
        ),
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.qr_code,
                color: text2Color,
              ),
              const HorizontalGap5(),
              Text(
                'My QR Code',
                style: poppinsBody1,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
