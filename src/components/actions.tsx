import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

import { cx } from "../lib/cx";
import { Glyph } from "../lib/icons";
import type { ComponentSize } from "../lib/tokens";

export type ButtonVariant = "solid" | "outline";
export type ButtonTone = "primary" | "danger";
export type ButtonState = "default" | "hover" | "disabled" | "loading";

export type ButtonProps = {
  className?: string;
  size?: ComponentSize;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  state?: ButtonState;
  icon?: ReactNode;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const buttonSizeMap: Record<ComponentSize, CSSProperties> = {
  small: { height: 28, padding: "6px 12px", fontSize: 12, lineHeight: "16px" },
  middle: { height: 32, padding: "6px 16px", fontSize: 14, lineHeight: "20px" },
  large: { height: 40, padding: "10px 20px", fontSize: 14, lineHeight: "20px" }
};

function buttonColors(variant: ButtonVariant, tone: ButtonTone, state: ButtonState) {
  const base = tone === "danger"
    ? {
        solid: { bg: "#FF4444", hover: "#DF2020", disabled: "#FFBBBB" },
        outline: { text: "#FF4444", border: "#FFBBBB", hover: "#FF4444", disabledText: "#FFBBBB", disabledBg: "#FFF6F6" }
      }
    : {
        solid: { bg: "#01C2C3", hover: "#16A5AF", disabled: "#A6E9EA" },
        outline: { text: "#2B2C3C", border: "#DCDCE6", hover: "#01C2C3", disabledText: "#C7C7D7", disabledBg: "#F5F5F9" }
      };

  if (variant === "solid") {
    return {
      background: state === "disabled" ? base.solid.disabled : state === "hover" ? base.solid.hover : base.solid.bg,
      color: "#FFFFFF",
      border: "1px solid transparent"
    };
  }

  if (state === "disabled") {
    return {
      background: tone === "danger" ? "#FFF6F6" : "#F5F5F9",
      color: base.outline.disabledText,
      border: `1px solid ${base.outline.border}`
    };
  }

  return {
    background: "#FFFFFF",
    color: tone === "danger" ? "#FF4444" : state === "hover" ? "#01C2C3" : base.outline.text,
    border: `1px solid ${tone === "danger" ? "#FFBBBB" : state === "hover" ? "#01C2C3" : base.outline.border}`
  };
}

export function Button({
  className,
  size = "middle",
  variant = "solid",
  tone = "primary",
  state = "default",
  icon,
  children,
  onClick
}: ButtonProps) {
  const isDisabled = state === "disabled" || state === "loading";
  const palette = buttonColors(variant, tone, state);
  const iconColor = variant === "solid" ? "#FFFFFF" : palette.color;

  return (
    <button
      type="button"
      className={cx("dui-root", className)}
      disabled={isDisabled}
      onClick={onClick}
      style={{
        ...buttonSizeMap[size],
        ...palette,
        alignItems: "center",
        borderRadius: 2,
        cursor: isDisabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        fontFamily: "var(--dui-font)",
        fontWeight: 400,
        gap: 4,
        justifyContent: "center",
        letterSpacing: 0.5,
        minWidth: size === "small" ? 74 : size === "middle" ? 90 : 98,
        opacity: state === "loading" ? 0.92 : 1
      }}
    >
      {state === "loading" ? <Glyph name="spinner" size={size === "small" ? 12 : 14} color={iconColor} /> : icon}
      <span>{state === "loading" ? "加载中" : children}</span>
    </button>
  );
}

export type TagTone = "neutral" | "info" | "success" | "warning" | "error";
export type TagMode = "plain" | "closable" | "addable" | "input";

export type TagProps = {
  className?: string;
  size?: ComponentSize;
  tone?: TagTone;
  mode?: TagMode;
  children: ReactNode;
};

const tagToneMap: Record<TagTone, { background: string; border: string; color: string }> = {
  neutral: { background: "#FFFFFF", border: "#DCDCE6", color: "#2B2C3C" },
  info: { background: "#EFF5FF", border: "#B6CCF2", color: "#4A8CFF" },
  success: { background: "#F3FCF3", border: "#A3E9A3", color: "#20C520" },
  warning: { background: "#FFFAF2", border: "#FEE6BF", color: "#FC9D00" },
  error: { background: "#FFF6F6", border: "#FFBBBB", color: "#FF4444" }
};

export function Tag({
  className,
  size = "middle",
  tone = "neutral",
  mode = "plain",
  children
}: TagProps) {
  const palette = tagToneMap[tone];
  const height = size === "small" ? 20 : size === "middle" ? 24 : 32;
  const fontSize = size === "small" ? 12 : 14;
  const side = size === "small" ? 8 : 12;
  const iconSize = size === "small" ? 12 : 14;

  return (
    <span
      className={cx("dui-root", className)}
      style={{
        alignItems: "center",
        background: palette.background,
        border: `1px solid ${palette.border}`,
        borderRadius: 2,
        color: palette.color,
        display: "inline-flex",
        gap: 6,
        height,
        padding: `0 ${side}px`,
        fontSize,
        lineHeight: size === "large" ? "20px" : "16px",
        letterSpacing: 0.5
      }}
    >
      {mode === "addable" && <Glyph name="plus" size={iconSize} color={palette.color} />}
      {mode === "input" && <Glyph name="plus" size={iconSize} color="#7F7F8E" />}
      <span>{children}</span>
      {mode === "closable" && <Glyph name="close" size={iconSize} color={palette.color} />}
    </span>
  );
}
