import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import InputText from "../components/Input";

const API_KEY = "991862202F2CD86633B48A1F593D9CF9";
axios.defaults.withCredentials = true;

export default function Dictionary() {
  const [data_dic, setData_dic] = useState([]), //사전검색
    [data_info, setData_info] = useState([]), //사전내용
    [word, setWord] = useState(""),
    [subject, setSubject] = useState(""),
    [target_code, setTarget_code] = useState("");

  const search = () => {
    axios
      .get(
        `https://stdict.korean.go.kr/api/search.do?certkey_no=4303&key=${API_KEY}&
    type_search=search&req_type=json&q=${word}&num=10&advanced=y`
      )
      .then((res) => {
        setData_dic(res.data.channel.item);
        setTarget_code(res.data.channel.item[0].target_code);
        let item = "";
        const target_length = res.data.channel.item.length;
        if (target_length < 1) {
          //target_code가 2개 이상일 경우
          let num = 0;
          for (num = 0; num <= target_length; num++) {
            item = res.data.channel.item[num].target_code;
            console.log("item", item);
          }
        }
        setSubject(`${word}`);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const search_info = () => {
    axios
      .get(
        `https://stdict.korean.go.kr/api/view.do?certkey_no=4304&key=${API_KEY}&
        type_search=view&req_type=json&method=TARGET_CODE&q=${target_code}`
      )
      .then((res) => {
        setData_info(res.data.channel.item);
        console.log("info:", res.data.item);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const reset = () => {
    setWord("");
    setSubject("");
    setData_dic([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>📚 단어사전검색기 </Text>
      <Text style={styles.secondHead}>검색어를 입력해주세요.</Text>
      <InputText
        placeholder="검색어"
        style={styles.input}
        value={word}
        onChangeText={(text: React.SetStateAction<string>) => setWord(text)}
      />
      <View style={styles.button_area}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            search();
            search_info();
          }}
        >
          <Text style={styles.link}>검색</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            reset();
          }}
        >
          <Text style={styles.link}>초기화</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.word}>{subject}</Text>
        <ScrollView>
          {data_dic
            ? data_dic.map((data, index): any => {
                return (
                  <Text key={index}>
                    <Text>{data.sup_no}) </Text>
                    <Text style={styles.pos}>{data.pos} </Text>
                    <Text>{data.sense.definition}</Text>
                    <Text></Text>
                    {data.target_code}
                  </Text>
                );
              })
            : null}
        </ScrollView>
      </View>
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
  word: {
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 10,
  },
  secondHead: {
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  button_area: {
    alignSelf: "center",
    flexDirection: "row",
  },

  button: {
    alignSelf: "flex-start",
    textAlign: "center",
    backgroundColor: "#655DEC",
    color: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
    marginRight: 5,
    width: 150,
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
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  pos: {
    color: "#655DEC",
  },
});
