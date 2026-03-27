import type { CSSProperties, ReactNode } from "react";

type GlyphName =
  | "save"
  | "spinner"
  | "close"
  | "search"
  | "calendar"
  | "chevron-down"
  | "chevron-right"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "plus"
  | "upload"
  | "ellipsis"
  | "check"
  | "minus";

type GlyphProps = {
  name: GlyphName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

function path(name: GlyphName, color: string, strokeWidth: number): ReactNode {
  switch (name) {
    case "save":
      return (
        <>
          <path d="M4 3h9l3 3v11H4z" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <path d="M7 3v4h6V3" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <path d="M7 13h6" fill="none" stroke={color} strokeWidth={strokeWidth} />
        </>
      );
    case "spinner":
      return (
        <>
          <circle cx="10" cy="10" r="7" opacity="0.2" stroke={color} strokeWidth={strokeWidth} fill="none" />
          <path d="M10 3a7 7 0 0 1 7 7" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
        </>
      );
    case "close":
      return (
        <>
          <path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      );
    case "search":
      return (
        <>
          <circle cx="8" cy="8" r="5" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <path d="M12 12l4 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="3" y="4" width="14" height="13" rx="2" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <path d="M3 8h14M7 2v4M13 2v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      );
    case "chevron-down":
      return <path d="M5 7l5 6 5-6" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />;
    case "chevron-right":
      return <path d="M7 5l6 5-6 5" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />;
    case "info":
      return (
        <>
          <circle cx="10" cy="10" r="8" fill={color} opacity="0.14" />
          <circle cx="10" cy="10" r="7.5" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <path d="M10 9v5M10 6h.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      );
    case "success":
      return (
        <>
          <circle cx="10" cy="10" r="7.5" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <path d="M6.5 10.5l2.2 2.2 4.8-5.2" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "warning":
      return (
        <>
          <path d="M10 3l7 13H3z" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M10 8v3.8M10 14h.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      );
    case "error":
      return (
        <>
          <circle cx="10" cy="10" r="7.5" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <path d="M7 7l6 6M13 7l-6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      );
    case "plus":
      return <path d="M10 4v12M4 10h12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />;
    case "upload":
      return (
        <>
          <path d="M10 4v8M6.5 7.5L10 4l3.5 3.5M4 14v2h12v-2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      );
    case "ellipsis":
      return (
        <>
          <circle cx="5" cy="10" r="1.5" fill={color} />
          <circle cx="10" cy="10" r="1.5" fill={color} />
          <circle cx="15" cy="10" r="1.5" fill={color} />
        </>
      );
    case "check":
      return <path d="M4.5 10.5l3.5 3.5L15.5 6.5" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />;
    case "minus":
      return <path d="M5 10h10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />;
    default:
      return null;
  }
}

export function Glyph({
  name,
  size = 16,
  color = "currentColor",
  strokeWidth = 1.6,
  className,
  style
}: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      style={style}
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {path(name, color, strokeWidth)}
    </svg>
  );
}
