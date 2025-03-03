import { useTheme } from "@react-navigation/native";
import { SymbolView, SymbolWeight, SymbolViewProps } from "expo-symbols";
import { useMemo } from "react";
import { StyleProp, useWindowDimensions, ViewProps } from "react-native";

interface Props {
  name: SymbolViewProps["name"];
  size?: number;
  color?: string;
  weight?: SymbolWeight;
  style?: StyleProp<ViewProps>;
  accessible?: boolean;
  accessibilityLabel?: string;
}

const IconSymbol = ({
  name,
  size = 24,
  color,
  weight = "regular",
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
    <SymbolView
      name={name}
      tintColor={iconColor}
      weight={weight}
      style={[
        {
          width: scaledSize,
          height: scaledSize,
          minHeight: scaledSize,
          minWidth: scaledSize,
        },
        style,
      ]}
      resizeMode="scaleAspectFit"
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || name}
    />
  );
};

export default IconSymbol;
