import { ExternalPathString, Link, type LinkProps } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { Platform } from "react-native";

type Props = Omit<LinkProps, "href"> & {
  href: ExternalPathString;
};

const ExternalLink = ({ href, ...rest }: Props) => (
  <Link
    href={href}
    target="_blank"
    {...rest}
    onPress={async (e) => {
      if (Platform.OS !== "web") {
        e.preventDefault();
        openBrowserAsync(href);
      }
    }}
  />
);

export default ExternalLink;
