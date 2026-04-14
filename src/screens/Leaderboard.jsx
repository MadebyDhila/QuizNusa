import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";

const leaderboardData = [
  { id: 1, name: "Budi Santoso", score: 950 },
  { id: 2, name: "Sari Dewi", score: 890 },
  { id: 3, name: "Ahmad Fauzi", score: 850 },
  { id: 4, name: "Lestari Putri", score: 820 },
  { id: 5, name: "Rizki Ramadhan", score: 780 },
  { id: 6, name: "Maya Sari", score: 750 },
  { id: 7, name: "Dimas Prasetyo", score: 720 },
  { id: 8, name: "Nadia Putri", score: 690 },
  { id: 9, name: "Bagas Wiratama", score: 650 },
  { id: 10, name: "Citra Kirana", score: 620 },
];

const categories = [
  { id: 1, name: "Seni Campuran", icon: "aperture-outline", isActive: true },
  { id: 2, name: "Seni Tari", icon: "body-outline", isActive: false },
  { id: 3, name: "Seni Musik", icon: "musical-notes-outline", isActive: false },
  { id: 4, name: "Seni Rupa", icon: "color-palette-outline", isActive: false },
  { id: 5, name: "Seni Teater", icon: "film-outline", isActive: false },
  { id: 6, name: "Seni Kriya", icon: "hammer-outline", isActive: false },
];

export default function Leaderboard() {
  const [activeMenu, setActiveMenu] = useState("leaderboard");
  const [selectedCategory, setSelectedCategory] = useState("Seni Campuran");

  const menus = [
    { key: "home", label: "HOME", icon: "home-outline", iconActive: "home" },
    { key: "leaderboard", label: "LEADERBOARD", icon: "trophy-outline", iconActive: "trophy" },
    { key: "history", label: "HISTORY", icon: "time-outline", iconActive: "time" },
  ];

  const CategoryItem = ({ item }) => {
    const isActive = selectedCategory === item.name;
    return (
      <TouchableOpacity 
        style={[styles.categoryChip, isActive && styles.categoryChipActive]}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={item.icon} 
          size={16} 
          color={isActive ? colors.background : colors.primary} 
        />
        <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Leaderboard</Text>

        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Kategori</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            renderItem={({ item }) => <CategoryItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.topThreeContainer}>
          <View style={styles.topCard}>
            <View style={[styles.medalContainer, { backgroundColor: "#C0C0C020" }]}>
              <Text style={styles.medalText}>🥈</Text>
            </View>
            <View style={styles.topInfoRow}>
              <Text style={styles.topName}>{leaderboardData[1].name}</Text>
              <Text style={styles.topScore}>{leaderboardData[1].score} poin</Text>
            </View>
            <Text style={styles.topRank}>2</Text>
          </View>

          <View style={[styles.topCard, styles.topCardWinner]}>
            <View style={[styles.medalContainer, { backgroundColor: "#FFD70020" }]}>
              <Text style={styles.medalText}>🏆</Text>
            </View>
            <View style={styles.topInfoRow}>
              <Text style={styles.topNameWinner}>{leaderboardData[0].name}</Text>
              <Text style={styles.topScoreWinner}>{leaderboardData[0].score} poin</Text>
            </View>
            <Text style={styles.topRankWinner}>1</Text>
          </View>

          <View style={styles.topCard}>
            <View style={[styles.medalContainer, { backgroundColor: "#CD7F3220" }]}>
              <Text style={styles.medalText}>🥉</Text>
            </View>
            <View style={styles.topInfoRow}>
              <Text style={styles.topName}>{leaderboardData[2].name}</Text>
              <Text style={styles.topScore}>{leaderboardData[2].score} poin</Text>
            </View>
            <Text style={styles.topRank}>3</Text>
          </View>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Peringkat Lainnya</Text>
          
          {leaderboardData.slice(3).map((item, index) => (
            <View key={item.id} style={styles.leaderboardItem}>
              <View style={styles.rankContainer}>
                <Text style={styles.rankNumber}>{index + 4}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreBadgeText}>{item.score} poin</Text>
              </View>
            </View>
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
  },
  
  // Header
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#800000",
    textAlign: "center",
    marginBottom: 20,
  },

  // Kategori scroll horizontal
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textLight,
    marginBottom: 12,
  },
  categoryList: {
    gap: 10,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.primary,
  },
  categoryTextActive: {
    color: colors.background,
  },

  // TOP 3 Container
  topThreeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 12,
    marginBottom: 30,
  },
  topCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    width: "30%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  topCardWinner: {
    paddingTop: 20,
    paddingBottom: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  medalContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  medalText: {
    fontSize: 24,
  },
  topInfoRow: {
    alignItems: "center",
    marginBottom: 4,
  },
  topName: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  topNameWinner: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  topScore: {
    fontSize: 10,
    color: colors.textLight,
  },
  topScoreWinner: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.secondary,
  },
  topRank: {
    fontSize: 10,
    color: colors.textLight,
  },
  topRankWinner: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.primary,
  },

  // Daftar pemain
  listContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rankContainer: {
    width: 40,
  },
  rankNumber: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text,
    marginLeft: 7,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  scoreBadge: {
    backgroundColor: colors.secondary + "30",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
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