import * as React from "react";
import { Image, ImageBackground, View } from "react-native";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Provider, Text, TextInput } from "react-native-paper";
import styles from "../utils/styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log("Login realizado com sucesso!");
        alert("Login realizado com sucesso!")
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.log("Erro ao logar: ", error);
        const errorCode = error.code;
        // Mensagem de erro
        if (errorCode === "auth/invalid-email") {
          alert("Email inválido!");
        }
        if (errorCode === "auth/user-not-found") {
          alert("Usuário não encontrado!");
        }
        if (errorCode === "auth/wrong-password") {
          alert("Senha incorreta!");
        }
      });
  }

  return (
    <Provider>
    <View style={styles.container}>
        <View style={styles.center}>
          <View style={styles.Register}>
            <View style={styles.center}>
            </View>
            <Text style={styles.title}>Login</Text>
            <View style={styles.distBottom}></View>
            <View style={styles.center}>
              <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                activeUnderlineColor="#2BB7FF"
              />
              <TextInput
                label={"Senha"}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
                style={styles.input}
                activeUnderlineColor="#2BB7FF"
              />
              <View style={styles.distBottom}></View>
              <Button
                mode="contained"
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "#2BB7FF",
                  borderRadius: 0,
                }}
                textColor="#fff"
                onPress={handleLogin}
              >
                Login
              </Button>
            </View>
          </View>
        </View>
    </View>
    </Provider>
  );
}