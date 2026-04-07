import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../assets/theme/colors";

export default function CategoryItem({ title, desc, icon }) {
  return (
    <View style={styles.item}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{desc}</Text>
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
    marginTop: 12,
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
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.text,
  },
  itemDesc: {
    color: colors.subtext,
    fontSize: 12,
  },
});