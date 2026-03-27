import type { ReactNode } from "react";

import { Button } from "./actions";
import { cx } from "../lib/cx";
import { Glyph } from "../lib/icons";

export type BreadcrumbsProps = {
  className?: string;
  icon?: boolean;
  collapsed?: boolean;
  state?: "default" | "selected" | "hover";
  items: string[];
};

export function Breadcrumbs({
  className,
  icon = false,
  collapsed = false,
  state = "default",
  items
}: BreadcrumbsProps) {
  const visibleItems = collapsed && items.length > 3 ? [items[0], "...", items[items.length - 1]] : items;

  return (
    <nav className={cx("dui-root", className)} style={{ alignItems: "center", display: "inline-flex", gap: 8 }}>
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;
        return (
          <span key={`${item}-${index}`} style={{ alignItems: "center", color: isLast ? "#2B2C3C" : state === "hover" ? "#01C2C3" : "#7F7F8E", display: "inline-flex", fontSize: 14, gap: 8, lineHeight: "20px" }}>
            {icon && index === 0 ? <Glyph name="save" size={14} color="#7F7F8E" /> : null}
            <span>{item}</span>
            {!isLast ? <Glyph name="chevron-right" size={12} color="#C7C7D7" /> : null}
          </span>
        );
      })}
    </nav>
  );
}

export type MenuNode = {
  label: string;
  level?: 1 | 2 | 3;
  icon?: boolean;
  selected?: boolean;
  expanded?: boolean;
  children?: MenuNode[];
};

export type MenuTreeProps = {
  className?: string;
  tone?: "light" | "dark";
  nodes: MenuNode[];
  hoveredLabel?: string;
  onItemClick?: (label: string) => void;
  onItemHover?: (label?: string) => void;
};

function menuRow(
  node: MenuNode,
  tone: "light" | "dark",
  hoveredLabel?: string,
  onItemClick?: (label: string) => void,
  onItemHover?: (label?: string) => void
) {
  const paddingLeft = node.level === 1 ? 16 : node.level === 2 ? 40 : 64;
  const selectedBackground = tone === "dark" ? "rgba(255,255,255,0.1)" : "#EFF5FF";
  const hoveredBackground = tone === "dark" ? "rgba(255,255,255,0.06)" : "#FAFAFC";
  const textColor = tone === "dark" ? "#FFFFFF" : "#2B2C3C";
  const hovered = hoveredLabel === node.label && !node.selected;

  return (
    <button
      key={`${node.label}-${node.level ?? 1}`}
      type="button"
      onClick={onItemClick ? () => onItemClick(node.label) : undefined}
      onMouseEnter={onItemHover ? () => onItemHover(node.label) : undefined}
      onMouseLeave={onItemHover ? () => onItemHover(undefined) : undefined}
      style={{
        alignItems: "center",
        background: node.selected ? selectedBackground : hovered ? hoveredBackground : "transparent",
        border: "none",
        color: node.selected ? "#01C2C3" : textColor,
        cursor: onItemClick ? "pointer" : "default",
        display: "flex",
        gap: 12,
        height: 48,
        justifyContent: "space-between",
        padding: `0 16px 0 ${paddingLeft}px`,
        textAlign: "left",
        width: "100%"
      }}
    >
      <span style={{ alignItems: "center", display: "inline-flex", gap: 12 }}>
        {node.icon ? <Glyph name="save" size={16} color={node.selected ? "#01C2C3" : tone === "dark" ? "#FFFFFF" : "#7F7F8E"} /> : null}
        <span className="dui-body" style={{ color: "inherit" }}>{node.label}</span>
      </span>
      {node.children ? <Glyph name={node.expanded ? "chevron-down" : "chevron-right"} size={14} color={node.selected ? "#01C2C3" : tone === "dark" ? "#FFFFFF" : "#7F7F8E"} /> : null}
    </button>
  );
}

export function MenuTree({ className, tone = "light", nodes, hoveredLabel, onItemClick, onItemHover }: MenuTreeProps) {
  return (
    <div className={cx("dui-root", className)} style={{ background: tone === "dark" ? "#14151A" : "#FFFFFF", border: `1px solid ${tone === "dark" ? "#14151A" : "#DCDCE6"}`, borderRadius: 8, overflow: "hidden", width: 240 }}>
      {nodes.flatMap((node) => {
        const rows: ReactNode[] = [menuRow({ level: node.level ?? 1, ...node }, tone, hoveredLabel, onItemClick, onItemHover)];
        if (node.expanded && node.children) {
          rows.push(...node.children.map((child) => menuRow({ level: child.level ?? 2, ...child }, tone, hoveredLabel, onItemClick, onItemHover)));
        }
        return rows;
      })}
    </div>
  );
}

export type PaginationProps = {
  className?: string;
  totalLabel?: boolean;
  quickJump?: boolean;
  current?: number;
  totalPages?: number;
  onChange?: (page: number) => void;
};

export function Pagination({
  className,
  totalLabel = true,
  quickJump = false,
  current = 3,
  totalPages = 7,
  onChange
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={cx("dui-root", className)} style={{ alignItems: "center", display: "inline-flex", gap: 12 }}>
      {totalLabel ? <span className="dui-body" style={{ color: "#7F7F8E" }}>共 {totalPages * 12} 条</span> : null}
      <button type="button" className="dui-card" disabled={current <= 1} onClick={onChange ? () => onChange(Math.max(1, current - 1)) : undefined} style={{ cursor: onChange ? "pointer" : "default", height: 30, opacity: current <= 1 ? 0.5 : 1, padding: "0 10px" }}>上一页</button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={onChange ? () => onChange(page) : undefined}
          style={{
            background: page === current ? "#01C2C3" : "#FFFFFF",
            border: `1px solid ${page === current ? "#01C2C3" : "#DCDCE6"}`,
            borderRadius: 2,
            color: page === current ? "#FFFFFF" : "#2B2C3C",
            cursor: onChange ? "pointer" : "default",
            height: 30,
            minWidth: 30
          }}
        >
          {page}
        </button>
      ))}
      <button type="button" className="dui-card" disabled={current >= totalPages} onClick={onChange ? () => onChange(Math.min(totalPages, current + 1)) : undefined} style={{ cursor: onChange ? "pointer" : "default", height: 30, opacity: current >= totalPages ? 0.5 : 1, padding: "0 10px" }}>下一页</button>
      {quickJump ? (
        <span className="dui-body" style={{ alignItems: "center", display: "inline-flex", gap: 8 }}>
          前往
          <span className="dui-card" style={{ display: "inline-flex", height: 30, minWidth: 56, padding: "0 8px" }}>{current}</span>
          页
        </span>
      ) : null}
    </div>
  );
}

export type DropdownMenuProps = {
  className?: string;
  trigger?: "more" | "outline-button" | "text";
  hover?: boolean;
  open?: boolean;
  selectedIndex?: number;
  onToggle?: () => void;
  onSelect?: (index: number) => void;
  options: Array<{ label: string; helper?: string; icon?: boolean }>;
};

export function DropdownMenu({
  className,
  trigger = "more",
  hover = false,
  open = true,
  selectedIndex,
  onToggle,
  onSelect,
  options
}: DropdownMenuProps) {
  const triggerNode =
    trigger === "more" ? (
      <button onClick={onToggle} type="button" style={{ background: hover ? "#F5F5F9" : "#FFFFFF", border: "1px solid #DCDCE6", borderRadius: 2, cursor: onToggle ? "pointer" : "default", height: 32, width: 114 }}>
        <Glyph name="ellipsis" size={16} color="#2B2C3C" />
      </button>
    ) : trigger === "outline-button" ? (
      <Button onClick={onToggle} variant="outline" state={hover ? "hover" : "default"}>更多操作</Button>
    ) : (
      <button onClick={onToggle} type="button" style={{ background: "transparent", border: "none", color: hover ? "#01C2C3" : "#2B2C3C", cursor: onToggle ? "pointer" : "default", padding: 0 }}>
        <span className="dui-body" style={{ color: "inherit" }}>更多操作</span>
      </button>
    );

  return (
    <div className={cx("dui-root", className)} style={{ display: "inline-flex", flexDirection: "column", gap: 12 }}>
      <div>{triggerNode}</div>
      {open ? (
        <div className="dui-panel" style={{ minWidth: 241, overflow: "hidden" }}>
          {options.map((option, index) => (
            <button
              key={`${option.label}-${index}`}
              type="button"
              onClick={onSelect ? () => onSelect(index) : undefined}
              style={{
                alignItems: "center",
                background: selectedIndex === index ? "#EFF5FF" : index % 2 === 0 ? "#FFFFFF" : "#FAFAFC",
                border: "none",
                color: selectedIndex === index ? "#01C2C3" : "#2B2C3C",
                cursor: onSelect ? "pointer" : "default",
                display: "flex",
                justifyContent: "space-between",
                minHeight: 32,
                padding: "8px 12px",
                width: "100%"
              }}
            >
              <span style={{ alignItems: "center", display: "inline-flex", gap: 8 }}>
                {option.icon ? <Glyph name="save" size={14} color={selectedIndex === index ? "#01C2C3" : "#7F7F8E"} /> : null}
                <span className="dui-body" style={{ color: "inherit" }}>{option.label}</span>
              </span>
              {option.helper ? <span className="dui-caption">{option.helper}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export type StepStatus = "pending" | "processing" | "completed" | "error";

export type StepItem = {
  title: string;
  description?: string;
  status?: StepStatus;
};

export type StepsProps = {
  className?: string;
  direction?: "horizontal" | "vertical";
  align?: "left" | "center";
  size?: "L" | "M";
  items: StepItem[];
};

function stepDot(status: StepStatus, size: "L" | "M") {
  const tone =
    status === "completed" ? "#20C520" :
    status === "processing" ? "#01C2C3" :
    status === "error" ? "#FF4444" :
    "#C7C7D7";
  const box = size === "L" ? 28 : 24;

  return (
    <span
      style={{
        alignItems: "center",
        background: "#FFFFFF",
        border: `2px solid ${tone}`,
        borderRadius: "50%",
        color: tone,
        display: "inline-flex",
        height: box,
        justifyContent: "center",
        width: box
      }}
    >
      {status === "completed" ? <Glyph name="check" size={size === "L" ? 16 : 14} color={tone} /> :
      status === "error" ? <Glyph name="close" size={size === "L" ? 14 : 12} color={tone} /> :
      <span style={{ fontSize: size === "L" ? 14 : 12, lineHeight: 1 }}>•</span>}
    </span>
  );
}

export function Steps({
  className,
  direction = "horizontal",
  align = "left",
  size = "L",
  items
}: StepsProps) {
  const vertical = direction === "vertical";

  return (
    <div className={cx("dui-root", className)} style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: vertical ? 20 : 0, width: vertical ? 240 : "100%" }}>
      {items.map((item, index) => {
        const status = item.status ?? "pending";
        const last = index === items.length - 1;
        return (
          <div
            key={`${item.title}-${index}`}
            style={{
              alignItems: align === "center" ? "center" : "flex-start",
              display: "flex",
              flex: vertical ? "none" : 1,
              flexDirection: vertical ? "row" : "column",
              gap: vertical ? 12 : 10,
              position: "relative",
              textAlign: align === "center" ? "center" : "left"
            }}
          >
            <div style={{ alignItems: "center", display: "flex", flexDirection: vertical ? "column" : "row", gap: 12, width: vertical ? "auto" : "100%" }}>
              {stepDot(status, size)}
              {!last ? (
                <span
                  style={{
                    background: "#DCDCE6",
                    flex: vertical ? "none" : 1,
                    height: vertical ? 40 : 2,
                    width: vertical ? 2 : "auto"
                  }}
                />
              ) : null}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 90 }}>
              <span className="dui-heading" style={{ color: status === "error" ? "#FF4444" : "#2B2C3C" }}>{item.title}</span>
              {item.description ? <span className="dui-caption">{item.description}</span> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
