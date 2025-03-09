import HelloWave from "@/components/HelloWave";
import ParallaxEffect from "@/components/ParallaxEffect";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export default function About() {
  return (
    <ParallaxEffect
      headerContent={
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={[styles.reactLogo]}
            contentFit="cover"
          />
        </View>
      }
    >
      <View style={[styles.container]}>
        <View style={styles.title}>
          <Text style={styles.text}>Welcome!</Text>
          <HelloWave />
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 1: Try it</Text>
          <Text>
            Edit <Text>app/(tabs)/index.tsx</Text> to see changes. Press{" "}
            <Text>
              {Platform.select({
                ios: "cmd + d",
                android: "cmd + m",
                web: "F12",
              })}
            </Text>{" "}
            to open developer tools.
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 2: Explore</Text>
          <Text>
            Tap the Explore tab to learn more about what's included in this
            starter app.
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 3: Get a fresh start</Text>
          <Text>
            When you're ready, run <Text>npm run reset-project</Text> to get a
            fresh <Text>app</Text> directory. This will move the current{" "}
            <Text>app</Text> to <Text>app-example</Text>.
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 4: Try it</Text>
          <Text>
            Edit <Text>app/(tabs)/index.tsx</Text> to see changes. Press{" "}
            <Text>
              {Platform.select({
                ios: "cmd + d",
                android: "cmd + m",
                web: "F12",
              })}
            </Text>{" "}
            to open developer tools.
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 5: Explore</Text>
          <Text>
            Tap the Explore tab to learn more about what's included in this
            starter app.
          </Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>Step 6: Get a fresh start</Text>
          <Text>
            When you're ready, run <Text>npm run reset-project</Text> to get a
            fresh <Text>app</Text> directory. This will move the current{" "}
            <Text>app</Text> to <Text>app-example</Text>.
          </Text>
        </View>
      </View>
    </ParallaxEffect>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, gap: 15 },
  title: {
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
  },
  text: { color: "#000", fontSize: 32, fontWeight: "bold" },
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  stepContainer: { gap: 8, marginBottom: 8 },
  stepText: { fontWeight: "bold", fontSize: 18 },
});
