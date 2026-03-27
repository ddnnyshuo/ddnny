import type { CSSProperties, ReactNode } from "react";

import { Button } from "./actions";
import { cx } from "../lib/cx";
import { Glyph } from "../lib/icons";

type FeedbackTone = "info" | "success" | "warning" | "error";

const toneMap: Record<FeedbackTone, { color: string; soft: string; border: string; icon: "info" | "success" | "warning" | "error" }> = {
  info: { color: "#4A8CFF", soft: "#EFF5FF", border: "#B6CCF2", icon: "info" },
  success: { color: "#20C520", soft: "#F3FCF3", border: "#A3E9A3", icon: "success" },
  warning: { color: "#FC9D00", soft: "#FFFAF2", border: "#FEE6BF", icon: "warning" },
  error: { color: "#FF4444", soft: "#FFF6F6", border: "#FFBBBB", icon: "error" }
};

export type AlertBannerProps = {
  className?: string;
  tone?: FeedbackTone;
  title?: string;
  action?: "icon" | "wording" | "locked";
  children: ReactNode;
};

export function AlertBanner({
  className,
  tone = "info",
  title,
  action = "icon",
  children
}: AlertBannerProps) {
  const palette = toneMap[tone];

  return (
    <div
      className={cx("dui-root", className)}
      style={{
        alignItems: title ? "flex-start" : "center",
        background: palette.soft,
        border: `1px solid ${palette.border}`,
        borderRadius: 2,
        display: "flex",
        gap: 8,
        padding: "9px 16px",
        width: 600
      }}
    >
      <Glyph name={palette.icon} size={title ? 20 : 16} color={palette.color} />
      <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 4 }}>
        {title ? <span className="dui-heading">{title}</span> : null}
        <span className="dui-body">{children}</span>
      </div>
      {action === "icon" ? <Glyph name="close" size={12} color="#7F7F8E" /> : null}
      {action === "wording" ? <span className="dui-body" style={{ color: "#01C2C3" }}>知道了</span> : null}
    </div>
  );
}

export type MessageToastProps = {
  className?: string;
  tone?: "success" | "warning" | "error" | "info";
  children: ReactNode;
};

export function MessageToast({ className, tone = "success", children }: MessageToastProps) {
  const palette = toneMap[tone];
  return (
    <div
      className={cx("dui-root dui-panel", className)}
      style={{ alignItems: "center", display: "inline-flex", gap: 8, minWidth: 295, padding: "10px 16px" }}
    >
      <Glyph name={palette.icon} size={16} color={palette.color} />
      <span className="dui-body">{children}</span>
    </div>
  );
}

export type NotificationCardProps = {
  className?: string;
  tone?: "plain" | FeedbackTone;
  withActions?: boolean;
  title: string;
  description: string;
};

export function NotificationCard({
  className,
  tone = "plain",
  withActions = false,
  title,
  description
}: NotificationCardProps) {
  const palette = tone === "plain" ? null : toneMap[tone];

  return (
    <div
      className={cx("dui-root dui-panel", className)}
      style={{ display: "flex", gap: 12, padding: "16px 20px", width: 400 }}
    >
      {palette ? <Glyph name={palette.icon} size={20} color={palette.color} /> : null}
      <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 6 }}>
        <span className="dui-heading">{title}</span>
        <span className="dui-body" style={{ color: "#7F7F8E" }}>{description}</span>
        {withActions ? (
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <Button size="small">处理</Button>
            <Button size="small" variant="outline">取消</Button>
          </div>
        ) : null}
      </div>
      <Glyph name="close" size={14} color="#7F7F8E" />
    </div>
  );
}

export type EmptyStateProps = {
  className?: string;
  mode?: "light" | "dark";
  layout?: "text-only" | "illustration-text" | "illustration-title-text" | "illustration-title-text-action";
  title?: string;
  description: string;
  actionLabel?: string;
};

export function EmptyState({
  className,
  mode = "light",
  layout = "illustration-title-text",
  title = "暂无内容",
  description,
  actionLabel
}: EmptyStateProps) {
  const dark = mode === "dark";

  return (
    <div
      className={cx("dui-root", className)}
      style={{
        alignItems: "center",
        background: dark ? "#14151A" : "#FFFFFF",
        borderRadius: 12,
        color: dark ? "#FFFFFF" : "#2B2C3C",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        justifyContent: "center",
        minHeight: 410,
        padding: 32,
        width: 360
      }}
    >
      {layout !== "text-only" ? (
        <div
          style={{
            alignItems: "center",
            background: dark ? "rgba(255,255,255,0.08)" : "linear-gradient(180deg, #EFF5FF 0%, #FFFFFF 100%)",
            borderRadius: 24,
            display: "flex",
            height: 160,
            justifyContent: "center",
            width: 160
          }}
        >
          <Glyph name="upload" size={48} color={dark ? "#A6E9EA" : "#01C2C3"} />
        </div>
      ) : null}
      {layout === "illustration-title-text" || layout === "illustration-title-text-action" ? <span className="dui-heading" style={{ color: dark ? "#FFFFFF" : "#2B2C3C" }}>{title}</span> : null}
      <span className="dui-body" style={{ color: dark ? "rgba(255,255,255,0.72)" : "#7F7F8E", maxWidth: 240, textAlign: "center" }}>{description}</span>
      {layout === "illustration-title-text-action" && actionLabel ? <Button>{actionLabel}</Button> : null}
    </div>
  );
}

export type TooltipBubbleProps = {
  className?: string;
  placement?: "top" | "right" | "bottom" | "left";
  children: ReactNode;
};

export function TooltipBubble({ className, placement = "top", children }: TooltipBubbleProps) {
  const vertical = placement === "top" || placement === "bottom";
  const arrowStyle: CSSProperties =
    placement === "top"
      ? { borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #2B2C3C", left: "50%", top: "100%", transform: "translateX(-50%)" }
      : placement === "bottom"
        ? { borderBottom: "6px solid #2B2C3C", borderLeft: "6px solid transparent", borderRight: "6px solid transparent", left: "50%", top: -6, transform: "translateX(-50%)" }
        : placement === "left"
          ? { borderBottom: "6px solid transparent", borderLeft: "6px solid #2B2C3C", borderTop: "6px solid transparent", right: -6, top: "50%", transform: "translateY(-50%)" }
          : { borderBottom: "6px solid transparent", borderRight: "6px solid #2B2C3C", borderTop: "6px solid transparent", left: -6, top: "50%", transform: "translateY(-50%)" };

  return (
    <div className={cx("dui-root", className)} style={{ display: "inline-flex", flexDirection: vertical ? "column" : "row", position: "relative" }}>
      <div style={{ background: "#2B2C3C", borderRadius: 6, color: "#FFFFFF", fontSize: 12, lineHeight: "16px", maxWidth: 360, padding: "8px 12px" }}>
        {children}
      </div>
      <span style={{ ...arrowStyle, height: 0, position: "absolute", width: 0 }} />
    </div>
  );
}

export type PopoverCardProps = {
  className?: string;
  tone?: "plain" | "icon" | "dark";
  title?: string;
  children: ReactNode;
};

export function PopoverCard({ className, tone = "plain", title, children }: PopoverCardProps) {
  const dark = tone === "dark";

  return (
    <div
      className={cx("dui-root", className)}
      style={{
        background: dark ? "#2B2C3C" : "#FFFFFF",
        border: dark ? "none" : "1px solid #DCDCE6",
        borderRadius: 8,
        boxShadow: "0 16px 32px rgba(20,21,26,0.08)",
        color: dark ? "#FFFFFF" : "#2B2C3C",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxWidth: 360,
        minWidth: 303,
        padding: "16px 20px"
      }}
    >
      {title ? (
        <span className="dui-heading" style={{ alignItems: "center", color: dark ? "#FFFFFF" : "#2B2C3C", display: "inline-flex", gap: 8 }}>
          {tone === "icon" ? <Glyph name="info" size={18} color="#4A8CFF" /> : null}
          {title}
        </span>
      ) : null}
      <span className="dui-body" style={{ color: dark ? "rgba(255,255,255,0.8)" : "#7F7F8E" }}>{children}</span>
    </div>
  );
}

export type ModalDialogProps = {
  className?: string;
  kind?: "plain" | "success" | "info" | "warning" | "error";
  size?: "s" | "m" | "l" | "xl";
  embedded?: boolean;
  title: string;
  description: string;
};

export function ModalDialog({
  className,
  kind = "plain",
  size = "m",
  embedded = false,
  title,
  description
}: ModalDialogProps) {
  const width = size === "s" ? 400 : size === "m" ? 560 : size === "l" ? 800 : 1024;
  const palette = kind === "plain" ? null : toneMap[kind];

  return (
    <div
      className={cx("dui-root", embedded ? className : cx("dui-overlay", className))}
      style={{
        alignItems: "center",
        background: embedded ? "#F5F5F9" : undefined,
        borderRadius: embedded ? 16 : 0,
        display: "flex",
        justifyContent: "center",
        minHeight: embedded ? 420 : undefined,
        padding: 32
      }}
    >
      <div className="dui-panel" style={{ padding: 24, width }}>
        <div style={{ alignItems: "flex-start", display: "flex", gap: 12, marginBottom: 16 }}>
          {palette ? <Glyph name={palette.icon} size={24} color={palette.color} /> : null}
          <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 8 }}>
            <span className="dui-heading">{title}</span>
            <span className="dui-body" style={{ color: "#7F7F8E" }}>{description}</span>
          </div>
          <Glyph name="close" size={16} color="#7F7F8E" />
        </div>
        <div style={{ background: "#F5F5F9", borderRadius: 8, height: 240, marginBottom: 20 }} />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button variant="outline">取消</Button>
          <Button>{kind === "plain" ? "确定" : "继续"}</Button>
        </div>
      </div>
    </div>
  );
}

export type DrawerPanelProps = {
  className?: string;
  size?: "small" | "middle" | "large" | "extra large";
  embedded?: boolean;
  title: string;
  children?: ReactNode;
};

export function DrawerPanel({ className, size = "middle", embedded = false, title, children }: DrawerPanelProps) {
  const width = size === "small" ? 400 : size === "middle" ? 560 : size === "large" ? 800 : 1024;

  return (
    <div
      className={cx("dui-root", embedded ? className : cx("dui-overlay", className))}
      style={{
        background: embedded ? "#F5F5F9" : undefined,
        borderRadius: embedded ? 16 : 0,
        display: "flex",
        justifyContent: "flex-end",
        minHeight: embedded ? 440 : 680,
        overflow: "hidden"
      }}
    >
      <div className="dui-panel" style={{ borderRadius: embedded ? 0 : 0, display: "flex", flexDirection: "column", minHeight: embedded ? 440 : 680, padding: 24, width }}>
        <div style={{ alignItems: "center", borderBottom: "1px solid #F1F1F5", display: "flex", justifyContent: "space-between", paddingBottom: 16 }}>
          <span className="dui-heading">{title}</span>
          <Glyph name="close" size={16} color="#7F7F8E" />
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: 16, paddingTop: 24 }}>
          {children ?? <div style={{ background: "#F5F5F9", borderRadius: 12, flex: 1 }} />}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 24 }}>
          <Button variant="outline">取消</Button>
          <Button>保存</Button>
        </div>
      </div>
    </div>
  );
}
