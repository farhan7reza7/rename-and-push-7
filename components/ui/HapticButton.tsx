import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";

const HapticButton = (props: BottomTabBarButtonProps) => {
  //if (props.href === "/about") return;
  return (
    <PlatformPressable
      {...props}
      onPressIn={(e) => {
        if (process.env.EXPO_OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
            () => {}
          );
        }
        props.onPressIn?.(e);
      }}
      android_ripple={{
        // Adjust the radius to control ripple size
        radius: 50,
        // Optionally, customize the ripple color
        //color: "rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default HapticButton;
