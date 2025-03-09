import WebViewContentScrollable from "@/components/ui/WebViewContent";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Constants from "expo-constants";
import { useCallback, useState } from "react";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import * as deepLinking from "expo-linking";
import { Link } from "expo-router";

export default function Mixture() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");

  const handleSetToSecureStore = useCallback(async () => {
    if (username && password) {
      if (Platform.OS === "web") {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        await setItemAsync("username", username);
        await setItemAsync("password", password);
      }
      setPassword("");
      setUsername("");
      Alert.alert("Auth details stored");
    }
  }, [username, password]);

  const handleGetFromSecureStore = useCallback(async () => {
    let username, password;
    if (Platform.OS === "web") {
      username = localStorage.getItem("username");
      password = localStorage.getItem("password");
    } else {
      username = await getItemAsync("username");
      password = await getItemAsync("password");
    }
    if (username && password) {
      setPassword(username);
      setUsername(password);
      Alert.alert("Auth details Retrieved");
    }
  }, []);

  const handleCreateDeepLink = useCallback(() => {
    const link = deepLinking.createURL("mixture", {
      queryParams: { id: "first" },
    });
    setLink(link);
  }, []);

  const handleShare = useCallback(async () => {
    if (!link) {
      Alert.alert("There must be a Link");
      return;
    }
    try {
      const result = await Share.share({
        message: `See the amazing contents on ${link}`,
      });
      if (Platform.OS !== "web") {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            Alert.alert("Shared with activity type: ", result.activityType);
          } else {
            Alert.alert("Shared successfully");
          }
        } else if (result.action === Share.dismissedAction) {
          Alert.alert("Shared Dissmissed");
        } else {
          Alert.alert(JSON.stringify(result, null, 2));
        }
      }
    } catch (e) {
      Alert.alert("Error in sharing: ", (e as Error).message);
    }
  }, [link]);

  return (
    <View style={ss.container}>
      <Link href="/" style={ss.linkContainer}>
        <Text style={ss.linkText}>Go to home</Text>
      </Link>

      <ScrollView
        contentContainerStyle={ss.scrollContent}
        nestedScrollEnabled={true}
      >
        <View style={ss.webviewContainer}>
          <WebViewContentScrollable
            source={{ uri: "https://www.quranbookk.com/" }}
            style={ss.webview}
          />
        </View>
        <View style={ss.constantsContainer}>
          <Text style={ss.constantsText}>
            Platform: {JSON.stringify(Constants, null, 2)}
          </Text>
        </View>
        <View style={ss.secureContainer}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            style={ss.secureInput}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            style={ss.secureInput}
          />
          <View style={ss.btnContainer}>
            <Pressable onPress={handleSetToSecureStore} style={ss.secureBtn}>
              <Text style={ss.btnText}>Submit</Text>
            </Pressable>
            <Pressable onPress={handleGetFromSecureStore} style={ss.secureBtn}>
              <Text style={ss.btnText}>Get Details</Text>
            </Pressable>
          </View>
        </View>

        <View style={ss.deepContainer}>
          <Pressable
            onPress={handleCreateDeepLink}
            style={[
              ss.secureBtn,
              { backgroundColor: "lightgray", padding: 10, margin: 10 },
            ]}
          >
            <Text style={{ color: "#000", textAlign: "center" }}>
              Create Deep Link
            </Text>
          </Pressable>
          {link && (
            <View style={ss.shareContainer}>
              <Text style={ss.deepText}>{link}</Text>
              <Pressable
                onPress={handleShare}
                style={[
                  ss.secureBtn,
                  { backgroundColor: "lightgray", padding: 10, margin: 10 },
                ]}
              >
                <Text style={{ color: "#000", textAlign: "center" }}>
                  Share Deep Link
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const ss = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    gap: 15,
    backgroundColor: "aliceblue",
  },
  scrollContainer: {},
  webviewContainer: {
    marginHorizontal: 15,
    height: 440,
  },
  webview: {
    borderWidth: 0,
    height: "100%",
  },
  constantsContainer: {
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
  },
  constantsText: { color: "#000" },
  secureContainer: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  secureInput: { borderRadius: 10, padding: 10, borderWidth: 1 },
  secureBtn: { backgroundColor: "violet", borderRadius: 10, padding: 5 },
  btnContainer: {
    flexDirection: "row",
    gap: "10",
    justifyContent: "space-between",
  },
  btnText: { color: "#fff" },
  deepContainer: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  deepText: { color: "green", fontSize: 18 },
  shareContainer: { gap: 10 },
  linkContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#000",
    alignItems: "center",
    borderRadius: 10,
    textAlign: "center",
  },
  linkText: { color: "#fff" },
});
