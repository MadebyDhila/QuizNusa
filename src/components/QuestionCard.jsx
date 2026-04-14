import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../assets/theme";

export default function QuestionCard({ question, options, selectedAnswer, onSelectAnswer }) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedAnswer === index && styles.optionSelected,
            ]}
            onPress={() => onSelectAnswer(index)}
          >
            <View style={styles.optionRow}>
              <View style={[
                styles.radioCircle,
                selectedAnswer === index && styles.radioSelected
              ]}>
                {selectedAnswer === index && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.optionText,
                selectedAnswer === index && styles.optionTextSelected
              ]}>
                {String.fromCharCode(65 + index)}. {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#f8f8f8",
  },
  optionSelected: {
    backgroundColor: theme.colors.secondary + "20",
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  optionText: {
    fontSize: 15,
    color: theme.colors.text,
    flex: 1,
  },
  optionTextSelected: {
    color: theme.colors.primary,
    fontWeight: "500",
  },
});