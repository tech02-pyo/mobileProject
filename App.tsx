import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Navigation from "./src/config/Navigation";
import "expo-dev-menu";

export default function App() {
  return <Navigation />;
}
