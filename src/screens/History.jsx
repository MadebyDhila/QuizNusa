import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";

const historyData = [
  { id: 1, date: "15 April 2026", category: "Seni Tari", score: 85, totalQuestions: 10, time: "5 menit" },
  { id: 2, date: "14 April 2026", category: "Seni Musik", score: 70, totalQuestions: 10, time: "6 menit" },
  { id: 3, date: "12 April 2026", category: "Seni Rupa", score: 90, totalQuestions: 10, time: "4 menit" },
  { id: 4, date: "10 April 2026", category: "Seni Campuran", score: 75, totalQuestions: 20, time: "7 menit" },
  { id: 5, date: "08 April 2026", category: "Seni Teater", score: 60, totalQuestions: 10, time: "5 menit" },
  { id: 6, date: "05 April 2026", category: "Seni Kriya", score: 95, totalQuestions: 10, time: "4 menit" },
  { id: 7, date: "01 April 2026", category: "Seni Tari", score: 80, totalQuestions: 10, time: "6 menit" },
];

const getCategoryIcon = (category) => {
  switch (category) {
    case "Seni Tari":
      return "accessibility";
    case "Seni Musik":
      return "music-note";
    case "Seni Rupa":
      return "palette";
    case "Seni Teater":
      return "theater-comedy";
    case "Seni Kriya":
      return "handyman";
    default:
      return "apps";
  }
};

export default function History() {
  const [activeMenu, setActiveMenu] = useState("history");

  const menus = [
    { key: "home", label: "HOME", icon: "home-outline", iconActive: "home" },
    { key: "leaderboard", label: "LEADERBOARD", icon: "trophy-outline", iconActive: "trophy" },
    { key: "history", label: "HISTORY", icon: "time-outline", iconActive: "time" },
  ];

  const HistoryItem = ({ item }) => {
    const iconName = getCategoryIcon(item.category);
    
    return (
      <View style={styles.historyCard}>
        <View style={styles.cardHeader}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color={colors.textLight} />
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.categoryContainer}>
            <View style={styles.iconBox}>
              <MaterialIcons name={iconName} size={20} color={colors.primary} />
            </View>
            <Text style={styles.category}>{item.category}</Text>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="help-circle-outline" size={14} color={colors.textLight} />
              <Text style={styles.statText}>{item.totalQuestions} soal</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={14} color={colors.textLight} />
              <Text style={styles.statText}>{item.time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.scoreText}>
            Skor: {item.score}/{item.totalQuestions}
          </Text>
          <TouchableOpacity style={styles.detailButton} activeOpacity={0.7}>
            <Text style={styles.detailButtonText}>Lihat Detail</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>History</Text>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Aktivitas Terbaru</Text>
          
          {historyData.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </View>
        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.navbar}>
        {menus.map((menu) => {
          const isActive = activeMenu === menu.key;
          return (
            <View
              key={menu.key}
              style={[styles.navItem, isActive && styles.navItemActive]}
            >
              <Ionicons
                name={isActive ? menu.iconActive : menu.icon}
                size={22}
                color={isActive ? colors.primary : "#999"}
              />
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {menu.label}
              </Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 25,
    paddingTop: 15,
    paddingBottom: 0,
  },
  
  // Header
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#800000",
    textAlign: "center",
    marginBottom: 25,
  },

  // Daftar history
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  
  // Card history
  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  cardBody: {
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  // Icon kotak
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#f3e8e5",
    justifyContent: "center",
    alignItems: "center",
  },
  category: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
    marginLeft: 52,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: colors.textLight,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  // Skor
  scoreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary,
  },

  spacer: {
    height: 80,
  },

  // Navbar
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  navItemActive: {
    backgroundColor: "#f3e8e5",
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