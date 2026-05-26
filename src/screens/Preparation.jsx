// src/screens/Preparation.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated, // Tambahan untuk animasi
  Keyboard, // Untuk dismiss keyboard
  TouchableWithoutFeedback, // Untuk dismiss keyboard
  Alert, // ✅ TAMBAHAN: Untuk menampilkan alert jika nama kosong
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../assets/theme/colors";

// ✅ TAMBAHAN: Import Supabase (untuk step selanjutnya, kalau mau langsung simpan)
// import { supabase } from "../libs/supabase";

export default function Preparation() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, categoryTitle } = route.params || {};
  
  // State untuk TextInput
  const [playerName, setPlayerName] = useState("");
  
  // Animasi untuk input (sesuai modul BAB 6 & 7)
  const inputAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(1)).current;

  // Animasi saat komponen mount
  useEffect(() => {
    Animated.spring(inputAnimation, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  // ✅ PERBAIKAN: Handle Start dengan Alert
  const handleStart = () => {
    if (!playerName.trim()) {
      Alert.alert("Info", "Masukkan nama kamu dulu ya!");
      return;
    }
    
    // Animasi button press
    Animated.sequence([
      Animated.timing(buttonAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Sembunyikan keyboard sebelum navigasi
    Keyboard.dismiss();
    
    setTimeout(() => {
      navigation.navigate("Quiz", { 
        playerName: playerName.trim(),
        categoryId,
        categoryTitle 
      });
    }, 150);
  };

  const handleBackToHome = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.wrapper} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Penting untuk form
        >
          {/* BACK BUTTON */}
          <TouchableOpacity onPress={handleBackToHome} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#800000" />
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>

          {/* IMAGE */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/seni_tari.jpg")}
              style={styles.heroImage}
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayLabel}>KUIS TERPILIH</Text>
              <Text style={styles.overlayTitle}>
                {categoryTitle || "Seni Nusantara"}
              </Text>
            </View>
          </View>

          {/* CONTENT */}
          <Text style={styles.sectionTitle}>Persiapan Kuis</Text>
          <Text style={styles.sectionDesc}>
            Masukkan nama kamu sebelum mulai kuis agar skor bisa tercatat di leaderboard.
          </Text>

          {/* INPUT - SESUAI MODUL */}
          <Text style={styles.inputLabel}>MASUKKAN NAMA</Text>
          <Animated.View
            style={{
              transform: [{ scale: inputAnimation }],
              opacity: inputAnimation,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Contoh: Budi Santoso"
              placeholderTextColor={colors.textLight || "#999"}
              value={playerName}
              onChangeText={setPlayerName}
              // Properti TextInput tambahan sesuai modul:
              autoCapitalize="words"        // Kapitalisasi awal kata
              autoCorrect={false}           // Nonaktifkan koreksi otomatis
              maxLength={30}                // Batasi panjang nama
              returnKeyType="done"          // Tombol "Done" di keyboard
              onSubmitEditing={handleStart} // Submit dengan tombol keyboard
              blurOnSubmit={true}           // Hilangkan fokus setelah submit
            />
          </Animated.View>

          {/* BUTTON */}
          <Animated.View style={{ transform: [{ scale: buttonAnimation }] }}>
            <TouchableOpacity
              style={[
                styles.startButton,
                !playerName.trim() && styles.startButtonDisabled
              ]}
              onPress={handleStart}
              activeOpacity={0.8}
              disabled={!playerName.trim()}
            >
              <Text style={styles.startButtonText}>
                {playerName.trim() ? "MULAI KUIS" : "ISI NAMA DULU"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* INFO */}
          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={22} color="#2196F3" />
              <Text style={styles.infoText}>15 Menit</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="help-circle-outline" size={22} color="#FFC107" />
              <Text style={styles.infoText}>10 Soal</Text>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background || "#F5F5F5",
  },
  container: {
    padding: 25,
    paddingTop: 15,
    paddingBottom: 30,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#800000",
    marginLeft: 5,
    fontWeight: "500",
  },
  imageContainer: {
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginTop: 15,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  overlayLabel: {
    color: "#FFD700",
    fontSize: 13,
  },
  overlayTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 10,
    color: "#333",
  },
  sectionDesc: {
    fontSize: 14,
    color: colors.textLight || "#666",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  startButton: {
    backgroundColor: "#800000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
    marginHorizontal: 5,
  },
  startButtonDisabled: {
    backgroundColor: "#ccc",
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  infoText: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#333",
  },
});