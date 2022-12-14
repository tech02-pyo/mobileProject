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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.head}>๐Welocme to KLAI EDU!๐</Text>
      <Text style={styles.head}>Login</Text>
      <Text style={styles.secondHead}>์ด๋ฉ์ผ๊ณผ ๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํด์ฃผ์ธ์.</Text>
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
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
              //console.log("res", res);
              navigation.navigate("Home");
            })
            .catch((error) => {
              console.log("Error:", error.response);
              if (error.response.data.message === "login failed") {
                Alert.alert("์์ด๋์ ๋น๋ฐ๋ฒํธ๋ฅผ ํ์ธํด์ฃผ์ธ์.");
              } else {
                Alert.alert("๋ก๊ทธ์ธ์ ์คํจํ์ต๋๋ค. ๊ด๋ฆฌ์์๊ฒ ๋ฌธ์ํด์ฃผ์ธ์.");
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
        ์์ง ํ์์ด ์๋์ ๊ฐ์?{" "}
        <Link
          style={styles.innerLink}
          to={{ screen: "Signup", params: { id: "Signup" } }}
        >
          ํ์๊ฐ์
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
