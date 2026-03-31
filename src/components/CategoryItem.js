import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function CategoryItem({ title, desc, icon }) {
  return (
    <View style={styles.item}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={24} color={colors.primary} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#c07a5c" />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "#eae6e3",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#f3e8e5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
  },

  desc: {
    color: "#777",
    fontSize: 12,
  },
});