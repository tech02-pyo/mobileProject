import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import InputText from "../components/Input";
import { Link } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let token = "";
export default function Login({ navigation }) {
  AsyncStorage.setItem("token", "");
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [istoken, setIsToken] = useState(false);
  function getUserInfo(token) {
    axios
      .post(
        "http://localhost:3300/auth/userinfo",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("getUSerInfo", res.data);
        const managerYN = res.data.managerYN;
        const username = res.data.username;
        AsyncStorage.setItem("username", username);
        if (managerYN === "N") {
          navigation.navigate("Home", { isToken: true });
        } else {
          Alert.alert("관리자 계정은 이용할 수 없습니다.");
        }
      });
  }

  useEffect(() => {
    setIsToken(!!AsyncStorage.getItem("token") ? true : false);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.head}>💜Welocme to KLAI EDU!💜</Text>
      <Text style={styles.head}>Login</Text>
      <Text style={styles.secondHead}>이메일과 비밀번호를 입력해주세요.</Text>
      <InputText
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
      />
      <InputText
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          axios
            .post(`http://localhost:3300/auth/signin/`, {
              email: `${email}`,
              password: `${password}`,
            })

            .then((res) => {
              token = res.data.accessToken;
              AsyncStorage.setItem("token", token);
              getUserInfo(token);
            })
            .catch((error) => {
              console.log("Error:", error.response);
              if (error.response.data.message === "login failed") {
                Alert.alert("아이디와 비밀번호를 확인해주세요.");
              } else {
                Alert.alert("로그인에 실패했습니다. 관리자에게 문의해주세요.");
              }
            });
        }}
      >
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>
      {/* <Text style={styles.textDetail}>
        <Link to={{ screen: "ResetPass" }}>Forget your Password ?</Link>
      </Text> */}
      <Text style={styles.textDetail}>
        아직 회원이 아니신가요?{" "}
        <Link
          style={styles.innerLink}
          to={{ screen: "Signup", params: { id: "Signup" } }}
        >
          회원가입
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
    textAlign: "center",
    backgroundColor: "#655DEC",
    color: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  textDetail: {
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
  },
  innerLink: {
    fontWeight: "bold",
    color: "#655DEC",
  },
});
