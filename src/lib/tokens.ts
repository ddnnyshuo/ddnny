export const tokens = {
  color: {
    textStrong: "#14151A",
    text: "#2B2C3C",
    textSecondary: "#7F7F8E",
    textMuted: "#C7C7D7",
    border: "#DCDCE6",
    surface: "#FFFFFF",
    canvas: "#F5F5F9",
    primary: "#01C2C3",
    primaryHover: "#16A5AF",
    primaryDisabled: "#A6E9EA",
    info: "#4A8CFF",
    infoSoft: "#EFF5FF",
    infoBorder: "#B6CCF2",
    success: "#20C520",
    successSoft: "#F3FCF3",
    successBorder: "#A3E9A3",
    warning: "#FC9D00",
    warningSoft: "#FFFAF2",
    warningBorder: "#FEE6BF",
    danger: "#FF4444",
    dangerHover: "#DF2020",
    dangerSoft: "#FFF6F6",
    dangerBorder: "#FFBBBB"
  },
  radius: {
    sm: 2,
    md: 8,
    lg: 16
  },
  font: {
    family: '"PingFang SC", "Hiragino Sans GB", "Noto Sans SC", -apple-system, BlinkMacSystemFont, sans-serif'
  }
} as const;

export type ComponentSize = "small" | "middle" | "large";
