import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/theme/colors";
import { quizData } from "../data/Quiz";

export default function Quiz() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const menus = [
    { key: "home", label: "HOME", icon: "home-outline", iconActive: "home" },
    { key: "leaderboard", label: "LEADERBOARD", icon: "trophy-outline", iconActive: "trophy" },
    { key: "history", label: "HISTORY", icon: "time-outline", iconActive: "time" },
  ];

  const currentQuestion = quizData[currentIndex];
  const totalQuestions = quizData.length;

  const handleSelectAnswer = (answerIndex) => {};
  const handleNext = () => {};
  const handlePrev = () => {};
  const handleRestart = () => {};
  const handleBack = () => {};

  if (isFinished) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>🏆</Text>
          <Text style={styles.resultTitle}>Selesai!</Text>
          <Text style={styles.resultScore}>
            Skor: 0 / {totalQuestions}
          </Text>
          <Text style={styles.resultMessage}>
            Ayo lebih giat belajar kesenian Nusantara!
          </Text>
          <TouchableOpacity style={styles.restartButton} activeOpacity={1}>
            <Text style={styles.restartButtonText}>Kerjakan Ulang</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navbar}>
          {menus.map((menu) => {
            const isActive = activeMenu === menu.key;
            return (
              <TouchableOpacity
                key={menu.key}
                style={[styles.navItem, isActive && styles.navItemActive]}
                activeOpacity={1}
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color={colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Kuis Seni Tari</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentIndex + 1) / totalQuestions) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Soal {currentIndex + 1} dari {totalQuestions}
          </Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentIndex] === idx;
            const letters = ["A", "B", "C", "D"];
            return (
              <View
                key={idx}
                style={[styles.optionCard, isSelected && styles.optionSelected]}
              >
                <View style={styles.optionRow}>
                  <View style={[styles.letterBox, isSelected && styles.letterBoxSelected]}>
                    <Text style={[styles.letterText, isSelected && styles.letterTextSelected]}>
                      {letters[idx]}
                    </Text>
                  </View>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {option}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.navigationButtons}>
          {currentIndex > 0 && (
            <View style={styles.prevButton}>
              <Ionicons name="chevron-back" size={20} color={colors.primary} />
              <Text style={styles.prevButtonText}>Sebelumnya</Text>
            </View>
          )}
          <View style={[styles.nextButton, currentIndex === 0 && { flex: 1 }]}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 === totalQuestions ? "Selesai" : "Selanjutnya"}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
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
    paddingTop: 10,
    paddingBottom: 0,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "left",
  },

  // Progress bar
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 8,
    textAlign: "right",
  },

  // Card soal
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    lineHeight: 26,
  },

  // Pilihan jawaban
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  optionSelected: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondary + "10",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  // Kotak huruf
  letterBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  letterBoxSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  letterText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  letterTextSelected: {
    color: colors.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: "500",
  },

  // Tombol navigasi
  navigationButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  prevButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  prevButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  nextButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  // Hasil akhir
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 16,
  },
  resultScore: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 12,
  },
  resultMessage: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
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