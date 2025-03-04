import Collapsable from "@/components/Collapsable";
import useBottomTabOverflow from "@/hooks/useBottomTabOverflow";
import { useTheme } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function Create() {
  const { width } = useWindowDimensions();
  const {
    colors: { background, text },
  } = useTheme();

  const overflowHeight = useBottomTabOverflow();

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContent,
          width > 768
            ? { paddingLeft: 116 }
            : { paddingBottom: overflowHeight + 16 },
        ]}
      >
        <Text style={styles.text}>Create Section</Text>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Collapsable
              key={i}
              title={`First Collapsable ${i + 1}`}
              style={{ backgroundColor: "transparent" }}
            >
              <Text style={[styles.content, { color: text }]}>
                {i + 1} First Collapsable, check if work or not
              </Text>
            </Collapsable>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
    gap: 10,
    paddingTop: 50,
    padding: 16,
  },
  text: { color: "#000", fontSize: 24 },
  content: {
    fontSize: 16,
  },
});
