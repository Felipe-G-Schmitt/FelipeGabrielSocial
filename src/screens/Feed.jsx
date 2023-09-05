import React, { useState, useEffect } from "react";
import { View, Image, FlatList, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../utils/styles";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import { getStorage, listAll, getDownloadURL } from "firebase/storage";

export default function Feed({ navigation }) {
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

    const [imagesUrl, setImagesUrl] = useState([])

    const storage = getStorage();
    useEffect(() => {
        setURLsToFilesInBucket();
    }, [])

    const setURLsToFilesInBucket = async () => {
        const imageRefs = await listAll(ref(storage, "images"));
        const urls = await Promise.all(imageRefs.items.map((imageRef) => getDownloadURL(imageRef)));
        setImagesUrl(urls);
    };

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
  <ScrollView style={{ backgroundColor: "white"}}>
    <View style={styles.container}>
      
      <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 30 }}>Seja Bem-Vindo!</Text>
      {imagesUrl.map((url) => (
                <Image
                    style={{ width: 200, height: 200, marginBottom: 10, borderColor: "#2BB7FF", borderWidth: 3, borderRadius: 10, }}
                    source={{
                    uri: url,
                    }}
                />
            ))}
      <Button
        mode="contained"
        style={{ backgroundColor: "#2BB7FF", color: "#fff", marginBottom: 10 }}
        onPress={logout}
      >
        Deslogar
      </Button>
      
    </View>
    </ScrollView>
  );
}
