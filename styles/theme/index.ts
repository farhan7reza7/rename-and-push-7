import { colors } from "./colors";
import { typography } from "./typography";
import { borderRadius } from "./borderRadius";
import { dropShadows, shadows } from "./shadows";

const theme = {
  colors,
  typography,
  borderRadius,
  shadows,
  dropShadows,
} as const;

export default theme;

export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
export type ThemeBorderRadius = typeof theme.borderRadius;
export type ThemeShadows = typeof theme.dropShadows;
export type Shadows = typeof theme.shadows;
export type Theme = typeof theme;
