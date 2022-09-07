import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dictionary } from "../screens";
import { useIsFocused } from "@react-navigation/native";

let data = "";
export default function Home({ navigation }) {
  const [username, setUsername] = useState("");
  const isFocused = useIsFocused(); //refresh page
  useEffect(() => {
    getUserName();
  }, [isFocused]);

  async function getUserName() {
    data = await AsyncStorage.getItem("username");
    if (data !== null) {
      setUsername(data);
    } else {
      navigation.navigate("Login");
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.button_area}>
          <Text style={styles.head}>💜{username} 님💜</Text>

          <TouchableOpacity
            style={styles.button_logout}
            onPress={async () => {
              Alert.alert("로그아웃 되었습니다.");
              await AsyncStorage.removeItem("token").then(() => {
                AsyncStorage.removeItem("username");
                navigation.push("Login");
              });
            }}
          >
            <Text style={styles.link}>logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Dictionary />
    </>
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
    marginBottom: 50,
  },
  secondHead: {
    color: "gray",
    textAlign: "center",
    marginTop: 30,
    marginVertical: 10,
    fontSize: 18,
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
  button_logout: {
    alignSelf: "flex-end",
    textAlign: "center",
    backgroundColor: "#655DEC",
    color: "white",
    // paddingHorizontal: 25,
    paddingVertical: 15,
    //marginVertical: 10,
    borderRadius: 20,
    marginBottom: 50,
    marginRight: 5,
    marginLeft: 10,
    width: 90,
    height: 45,
  },
  button_area: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginBottom: -40,
  },
});
