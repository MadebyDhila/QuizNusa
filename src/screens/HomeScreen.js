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
import Navbar from "../components/Navbar";
import { categories } from "../data/CategoryData";

export default function HomeScreen() {
  const [activeMenu, setActiveMenu] = useState("home");
  const categoryList = categories;

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}
        <Text style={styles.title}>QuizNusa</Text>
        <Text style={styles.subtitle}>
          Kenali Budayamu, Banggakan Negerimu
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kuis Ragam Seni Nusantara</Text>
          <Text style={styles.cardDesc}>
            Siap-siap! Di kuis ini kamu akan menemukan berbagai pertanyaan dari beragam jenis kesenian. 
            Dari musik, tari, hingga seni rupa semuanya ada di sini. Yuk uji seberapa luas pengetahuan senimu!
          </Text>

          <TouchableOpacity style={styles.button}>
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

        {categoryList.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            desc={category.desc}
            icon={category.icon}
          />
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>

      <Navbar activeMenu={activeMenu} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container utama
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 25,
    paddingBottom: 80,
  },

  // Header
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#800000",
    textAlign: "center",
    marginTop: 40,
  },
  subtitle: {
    fontStyle: "italic",
    color: colors.subtext,
    textAlign: "center",
    marginBottom: 20,
  },

  // Hero Card
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

  // Section
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
});