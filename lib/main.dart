import 'package:flutter/material.dart';
import 'package:node_auth/providers/user_provider.dart';
import 'package:node_auth/screens/signup_screen.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MultiProvider(
    providers:[
      ChangeNotifierProvider(create: (_)=>UserProvider()),
    ],
    child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const  MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Node Auth Tutorial',
      home: SignupScreen(),
    );
  }
}
