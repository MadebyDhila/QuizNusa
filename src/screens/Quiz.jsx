import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { quizData } from "../data/Quiz";

export default function Quiz() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const totalQuestions = quizData.length;
  const currentQuestion = quizData[currentIndex];
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100; // 🔥 TAMBAH INI

  const handleSelectAnswer = (index) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: index,
    });
  };

  const handleNext = () => {
    if (selectedAnswers[currentIndex] === undefined) {
      Alert.alert("Peringatan", "Silakan pilih jawaban terlebih dahulu");
      return;
    }

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
    } else {
      let finalScore = 0;

      quizData.forEach((q, i) => {
        if (selectedAnswers[i] === q.correct) {
          finalScore++;
        }
      });

      setScore(finalScore);
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    setScore(0);
  };

  const handleBackToPreparation = () => {
    navigation.navigate("Preparation");
  };

  // ================= RESULT SCREEN =================
  if (isFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultBox}>
          <Text style={styles.resultEmoji}>🎉</Text>

          <Text style={styles.resultTitle}>Selesai!</Text>

          <Text style={styles.resultScore}>
            Skor: {score} / {totalQuestions}
          </Text>

          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestart}
          >
            <Text style={styles.restartText}>Kerjakan Ulang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backToPrepButton}
            onPress={handleBackToPreparation}
          >
            <Text style={styles.backToPrepText}>Kembali ke Preparation</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ================= QUIZ SCREEN =================
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* BACK */}
        <TouchableOpacity
          onPress={handleBackToPreparation}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←   Kembali</Text>
        </TouchableOpacity>

        {/* 🔥 PROGRESS BAR TIPIS - TAMBAHAN DI SINI */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>

        {/* PROGRESS */}
        <Text style={styles.progress}>
          Soal {currentIndex + 1} dari {totalQuestions}
        </Text>

        {/* QUESTION */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            {currentQuestion.question}
          </Text>
        </View>

        {/* OPTIONS */}
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedAnswers[currentIndex] === idx;

          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}
              onPress={() => handleSelectAnswer(idx)}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {String.fromCharCode(65 + idx)}. {option}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* BUTTONS */}
        <View style={styles.buttonRow}>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.prevButton}
              onPress={handlePrev}
            >
              <Text style={styles.prevText}>Sebelumnya</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextText}>
              {currentIndex + 1 === totalQuestions
                ? "Selesai"
                : "Selanjutnya"}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

// ================= STYLE =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  content: {
    flex: 1,
    padding: 20,
  },

  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 18,
    color: "#800000",
    fontWeight: "500",
  },

  // 🔥 PROGRESS BAR TIPIS - TAMBAHAN STYLE DI SINI
  progressBarContainer: {
    height: 3,
    backgroundColor: "#E0E0E0",
    borderRadius: 1.5,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#800000",
    borderRadius: 1.5,
  },

  progress: {
    textAlign: "right",
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
  },

  questionCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 2,
  },

  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    lineHeight: 24,
  },

  option: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  optionSelected: {
    borderColor: "#800000",
    backgroundColor: "#FFF0F0",
  },

  optionText: {
    fontSize: 15,
    color: "#333",
  },

  optionTextSelected: {
    color: "#800000",
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },

  prevButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#800000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  prevText: {
    color: "#800000",
    fontWeight: "600",
  },

  nextButton: {
    flex: 1,
    backgroundColor: "#800000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  nextText: {
    color: "#fff",
    fontWeight: "600",
  },

  resultBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  resultEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },

  resultTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#800000",
    marginBottom: 10,
  },

  resultScore: {
    fontSize: 20,
    marginBottom: 20,
  },

  restartButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },

  restartText: {
    fontWeight: "700",
    color: "#800000",
  },

  backToPrepButton: {
    borderWidth: 1,
    borderColor: "#800000",
    padding: 12,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },

  backToPrepText: {
    color: "#800000",
    fontWeight: "600",
  },
});