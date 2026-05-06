// src/screens/Leaderboard.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
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

  // Membuat nilai awal Animated dengan useRef
  const scrollY = useRef(new Animated.Value(0)).current;

  // Menggunakan diffClamp untuk membatasi perubahan nilai
  const diffClampY = Animated.diffClamp(scrollY, 0, 100);

  // Interpolasi untuk header title
  const headerTranslateY = diffClampY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });

  // Interpolasi untuk opacity header saat scroll
  const headerOpacity = diffClampY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.6, 0],
    extrapolate: "clamp",
  });

  // Interpolasi untuk scale effect pada top 3 container
  const topThreeScale = diffClampY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.95, 0.9],
    extrapolate: "clamp",
  });

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

  // Animasi untuk setiap item leaderboard (staggered saat mount)
  const itemAnims = useRef(
    leaderboardData.slice(3).map(() => new Animated.Value(0))
  ).current;

  React.useEffect(() => {
    // Staggered animation untuk list items
    itemAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: 300 + index * 80,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper} edges={["top"]}>
      {/* Animated.ScrollView dengan onScroll dan Animated.event */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.container}
      >
        {/* Title dengan animasi scroll */}
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [{ translateY: headerTranslateY }],
              opacity: headerOpacity,
            },
          ]}
        >
          Leaderboard
        </Animated.Text>

        {/* CATEGORY SECTION - tetap terlihat saat scroll */}
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

        {/* TOP 3 dengan animasi scale saat scroll */}
        <Animated.View
          style={[
            styles.topThreeContainer,
            {
              transform: [{ scale: topThreeScale }],
            },
          ]}
        >
          <Animated.View style={[styles.topCard, styles.topCardLeft]}>
            <Text style={styles.medalText}>🥈</Text>
            <Text style={styles.topName}>{leaderboardData[1].name}</Text>
            <Text style={styles.topScore}>
              {leaderboardData[1].score} poin
            </Text>
          </Animated.View>

          <Animated.View style={[styles.topCard, styles.topCardWinner]}>
            <Text style={styles.medalText}>🏆</Text>
            <Text style={styles.topNameWinner}>
              {leaderboardData[0].name}
            </Text>
            <Text style={styles.topScoreWinner}>
              {leaderboardData[0].score} poin
            </Text>
          </Animated.View>

          <Animated.View style={[styles.topCard, styles.topCardRight]}>
            <Text style={styles.medalText}>🥉</Text>
            <Text style={styles.topName}>{leaderboardData[2].name}</Text>
            <Text style={styles.topScore}>
              {leaderboardData[2].score} poin
            </Text>
          </Animated.View>
        </Animated.View>

        {/* LIST dengan staggered animation */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Peringkat Lainnya</Text>

          {leaderboardData.slice(3).map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.leaderboardItem,
                {
                  opacity: itemAnims[index],
                  transform: [
                    {
                      translateX: itemAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.rankNumber}>{index + 4}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreBadgeText}>
                  {item.score} poin
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </Animated.ScrollView>
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
    paddingBottom: 30,
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

  topCardLeft: {
    transform: [{ translateX: 0 }],
  },

  topCardRight: {
    transform: [{ translateX: 0 }],
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

  scoreBadge: {
    backgroundColor: colors.primary + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  scoreBadgeText: {
    fontWeight: "bold",
    color: colors.primary,
  },
});