// src/screens/Home.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import colors from "../../assets/theme/colors";
import CategoryItem from "../components/CategoryItem";
import { categories } from "../data/Categories";
import axios from "axios";

export default function Home() {
  const navigation = useNavigation();

  // ================= STATE =================
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ================= REF =================
  const scrollRef = useRef(null);

  // ================= ANIMATED =================
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 120);
  const headerTranslateY = diffClampY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  const headerOpacity = diffClampY.interpolate({
    inputRange: [0, 60, 120],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  // ================= NAVIGATION =================
  const handleStartQuiz = () => {
    navigation.navigate("Preparation");
  };

  const handleCategoryPress = (categoryId, categoryTitle) => {
    navigation.navigate("Preparation", {
      categoryId,
      categoryTitle,
    });
  };

  // ================= GET COMMENTS =================
  const getComments = async () => {
    try {
      const response = await axios.get(
        "https://6a0bb5295aa893e1015a6503.mockapi.io/comments"
      );
      setComments(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    getComments();
  }, []);

  // ================= EDIT =================
  const handleEdit = (item) => {
    setComment(item.comment);
    setEditId(item.id);
    setIsEditing(true);
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    }, 300);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    Alert.alert(
      "Hapus Komentar",
      "Apakah kamu yakin ingin menghapus komentar ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },

        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(
                `https://6a0bb5295aa893e1015a6503.mockapi.io/comments/${id}`
              );
              getComments();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  // ================= POST & PUT =================
  const handleAddComment = async () => {
    if (comment.trim() === "") return;
    setLoading(true);
    try {
      // ================= PUT =================
      if (isEditing) {
        await axios.put(
          `https://6a0bb5295aa893e1015a6503.mockapi.io/comments/${editId}`,
          {
            username: "User QuizNusa",
            comment: comment,
            createdAt: new Date(),
          }
        );
        setIsEditing(false);
        setEditId(null);
      }

      // ================= POST =================
      else {
        await axios.post(
          "https://6a0bb5295aa893e1015a6503.mockapi.io/comments",
          {
            username: "User QuizNusa",
            comment: comment,
            createdAt: new Date(),
          }
        );
      }
      setComment("");
      getComments();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= RETURN =================
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.wrapper} edges={["top"]}>
          <Animated.ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            {/* HEADER */}
            <Animated.View
              style={[
                styles.headerWrapper,
                {
                  transform: [{ translateY: headerTranslateY }],
                  opacity: headerOpacity,
                },
              ]}
            >
              <Text style={styles.title}>QuizNusa</Text>
              <Text style={styles.subtitle}>
                Kenali Budayamu, Banggakan Negerimu
              </Text>
            </Animated.View>

            {/* CARD */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Kuis Ragam Seni Nusantara
              </Text>
              <Text style={styles.cardDesc}>
                Siap-siap! Di kuis ini kamu akan menemukan berbagai
                pertanyaan dari beragam jenis kesenian. Dari musik,
                tari, hingga seni rupa semuanya ada di sini. Yuk uji
                seberapa luas pengetahuan senimu!
              </Text>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleStartQuiz}
              >
                <Text style={styles.buttonText}>
                  START QUIZ
                </Text>
              </TouchableOpacity>
              <Image
                source={require("../../assets/kesenian_nusantara.png")}
                style={styles.image}
              />
            </View>

            {/* SECTION */}
            <Text style={styles.sectionTitle}>
              Mau main apa hari ini?
            </Text>
            <Text style={styles.sectionSubtitle}>
              Yuk pilih tantangan seru dan uji pengetahuanmu!
            </Text>

            {/* CATEGORY */}
            {categories?.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() =>
                  handleCategoryPress(
                    category.id,
                    category.title
                  )
                }
                activeOpacity={0.7}
              >
                <CategoryItem
                  title={category.title}
                  desc={category.desc}
                  icon={category.icon}
                />
              </TouchableOpacity>
            ))}

            {/* ================= KOMENTAR ================= */}
            <View style={styles.commentContainer}>
              <Text style={styles.commentTitle}>
                Komentar Pengguna
              </Text>

              {/* INPUT */}
              <TextInput
                style={styles.input}
                placeholder="Tulis komentar..."
                value={comment}
                onChangeText={setComment}
                multiline
                onFocus={() => {
                  setTimeout(() => {
                    scrollRef.current?.scrollToEnd({
                      animated: true,
                    });
                  }, 300);
                }}
              />

              {/* BUTTON */}
              <TouchableOpacity
                style={styles.commentButton}
                onPress={handleAddComment}
              >
                <Text style={styles.commentButtonText}>
                  {isEditing
                    ? "Update Komentar"
                    : "Kirim Komentar"}
                </Text>
              </TouchableOpacity>

              {/* LIST KOMENTAR */}
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.commentCard}>
                    <Text style={styles.commentUsername}>
                      {item.username}
                    </Text>
                    <Text style={styles.commentText}>
                      {item.comment}
                    </Text>
                    <View style={styles.actionContainer}>

                      {/* EDIT */}
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => handleEdit(item)}
                      >
                        <Text style={styles.editText}>
                          Edit
                        </Text>
                      </TouchableOpacity>

                      {/* DELETE */}
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() =>
                          handleDelete(item.id)
                        }
                      >
                        <Text style={styles.deleteText}>
                          Hapus
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyComment}>
                    Belum ada komentar
                  </Text>
                }
              />
            </View>
          </Animated.ScrollView>

          {/* ================= LOADING ================= */}
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator
                size="large"
                color="#800000"
              />
            </View>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    paddingBottom: 120,
  },

  headerWrapper: {
    marginBottom: 10,
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
    elevation: 5,
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
    marginBottom: 10,
  },

  /* ================= KOMENTAR ================= */
  commentContainer: {
    marginTop: 25,
  },

  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  commentButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15,
  },

  commentButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },

  commentCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  commentUsername: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#800000",
  },

  commentText: {
    color: colors.text,
  },

  emptyComment: {
    textAlign: "center",
    color: colors.subtext,
    fontStyle: "italic",
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginTop: 10,
  },

  editButton: {
    paddingHorizontal: 10,
  },

  editText: {
    color: "#0066cc",
    fontWeight: "bold",
  },

  deleteButton: {
    paddingHorizontal: 10,
  },

  deleteText: {
    color: "red",
    fontWeight: "bold",
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});