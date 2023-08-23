import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import styles from "../utils/styles";

export default function HomeScreen({ navigation }) {
  return (
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
  );
}