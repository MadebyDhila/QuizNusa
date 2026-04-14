import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";
import CategoryItem from "../components/CategoryItem";
import { categories } from "../data/Categories";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("home");

  const menus = [
    { key: "home", label: "HOME", icon: "home-outline", iconActive: "home" },
    { key: "leaderboard", label: "LEADERBOARD", icon: "trophy-outline", iconActive: "trophy" },
    { key: "history", label: "HISTORY", icon: "time-outline", iconActive: "time" },
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.title}>QuizNusa</Text>
        <Text style={styles.subtitle}>Kenali Budayamu, Banggakan Negerimu</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kuis Ragam Seni Nusantara</Text>
          <Text style={styles.cardDesc}>
            Siap-siap! Di kuis ini kamu akan menemukan berbagai pertanyaan dari beragam jenis kesenian. 
            Dari musik, tari, hingga seni rupa semuanya ada di sini. Yuk uji seberapa luas pengetahuan senimu!
          </Text>

          {/* Tombol START QUIZ hanya UI, tidak navigasi */}
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>START QUIZ</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/kesenian_nusantara.png")}
            style={styles.image}
          />
        </View>

        <Text style={styles.sectionTitle}>Mau main apa hari ini?</Text>
        <Text style={styles.sectionSubtitle}>
          Yuk pilih tantangan seru dan uji pengetahuanmu!
        </Text>

        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            desc={category.desc}
            icon={category.icon}
          />
        ))}

        <View style={styles.spacer} />
      </ScrollView>

      {/* NAVBAR - BISA DIKLIK UNTUK UBAH ACTIVE MENU (TAPI TIDAK NAVIGASI) */}
      <View style={styles.navbar}>
        {menus.map((menu) => {
          const isActive = activeMenu === menu.key;
          return (
            <TouchableOpacity
              key={menu.key}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => setActiveMenu(menu.key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? menu.iconActive : menu.icon}
                size={22}
                color={isActive ? colors.primary : "#999"}
              />
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {menu.label}
              </Text>
            </TouchableOpacity>
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
    paddingTop: 20,
  },
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 16,
    marginTop: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.background,
  },
  cardDesc: {
    color: colors.background,
    textAlign: "justify",
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.text,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    resizeMode: "cover",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.subtext,
    marginBottom: 5,
  },
  spacer: {
    height: 80,
  },
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