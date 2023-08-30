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

  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    textColor:"#fff"
  },

});

export default styles;