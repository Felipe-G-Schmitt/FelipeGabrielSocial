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
  const [logado, setLogado] = useState("Deslogado")
  const user = auth.currentUser;
  
    function logout(){
        signOut(auth).then(() => {
            alert("Usuário deslogado com sucesso.")
        }).catch((error) => {
            alert("Erro ao deslogar usuário.")
        }
        )
    }
    onAuthStateChanged(auth, (user) => {
        if (user){
            setLogado("Logado")
        } else {
            setLogado("Deslogado")
            navigation.navigate("login")
        }
    })

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

  if(!user)return (
    <View style={styles.container}>
        <View style={styles.center}>
          <View style={styles.Home}>
            <Text style={{ color: "#fff", textAlign: "center", fontFamily: "Franklin Gothic Medium", fontSize: 20, marginBottom: "5px"}}>
              Seja bem vindo!
            </Text>
            <Button
              mode="contained"
              style={{
                backgroundColor: "#2BB7FF",
                color: "#fff",
              }}
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              Faça o login
            </Button>
            <View style={styles.distBottom}></View>
            <Button
              mode="contained"
              style={{
                backgroundColor: "#2BB7FF",
                color: "#fff",
              }}
              onPress={() => {
                navigation.navigate("RegisterScreen");
              }}
            >
              Faça o registro
            </Button>
          </View>
        </View>
    </View>
  ) 
  else return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 30 }}>Seja Bem-Vindo!</Text>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
        )}
      />
      <Button
        mode="contained"
        style={{ backgroundColor: "#2BB7FF", color: "#fff" }}
        onPress={logout}
      >
        Deslogar
      </Button>
    </View>
  );
}
