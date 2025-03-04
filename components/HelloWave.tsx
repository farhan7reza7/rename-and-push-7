import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const HelloWave = () => {
  const deg = useSharedValue(0);

  useEffect(() => {
    deg.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 150 })
      ),
      4
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: deg.value + "deg" }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={ss.animatedText}>👋</Text>
    </Animated.View>
  );
};

const ss = StyleSheet.create({
  animatedText: {
    fontSize: 28,
    marginTop: -10,
  },
});

export default HelloWave;
