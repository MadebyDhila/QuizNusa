// src/screens/Leaderboard.jsx
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
  { id: 1, name: "Seni Campuran", icon: "aperture-outline" },
  { id: 2, name: "Seni Tari", icon: "body-outline" },
  { id: 3, name: "Seni Musik", icon: "musical-notes-outline" },
  { id: 4, name: "Seni Rupa", icon: "color-palette-outline" },
  { id: 5, name: "Seni Teater", icon: "film-outline" },
  { id: 6, name: "Seni Kriya", icon: "hammer-outline" },
];

export default function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState("Seni Campuran");

  const CategoryItem = ({ item }) => {
    const isActive = selectedCategory === item.name;
    return (
      <TouchableOpacity
        style={[styles.categoryChip, isActive && styles.categoryChipActive]}
        onPress={() => setSelectedCategory(item.name)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={item.icon}
          size={16}
          color={isActive ? colors.background : colors.primary}
        />
        <Text
          style={[
            styles.categoryText,
            isActive && styles.categoryTextActive,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Leaderboard</Text>

        {/* CATEGORY */}
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

        {/* TOP 3 */}
        <View style={styles.topThreeContainer}>
          <View style={styles.topCard}>
            <Text style={styles.medalText}>🥈</Text>
            <Text style={styles.topName}>{leaderboardData[1].name}</Text>
            <Text style={styles.topScore}>
              {leaderboardData[1].score} poin
            </Text>
          </View>

          <View style={[styles.topCard, styles.topCardWinner]}>
            <Text style={styles.medalText}>🏆</Text>
            <Text style={styles.topNameWinner}>
              {leaderboardData[0].name}
            </Text>
            <Text style={styles.topScoreWinner}>
              {leaderboardData[0].score} poin
            </Text>
          </View>

          <View style={styles.topCard}>
            <Text style={styles.medalText}>🥉</Text>
            <Text style={styles.topName}>{leaderboardData[2].name}</Text>
            <Text style={styles.topScore}>
              {leaderboardData[2].score} poin
            </Text>
          </View>
        </View>

        {/* LIST */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Peringkat Lainnya</Text>

          {leaderboardData.slice(3).map((item, index) => (
            <View key={item.id} style={styles.leaderboardItem}>
              <Text style={styles.rankNumber}>{index + 4}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.scoreBadgeText}>
                {item.score} poin
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 30, // ✅ aman, gak bikin kotak
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#800000",
    textAlign: "center",
    marginBottom: 20,
  },

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
  },
  categoryText: {
    fontSize: 13,
    color: colors.primary,
  },
  categoryTextActive: {
    color: colors.background,
  },

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
    elevation: 3,
  },

  topCardWinner: {
    paddingTop: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
  },

  medalText: {
    fontSize: 24,
  },

  topName: {
    fontSize: 11,
    textAlign: "center",
  },

  topNameWinner: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },

  topScore: {
    fontSize: 10,
  },

  topScoreWinner: {
    fontSize: 11,
    fontWeight: "bold",
  },

  listContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  rankNumber: {
    width: 30,
    fontWeight: "bold",
  },

  name: {
    flex: 1,
  },

  scoreBadgeText: {
    fontWeight: "bold",
    color: colors.primary,
  },
});