import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import styles from "../utils/styles";

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("TabsNavigation");
  }, 700);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="#2BB7FF" />
      <Text>Aguarde um instante...</Text>
    </View>
  );
}