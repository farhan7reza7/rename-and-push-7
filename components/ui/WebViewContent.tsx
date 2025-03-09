import { ExternalPathString } from "expo-router";
import { CSSProperties } from "react";
import { Platform, StyleProp, ViewStyle } from "react-native";
import WebView from "react-native-webview";

interface Props {
  source: { uri: ExternalPathString };
  style?: StyleProp<ViewStyle>;
}

const WebViewContentScrollable = ({ source, style }: Props): JSX.Element => {
  if (Platform.OS === "web") {
    return (
      <iframe style={style as CSSProperties} src={source.uri} title="WebView" />
    );
  } else {
    return (
      <WebView
        style={style}
        source={source}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      />
    );
  }
};

export const WebViewContent = ({ source, style }: Props): JSX.Element => {
  if (Platform.OS === "web") {
    return (
      <iframe style={style as CSSProperties} src={source.uri} title="WebView" />
    );
  } else {
    return <WebView style={style} source={source} />;
  }
};

export default WebViewContentScrollable;
