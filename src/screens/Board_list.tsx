import axios from "axios";
import React, { useEffect, useState, memo } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import moment from "moment";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from "react-native-paper";

export let data: any[];
const itemsPerPage = 3;
const LIMIT = 10;
const Board_list = ({ navigation }) => {
  const [boardId, setBoardId] = useState(),
    [dataOffset, setDataOffset] = useState([]),
    [page, setPage] = useState(0),
    [offset, setOffset] = useState(0),
    [length, setLength] = useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const getData = () => {
    axios.get(`http://localhost:3300/boards/`).then((res) => {
      data = res.data;
      setDataOffset(res.data.slice(offset, offset + LIMIT));
      setOffset(offset + LIMIT);
      console.log("dataoffset", dataOffset.length); //9
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const onEndReached = () => {
    getData();
  };

  const renderItem = ({ item }) => {
    const date = moment(item.reg_date).format("YYYY-MM-DD");
    setLength(item.length);
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
        onEndReached={onEndReached} //onEndReachedThreshold로 지정해준 스크롤 지점에 도달 했을 때 실행할 함수 정의(10개씩 데이터를 불러옴)
        onEndReachedThreshold={0.6} //onEndReached 함수를 실행시킬 스크롤의 지점
      />
      <DataTable>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.floor(length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${length}`}
        />
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
