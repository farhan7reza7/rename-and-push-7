import { StyleSheet, Text, View } from "react-native";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Section</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 16,
    paddingBottom: 66,
  },
  text: { color: "#fff", fontSize: 24 },
});
