import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text } from "react-native";

interface LargeScreenTabProps extends BottomTabBarButtonProps {
  route: { name: string; [key: string]: any };
}

const LargeScreenTab = (props: LargeScreenTabProps) => {
  const { onPress, accessibilityState, route } = props;
  const focused = accessibilityState?.selected;

  // Map route names to icon names and titles
  const iconMap: Record<string, { icon: string; title: string }> = {
    index: { icon: "home", title: "Home" },
    explore: { icon: "send", title: "Explore" },
    create: { icon: "create", title: "Create" },
    notifications: {
      icon: "notifications",
      title: "Notifications",
    },
    profile: { icon: "person", title: "Profile" },
  };

  const { icon, title } = iconMap[route.name] || {
    icon: "help",
    title: route.name,
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.verticalTabButton,
        hovered || pressed ? styles.verticalTabHovered : {},
      ]}
    >
      <Ionicons
        name={icon as any}
        size={24}
        color={focused ? "deeppink" : "#888"}
      />
      <Text
        style={[
          styles.verticalTabLabel,
          { color: focused ? "deeppink" : "#888" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  verticalTabButton: {
    width: 80,
    paddingVertical: 12,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalTabHovered: {
    backgroundColor: `rgba(255, 20, 147, 0.1)`,
    borderRadius: 10,
  },
  verticalTabLabel: {
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },
});

export default LargeScreenTab;
