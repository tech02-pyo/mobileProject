import axios from "axios";
import React, { useEffect, useState, memo } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import moment from "moment";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from "react-native-paper";

export let data: any[];
const Board_list = ({ navigation }) => {
  //const navigation = useNavigation();
  const [boardId, setBoardId] = useState(),
    //[data, setData] = useState([]),
    [writer, setWriter] = useState(""),
    [title, setTitle] = useState("");

  const getData = () => {
    axios.get(`http://localhost:3300/boards/`).then((res) => {
      data = res.data;
      setWriter(res.data.writer);
      setTitle(res.data.title);

      //console.log(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item }) => {
    const date = moment(item.reg_date).format("YYYY-MM-DD");
    return (
      <View>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>{item.title}</DataTable.Cell>
            <DataTable.Cell>{date}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    );
  };
  return (
    <View style={styles.table}>
      <Text style={styles.head}>📢 공지사항 📢 </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.board_id)}
        renderItem={renderItem}
        // ItemSeparatorComponent={() => (
        //   <View
        //     style={{
        //       height: 1,
        //       //backgroundColor: AppStyle.AppThemeColorDarkGray,
        //     }}
        //   />
        // )}
        //  onEndReachedThreshold={0}
        //onEndReached={() => getData()}
      />
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
