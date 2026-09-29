"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, theme as antdTheme } from "antd";
import ThemeProvider, { useTheme } from "./ThemeProvider";
import SmoothScroll from "./SmoothScroll";

const PALETTE = {
  dark: { bg: "#000", soft: "#0f0f0f", cardHi: "#1c1c1c", line: "#2a2a2a", lineHi: "#4a4a4a", text: "#f5f5f5", muted: "#8f8f8f", accent: "#fff", accentText: "#000", hover: "#d6d6d6", active: "#bdbdbd" },
  light: { bg: "#fff", soft: "#f4f4f4", cardHi: "#ececec", line: "#dcdcdc", lineHi: "#a8a8a8", text: "#0a0a0a", muted: "#6c6c6c", accent: "#000", accentText: "#fff", hover: "#333", active: "#000" },
};

function buildTheme(mode) {
  const p = PALETTE[mode];
  return {
    algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      fontFamily: "var(--sans)",
      fontSize: 15,
      borderRadius: 10,
      colorPrimary: p.accent,
      colorPrimaryHover: p.hover,
      colorPrimaryActive: p.active,
      colorTextLightSolid: p.accentText,
      colorBgBase: p.bg,
      colorBgContainer: p.soft,
      colorBgElevated: p.soft,
      colorText: p.text,
      colorTextPlaceholder: p.muted,
      colorTextDescription: p.muted,
      colorBorder: p.lineHi,
      colorBorderSecondary: p.line,
    },
    components: {
      Button: {
        primaryShadow: "none",
        defaultShadow: "none",
        defaultBg: "transparent",
        defaultBorderColor: p.lineHi,
        defaultHoverBg: p.cardHi,
        defaultHoverColor: p.text,
        defaultHoverBorderColor: p.text,
        textHoverBg: "transparent",
        colorLink: p.muted,
      },
      Input: { activeBorderColor: p.text, hoverBorderColor: p.lineHi, activeShadow: "none" },
      Select: { activeBorderColor: p.text, hoverBorderColor: p.lineHi, activeOutlineColor: "transparent" },
      InputNumber: { activeBorderColor: p.text, hoverBorderColor: p.lineHi, activeShadow: "none" },
      Modal: { contentBg: p.soft, headerBg: p.soft },
    },
  };
}

function ThemedApp({ children }) {
  const { theme } = useTheme();
  return (
    <ConfigProvider theme={buildTheme(theme)}>
      <App message={{ maxCount: 2, duration: 2.2 }}>{children}</App>
    </ConfigProvider>
  );
}

export default function Providers({ children }) {
  return (
    <AntdRegistry>
      <ThemeProvider>
        <ThemedApp>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemedApp>
      </ThemeProvider>
    </AntdRegistry>
  );
}
