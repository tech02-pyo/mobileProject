import axios from "axios";
import React, { useEffect, useState, memo } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import moment from "moment";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export let data: any[];
const Board_list = ({ navigation }) => {
  //const navigation = useNavigation();
  const [boardId, setBoardId] = useState(),
    //[data, setData] = useState([]),
    [writer, setWriter] = useState(""),
    [title, setTitle] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:3300/boards/`).then((res) => {
      data = res.data;
      setWriter(res.data.writer);
      setTitle(res.data.title);

      //console.log(res.data);
    });
  }, []);
  return (
    <View style={styles.table}>
      <Text style={styles.head}>📢 공지사항 📢 </Text>
      <DataTable>
        <DataTable.Header style={{ width: 450 }}>
          <DataTable.Title>TITLE</DataTable.Title>
          <DataTable.Title>DATE</DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {data
            ? data.map((data, index): any => {
                const date = moment(data.reg_date).format("YYYY-MM-DD");
                const board_id = data.board_id;
                return (
                  <DataTable.Row key={index} style={{ width: 450 }}>
                    <DataTable.Cell
                      onPress={() =>
                        navigation.navigate("Board", {
                          data: board_id,
                        })
                      }
                    >
                      {data.title}
                    </DataTable.Cell>
                    <DataTable.Cell>{date}</DataTable.Cell>
                  </DataTable.Row>
                );
              })
            : null}
        </ScrollView>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    //paddingTop: 100,
    paddingHorizontal: 30,
    height: 500,
  },
  head: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10,
  },
});
export default Board_list;
