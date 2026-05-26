// src/screens/History.jsx
import React, { useRef, useEffect, useState } from "react"; // ✅ TAMBAH: useState
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator, // ✅ TAMBAH: loading state
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // ✅ TAMBAH: useFocusEffect
import colors from "../../assets/theme/colors";
import { supabase } from "../libs/supabase"; // ✅ TAMBAH: import supabase

// ✅ HAPUS: data statis historyData (akan diambil dari Supabase)
// const historyData = [ ... ];

const getCategoryIcon = (category) => {
  switch (category) {
    case "Seni Tari": return "accessibility";
    case "Seni Musik": return "music-note";
    case "Seni Rupa": return "palette";
    case "Seni Teater": return "theater-comedy";
    case "Seni Kriya": return "handyman";
    case "Seni Campuran": return "apps";
    default: return "apps";
  }
};

// ✅ TAMBAH: Fungsi untuk format tanggal dari ISO ke format yang lebih mudah dibaca
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// ✅ TAMBAH: Fungsi untuk format waktu (detik ke menit)
const formatTime = (seconds) => {
  if (!seconds) return "-";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes === 0) return `${remainingSeconds} detik`;
  return `${minutes} menit ${remainingSeconds > 0 ? `${remainingSeconds} detik` : ''}`;
};

export default function History() {
  const navigation = useNavigation();
  
  // ✅ TAMBAH: State untuk data dari Supabase
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ TAMBAH: Fungsi untuk mengambil data history dari Supabase
  const fetchHistory = async () => {
    setLoading(true);
    try {
      // Ambil data dari tabel quiz_results, urutkan dari yang terbaru
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .order("completed_at", { ascending: false })
        .limit(50);
      
      if (error) throw error;
      
      // Format data untuk ditampilkan
      const formattedData = data.map((item, index) => ({
        id: item.id || index + 1,
        date: formatDate(item.completed_at),
        category: item.category,
        score: item.score,
        totalQuestions: item.total_questions,
        percentage: item.percentage,
        time: formatTime(item.time_spent) || "-",
        rawDate: item.completed_at,
      }));
      
      setHistoryData(formattedData);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ TAMBAH: Refresh data setiap kali halaman History difokuskan
  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, [])
  );

  // Membuat nilai awal Animated dengan useRef
  const scrollY = useRef(new Animated.Value(0)).current;

  // Menggunakan diffClamp untuk membatasi perubahan nilai
  const diffClampY = Animated.diffClamp(scrollY, 0, 80);

  // Interpolasi untuk header title
  const headerTranslateY = diffClampY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  // Interpolasi untuk opacity header saat scroll
  const headerOpacity = diffClampY.interpolate({
    inputRange: [0, 40, 80],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  // Interpolasi untuk scale effect pada list container
  const listScale = diffClampY.interpolate({
    inputRange: [0, 40, 80],
    outputRange: [1, 0.98, 0.95],
    extrapolate: "clamp",
  });

  // Animasi untuk setiap item history (staggered saat mount)
  const itemAnims = useRef([]).current;

  useEffect(() => {
    // Reset dan buat animasi baru saat data berubah
    if (historyData.length > 0) {
      const anims = historyData.map(() => new Animated.Value(0));
      itemAnims.length = 0;
      itemAnims.push(...anims);
      
      anims.forEach((anim, index) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: 200 + index * 100,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [historyData]);

  const HistoryItem = ({ item, index, animatedValue }) => {
    const iconName = getCategoryIcon(item.category);

    // Interpolasi untuk efek slide dari bawah
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });

    const opacity = animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.7, 1],
    });

    return (
      <Animated.View
        style={[
          styles.historyCard,
          {
            opacity: opacity,
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        {/* HEADER */}
        <View style={styles.cardHeader}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color={colors.textLight} />
            <Text style={styles.date}>{item.date}</Text>
          </View>
          {/* ✅ TAMBAH: Badge persentase */}
          <View style={[
            styles.percentageBadge,
            item.percentage >= 70 ? styles.percentageGood : styles.percentageAverage
          ]}>
            <Text style={styles.percentageText}>{item.percentage}%</Text>
          </View>
        </View>

        {/* BODY */}
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
            {item.time !== "-" && (
              <View style={styles.statItem}>
                <Ionicons name="time-outline" size={14} color={colors.textLight} />
                <Text style={styles.statText}>{item.time}</Text>
              </View>
            )}
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.cardFooter}>
          <Animated.Text style={[
            styles.scoreText,
            {
              transform: [{ scale: animatedValue }],
            }
          ]}>
            Skor: {item.score}/{item.totalQuestions}
          </Animated.Text>

          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => navigation.navigate("Quiz")}
          >
            <Text style={styles.detailButtonText}>Coba Lagi</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  // ✅ TAMBAH: Tampilkan loading indicator
  if (loading) {
    return (
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Memuat riwayat...</Text>
        </View>
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
          History
        </Animated.Text>

        {/* LIST dengan animasi scale saat scroll */}
        <Animated.View
          style={[
            styles.listContainer,
            {
              transform: [{ scale: listScale }],
            },
          ]}
        >
          <Text style={styles.listTitle}>Aktivitas Terbaru</Text>

          {historyData.length === 0 ? (
            // ✅ TAMBAH: Empty state
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={64} color={colors.textLight} />
              <Text style={styles.emptyTitle}>Belum Ada Riwayat</Text>
              <Text style={styles.emptyText}>
                Yuk ikuti kuis dulu! Riwayat belajarmu akan muncul di sini.
              </Text>
            </View>
          ) : (
            historyData.map((item, index) => (
              <HistoryItem 
                key={item.id} 
                item={item} 
                index={index}
                animatedValue={itemAnims[index] || new Animated.Value(1)}
              />
            ))
          )}
        </Animated.View>
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
    paddingBottom: 140,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#800000",
    textAlign: "center",
    marginBottom: 25,
  },

  listContainer: {
    flex: 1,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },

  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border || "#eee",
    paddingBottom: 8,
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

  // ✅ TAMBAH: Style untuk badge persentase
  percentageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  percentageGood: {
    backgroundColor: "#4caf5020",
  },
  percentageAverage: {
    backgroundColor: "#ff980020",
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  cardBody: {
    marginBottom: 10,
  },

  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },

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
    marginTop: 10,
  },

  scoreText: {
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
    color: colors.primary,
  },

  // ✅ TAMBAH: Style untuk loading state
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: colors.textLight,
  },

  // ✅ TAMBAH: Style untuk empty state
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});