import { Dimensions, StyleSheet } from "react-native";
const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "georgia"
  },

  distBottom: {
    marginBottom: 20,
  },

});

export default styles;