import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";

export default function Preparation() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [playerName, setPlayerName] = useState("");

  const menus = [
    { key: "home", label: "HOME", icon: "home-outline", iconActive: "home" },
    { key: "leaderboard", label: "LEADERBOARD", icon: "trophy-outline", iconActive: "trophy" },
    { key: "history", label: "HISTORY", icon: "time-outline", iconActive: "time" },
  ];

  const handleMenuPress = (key) => {
  };

  const handleStartQuiz = () => {
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>QuizNusa</Text>
        <Text style={styles.subtitle}>Kenali Budayamu, Banggakan Negerimu</Text>

        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/seni_tari.jpg")}
            style={styles.heroImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayLabel}>KUIS TERPILIH</Text>
            <Text style={styles.overlayTitle}>Seni Tari</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Persiapan Kuis</Text>
        <Text style={styles.sectionDesc}>
          Selamat datang kembali! Silakan masukkan nama Anda untuk memulai 
          petualangan budaya ini dan mencatatkan skor terbaik Anda.
        </Text>

        <Text style={styles.inputLabel}>MASUKKAN NAMA ANDA</Text>
        <TextInput
          style={styles.input}
          placeholder="Tuliskan nama lengkap..."
          placeholderTextColor={colors.textLight}
          value={playerName}
          onChangeText={setPlayerName}
        />

        <View style={styles.startButton}>
          <Text style={styles.startButtonText}>MULAI KUIS</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <View style={[styles.iconCircle, { backgroundColor: "#2196F315" }]}>
              <Ionicons name="time-outline" size={24} color="#2196F3" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>DURASI</Text>
              <Text style={styles.infoValue}>15 Menit</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={[styles.iconCircle, { backgroundColor: "#FFC10715" }]}>
              <Ionicons name="help-circle-outline" size={24} color="#FFC107" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>PERTANYAAN</Text>
              <Text style={styles.infoValue}>10 Soal</Text>
            </View>
          </View>
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
  },
  subtitle: {
    fontStyle: "italic",
    color: colors.subtext,
    textAlign: "center",
    marginBottom: 30,
  },

  // Gambar dengan overlay
  imageContainer: {
    marginBottom: 24,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  overlayLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.secondary,
    marginBottom: 5,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.background,
  },

  // Persiapan Kuis
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  sectionDesc: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 22,
    marginBottom: 24,
  },

  // Input Nama
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: colors.text,
    backgroundColor: "#fff",
    marginBottom: 24,
  },

  // Tombol Mulai Kuis
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.background,
    letterSpacing: 1,
  },

  // Info Row
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textLight,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
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