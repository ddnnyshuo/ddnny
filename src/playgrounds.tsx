import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import {
  AlertBanner,
  Breadcrumbs,
  Button,
  CascaderPanel,
  CheckboxOption,
  DatePickerField,
  DrawerPanel,
  DropdownMenu,
  EmptyState,
  InputField,
  MenuTree,
  MessageToast,
  ModalDialog,
  NotificationCard,
  Pagination,
  PopoverCard,
  RadioOption,
  SearchField,
  SelectField,
  Steps,
  SwitchField,
  Tag,
  TooltipBubble,
  Transfer,
  UploadCard
} from "./index";
import type { CascaderItemProps, MenuNode, StepItem } from "./index";

const toolbarStyle = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap" as const,
  gap: 8
};

const labelStyle = {
  color: "#7F7F8E",
  fontSize: 12,
  lineHeight: "16px"
};

function Segments({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div style={toolbarStyle}>
      <span style={labelStyle}>{label}</span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          style={{
            background: option.value === value ? "#EFF5FF" : "#FFFFFF",
            border: `1px solid ${option.value === value ? "#01C2C3" : "#DCDCE6"}`,
            borderRadius: 999,
            color: option.value === value ? "#01C2C3" : "#2B2C3C",
            cursor: "pointer",
            fontSize: 12,
            lineHeight: "16px",
            padding: "5px 10px"
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ToggleControl({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        alignItems: "center",
        background: checked ? "#EFF5FF" : "#FFFFFF",
        border: `1px solid ${checked ? "#01C2C3" : "#DCDCE6"}`,
        borderRadius: 999,
        color: checked ? "#01C2C3" : "#2B2C3C",
        cursor: "pointer",
        display: "inline-flex",
        fontSize: 12,
        gap: 6,
        lineHeight: "16px",
        padding: "5px 10px"
      }}
    >
      {label}
    </button>
  );
}

function PlaygroundBlock({
  controls,
  children
}: {
  controls?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="site-demo-stack">
      {controls ? <div style={{ ...toolbarStyle, marginBottom: 4 }}>{controls}</div> : null}
      {children}
    </div>
  );
}

export function ButtonPlayground() {
  const [size, setSize] = useState<"small" | "middle" | "large">("middle");
  const [variant, setVariant] = useState<"solid" | "outline">("solid");
  const [tone, setTone] = useState<"primary" | "danger">("primary");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="尺寸" value={size} onChange={(value) => setSize(value as typeof size)} options={[{ label: "S", value: "small" }, { label: "M", value: "middle" }, { label: "L", value: "large" }]} />
          <Segments label="样式" value={variant} onChange={(value) => setVariant(value as typeof variant)} options={[{ label: "实心", value: "solid" }, { label: "描边", value: "outline" }]} />
          <Segments label="语义" value={tone} onChange={(value) => setTone(value as typeof tone)} options={[{ label: "主色", value: "primary" }, { label: "危险", value: "danger" }]} />
          <ToggleControl label="禁用" checked={disabled} onChange={setDisabled} />
          <ToggleControl label="加载中" checked={loading} onChange={setLoading} />
        </>
      }
    >
      <div className="site-demo-row">
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <Button size={size} variant={variant} tone={tone} state={loading ? "loading" : disabled ? "disabled" : hovered ? "hover" : "default"}>
            {hovered ? "悬停中" : "立即操作"}
          </Button>
        </div>
        <Button size={size} variant="outline">次要按钮</Button>
        <Button size={size} tone="danger" variant={variant === "outline" ? "outline" : "solid"}>删除内容</Button>
      </div>
    </PlaygroundBlock>
  );
}

export function TagPlayground() {
  const [tags, setTags] = useState(["活动标签", "精选商品"]);
  const [selected, setSelected] = useState("活动标签");

  return (
    <PlaygroundBlock
      controls={
        <button
          type="button"
          onClick={() => setTags((current) => [...current, `新标签 ${current.length + 1}`])}
          style={{ ...labelStyle, background: "#FFFFFF", border: "1px solid #DCDCE6", borderRadius: 999, color: "#2B2C3C", cursor: "pointer", padding: "5px 10px" }}
        >
          点击新增标签
        </button>
      }
    >
      <div className="site-demo-row">
        {tags.map((tag) => (
          <span key={tag} onClick={() => setSelected(tag)} style={{ cursor: "pointer" }}>
            <Tag tone={selected === tag ? "info" : "neutral"} mode="closable">
              {tag}
            </Tag>
          </span>
        ))}
        <span onClick={() => setTags((current) => current.slice(0, -1))} style={{ cursor: "pointer" }}>
          <Tag mode="addable">新增一项</Tag>
        </span>
        <Tag mode="input">输入中</Tag>
      </div>
    </PlaygroundBlock>
  );
}

export function BreadcrumbPlayground() {
  const [collapsed, setCollapsed] = useState(false);
  const [icon, setIcon] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [depth, setDepth] = useState(4);
  const items = ["首页", "商品中心", "列表页", "筛选结果", "商品详情"].slice(0, depth);

  return (
    <PlaygroundBlock
      controls={
        <>
          <ToggleControl label="折叠" checked={collapsed} onChange={setCollapsed} />
          <ToggleControl label="图标" checked={icon} onChange={setIcon} />
          <button type="button" onClick={() => setDepth((value) => Math.min(5, value + 1))} style={{ ...labelStyle, background: "#FFFFFF", border: "1px solid #DCDCE6", borderRadius: 999, color: "#2B2C3C", cursor: "pointer", padding: "5px 10px" }}>进入下级</button>
          <button type="button" onClick={() => setDepth((value) => Math.max(2, value - 1))} style={{ ...labelStyle, background: "#FFFFFF", border: "1px solid #DCDCE6", borderRadius: 999, color: "#2B2C3C", cursor: "pointer", padding: "5px 10px" }}>返回上级</button>
        </>
      }
    >
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <Breadcrumbs icon={icon} collapsed={collapsed} state={hovered ? "hover" : "default"} items={items} />
      </div>
    </PlaygroundBlock>
  );
}

export function MenuPlayground() {
  const [tone, setTone] = useState<"light" | "dark">("light");
  const [hovered, setHovered] = useState<string>();
  const [selected, setSelected] = useState("趋势看板");
  const [expanded, setExpanded] = useState<string[]>(["总览"]);

  const nodes = useMemo<MenuNode[]>(() => [
    {
      label: "总览",
      level: 1,
      icon: true,
      expanded: expanded.includes("总览"),
      selected: selected === "总览",
      children: [
        { label: "趋势看板", level: 2, selected: selected === "趋势看板" },
        { label: "分渠道数据", level: 3, selected: selected === "分渠道数据" }
      ]
    },
    {
      label: "素材中心",
      level: 1,
      icon: true,
      expanded: expanded.includes("素材中心"),
      selected: selected === "素材中心",
      children: [
        { label: "图片素材", level: 2, selected: selected === "图片素材" },
        { label: "视频素材", level: 2, selected: selected === "视频素材" }
      ]
    }
  ], [expanded, selected]);

  function handleClick(label: string) {
    if (label === "总览" || label === "素材中心") {
      setExpanded((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
      setSelected(label);
      return;
    }
    setSelected(label);
  }

  return (
    <PlaygroundBlock
      controls={<Segments label="主题" value={tone} onChange={(value) => setTone(value as typeof tone)} options={[{ label: "浅色", value: "light" }, { label: "深色", value: "dark" }]} />}
    >
      <MenuTree tone={tone} nodes={nodes} hoveredLabel={hovered} onItemClick={handleClick} onItemHover={setHovered} />
    </PlaygroundBlock>
  );
}

export function PaginationPlayground() {
  const [current, setCurrent] = useState(3);
  const [quickJump, setQuickJump] = useState(true);
  const [totalLabel, setTotalLabel] = useState(true);

  return (
    <PlaygroundBlock
      controls={
        <>
          <ToggleControl label="总数标签" checked={totalLabel} onChange={setTotalLabel} />
          <ToggleControl label="快速跳转" checked={quickJump} onChange={setQuickJump} />
        </>
      }
    >
      <Pagination current={current} quickJump={quickJump} totalLabel={totalLabel} totalPages={9} onChange={setCurrent} />
    </PlaygroundBlock>
  );
}

export function DropdownPlayground() {
  const [trigger, setTrigger] = useState<"more" | "outline-button" | "text">("more");
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hover, setHover] = useState(false);

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="触发器" value={trigger} onChange={(value) => setTrigger(value as typeof trigger)} options={[{ label: "更多", value: "more" }, { label: "描边按钮", value: "outline-button" }, { label: "文字", value: "text" }]} />
          <ToggleControl label="展开" checked={open} onChange={setOpen} />
        </>
      }
    >
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <DropdownMenu
          trigger={trigger}
          hover={hover}
          open={open}
          selectedIndex={selected}
          onToggle={() => setOpen((value) => !value)}
          onSelect={(index) => {
            setSelected(index);
            setOpen(false);
          }}
          options={[{ label: "编辑" }, { label: "复制", helper: "Ctrl+C" }, { label: "删除", icon: true }]}
        />
      </div>
    </PlaygroundBlock>
  );
}

export function StepsPlayground() {
  const [direction, setDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [current, setCurrent] = useState(1);
  const [error, setError] = useState(false);

  const items: StepItem[] = [
    { title: "上传文件", description: "准备数据" },
    { title: "解析内容", description: "服务处理中" },
    { title: "生成结果", description: "等待完成" },
    { title: "发布上线", description: "人工确认" }
  ].map((item, index) => ({
    ...item,
    status: error && index === current ? "error" : index < current ? "completed" : index === current ? "processing" : "pending"
  }));

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="方向" value={direction} onChange={(value) => setDirection(value as typeof direction)} options={[{ label: "横向", value: "horizontal" }, { label: "纵向", value: "vertical" }]} />
          <Segments label="当前步骤" value={String(current)} onChange={(value) => setCurrent(Number(value))} options={[0, 1, 2, 3].map((value) => ({ label: `${value + 1}`, value: String(value) }))} />
          <ToggleControl label="异常态" checked={error} onChange={setError} />
        </>
      }
    >
      <Steps direction={direction} size={direction === "horizontal" ? "L" : "M"} items={items} />
    </PlaygroundBlock>
  );
}

export function InputPlayground() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [hover, setHover] = useState(false);
  const [error, setError] = useState(false);

  return (
    <PlaygroundBlock
      controls={
        <>
          <button type="button" onClick={() => setValue((current) => current ? "" : "这是文案")} style={{ ...labelStyle, background: "#FFFFFF", border: "1px solid #DCDCE6", borderRadius: 999, color: "#2B2C3C", cursor: "pointer", padding: "5px 10px" }}>{value ? "清空" : "填充"}</button>
          <ToggleControl label="聚焦" checked={focused} onChange={setFocused} />
          <ToggleControl label="报错" checked={error} onChange={setError} />
        </>
      }
    >
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <InputField
          size="large"
          prefix="¥"
          count={`${value.length}/10`}
          value={value}
          state={error ? "error" : focused ? "click" : value ? "finish" : hover ? "hover" : "normal"}
          helperText={error ? "输入错误提示文案" : undefined}
        />
      </div>
    </PlaygroundBlock>
  );
}

export function SelectPlayground() {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [multiple, setMultiple] = useState(false);

  const options = ["选项 A", "选项 B", "选项 C"];

  return (
    <PlaygroundBlock controls={<ToggleControl label="多选展示" checked={multiple} onChange={setMultiple} />}>
      <div className="site-demo-stack">
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setOpen((current) => !current)} style={{ cursor: "pointer", width: "fit-content" }}>
          <SelectField multiple={multiple} state={open ? "click" : hover ? "hover" : value ? "finish" : "normal"} value={value || undefined} />
        </div>
        {open ? (
          <div className="dui-panel" style={{ overflow: "hidden", width: 240 }}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setValue(multiple ? (value ? `${value}, ${option}` : option) : option);
                  setOpen(false);
                }}
                style={{ background: value.includes(option) ? "#EFF5FF" : "#FFFFFF", border: "none", color: value.includes(option) ? "#01C2C3" : "#2B2C3C", cursor: "pointer", padding: "10px 12px", textAlign: "left", width: "100%" }}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </PlaygroundBlock>
  );
}

export function SearchPlayground() {
  const [action, setAction] = useState<"none" | "outline" | "fill">("fill");
  const [query, setQuery] = useState("商品名称");
  const [buttonHover, setButtonHover] = useState(false);

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="按钮" value={action} onChange={(value) => setAction(value as typeof action)} options={[{ label: "无按钮", value: "none" }, { label: "描边", value: "outline" }, { label: "填充", value: "fill" }]} />
          <button type="button" onClick={() => setQuery((current) => current ? "" : "商品名称")} style={{ ...labelStyle, background: "#FFFFFF", border: "1px solid #DCDCE6", borderRadius: 999, color: "#2B2C3C", cursor: "pointer", padding: "5px 10px" }}>{query ? "清空关键词" : "填入关键词"}</button>
        </>
      }
    >
      <div onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => setButtonHover(false)}>
        <SearchField action={action} state={buttonHover ? "buttonhover" : query ? "finish" : "normal"} value={query || undefined} />
      </div>
    </PlaygroundBlock>
  );
}

export function DatePickerPlayground() {
  const [range, setRange] = useState(false);
  const [value, setValue] = useState("");
  const [hover, setHover] = useState(false);

  return (
    <PlaygroundBlock
      controls={
        <>
          <ToggleControl label="范围模式" checked={range} onChange={setRange} />
          <button type="button" onClick={() => setValue(range ? "2026-03-27 至 2026-03-31" : "2026-03-27")} style={{ ...labelStyle, background: "#FFFFFF", border: "1px solid #DCDCE6", borderRadius: 999, color: "#2B2C3C", cursor: "pointer", padding: "5px 10px" }}>选择示例日期</button>
          <button type="button" onClick={() => setValue("")} style={{ ...labelStyle, background: "#FFFFFF", border: "1px solid #DCDCE6", borderRadius: 999, color: "#2B2C3C", cursor: "pointer", padding: "5px 10px" }}>清空</button>
        </>
      }
    >
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <DatePickerField range={range} state={hover ? "hover" : value ? "finish" : "default"} value={value || undefined} />
      </div>
    </PlaygroundBlock>
  );
}

export function UploadPlayground() {
  const [uploaded, setUploaded] = useState(false);
  const [hover, setHover] = useState(false);
  const [small, setSmall] = useState(false);

  const state = uploaded ? (hover ? "uploaded-hover" : "uploaded") : hover ? "hover" : "idle";

  return (
    <PlaygroundBlock controls={<ToggleControl label="小尺寸" checked={small} onChange={setSmall} />}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ width: "fit-content" }}>
        <UploadCard size={small ? "small" : "default"} state={state} fileName={small ? "avatar.png" : "cover.png"} onClick={() => setUploaded((value) => !value)} />
      </div>
    </PlaygroundBlock>
  );
}

export function ChoiceControlsPlayground() {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("A");
  const [boxes, setBoxes] = useState(["A"]);

  return (
    <PlaygroundBlock>
      <div className="site-demo-row">
        <SwitchField checked={checked} onClick={() => setChecked((value) => !value)} />
        <SwitchField disabled />
      </div>
      <div className="site-demo-row">
        <RadioOption checked={radio === "A"} label="方案 A" onClick={() => setRadio("A")} />
        <RadioOption checked={radio === "B"} label="方案 B" onClick={() => setRadio("B")} />
        <RadioOption disabled label="禁用项" />
      </div>
      <div className="site-demo-row">
        <CheckboxOption checked={boxes.includes("A")} label="多选 A" onClick={() => setBoxes((current) => current.includes("A") ? current.filter((item) => item !== "A") : [...current, "A"])} />
        <CheckboxOption checked={boxes.includes("B")} label="多选 B" onClick={() => setBoxes((current) => current.includes("B") ? current.filter((item) => item !== "B") : [...current, "B"])} />
        <CheckboxOption disabled label="禁用项" />
      </div>
    </PlaygroundBlock>
  );
}

export function CascaderPlayground() {
  const [mode, setMode] = useState<"single" | "multiple">("multiple");
  const [selectedRoot, setSelectedRoot] = useState("类目 A");

  const columns: Array<Array<CascaderItemProps>> = [
    [
      { label: "类目 A", state: selectedRoot === "类目 A" ? "selected" : "normal", hasChildren: true, multiple: mode === "multiple" },
      { label: "类目 B", state: selectedRoot === "类目 B" ? "selected" : "normal", hasChildren: true, multiple: mode === "multiple" },
      { label: "类目 C", state: "disabled", multiple: mode === "multiple" }
    ],
    selectedRoot === "类目 A"
      ? [
          { label: "子类 1", state: mode === "multiple" ? "partial" : "selected", hasChildren: true, multiple: mode === "multiple" },
          { label: "子类 2", multiple: mode === "multiple" },
          { label: "子类 3", state: "selected", multiple: mode === "multiple" }
        ]
      : [
          { label: "分组 1", state: "selected", hasChildren: true, multiple: mode === "multiple" },
          { label: "分组 2", multiple: mode === "multiple" }
        ],
    [
      { label: "叶子节点", state: "selected", multiple: mode === "multiple" },
      { label: "叶子节点 2", multiple: mode === "multiple" }
    ]
  ];

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="模式" value={mode} onChange={(value) => setMode(value as typeof mode)} options={[{ label: "多选", value: "multiple" }, { label: "单选", value: "single" }]} />
          <Segments label="根节点" value={selectedRoot} onChange={setSelectedRoot} options={[{ label: "类目 A", value: "类目 A" }, { label: "类目 B", value: "类目 B" }]} />
        </>
      }
    >
      <CascaderPanel columns={columns} />
    </PlaygroundBlock>
  );
}

export function TransferPlayground() {
  const [oneWay, setOneWay] = useState(false);
  const [searchable, setSearchable] = useState(true);

  return (
    <PlaygroundBlock
      controls={
        <>
          <ToggleControl label="单向穿梭" checked={oneWay} onChange={setOneWay} />
          <ToggleControl label="带搜索" checked={searchable} onChange={setSearchable} />
        </>
      }
    >
      <Transfer oneWay={oneWay} searchable={searchable} leftTitle={oneWay ? "待同步" : "候选列表"} rightTitle={oneWay ? "已同步" : "已选列表"} />
    </PlaygroundBlock>
  );
}

export function EmptyStatePlayground() {
  const [layout, setLayout] = useState<"text-only" | "illustration-text" | "illustration-title-text" | "illustration-title-text-action">("illustration-title-text");
  const [mode, setMode] = useState<"light" | "muted">("light");
  const [illustration, setIllustration] = useState<"network" | "shrug" | "empty-data">("shrug");

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="布局" value={layout} onChange={(value) => setLayout(value as typeof layout)} options={[{ label: "说明", value: "text-only" }, { label: "插图+说明", value: "illustration-text" }, { label: "标题说明", value: "illustration-title-text" }, { label: "带按钮", value: "illustration-title-text-action" }]} />
          <Segments label="插图" value={illustration} onChange={(value) => setIllustration(value as typeof illustration)} options={[{ label: "无网络", value: "network" }, { label: "摊手", value: "shrug" }, { label: "空数据", value: "empty-data" }]} />
          <Segments label="底色" value={mode} onChange={(value) => setMode(value as typeof mode)} options={[{ label: "白底", value: "light" }, { label: "灰底", value: "muted" }]} />
        </>
      }
    >
      <EmptyState
        layout={layout}
        mode={mode}
        illustration={illustration}
        title="这是标题"
        description="这是一段说明文字，最大宽度不超过 240px。"
        actionLabel="立即设置"
      />
    </PlaygroundBlock>
  );
}

export function TooltipPlayground() {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState<"top" | "right" | "bottom" | "left">("top");

  return (
    <PlaygroundBlock controls={<Segments label="方向" value={placement} onChange={(value) => setPlacement(value as typeof placement)} options={[{ label: "上", value: "top" }, { label: "右", value: "right" }, { label: "下", value: "bottom" }, { label: "左", value: "left" }]} />}>
      <div style={{ alignItems: "center", display: "flex", justifyContent: "center", minHeight: 80 }}>
        <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} style={{ position: "relative" }}>
          <Button variant="outline">悬停查看提示</Button>
          {visible ? <div style={{ marginTop: placement === "top" ? 0 : 12, position: "absolute", zIndex: 1 }}><TooltipBubble placement={placement}>提示会跟随 hover 展示</TooltipBubble></div> : null}
        </div>
      </div>
    </PlaygroundBlock>
  );
}

export function PopoverPlayground() {
  const [open, setOpen] = useState(true);
  const [tone, setTone] = useState<"plain" | "icon" | "dark">("icon");

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="风格" value={tone} onChange={(value) => setTone(value as typeof tone)} options={[{ label: "默认", value: "plain" }, { label: "图标", value: "icon" }, { label: "深色", value: "dark" }]} />
          <ToggleControl label="展开" checked={open} onChange={setOpen} />
        </>
      }
    >
      <div className="site-demo-stack">
        <Button variant="outline" onClick={() => setOpen((value) => !value)}>切换 Popover</Button>
        {open ? <PopoverCard tone={tone} title={tone === "plain" ? "有标题 Popover" : "说明浮层"}>用于承载单行或多行解释文案。</PopoverCard> : null}
      </div>
    </PlaygroundBlock>
  );
}

export function AlertPlayground() {
  const [tone, setTone] = useState<"info" | "success" | "warning" | "error">("info");
  const [action, setAction] = useState<"icon" | "wording" | "locked">("icon");
  const [visible, setVisible] = useState(true);

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="语义" value={tone} onChange={(value) => setTone(value as typeof tone)} options={[{ label: "信息", value: "info" }, { label: "成功", value: "success" }, { label: "警告", value: "warning" }, { label: "错误", value: "error" }]} />
          <Segments label="动作" value={action} onChange={(value) => setAction(value as typeof action)} options={[{ label: "图标关闭", value: "icon" }, { label: "文字关闭", value: "wording" }, { label: "锁定", value: "locked" }]} />
        </>
      }
    >
      <div className="site-demo-stack">
        <Button variant="outline" onClick={() => setVisible((value) => !value)}>{visible ? "收起提示" : "重新显示"}</Button>
        {visible ? <AlertBanner tone={tone} action={action} title={tone === "success" ? "这是标题" : undefined}>这是文案，支持切换语义和交互方式。</AlertBanner> : null}
      </div>
    </PlaygroundBlock>
  );
}

export function MessagePlayground() {
  const [tone, setTone] = useState<"success" | "warning" | "error" | "info">("success");
  const [visible, setVisible] = useState(true);

  return (
    <PlaygroundBlock controls={<Segments label="语义" value={tone} onChange={(value) => setTone(value as typeof tone)} options={[{ label: "成功", value: "success" }, { label: "警告", value: "warning" }, { label: "错误", value: "error" }, { label: "信息", value: "info" }]} />}>
      <div className="site-demo-stack">
        <Button variant="outline" onClick={() => setVisible((value) => !value)}>{visible ? "隐藏提示" : "再次触发"}</Button>
        {visible ? <MessageToast tone={tone}>这是一个会随语义切换的全局提示</MessageToast> : null}
      </div>
    </PlaygroundBlock>
  );
}

export function NotificationPlayground() {
  const [tone, setTone] = useState<"plain" | "info" | "success" | "warning" | "error">("success");
  const [visible, setVisible] = useState(true);
  const [actions, setActions] = useState(true);

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="语义" value={tone} onChange={(value) => setTone(value as typeof tone)} options={[{ label: "默认", value: "plain" }, { label: "信息", value: "info" }, { label: "成功", value: "success" }, { label: "警告", value: "warning" }, { label: "错误", value: "error" }]} />
          <ToggleControl label="操作按钮" checked={actions} onChange={setActions} />
        </>
      }
    >
      <div className="site-demo-stack">
        <Button variant="outline" onClick={() => setVisible((value) => !value)}>{visible ? "关闭通知" : "重新打开"}</Button>
        {visible ? <NotificationCard tone={tone} withActions={actions} title="通知标题" description="可以模拟关闭、恢复和语义切换等常见状态。" /> : null}
      </div>
    </PlaygroundBlock>
  );
}

export function ModalPlayground() {
  const [open, setOpen] = useState(true);
  const [kind, setKind] = useState<"plain" | "success" | "info" | "warning" | "error">("info");

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="语义" value={kind} onChange={(value) => setKind(value as typeof kind)} options={[{ label: "默认", value: "plain" }, { label: "成功", value: "success" }, { label: "信息", value: "info" }, { label: "警告", value: "warning" }, { label: "错误", value: "error" }]} />
          <Button variant="outline" onClick={() => setOpen((value) => !value)}>{open ? "关闭 Modal" : "打开 Modal"}</Button>
        </>
      }
    >
      {open ? <ModalDialog embedded kind={kind} size="m" title="基础 Modal" description="这里展示的是可开关的嵌入式预览模式，方便在文档页里直接浏览组件结构。" /> : <div className="dui-card" style={{ alignItems: "center", color: "#7F7F8E", display: "flex", height: 420, justifyContent: "center" }}>Modal 已关闭</div>}
    </PlaygroundBlock>
  );
}

export function DrawerPlayground() {
  const [open, setOpen] = useState(true);
  const [size, setSize] = useState<"small" | "middle" | "large" | "extra large">("small");

  return (
    <PlaygroundBlock
      controls={
        <>
          <Segments label="尺寸" value={size} onChange={(value) => setSize(value as typeof size)} options={[{ label: "S", value: "small" }, { label: "M", value: "middle" }, { label: "L", value: "large" }, { label: "XL", value: "extra large" }]} />
          <Button variant="outline" onClick={() => setOpen((value) => !value)}>{open ? "关闭 Drawer" : "打开 Drawer"}</Button>
        </>
      }
    >
      {open ? (
        <DrawerPanel embedded size={size} title="抽屉面板">
          <div className="site-drawer-preview-body">
            <div className="site-fake-chart" />
            <div className="site-fake-chart wide" />
          </div>
        </DrawerPanel>
      ) : (
        <div className="dui-card" style={{ alignItems: "center", color: "#7F7F8E", display: "flex", height: 440, justifyContent: "center" }}>Drawer 已关闭</div>
      )}
    </PlaygroundBlock>
  );
}
