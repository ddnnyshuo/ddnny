import type { CSSProperties, ReactNode } from "react";

import { Button } from "./actions";
import { cx } from "../lib/cx";
import { Glyph } from "../lib/icons";
import type { ComponentSize } from "../lib/tokens";

type FieldState = "normal" | "hover" | "click" | "finish" | "disabled" | "readonly" | "error";

function fieldBox(size: Exclude<ComponentSize, "small">, state: FieldState): CSSProperties {
  const height = size === "large" ? 40 : 32;
  const borderColor =
    state === "hover" || state === "click" ? "#01C2C3" :
    state === "error" ? "#FF4444" :
    "#DCDCE6";

  return {
    alignItems: "center",
    background: state === "disabled" ? "#F1F1F5" : "#FFFFFF",
    border: `1px solid ${borderColor}`,
    borderRadius: 2,
    color: state === "disabled" ? "#C7C7D7" : "#2B2C3C",
    cursor: state === "disabled" ? "not-allowed" : "text",
    display: "flex",
    gap: 8,
    height,
    padding: size === "large" ? "10px 12px" : "6px 12px",
    width: 240
  };
}

export type InputFieldProps = {
  className?: string;
  size?: "middle" | "large";
  state?: FieldState;
  prefix?: ReactNode;
  suffix?: ReactNode;
  count?: string;
  helperText?: string;
  placeholder?: string;
  value?: string;
};

export function InputField({
  className,
  size = "middle",
  state = "normal",
  prefix,
  suffix,
  count,
  helperText,
  placeholder = "请输入",
  value
}: InputFieldProps) {
  const activeText = state === "click" || state === "finish" ? (value ?? "这是文案") : "";

  return (
    <div className={cx("dui-root", className)} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={fieldBox(size, state)}>
        {prefix ? <span>{prefix}</span> : null}
        <span style={{ color: activeText ? "#2B2C3C" : "#C7C7D7", flex: 1, fontSize: 14, letterSpacing: 0.5 }}>
          {activeText || placeholder}
          {state === "click" ? "|" : ""}
        </span>
        {suffix ? <span>{suffix}</span> : null}
        {count ? <span style={{ color: "#C7C7D7", fontSize: 12 }}>{count}</span> : null}
      </div>
      {state === "error" && helperText ? (
        <span className="dui-caption" style={{ color: "#FF4444" }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}

export type SelectFieldProps = {
  className?: string;
  size?: "middle" | "large";
  state?: "normal" | "hover" | "click" | "finish" | "finish-hover" | "disable" | "readonly" | "error";
  multiple?: boolean;
  placeholder?: string;
  value?: string;
  helperText?: string;
};

export function SelectField({
  className,
  size = "middle",
  state = "normal",
  multiple = false,
  placeholder = "请选择",
  value,
  helperText
}: SelectFieldProps) {
  const fieldState: FieldState =
    state === "disable" ? "disabled" :
    state === "readonly" ? "readonly" :
    state === "error" ? "error" :
    state === "click" ? "click" :
    state === "hover" || state === "finish-hover" ? "hover" :
    value ? "finish" :
    "normal";

  return (
    <div className={cx("dui-root", className)} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ ...fieldBox(size, fieldState), width: 240 }}>
        <span style={{ color: value ? "#2B2C3C" : "#C7C7D7", flex: 1 }}>{value ?? placeholder}</span>
        {multiple && value ? (
          <span className="dui-caption" style={{ color: "#01C2C3" }}>
            {value}
          </span>
        ) : null}
        <Glyph name="chevron-down" size={14} color={fieldState === "disabled" ? "#C7C7D7" : "#7F7F8E"} />
      </div>
      {fieldState === "error" && helperText ? (
        <span className="dui-caption" style={{ color: "#FF4444" }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}

export type SearchFieldProps = {
  className?: string;
  size?: "middle" | "large";
  state?: "normal" | "hover" | "click" | "finish" | "buttonhover";
  action?: "none" | "outline" | "fill";
  placeholder?: string;
  value?: string;
};

export function SearchField({
  className,
  size = "middle",
  state = "normal",
  action = "none",
  placeholder = "请输入搜索内容",
  value
}: SearchFieldProps) {
  const fieldState: FieldState =
    state === "click" ? "click" : state === "hover" || state === "buttonhover" ? "hover" : value ? "finish" : "normal";

  return (
    <div className={cx("dui-root", className)} style={{ display: "inline-flex", alignItems: "stretch" }}>
      <div style={{ ...fieldBox(size, fieldState), borderTopRightRadius: action === "none" ? 2 : 0, borderBottomRightRadius: action === "none" ? 2 : 0 }}>
        <Glyph name="search" size={14} color="#7F7F8E" />
        <span style={{ color: value ? "#2B2C3C" : "#C7C7D7", flex: 1 }}>{value ?? placeholder}</span>
      </div>
      {action !== "none" ? (
        <Button
          size={size}
          variant={action === "outline" ? "outline" : "solid"}
          state={state === "buttonhover" ? "hover" : "default"}
          className="dui-root"
        >
          搜索
        </Button>
      ) : null}
    </div>
  );
}

export type DatePickerFieldProps = {
  className?: string;
  size?: "middle" | "large";
  state?: "default" | "hover" | "finish" | "disable" | "readonly" | "finish-hover";
  range?: boolean;
  value?: string;
};

export function DatePickerField({
  className,
  size = "middle",
  state = "default",
  range = false,
  value
}: DatePickerFieldProps) {
  const fieldState: FieldState =
    state === "disable" ? "disabled" :
    state === "readonly" ? "readonly" :
    state === "hover" || state === "finish-hover" ? "hover" :
    value || state === "finish" ? "finish" :
    "normal";

  return (
    <div className={cx("dui-root", className)} style={{ ...fieldBox(size, fieldState), width: 320 }}>
      <Glyph name="calendar" size={14} color="#7F7F8E" />
      <span style={{ color: value ? "#2B2C3C" : "#C7C7D7", flex: 1 }}>
        {value ?? (range ? "请选择开始时间 - 结束时间" : "请选择日期")}
      </span>
      <Glyph name="chevron-down" size={14} color="#7F7F8E" />
    </div>
  );
}

export type UploadCardProps = {
  className?: string;
  size?: "default" | "small";
  state?: "idle" | "hover" | "disabled" | "uploaded" | "uploaded-hover";
  fileName?: string;
  onClick?: () => void;
};

export function UploadCard({
  className,
  size = "default",
  state = "idle",
  fileName = "image.png",
  onClick
}: UploadCardProps) {
  const box = size === "default" ? 124 : 88;
  const uploaded = state === "uploaded" || state === "uploaded-hover";
  const disabled = state === "disabled";

  return (
    <div
      className={cx("dui-root dui-card", className)}
      onClick={disabled ? undefined : onClick}
      style={{
        alignItems: "center",
        background: disabled ? "#F1F1F5" : "#FFFFFF",
        borderColor: state === "hover" ? "#01C2C3" : "#DCDCE6",
        color: uploaded ? "#2B2C3C" : "#7F7F8E",
        cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        height: box,
        justifyContent: "center",
        position: "relative",
        width: box
      }}
    >
      {uploaded ? (
        <>
          <div style={{ background: "#EFF5FF", borderRadius: 8, inset: 8, position: "absolute" }} />
          <Glyph name="check" size={size === "default" ? 20 : 16} color="#20C520" />
          <span className="dui-caption" style={{ color: "#2B2C3C", position: "relative" }}>{fileName}</span>
        </>
      ) : (
        <>
          <Glyph name="upload" size={size === "default" ? 24 : 18} color={state === "disabled" ? "#C7C7D7" : "#7F7F8E"} />
          <span className="dui-caption">{size === "default" ? "点击上传" : "上传"}</span>
        </>
      )}
    </div>
  );
}

export type SwitchFieldProps = {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function SwitchField({ className, checked = false, disabled = false, onClick }: SwitchFieldProps) {
  const background = disabled ? (checked ? "#A6E9EA" : "#DCDCE6") : checked ? "#01C2C3" : "#C7C7D7";

  return (
    <span
      className={cx("dui-root", className)}
      onClick={disabled ? undefined : onClick}
      style={{
        alignItems: "center",
        background,
        borderRadius: 999,
        cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default",
        display: "inline-flex",
        height: 22,
        padding: 2,
        width: 44
      }}
    >
      <span
        style={{
          background: "#FFFFFF",
          borderRadius: "50%",
          height: 18,
          marginLeft: checked ? 22 : 0,
          transition: "margin 0.2s ease",
          width: 18
        }}
      />
    </span>
  );
}

type ChoiceProps = {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  label: ReactNode;
  hover?: boolean;
  onClick?: () => void;
};

export function RadioOption({ className, checked = false, disabled = false, hover = false, label, onClick }: ChoiceProps) {
  const border = disabled ? "#DCDCE6" : checked || hover ? "#01C2C3" : "#C7C7D7";

  return (
    <label className={cx("dui-root", className)} onClick={disabled ? undefined : onClick} style={{ alignItems: "center", color: disabled ? "#C7C7D7" : "#2B2C3C", cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default", display: "inline-flex", gap: 8 }}>
      <span style={{ alignItems: "center", border: `1px solid ${border}`, borderRadius: "50%", display: "inline-flex", height: 16, justifyContent: "center", width: 16 }}>
        {checked ? <span style={{ background: disabled ? "#C7C7D7" : "#01C2C3", borderRadius: "50%", height: 8, width: 8 }} /> : null}
      </span>
      <span className="dui-body">{label}</span>
    </label>
  );
}

export function CheckboxOption({ className, checked = false, disabled = false, hover = false, label, onClick }: ChoiceProps) {
  const border = disabled ? "#DCDCE6" : checked || hover ? "#01C2C3" : "#C7C7D7";
  const background = checked ? (disabled ? "#C7C7D7" : "#01C2C3") : "#FFFFFF";

  return (
    <label className={cx("dui-root", className)} onClick={disabled ? undefined : onClick} style={{ alignItems: "center", color: disabled ? "#C7C7D7" : "#2B2C3C", cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default", display: "inline-flex", gap: 8 }}>
      <span style={{ alignItems: "center", background, border: `1px solid ${border}`, borderRadius: 2, display: "inline-flex", height: 16, justifyContent: "center", width: 16 }}>
        {checked ? <Glyph name="check" size={12} color="#FFFFFF" /> : null}
      </span>
      <span className="dui-body">{label}</span>
    </label>
  );
}

export type CascaderItemProps = {
  className?: string;
  hasChildren?: boolean;
  state?: "normal" | "selected" | "disabled" | "partial";
  multiple?: boolean;
  label: string;
};

export function CascaderItem({
  className,
  hasChildren = false,
  state = "normal",
  multiple = false,
  label
}: CascaderItemProps) {
  const active = state === "selected" || state === "partial";
  const disabled = state === "disabled";

  return (
    <div
      className={cx("dui-root", className)}
      style={{
        alignItems: "center",
        background: active ? "#EFF5FF" : "#FFFFFF",
        color: disabled ? "#C7C7D7" : "#2B2C3C",
        display: "flex",
        gap: 8,
        height: 28,
        justifyContent: "space-between",
        padding: "0 12px"
      }}
    >
      <span style={{ alignItems: "center", display: "inline-flex", gap: 8 }}>
        {multiple ? (
          state === "partial" ? (
            <span style={{ alignItems: "center", background: "#01C2C3", borderRadius: 2, display: "inline-flex", height: 14, justifyContent: "center", width: 14 }}>
              <Glyph name="minus" size={10} color="#FFFFFF" />
            </span>
          ) : (
            <CheckboxOption checked={state === "selected"} disabled={disabled} label="" className="" />
          )
        ) : null}
        <span className="dui-body">{label}</span>
      </span>
      {hasChildren ? <Glyph name="chevron-right" size={12} color={disabled ? "#C7C7D7" : "#7F7F8E"} /> : null}
    </div>
  );
}

export type CascaderPanelProps = {
  className?: string;
  columns?: Array<Array<CascaderItemProps>>;
};

export function CascaderPanel({ className, columns }: CascaderPanelProps) {
  const fallback: Array<Array<CascaderItemProps>> = [
    [
      { label: "类目 A", state: "selected", hasChildren: true },
      { label: "类目 B", hasChildren: true },
      { label: "类目 C", state: "disabled" }
    ],
    [
      { label: "子类 1", state: "partial", hasChildren: true, multiple: true },
      { label: "子类 2", multiple: true },
      { label: "子类 3", state: "selected", multiple: true }
    ],
    [
      { label: "叶子节点", state: "selected", multiple: true },
      { label: "叶子节点 2", multiple: true }
    ]
  ];

  return (
    <div className={cx("dui-root dui-panel", className)} style={{ display: "inline-flex", overflow: "hidden" }}>
      {(columns ?? fallback).map((column, index) => (
        <div key={index} style={{ borderLeft: index === 0 ? "none" : "1px solid #F1F1F5", minWidth: index === 0 ? 108 : 109, padding: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {column.map((item, itemIndex) => (
              <CascaderItem key={itemIndex} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export type TransferProps = {
  className?: string;
  oneWay?: boolean;
  searchable?: boolean;
  leftTitle?: string;
  rightTitle?: string;
};

function transferList(title: string, searchable: boolean) {
  return (
    <div className="dui-card" style={{ display: "flex", flexDirection: "column", width: 240 }}>
      <div style={{ alignItems: "center", borderBottom: "1px solid #F1F1F5", display: "flex", justifyContent: "space-between", padding: "12px 16px" }}>
        <span className="dui-heading">{title}</span>
        <span className="dui-caption">3 / 12</span>
      </div>
      {searchable ? (
        <div style={{ padding: 12 }}>
          <SearchField size="middle" action="none" placeholder="搜索项目" />
        </div>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 12 }}>
        <CheckboxOption checked label="第一项" />
        <CheckboxOption label="第二项" />
        <CheckboxOption label="第三项" disabled />
        <CheckboxOption checked label="第四项" />
      </div>
    </div>
  );
}

export function Transfer({
  className,
  oneWay = false,
  searchable = false,
  leftTitle = "候选列表",
  rightTitle = "已选列表"
}: TransferProps) {
  return (
    <div className={cx("dui-root", className)} style={{ alignItems: "center", display: "inline-flex", gap: 16 }}>
      {transferList(leftTitle, searchable)}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Button size="small">加入</Button>
        {!oneWay ? <Button size="small" variant="outline">移除</Button> : null}
      </div>
      {transferList(rightTitle, searchable)}
    </div>
  );
}
