import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import InputText from "../components/Input";
import { Link } from "@react-navigation/native";
import axios from "axios";
import Navigation from "../config/Navigation";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [email, setEmail] = useState(""),
    [phone, setPhone] = useState("");
  const managerYN = "N";
  return (
    <View style={styles.container}>
      <Text style={styles.head}>회원가입</Text>
      <Text style={styles.secondHead}>
        회원가입을 위해 회원님의 정보를 입력해주세요.
      </Text>
      <InputText
        placeholder="Name"
        style={styles.input}
        onChangeText={(text: React.SetStateAction<string>) => setUsername(text)}
      />
      <InputText
        placeholder="Email"
        style={styles.input}
        onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
      />
      <InputText
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
      />
      <InputText
        placeholder="Phone"
        style={styles.input}
        onChangeText={(text: React.SetStateAction<string>) => setPhone(text)}
      />
      {/* <InputText placeholder="Confirm Password" style={styles.input} /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          axios
            .post(`http://localhost:3300/auth/signup/`, {
              username: `${username}`,
              phone: `${phone}`,
              email: `${email}`,
              password: `${password}`,
              managerYN: `${managerYN}`,
            })
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
              Alert.alert("회원가입이 완료 되었습니다.");
              navigation.navigate("Login");
            });
        }}
      >
        <Text style={styles.link}>회원가입</Text>
      </TouchableOpacity>
      <Text style={styles.textDetail}>
        이미 계정이 있으신가요?{" "}
        <Link style={styles.innerLink} to={{ screen: "Login" }}>
          로그인
        </Link>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 10,
  },

  input: {
    color: "black",
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 20,
  },
  head: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10,
  },
  secondHead: {
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#655DEC",
    color: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 20,
  },

  textDetail: {
    color: "gray",
    textAlign: "center",
  },
  innerLink: {
    fontWeight: "bold",
    color: "#655DEC",
    textAlign: "center",
  },
  link: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
  },
});
