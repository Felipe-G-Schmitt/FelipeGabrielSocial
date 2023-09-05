import { useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { Button, Paragraph, Provider, TextInput } from "react-native-paper";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "../utils/styles";

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // função para lidar com o registro do usuário
  function handleRegister() {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log("Usuário criado com sucesso!");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log("Erro ao criar usuário: ", error);
        const errorCode = error.code; // auth/weak-password
        // Mensagem de erro
        if (errorCode === "auth/weak-password") {
          console.log("A senha é muito fraca.");
        }
        if (errorCode === "auth/invalid-email") {
          console.log("Email inválido!");
        }
        if (errorCode === "auth/email-already-exists") {
          console.log("Email ja cadastrado!");
        }
        if (errorCode === "auth/auth/invalid-password") {
          console.log("Senha inválida!");
        }
      });
  }

  return (
    <Provider>
      <View style={styles.container}>
          <View style={styles.center}>
            <View style={styles.Login}>
              <View style={styles.center}>
              </View>
              <Text style={styles.title}>Cadastre-se</Text>
              <View style={styles.distBottom}></View>
              <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                activeUnderlineColor="#2BB7FF"
              />
              <TextInput
                label={"Senha"}
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
                style={styles.input}
                activeUnderlineColor="#2BB7FF"
              />
              <View style={styles.distBottom}></View>
              <Button
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "#2BB7FF",
                  borderRadius: 0,
                }}
                textColor="#fff"
                mode="contained"
                onPress={handleRegister}
              >
                Registre-se
              </Button>
            </View>
          </View>
      </View>
    </Provider>
  );
}