import { View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../utils/styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react"
import { auth, uploadToFirebase } from "../config/firebase";
import * as ImagePicker from 'expo-image-picker'; // Importando o módulo para selecionar imagens
import ImageUploadComponent from "../components/ImageUploadComponent";

export default function HomeScreen({ navigation }) {
  const [logado, setLogado] = useState("Deslogado")

  const pickImage = async () => {

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissões de rolagem para fazer isso funcionar!');
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
          const { uri } = result.assets[0];
          const fileName = uri.split('/').pop();
          const fileType = fileName.split('.').pop();
          await uploadToFirebase(uri, fileType);
          alert ('Imagem enviada com sucesso!')
          setTimeout(() => {
            navigation.navigate("Feed");
          }, 700);
      } else if (result.canceled) {
          alert('Você não selecionou uma imagem');
      } else {
          alert('Erro ao selecionar a imagem');
      }
  }

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
          <Button mode="contained" style={{ marginTop: 15, backgroundColor: "#2BB7FF", borderRadius: 0 }} onPress={pickImage}>Envie uma imagem!</Button>
        <Button mode="contained" style={{marginTop: 370, position: "fixed", backgroundColor:"#2BB7FF", alignSelf:"center"}} onPress={logout}>Deslogar</Button>
      </View>
    </View>
    )
}