import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, DataTable, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";

let data: any[];
export default function Board({ route }) {
  const navigation = useNavigation();
  const board_id = route.params.data;
  const [writer, setWriter] = useState(""),
    [reg_date, setReg_date] = useState(""),
    [title, setTitle] = useState(""),
    [content, setContent] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3300/boards/${board_id}`).then((res) => {
      data = res.data;
      setWriter(res.data.writer);
      setTitle(res.data.title);
      setReg_date(res.data.reg_date);
      setContent(res.data.content);
    });
  }, []);

  const date = moment(reg_date).format("YYYY-MM-DD");

  return (
    <View style={styles.table}>
      <Text style={styles.head}>{title}</Text>
      <DataTable>
        <DataTable.Header style={{ width: 450 }}>
          <DataTable.Title>WRITER</DataTable.Title>
          <DataTable.Title>DATE</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell> {writer}</DataTable.Cell>
          <DataTable.Cell>{date}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>{content}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Board_list");
        }}
      >
        <Text style={styles.link}>목록</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  table: {
    //paddingTop: 100,
    paddingHorizontal: 30,
    height: 500,
  },
  head: {
    marginTop: 20,
    fontSize: 25,
    textAlign: "left",
    marginVertical: 10,
  },
  button: {
    width: "30%",
    textAlign: "center",
    backgroundColor: "#655DEC",
    color: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  link: {
    justifyContent: "center",
    alignItems: "center",
    //width: "30%",
    color: "white",
    textAlign: "center",
  },
});
