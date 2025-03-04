import { useState, PropsWithChildren, useCallback } from "react";
import IconSymbol from "./ui/IconSymbol";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

type Props = {
  title: string;
  style?: ViewStyle;
};

const Collapsable = ({ title, children, style }: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  const {
    colors: { background, text },
  } = useTheme();

  return (
    <View style={[{ backgroundColor: background }, ss.container, style]}>
      <Pressable onPress={toggle} style={ss.button}>
        <IconSymbol
          name={"chevron.right"}
          color={text}
          size={18}
          style={{
            transform: [
              { rotate: isOpen ? "90deg" : "0deg" },
              { scale: isOpen ? 1.2 : 1 },
            ],
          }}
        />
        <Text style={[ss.title, { color: text }]}>{title}</Text>
      </Pressable>
      {isOpen && <View style={ss.children}>{children}</View>}
    </View>
  );
};

const ss = StyleSheet.create({
  container: { padding: 5, borderRadius: 5, width: "100%", gap: 6 },
  button: { flexDirection: "row", alignItems: "center", gap: 6 },
  title: { fontWeight: "bold" },
  children: { paddingLeft: 24 },
});

export default Collapsable;
