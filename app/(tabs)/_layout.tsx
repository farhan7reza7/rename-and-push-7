import IconSymbol from "@/components/ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isLargeScreen = useMemo(() => width > 768, [width]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconSymbol name="house.fill" size={20} color="currentColor" />
        <IconSymbol name="paperplane.fill" size={20} color="currentColor" />
        <IconSymbol name="square.and.pencil" size={20} color="currentColor" />
        <IconSymbol name="bell.fill" size={20} color="currentColor" />
        <IconSymbol name="person.fill" size={20} color="currentColor" />
      </View>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "deeppink",
          tabBarStyle: {
            ...styles.tabBarBase,
            ...(isLargeScreen
              ? {
                  paddingTop: 50 + insets.top,
                  paddingBottom: insets.bottom,
                  ...styles.tabBarVert,
                }
              : {
                  //height: 40 + (Platform.OS === "android" ? insets.bottom : 0),//insta
                  paddingBottom: insets.bottom > 0 ? insets.bottom : 0,
                  ...styles.tabBarHori,
                }),
          },
          tabBarBackground: () => (
            <BlurView
              intensity={30}
              tint="systemChromeMaterial"
              style={[
                StyleSheet.absoluteFill,
                isLargeScreen ? styles.bgStyle : {},
              ]}
            />
          ),
          ...(isLargeScreen
            ? {
                tabBarPosition: "left",
                tabBarItemStyle: {
                  width: 80,
                },
                tabBarShowLabel: false,
              }
            : {
                /* tabBarShowLabel: false*/
                //insta
              }),
          tabBarButton: (props) => {
            const { onPress, accessibilityState, children, style } = props;
            const focused = accessibilityState?.selected;

            if (!isLargeScreen) {
              return (
                <Pressable onPress={onPress} style={style}>
                  {children}
                </Pressable>
              );
            }

            // Map route names to icon names and titles
            const iconMap: Record<string, { icon: string; title: string }> = {
              index: { icon: "home", title: "Home" },
              explore: { icon: "send", title: "Explore" },
              create: { icon: "create", title: "Create" },
              notifications: { icon: "notifications", title: "Notifications" },
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
          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <Ionicons name="send" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ color }) => (
              <Ionicons name="create" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" color={color} size={24} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 8,
    backgroundColor: `rgba(0, 0, 0, 0.5)`,
    color: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tabBarBase: {
    position: "absolute",
    backgroundColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
  tabBarHori: { borderTopWidth: 0 },
  tabBarVert: {
    borderRightWidth: 0,
    flexDirection: "column",
    width: 100,
    //paddingTop: 50,
  },
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
  verticalTabFocused: {
    color: "deeppink",
  },
  verticalTabLabel: {
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },
  bgStyle: {
    width: 100,
    borderRightWidth: 1,
    borderRightColor: "#888",
  },
});
