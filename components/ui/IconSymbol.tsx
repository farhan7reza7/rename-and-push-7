import { MaterialIcons } from "@expo/vector-icons";
import {
  OpaqueColorValue,
  StyleProp,
  TextStyle,
  useWindowDimensions,
} from "react-native";
import Icon_Mapping from "@/utils/icon_mapping";
import { useMemo } from "react";
import { useTheme } from "@react-navigation/native";

interface Props {
  name: keyof typeof Icon_Mapping;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  accessible?: boolean;
  accessibilityLabel?: string;
}

const IconSymbol = ({
  name,
  size = 24,
  color,
  style,
  accessible = true,
  accessibilityLabel,
}: Props): JSX.Element => {
  const { fontScale } = useWindowDimensions();

  const {
    colors: { text },
  } = useTheme();

  const { scaledSize, iconColor } = useMemo(
    () => ({ scaledSize: size * fontScale, iconColor: color || text }),
    [color, text, size, fontScale]
  );

  return (
    <MaterialIcons
      name={Icon_Mapping[name]}
      size={scaledSize}
      color={iconColor}
      style={style}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || name}
    />
  );
};

export default IconSymbol;
