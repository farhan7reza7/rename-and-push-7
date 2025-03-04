import ExternalLink from "@/components/ui/ExternalLink";
import { StyleSheet, Text, View } from "react-native";

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Section</Text>
      <View style={styles.linkContainer}>
        <ExternalLink style={styles.link} href="https://www.farhan7reza.com/">
          Go to Portfolio
        </ExternalLink>
      </View>
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
    gap: 10,
  },
  text: { color: "#fff", fontSize: 24 },
  link: { color: "blue", fontSize: 18, textAlign: "center" },
  linkContainer: { backgroundColor: "#fff", borderRadius: 10, padding: 10 },
});
