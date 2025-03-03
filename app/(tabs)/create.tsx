import { StyleSheet, Text, View } from "react-native";

export default function Create() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Section</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 16,
    paddingBottom: 66,
  },
  text: { color: "#000", fontSize: 24 },
});
