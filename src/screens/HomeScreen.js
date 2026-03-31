import React from "react";
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
import CategoryItem from "../components/CategoryItem";
import colors from "../theme/colors";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>QuizNusa</Text>
        <Text style={styles.subtitle}>
          Kenali Budayamu, Banggakan Negerimu
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Kuis Ragam Seni Nusantara
          </Text>

          <Text style={styles.cardDesc}>
            Siap-siap! Di kuis ini kamu akan menemukan berbagai pertanyaan dari beragam jenis kesenian. 
            Dari musik, tari, hingga seni rupa semuanya ada di sini. Yuk uji seberapa luas pengetahuan senimu!
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>START QUIZ</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/Kesenian Nusantara.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Mau main apa hari ini?</Text>
          <Text style={styles.sectionTitle}>Yuk pilih tantangan seru dan uji pengetahuanmu!</Text>
        </View>

        <CategoryItem title="Seni Tari" desc="Gerak penuh makna dari budaya Nusantara." icon="accessibility-new" />
        <CategoryItem title="Seni Musik" desc="Irama indah khas Indonesia." icon="music-note" />
        <CategoryItem title="Seni Rupa" desc="Karya visual penuh kreativitas." icon="palette" />
        <CategoryItem title="Seni Teater" desc="Cerita hidup di atas panggung." icon="theater-comedy" />
        <CategoryItem title="Seni Kriya" desc="Karya tangan bernilai seni." icon="handyman" />

        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.navbar}>
        <View style={styles.navItemActive}>
          <Ionicons name="home" size={20} color={colors.primary} />
          <Text style={styles.navTextActive}>HOME</Text>
        </View>

        <View style={styles.navItem}>
          <Ionicons name="bar-chart" size={20} color="#999" />
          <Text style={styles.navText}>LEADERBOARD</Text>
        </View>

        <View style={styles.navItem}>
          <Ionicons name="time" size={20} color="#999" />
          <Text style={styles.navText}>HISTORY</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    backgroundColor: "#f5f2ef" 
},

  container: { 
    padding: 25,
    paddingTop: 60,
   },

  title: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    color: "#800000",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#960019",
    borderRadius: 20,
    padding: 16,
    marginTop: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  item: {
  flexDirection: "row",
  backgroundColor: "#f8f8f8",
  padding: 14,
  borderRadius: 16,
  alignItems: "center",
  marginBottom: 12,
},

  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  cardDesc: {
    color: "#f3e8e5",
    marginBottom: 10,
    textAlign : 'justify',
  },

  button: {
    backgroundColor: "#f5c76b",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  buttonText: {
    fontWeight: "bold",
    textAlign: 'center',
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    resizeMode: "cover",
  },

  rowBetween: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },

  moreText: {
    color: "#b55a3c",
    fontWeight: "bold",
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
  },

  navItem: {
    alignItems: "center",
  },

  navItemActive: {
    alignItems: "center",
    backgroundColor: "#f3e8e5",
    padding: 8,
    borderRadius: 10,
  },

  navText: {
    fontSize: 10,
    color: "#888",
  },

  navTextActive: {
    fontSize: 10,
    color: "#b55a3c",
    fontWeight: "bold",
  },
});