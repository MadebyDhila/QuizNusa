// src/screens/Leaderboard.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator, // ✅ TAMBAHAN: untuk loading state
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";
import { supabase } from "../libs/supabase"; // ✅ TAMBAHAN: import supabase

// ✅ HAPUS: data statis leaderboardData (akan diambil dari Supabase)
// const leaderboardData = [ ... ];

const categories = [
  { id: 1, name: "Semua", icon: "apps-outline" }, // ✅ TAMBAH: opsi "Semua"
  { id: 2, name: "Seni Tari", icon: "body-outline" },
  { id: 3, name: "Seni Musik", icon: "musical-notes-outline" },
  { id: 4, name: "Seni Rupa", icon: "color-palette-outline" },
  { id: 5, name: "Seni Teater", icon: "film-outline" },
  { id: 6, name: "Seni Kriya", icon: "hammer-outline" },
  { id: 7, name: "Seni Campuran", icon: "aperture-outline" },
];

export default function Leaderboard() {
  // ✅ TAMBAHAN: State untuk data dari Supabase
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua"); // ✅ UBAH: default "Semua"

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

  // ✅ TAMBAHAN: Fungsi untuk mengambil data dari Supabase
  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("quiz_results")
        .select("player_name, score, category, percentage")
        .order("score", { ascending: false })
        .limit(50);
      
      // Filter berdasarkan kategori (kecuali "Semua")
      if (selectedCategory !== "Semua") {
        query = query.eq("category", selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Format data dengan menambahkan id (peringkat)
      const formattedData = data.map((item, index) => ({
        id: index + 1,
        name: item.player_name,
        score: item.score,
        category: item.category,
        percentage: item.percentage,
      }));
      
      setLeaderboardData(formattedData);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ TAMBAHAN: useEffect untuk mengambil data saat komponen mount atau kategori berubah
  useEffect(() => {
    fetchLeaderboard();
  }, [selectedCategory]);

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

  // ✅ TAMBAHAN: Animasi staggered untuk list items (hanya jika data sudah ada)
  const itemAnims = useRef([]).current;

  useEffect(() => {
    // Reset dan buat animasi baru saat data berubah
    if (leaderboardData.length > 0) {
      const anims = leaderboardData.slice(3).map(() => new Animated.Value(0));
      itemAnims.length = 0;
      itemAnims.push(...anims);
      
      anims.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          delay: 300 + index * 80,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [leaderboardData]);

  // ✅ TAMBAHAN: Tampilkan loading indicator
  if (loading) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Memuat leaderboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ✅ TAMBAHAN: Tampilkan pesan jika tidak ada data
  if (leaderboardData.length === 0) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={styles.container}
        >
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

          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🏆</Text>
            <Text style={styles.emptyTitle}>Belum Ada Data</Text>
            <Text style={styles.emptyText}>
              Ikuti kuis dulu yuk! Skor kamu akan muncul di sini.
            </Text>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper} edges={["top"]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.container}
      >
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

        {/* CATEGORY SECTION */}
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
        {leaderboardData.length >= 3 && (
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
              <Text style={styles.topName} numberOfLines={1}>
                {leaderboardData[1]?.name || "-"}
              </Text>
              <Text style={styles.topScore}>
                {leaderboardData[1]?.score || 0} poin
              </Text>
            </Animated.View>

            <Animated.View style={[styles.topCard, styles.topCardWinner]}>
              <Text style={styles.medalText}>🏆</Text>
              <Text style={styles.topNameWinner} numberOfLines={1}>
                {leaderboardData[0]?.name || "-"}
              </Text>
              <Text style={styles.topScoreWinner}>
                {leaderboardData[0]?.score || 0} poin
              </Text>
            </Animated.View>

            <Animated.View style={[styles.topCard, styles.topCardRight]}>
              <Text style={styles.medalText}>🥉</Text>
              <Text style={styles.topName} numberOfLines={1}>
                {leaderboardData[2]?.name || "-"}
              </Text>
              <Text style={styles.topScore}>
                {leaderboardData[2]?.score || 0} poin
              </Text>
            </Animated.View>
          </Animated.View>
        )}

        {/* LIST dengan staggered animation */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Peringkat Lainnya</Text>

          {leaderboardData.slice(3).map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.leaderboardItem,
                {
                  opacity: itemAnims[index] || new Animated.Value(1),
                  transform: [
                    {
                      translateX: itemAnims[index] 
                        ? itemAnims[index].interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                          })
                        : 0,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.rankNumber}>{index + 4}</Text>
              <View style={styles.playerInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.categoryTextSmall}>{item.category}</Text>
              </View>
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
    width: 35,
    fontWeight: "bold",
    fontSize: 16,
  },

  playerInfo: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text,
  },

  categoryTextSmall: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
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

  // ✅ TAMBAHAN: Style untuk loading state
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: colors.textLight,
  },

  // ✅ TAMBAHAN: Style untuk empty state
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});