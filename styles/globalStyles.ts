import { StyleSheet } from "react-native";
import theme from "./theme";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 16,
    backgroundColor: theme.colors.white,
    color: theme.colors.gray[900],
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
  },
});

export default globalStyles;
