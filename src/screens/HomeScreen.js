import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";

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
            source={require("../../assets/kesenian_nusantara.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Mau main apa hari ini?</Text>
          <Text style={styles.sectionTitle}>Yuk pilih tantangan seru dan uji pengetahuanmu!</Text>
        </View>

        <View style={styles.item}>
          <View style={styles.iconBox}>
            <MaterialIcons name="accessibility-new" size={24} color={colors.primary} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Seni Tari</Text>
            <Text style={styles.itemDesc}>Gerak penuh makna dari budaya Nusantara.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#c07a5c" />
        </View>

        <View style={styles.item}>
          <View style={styles.iconBox}>
            <MaterialIcons name="music-note" size={24} color={colors.primary} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Seni Musik</Text>
            <Text style={styles.itemDesc}>Irama indah khas Indonesia.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#c07a5c" />
        </View>

        <View style={styles.item}>
          <View style={styles.iconBox}>
            <MaterialIcons name="palette" size={24} color={colors.primary} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Seni Rupa</Text>
            <Text style={styles.itemDesc}>Karya visual penuh kreativitas.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#c07a5c" />
        </View>

        <View style={styles.item}>
          <View style={styles.iconBox}>
            <MaterialIcons name="theater-comedy" size={24} color={colors.primary} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Seni Teater</Text>
            <Text style={styles.itemDesc}>Cerita hidup di atas panggung.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#c07a5c" />
        </View>

        <View style={styles.item}>
          <View style={styles.iconBox}>
            <MaterialIcons name="handyman" size={24} color={colors.primary} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemTitle}>Seni Kriya</Text>
            <Text style={styles.itemDesc}>Karya tangan bernilai seni.</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#c07a5c" />
        </View>

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
  // Container utama
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 25,
  },

  // Header
  title: {
    fontSize: 34,
    fontWeight: "700",
    color:  "#800000",
    textAlign: "center",
    marginTop: -10,
  },
  subtitle: {
    fontStyle: "italic",
    color: colors.subtext,
    textAlign: "center",
    marginBottom: 20,
  },

  // Hero Card
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
    textAlign: 'center',
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
  },

  // Category Item
  item: {
    flexDirection: "row",
    backgroundColor: "#eae6e3",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
  },
  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#f3e8e5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
  itemDesc: {
    color: "#777",
    fontSize: 12,
  },

  // Navbar Bawah
 navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    position: "absolute",   
    bottom: 0,              
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navItemActive: {
    alignItems: "center",
    backgroundColor: "#f3e8e5",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
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