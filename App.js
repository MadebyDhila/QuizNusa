import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import History from "./src/screens/History";

export default function App() {
  return (
    <SafeAreaProvider>
      <History />
    </SafeAreaProvider>
  );
}