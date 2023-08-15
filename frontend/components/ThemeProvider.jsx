"use client";
import { useLocalStorage } from "@mantine/hooks";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

function ThemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useLocalStorage(
    "color-scheme",
    "#1A1B1E"
  );

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <body className={font.className}>{children}</body>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default ThemeProvider;
