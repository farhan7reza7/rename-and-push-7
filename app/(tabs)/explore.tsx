import { useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, Modal, Alert } from "react-native";
import * as imagePicker from "expo-image-picker";
import { BlurView } from "expo-blur";

export default function Explore() {
  const [picked, setPicked] = useState<undefined | string>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isPermisssion = useRef(false);

  const {
    colors: { primary },
  } = useTheme();

  const requestPermissison = useCallback(async () => {
    if (isPermisssion.current) return true;
    const { status } = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (!status) {
      Alert.alert(
        "Permissions required",
        "This app needs camera and media library permissions to work properly!"
      );
      return false;
    } else {
      isPermisssion.current = true;
      return true;
    }
  }, []);

  const handleImgPicker = useCallback(async () => {
    if (!(await requestPermissison())) return;
    const result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPicked(result.assets[0].uri);
      setIsOpen(true);
    } else {
      Alert.alert("Image Picking Cancelled");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore Section</Text>
      <Text style={[styles.textExplore, { color: primary }]}>
        Explore Content
      </Text>
      <Link href="/about">
        <Text style={styles.link}>About</Text>
      </Link>
      <Link href="/mixture">
        <Text style={styles.link}>Mix Concepts</Text>
      </Link>
      <Link href="/quranbookk">
        <Text style={styles.link}>QuranBookk App</Text>
      </Link>
      <Pressable style={styles.picker} onPress={handleImgPicker}>
        <Text style={styles.pickerText}>Pick Image</Text>
      </Pressable>
      <Modal
        visible={isOpen}
        animationType="fade"
        transparent={true}
        //onRequestClose={() => setIsOpen(false)}
      >
        {/* <View style={[styles.nonModal, StyleSheet.absoluteFill]} />*/}
        <BlurView intensity={5} style={StyleSheet.absoluteFill}>
          <View style={styles.nonModal} />
        </BlurView>

        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text>Pick Image</Text>
            <Pressable
              onPress={() => setIsOpen((v) => !v)}
              style={styles.close}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: picked }}
              contentFit="cover"
              style={styles.img}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "lightpink",
    padding: 16,
    paddingBottom: 66,
  },
  text: { color: "#000", fontSize: 24 },
  textExplore: {
    fontSize: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
  },
  picker: { padding: 10, borderRadius: 10, backgroundColor: "blue" },
  pickerText: { color: "#fff" },
  link: {
    color: "blue",
    fontSize: 18,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  modalHeader: { flexDirection: "row", gap: 10 },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  close: { padding: 10, backgroundColor: "blue" },
  closeText: { color: "#fff" },
  modal: {
    width: "100%",
    height: "25%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
  },
  img: {
    width: 200,
    height: 150,
  },
  nonModal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
