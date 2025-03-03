import useBottomTabOverflow from "@/hooks/useBottomTabOverflow";
import { useMemo } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function Home() {
  const arrayDemo = useMemo(
    () => Array.from({ length: 100 }, (_, i) => i + 1),
    []
  );

  const { width } = useWindowDimensions();
  const overflowHeight = useBottomTabOverflow();

  return (
    <View style={styles.container}>
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
    //paddingBottom: 66,
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
});
