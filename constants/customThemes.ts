import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "blue",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "deeppink",
    /*NavBar related
            //text: "red",
            //card: "red",
            //notification: "red",
            //border: "red",*/
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
};

export { CustomLightTheme, CustomDarkTheme };
