import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../utils/styles";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default function Feed({ navigation }) {
  const storage = getStorage();
  const [images, setImages] = useState([]);
  const [logado, setLogado] = useState("Deslogado");
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setLogado("Logado");
      loadImages();
    } else {
      setLogado("Deslogado");
      navigation.navigate("login");
    }
  }, [user]);

  function logout() {
    signOut(auth)
      .then(() => {
        alert("Usuário deslogado com sucesso.");
      })
      .catch((error) => {
        alert("Erro ao deslogar usuário.");
      });
  }

  async function loadImages() {
    try {
      const storageRef = ref(storage, "images"); // Change "images" to your storage path.
      const imageList = await listAll(storageRef);
      const imageUrls = await Promise.all(
        imageList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        })
      );
      setImages(imageUrls);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 15 }}>Seja Bem-Vindo!</Text>
      <Button
        mode="contained"
        style={{ backgroundColor: "#2BB7FF", color: "#fff" }}
        onPress={logout}
      >
        Logout
      </Button>

      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
        )}
      />
    </View>
  );
}
