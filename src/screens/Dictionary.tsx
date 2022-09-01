import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import InputText from "../components/Input";

const API_KEY = "991862202F2CD86633B48A1F593D9CF9";
axios.defaults.withCredentials = true;

export default function Dictionary() {
  const [data_dic, setData_dic] = useState([]), //사전검색
    [data_info, setData_info] = useState([]), //사전내용
    [word, setWord] = useState(""),
    [subject, setSubject] = useState(""),
    [example, setExample] = useState([]),
    [pron, setPron] = useState("");

  function search() {
    axios
      .get(
        `https://stdict.korean.go.kr/api/search.do?certkey_no=4303&key=${API_KEY}&
    type_search=search&req_type=json&q=${word}&num=10&advanced=y`
      )
      .then((res) => {
        setData_dic(res.data.channel.item);
        const item =
          res.data.channel.item?.length > 0 ? res.data.channel.item[0] : [];

        setSubject(`${word}`);
        search_info(item.target_code);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  function search_info(target_code: string) {
    axios
      .get(
        `https://stdict.korean.go.kr/api/view.do?certkey_no=4304&key=${API_KEY}&type_search=view&req_type=json&method=TARGET_CODE&q=${target_code}`
      )
      .then((res) => {
        setData_info(res.data.channel.item);

        const item = res.data.channel.item;

        const pos_info = item.word_info.pos_info;

        let comm_pattern_info = null;

        if (pos_info && pos_info.length > 0) {
          comm_pattern_info = pos_info[0].comm_pattern_info;
        }

        let sense_info = null;
        if (comm_pattern_info && comm_pattern_info.length > 0) {
          sense_info = comm_pattern_info[0].sense_info;
        }

        let example_info = [];
        if (sense_info && sense_info.length > 0) {
          example_info = sense_info[0].example_info;
        }

        setExample(example_info);

        const pronunciation_info = item.word_info.pronunciation_info;
        let pronunciation = "";
        if (pronunciation_info && pronunciation_info.length > 0) {
          pronunciation = pronunciation_info[0].pronunciation;
        }

        setPron(`[발음 : ${pronunciation}]`);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  const reset = () => {
    setWord("");
    setSubject("");
    setData_dic([]);
    setPron("");
    setExample([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>📚 단어사전검색기 </Text>
      <Text style={styles.secondHead}>단어를 입력해주세요.</Text>
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
            {
              !word ? Alert.alert("단어를 입력해주세요.") : search();
            }
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
        <Text style={styles.word}>
          {subject}
          {subject && pron != "" ? (
            <Text style={{ fontSize: 18, color: "gray" }}> {pron}</Text>
          ) : null}
        </Text>

        <ScrollView>
          {data_dic
            ? data_dic.map((data, index): any => {
                return (
                  <Text key={index}>
                    <Text>{index + 1}) </Text>
                    <Text style={styles.pos}>{data.pos} </Text>
                    <Text>{data.sense.definition}</Text>
                  </Text>
                );
              })
            : null}
          {subject && example ? (
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
              <View>
                <Text style={styles.innerLink2}> 예시문 </Text>
              </View>
              <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            </View>
          ) : null}
          {example
            ? example.map((data, index) => {
                return (
                  <Text key={index}>
                    <Text>
                      {index + 1}) {data.example}
                    </Text>
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
  button2: {
    backgroundColor: "#655DEC",
    borderRadius: 20,
    width: 100,
    height: 20,
    textAlign: "center",
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
  innerLink2: {
    fontWeight: "bold",
    color: "#655DEC",

    fontSize: 15,
    textAlign: "center",
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  pos: {
    color: "#655DEC",
  },
});
