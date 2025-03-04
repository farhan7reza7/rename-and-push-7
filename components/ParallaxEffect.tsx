import useBottomTabOverflow from "@/hooks/useBottomTabOverflow";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

interface Props {
  children: JSX.Element;
  headerContent: JSX.Element;
  HEADER_HEIGHT?: number;
}

const ParallaxEffect = ({
  headerContent,
  children,
  HEADER_HEIGHT = 250,
}: Props) => {
  const srollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(srollRef);
  const bottom = useBottomTabOverflow();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [1, 1, 2]
          ),
        },
      ],
    };
  });

  return (
    <View style={ss.container}>
      <Animated.ScrollView
        ref={srollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={ss.scrollContent}
      >
        <Animated.View
          style={[animatedStyle, ss.header, { height: HEADER_HEIGHT }]}
        >
          {headerContent}
        </Animated.View>
        <View style={ss.children}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
};

const ss = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { overflow: "hidden", flexGrow: 1 },
  header: {
    overflow: "hidden",
  },
  children: {
    flex: 1,
    overflow: "hidden",
  },
});

export default ParallaxEffect;
