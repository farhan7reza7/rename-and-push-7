import Collapsable from "@/components/Collapsable";
import HelloWave from "@/components/HelloWave";
import ParallaxEffect from "@/components/ParallaxEffect";
import useBottomTabOverflow from "@/hooks/useBottomTabOverflow";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

export default function Profile() {
  const { width } = useWindowDimensions();
  const bottom = useBottomTabOverflow();

  return (
    <ParallaxEffect
      headerContent={
        <View style={styles.header}>
          <Text style={styles.text}>
            Header Section <HelloWave />
          </Text>
        </View>
      }
      bottom={bottom}
    >
      <View
        style={[
          styles.container,
          width > 768 ? { paddingLeft: 116 } : { paddingBottom: bottom + 16 },
        ]}
      >
        <View style={styles.title}>
          <Text style={styles.text}>Profile Section</Text>
          <HelloWave />
        </View>
        <View style={styles.collapsables}>
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <Collapsable
                key={i}
                title={`Title ${i + 1}`}
                style={{ backgroundColor: "transparent" }}
              >
                <Text>Content {i + 1}</Text>
              </Collapsable>
            ))}
        </View>
      </View>
    </ParallaxEffect>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
  },
  text: { color: "#000", fontSize: 24 },
  collapsables: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  header: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
