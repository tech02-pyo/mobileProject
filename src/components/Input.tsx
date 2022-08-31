import React from "react";
import { TextInput as Input, View, Text } from "react-native";
export default function InputText({ ...props }) {
  return (
    <View>
      <Input {...props}></Input>
    </View>
  );
}
