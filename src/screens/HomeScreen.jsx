import { View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../utils/styles";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker'; // Importando o módulo para selecionar imagens

export default function HomeScreen({ navigation }) {
  const storage = getStorage();
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    if (image) {
      // Gerar um nome de arquivo único usando um timestamp
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}.jpg`; // Use a extensão de arquivo apropriada
  
      const storageRef = ref(storage, fileName);
  
      try {
        const response = await uploadBytes(storageRef, image);
        console.log('Imagem enviada com sucesso:', response);
        const downloadURL = await getDownloadURL(storageRef);
        console.log('URL de download da imagem:', downloadURL);
        // Agora você pode salvar a URL de download em seu banco de dados, se necessário.
      } catch (error) {
        console.error('Erro ao enviar imagem:', error);
      }
    }
  }
  

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permissão para acessar a galeria de imagens é necessária!");
      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImage({ uri: pickerResult.uri }); // Defina a imagem no formato correto
    }
  }
  

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
        <Text style={{ fontSize: 20, marginBottom: 15}}>Seja Bem-Vindo!</Text>
        <View style={{ backgroundColor:"#EBEBEB", width: "85%", borderWidth: 3, borderRadius: 10, borderColor: "#2BB7FF"}}>
          <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 15, textAlign:"center"}}>Publique uma imagem!</Text>
          <View style={{ marginTop: 5, width: "60%", alignSelf:"center"}}>
          <Button
            style={{ backgroundColor: "#2BB7FF", marginTop: 5, borderRadius: 0 }}
            mode="contained"
            onPress={selectImage}
          >
            Selecione uma imagem!
          </Button>
          {image && (
            <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 15 }} />
          )}
          </View>
          <Button
            mode="contained"
            style={{ marginTop: 15, backgroundColor: "#2BB7FF", borderRadius: 0 }}
            onPress={uploadImage}
          >
            Publicar
          </Button>
        <Button mode="contained" style={{marginTop: 700, position: "fixed", backgroundColor:"#2BB7FF"}} onPress={logout}>Deslogar</Button>
      </View>
    </View>
    )
}