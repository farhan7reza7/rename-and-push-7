import useBottomTabOverflow from "@/hooks/useBottomTabOverflow";
import { useCallback, useMemo, useRef } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { toJpeg } from "html-to-image";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  const screenShotViewRef = useRef(null);
  const [isAllowed, requestPermission] = MediaLibrary.usePermissions();
  const arrayDemo = useMemo(
    () => Array.from({ length: 100 }, (_, i) => i + 1),
    []
  );

  const { width } = useWindowDimensions();
  const overflowHeight = useBottomTabOverflow();

  const screenShoter = useCallback(async () => {
    if (!screenShotViewRef.current) {
      Alert.alert("Can not take taking Screenshot");
      return;
    }

    try {
      let imageUri = "";
      if (Platform.OS !== "web") {
        imageUri = await captureRef(screenShotViewRef.current, {
          width: 440,
          height: 320,
          quality: 1,
        });
      } else {
        imageUri = await toJpeg(screenShotViewRef.current, {
          //width: 440,
          //height: 320,
          quality: 1,
        });
      }
      if (imageUri) {
        if (!isAllowed) {
          const newPermission = await requestPermission();
          if (!newPermission.granted) {
            Alert.alert("Need Permission to take screenshot");
            return;
          }
        }
        if (Platform.OS !== "web") {
          await MediaLibrary.saveToLibraryAsync(imageUri);
        } else {
          const link = document.createElement("a");
          link.href = imageUri;
          link.download = "screenshot-image.jpeg";
          link.click();
        }
        Alert.alert("Screenshot Saved");
      } else {
        Alert.alert("Failure in taking Screenshot");
      }
    } catch (e) {
      Alert.alert("Error in taking Screenshot");
    }
  }, [isAllowed]);

  return (
    <View style={styles.container} ref={screenShotViewRef} collapsable={false}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          width > 768
            ? { paddingLeft: 116 }
            : {
                paddingBottom: overflowHeight + 16,
              },
        ]}
        nestedScrollEnabled={true}
      >
        <Text style={styles.text}>Home Section</Text>
        <FlatList
          data={arrayDemo}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={[styles.arrayDemoContent, styles.wrapper]}
          style={styles.arrayDemo}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.header}>Header {item}</Text>
              <View style={styles.content}>
                <Text style={styles.contentText}>Content of {item}</Text>
              </View>
            </View>
          )}
        />
        <Text style={styles.text}>Horizontal Scrolling Section</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          data={arrayDemo}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={[styles.arrayDemoContent, styles.wrapperHori]}
          style={styles.arrayDemo}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.header}>Header {item}</Text>
              <View style={styles.content}>
                <Text style={styles.contentText}>
                  Content of the Header {item}
                </Text>
              </View>
            </View>
          )}
        />

        <View style={styles.shotContainer}>
          <Pressable style={styles.shotBtn} onPress={screenShoter}>
            <MaterialIcons name="save-alt" color="#000" size={38} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  scrollContainer: {
    alignItems: "center",
    gap: 16,
    padding: 16,
    paddingTop: 50,
  },
  text: { color: "#000", fontSize: 24 },
  arrayDemoContent: {
    justifyContent: "space-around",
    flexDirection: "row",
    gap: 12,
    paddingBottom: 20,
  },
  arrayDemo: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    maxWidth: 768,
    height: 450,
  },
  card: {
    backgroundColor: "#000",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
  },
  header: { fontSize: 18, color: "#fff", fontWeight: "medium" },
  content: { padding: 10, textAlign: "center" },
  contentText: {
    fontSize: 16,
    color: "lightgray",
  },
  wrapper: { flexWrap: "wrap" },
  wrapperHori: { paddingRight: 20 },
  shotContainer: {
    borderWidth: 4,
    width: 84,
    height: 84,
    borderRadius: "50%",
    borderColor: "yellow",
    padding: 3,
    backgroundColor: "#000",
  },
  shotBtn: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  shotBtnText: {},
});
