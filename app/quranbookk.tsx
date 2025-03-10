import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import WebView from "react-native-webview";

SplashScreen.preventAutoHideAsync();

export default function QuranBookkApp() {
  const [isLoaded, setIsLoaded] = useState(false);
  const colorScheme = useColorScheme();

  /*const handleStart = useCallback(async () => {
    setIsLoaded(false);
    await SplashScreen.preventAutoHideAsync();
  }, []);*/

  const handleLoaded = useCallback(async () => {
    await SplashScreen.hideAsync();
    setIsLoaded(true);
  }, []);

  return (
    <View style={ss.container}>
      {!isLoaded && (
        <View style={ss.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      <WebView
        source={{ uri: "https://quranbookk.com/" }}
        style={[
          ss.webview,
          { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
        ]}
        //onLoadStart={handleStart}
        onLoadEnd={handleLoaded}
      />
    </View>
  );
}

const ss = StyleSheet.create({
  container: { flex: 1 },
  webview: {
    flex: 1,
    borderWidth: 0,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.3)",
    zIndex: 1,
  },
});
