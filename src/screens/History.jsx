import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
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
    case "Seni Tari": return "accessibility";
    case "Seni Musik": return "music-note";
    case "Seni Rupa": return "palette";
    case "Seni Teater": return "theater-comedy";
    case "Seni Kriya": return "handyman";
    default: return "apps";
  }
};

export default function History() {
  const navigation = useNavigation();

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
  const itemAnims = useRef(
    historyData.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Staggered animation untuk list items
    itemAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: 200 + index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, []);

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
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={14} color={colors.textLight} />
              <Text style={styles.statText}>{item.time}</Text>
            </View>
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
            <Text style={styles.detailButtonText}>Lihat Detail</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

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

          {historyData.map((item, index) => (
            <HistoryItem 
              key={item.id} 
              item={item} 
              index={index}
              animatedValue={itemAnims[index]}
            />
          ))}
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
});