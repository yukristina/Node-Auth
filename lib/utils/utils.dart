import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void showSnackBaaar(BuildContext context, String text) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(text)));
}

void httpErrorHandle({
  required http.Response response,
  required BuildContext context,
  required VoidCallback onSuccess,
}) {
  switch (response.statusCode) {
    case 200:
      onSuccess();
      break;
    case 400:
      showSnackBaaar(context, jsonDecode(response.body)['msg']);
      break;
    case 500:
      showSnackBaaar(context, jsonDecode(response.body)['error']);
      break;
    default:
      showSnackBaaar(context, response.body);
  }
}
