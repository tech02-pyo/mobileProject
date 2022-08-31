import React from "react";
import {
  Home,
  Login,
  Signup,
  Board_list,
  Board,
  ResetPass,
  NewPass,
  Dictionary,
} from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ title: "Login" }}
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          options={{ title: "회원가입" }}
          component={Signup}
        />
        <Stack.Screen
          name="Home"
          options={{ title: "Home" }}
          component={Home}
        />
        <Stack.Screen
          name="Board_list"
          options={{ title: "게시판" }}
          component={Board_list}
        />
        <Stack.Screen
          name="Board"
          options={{ title: "공지사항" }}
          component={Board}
        />

        <Stack.Screen
          name="Dictionary"
          options={{ title: "단어사전" }}
          component={Dictionary}
        />

        <Stack.Screen name="NewPass" component={NewPass} />
        <Stack.Screen name="ResetPass" component={ResetPass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
