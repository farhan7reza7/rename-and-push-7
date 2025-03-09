import ExternalLink from "@/components/ui/ExternalLink";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

export default function Notifications({ size = 50 }) {
  const scaledSize = useSharedValue(size);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      const newSize =
        scaledSize.value === 2 * size
          ? Math.round(scaledSize.value / 2)
          : 2 * size;

      scaledSize.value = withSpring(newSize);
    });

  const styledProps = useAnimatedStyle(() => {
    return {
      width: scaledSize.value,
      height: scaledSize.value,
    };
  });

  const drag = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  /*.onChange((e) => {
    translateX.value += e.changeX;
    translateY.value += e.changeY;
  });*/

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={drag}>
        <Animated.View style={[styles.bounceContainer, containerStyle]}>
          <GestureDetector gesture={doubleTap}>
            <Animated.View style={[styles.bounce, styledProps]} />
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
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
  bounceContainer: { backgroundColor: "#fff", padding: 10 },
  text: { color: "#fff", fontSize: 24 },
  link: { color: "blue", fontSize: 18, textAlign: "center" },
  linkContainer: { backgroundColor: "#fff", borderRadius: 10, padding: 10 },
  bounce: {
    backgroundColor: "indigo",
    borderRadius: "50%",
    width: 50,
    height: 50,
  },
});
