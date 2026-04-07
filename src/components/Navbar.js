import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/theme/colors";

export default function Navbar({ activeMenu = "home" }) {
  const menus = [
    { key: "home", label: "HOME", icon: "home" },
    { key: "leaderboard", label: "LEADERBOARD", icon: "bar-chart" },
    { key: "history", label: "HISTORY", icon: "time" },
  ];

  return (
    <View style={styles.navbar}>
      {menus.map((menu) => {
        const isActive = activeMenu === menu.key;
        return (
          <View key={menu.key} style={[styles.navItem, isActive && styles.navItemActive]}>
            <Ionicons
              name={menu.icon}
              size={20}
              color={isActive ? colors.primary : "#999"}
            />
            <Text style={[styles.navText, isActive && styles.navTextActive]}>
              {menu.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navItemActive: {
    alignItems: "center",
    backgroundColor: "#f3e8e5",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  navText: {
    fontSize: 10,
    color: "#888",
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 10,
    color: "#b55a3c",
    fontWeight: "bold",
    marginTop: 4,
  },
});