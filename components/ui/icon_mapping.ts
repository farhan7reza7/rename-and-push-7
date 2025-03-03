import { MaterialIcons } from "@expo/vector-icons";
import { SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";

const Icon_Mapping: Partial<
  Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>
> = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "square.and.pencil": "create",
  "bell.fill": "notifications",
  "person.fill": "person",
};

export default Icon_Mapping;
