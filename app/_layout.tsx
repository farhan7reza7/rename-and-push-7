import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CustomDarkTheme, CustomLightTheme } from "@/constants/customThemes";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const theme = useMemo(
    () => (colorScheme === "dark" ? CustomDarkTheme : CustomLightTheme),
    [colorScheme]
  );

  return (
    <ThemeProvider value={theme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
