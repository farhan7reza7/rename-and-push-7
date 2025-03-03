import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export default function Explore() {
  const {
    colors: { primary },
  } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore Section</Text>
      <Text
        style={{
          color: primary,
          fontSize: 20,
          backgroundColor: "#fff",
          padding: 15,
          borderRadius: 5,
        }}
      >
        Explore Content
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "deeppink",
    padding: 16,
    paddingBottom: 66,
  },
  text: { color: "#000", fontSize: 24 },
});
