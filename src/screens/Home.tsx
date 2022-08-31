import { Link } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Navigation from "../config/Navigation";
import { useNavigation } from "@react-navigation/native";
import Board_list from "./Board_list";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.head}>💜Welcome to KLAI EDU!💜</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dictionary")}
      >
        <Text style={styles.link}>Dictionary</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Board_list")}
      >
        <Text style={styles.link}>Board</Text>
      </TouchableOpacity>
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
    marginBottom: 50,
  },
  secondHead: {
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
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
});
