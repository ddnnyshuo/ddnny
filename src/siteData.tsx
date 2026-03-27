import type { ReactNode } from "react";

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

export type ApiField = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type DocsItem = {
  id: string;
  name: string;
  summary: string;
  preview: ReactNode;
  code: string;
  api: ApiField[];
};

export type DocsSection = {
  id: string;
  title: string;
  summary: string;
  items: DocsItem[];
};

export const sections: DocsSection[] = [
  {
    id: "general",
    title: "通用",
    summary: "基础操作元素，承接按钮、标签等高频交互入口。",
    items: [
      {
        id: "button",
        name: "Button 按钮",
        summary: "覆盖 large / middle / small、主按钮 / 描边 / danger / loading 等 Figma 变体。",
        preview: (
          <div className="site-demo-stack">
            <div className="site-demo-row">
              <Button size="large">主按钮</Button>
              <Button size="large" variant="outline">描边按钮</Button>
              <Button size="large" tone="danger">危险按钮</Button>
            </div>
            <div className="site-demo-row">
              <Button size="middle" state="hover">Hover</Button>
              <Button size="middle" state="loading">Loading</Button>
              <Button size="small" variant="outline">Small</Button>
            </div>
          </div>
        ),
        code: `import { Button } from "./index";

export function ButtonShowcase() {
  return (
    <>
      <Button size="large">主按钮</Button>
      <Button size="large" variant="outline">描边按钮</Button>
      <Button size="large" tone="danger">危险按钮</Button>
      <Button size="middle" state="loading">加载中</Button>
    </>
  );
}`,
        api: [
          { name: "size", type: `"small" | "middle" | "large"`, defaultValue: `"middle"`, description: "按钮尺寸，对应 Figma 的 small / middle / large 规格。" },
          { name: "variant", type: `"solid" | "outline"`, defaultValue: `"solid"`, description: "实心或描边按钮。" },
          { name: "tone", type: `"primary" | "danger"`, defaultValue: `"primary"`, description: "语义色，支持主色和危险态。" },
          { name: "state", type: `"default" | "hover" | "disabled" | "loading"`, defaultValue: `"default"`, description: "文档站里可直接预览不同交互状态。" }
        ]
      },
      {
        id: "tag",
        name: "Tag 标签",
        summary: "支持状态色、关闭态、添加态和输入态，映射 Figma 中不同 size / interaction 组合。",
        preview: (
          <div className="site-demo-stack">
            <div className="site-demo-row">
              <Tag tone="neutral">默认标签</Tag>
              <Tag tone="success">成功标签</Tag>
              <Tag tone="warning">警示标签</Tag>
              <Tag tone="error">错误标签</Tag>
            </div>
            <div className="site-demo-row">
              <Tag tone="info" mode="closable">可关闭</Tag>
              <Tag mode="addable">添加标签</Tag>
              <Tag mode="input">输入标签</Tag>
            </div>
          </div>
        ),
        code: `import { Tag } from "./index";

export function TagShowcase() {
  return (
    <>
      <Tag tone="success">成功标签</Tag>
      <Tag tone="warning" mode="closable">可关闭</Tag>
      <Tag mode="addable">添加标签</Tag>
      <Tag mode="input">输入标签</Tag>
    </>
  );
}`,
        api: [
          { name: "tone", type: `"neutral" | "info" | "success" | "warning" | "error"`, defaultValue: `"neutral"`, description: "标签语义色。" },
          { name: "mode", type: `"plain" | "closable" | "addable" | "input"`, defaultValue: `"plain"`, description: "控制关闭按钮、加号和输入态图标。" },
          { name: "size", type: `"small" | "middle" | "large"`, defaultValue: `"middle"`, description: "标签尺寸。" }
        ]
      }
    ]
  },
  {
    id: "navigation",
    title: "导航",
    summary: "参考 Ant Design 组件总览站的导航方式组织，包括目录、分页、面包屑和步骤流。",
    items: [
      {
        id: "breadcrumb",
        name: "Breadcrumb 面包屑",
        summary: "支持 icon 和折叠场景，用于层级定位。",
        preview: (
          <div className="site-demo-stack">
            <Breadcrumbs icon items={["首页", "商品中心", "商品详情"]} />
            <Breadcrumbs collapsed items={["首页", "商品中心", "列表页", "筛选结果", "商品详情"]} />
          </div>
        ),
        code: `import { Breadcrumbs } from "./index";

<Breadcrumbs icon items={["首页", "商品中心", "商品详情"]} />
<Breadcrumbs collapsed items={["首页", "商品中心", "列表页", "筛选结果", "商品详情"]} />`,
        api: [
          { name: "items", type: "string[]", defaultValue: "[]", description: "面包屑节点文本数组。" },
          { name: "icon", type: "boolean", defaultValue: "false", description: "首项前是否展示图标。" },
          { name: "collapsed", type: "boolean", defaultValue: "false", description: "当层级较深时使用折叠展示。" }
        ]
      },
      {
        id: "menu",
        name: "Menu 菜单栏",
        summary: "覆盖深浅色、层级、展开和选中状态。",
        preview: (
          <div className="site-demo-row" style={{ alignItems: "stretch" }}>
            <MenuTree
              tone="light"
              nodes={[
                { label: "总览", level: 1, icon: true, selected: true, expanded: true, children: [{ label: "趋势看板", level: 2, selected: true }, { label: "分渠道数据", level: 3 }] },
                { label: "素材中心", level: 1, icon: true }
              ]}
            />
            <MenuTree
              tone="dark"
              nodes={[
                { label: "数据资产", level: 1, icon: true, expanded: true, children: [{ label: "明细表", level: 2, selected: true }, { label: "分析任务", level: 3 }] },
                { label: "设置", level: 1, icon: true }
              ]}
            />
          </div>
        ),
        code: `import { MenuTree } from "./index";

<MenuTree
  tone="light"
  nodes={[
    { label: "总览", level: 1, icon: true, selected: true, expanded: true, children: [
      { label: "趋势看板", level: 2, selected: true },
      { label: "分渠道数据", level: 3 }
    ] }
  ]}
/>`,
        api: [
          { name: "tone", type: `"light" | "dark"`, defaultValue: `"light"`, description: "菜单颜色模式。" },
          { name: "nodes", type: "MenuNode[]", defaultValue: "[]", description: "树形菜单结构，支持多层级和展开态。" }
        ]
      },
      {
        id: "pagination",
        name: "Pagination 分页器",
        summary: "组合总条数、页码跳转和页码序列。",
        preview: (
          <div className="site-demo-stack">
            <Pagination />
            <Pagination quickJump totalLabel={false} current={5} totalPages={9} />
          </div>
        ),
        code: `import { Pagination } from "./index";

<Pagination />
<Pagination quickJump totalLabel={false} current={5} totalPages={9} />`,
        api: [
          { name: "current", type: "number", defaultValue: "3", description: "当前页码。" },
          { name: "totalPages", type: "number", defaultValue: "7", description: "页码总数。" },
          { name: "totalLabel", type: "boolean", defaultValue: "true", description: "是否显示“共 xxx 条”。" },
          { name: "quickJump", type: "boolean", defaultValue: "false", description: "是否显示前往指定页输入区。" }
        ]
      },
      {
        id: "dropdown",
        name: "Dropdown 下拉菜单",
        summary: "支持更多按钮、描边按钮和文字触发，菜单项可带图标与附属文本。",
        preview: (
          <div className="site-demo-row" style={{ alignItems: "flex-start" }}>
            <DropdownMenu trigger="more" options={[{ label: "编辑" }, { label: "复制", helper: "Ctrl+C" }, { label: "删除", icon: true }]} />
            <DropdownMenu trigger="outline-button" options={[{ label: "批量操作" }, { label: "导出", helper: "CSV" }]} />
            <DropdownMenu trigger="text" hover options={[{ label: "查看详情" }, { label: "跳转链接", icon: true }]} />
          </div>
        ),
        code: `import { DropdownMenu } from "./index";

<DropdownMenu
  trigger="more"
  options={[
    { label: "编辑" },
    { label: "复制", helper: "Ctrl+C" },
    { label: "删除", icon: true }
  ]}
/>`,
        api: [
          { name: "trigger", type: `"more" | "outline-button" | "text"`, defaultValue: `"more"`, description: "触发器形态。" },
          { name: "hover", type: "boolean", defaultValue: "false", description: "展示 hover 预览样式。" },
          { name: "options", type: "Array<{ label: string; helper?: string; icon?: boolean }>", defaultValue: "[]", description: "菜单项配置。" }
        ]
      },
      {
        id: "steps",
        name: "Steps 步骤条",
        summary: "支持横向 / 纵向、Large / Medium icon、描述文案和多种状态。",
        preview: (
          <div className="site-demo-stack">
            <Steps
              items={[
                { title: "待开始", description: "等待进入执行队列", status: "pending" },
                { title: "处理中", description: "服务运行中", status: "processing" },
                { title: "已完成", description: "结果已输出", status: "completed" },
                { title: "异常", description: "需要人工介入", status: "error" }
              ]}
            />
            <Steps
              direction="vertical"
              size="M"
              items={[
                { title: "上传文件", description: "校验格式", status: "completed" },
                { title: "解析数据", description: "正在处理", status: "processing" },
                { title: "同步仓库", description: "等待中", status: "pending" }
              ]}
            />
          </div>
        ),
        code: `import { Steps } from "./index";

<Steps
  items={[
    { title: "待开始", description: "等待进入执行队列", status: "pending" },
    { title: "处理中", description: "服务运行中", status: "processing" },
    { title: "已完成", description: "结果已输出", status: "completed" }
  ]}
/>`,
        api: [
          { name: "direction", type: `"horizontal" | "vertical"`, defaultValue: `"horizontal"`, description: "布局方向。" },
          { name: "size", type: `"L" | "M"`, defaultValue: `"L"`, description: "节点图标尺寸级别。" },
          { name: "items", type: "StepItem[]", defaultValue: "[]", description: "步骤项数据源。" }
        ]
      }
    ]
  },
  {
    id: "data-entry",
    title: "数据录入",
    summary: "聚合输入、选择、上传与穿梭等复杂交互控件，贴近 Ant Design 文档站的录入类组织方式。",
    items: [
      {
        id: "input",
        name: "Input 输入框",
        summary: "支持 hover / click / finish / disabled / readonly / error，以及前缀、后缀、字数限制。",
        preview: (
          <div className="site-demo-stack">
            <div className="site-demo-row">
              <InputField size="middle" />
              <InputField size="middle" state="hover" />
              <InputField size="middle" state="click" value="这是文案" />
            </div>
            <div className="site-demo-row">
              <InputField size="large" prefix="¥" />
              <InputField size="large" suffix="RMB" />
              <InputField size="large" count="0/10" state="error" helperText="输入错误提示文案" value="1234" />
            </div>
          </div>
        ),
        code: `import { InputField } from "./index";

<InputField size="large" prefix="¥" />
<InputField size="large" suffix="RMB" />
<InputField
  size="large"
  count="0/10"
  state="error"
  helperText="输入错误提示文案"
  value="1234"
/>`,
        api: [
          { name: "size", type: `"middle" | "large"`, defaultValue: `"middle"`, description: "输入框高度规格。" },
          { name: "state", type: `"normal" | "hover" | "click" | "finish" | "disabled" | "readonly" | "error"`, defaultValue: `"normal"`, description: "交互状态。" },
          { name: "prefix / suffix", type: "ReactNode", defaultValue: "undefined", description: "前缀或后缀内容。" },
          { name: "count", type: "string", defaultValue: "undefined", description: "字数限制显示。" }
        ]
      },
      {
        id: "select",
        name: "Select 选择器",
        summary: "覆盖单选 / 多选、hover / click / finish / readonly / error 组合。",
        preview: (
          <div className="site-demo-stack">
            <div className="site-demo-row">
              <SelectField />
              <SelectField state="hover" />
              <SelectField state="finish" value="已选择项" />
            </div>
            <div className="site-demo-row">
              <SelectField multiple value="选项 A, 选项 B" />
              <SelectField state="readonly" value="只读内容" />
              <SelectField state="error" helperText="请选择正确选项" />
            </div>
          </div>
        ),
        code: `import { SelectField } from "./index";

<SelectField />
<SelectField multiple value="选项 A, 选项 B" />
<SelectField state="error" helperText="请选择正确选项" />`,
        api: [
          { name: "multiple", type: "boolean", defaultValue: "false", description: "是否以多选模式展示。" },
          { name: "state", type: `"normal" | "hover" | "click" | "finish" | "finish-hover" | "disable" | "readonly" | "error"`, defaultValue: `"normal"`, description: "选择器状态。" },
          { name: "value", type: "string", defaultValue: "undefined", description: "当前展示内容。" }
        ]
      },
      {
        id: "search",
        name: "Search 搜索框",
        summary: "映射 Figma 中 none / outline / fill 三种搜索按钮形态。",
        preview: (
          <div className="site-demo-stack">
            <SearchField action="none" />
            <SearchField action="outline" state="hover" />
            <SearchField action="fill" state="buttonhover" value="商品名称" />
          </div>
        ),
        code: `import { SearchField } from "./index";

<SearchField action="none" />
<SearchField action="outline" state="hover" />
<SearchField action="fill" state="buttonhover" value="商品名称" />`,
        api: [
          { name: "action", type: `"none" | "outline" | "fill"`, defaultValue: `"none"`, description: "右侧搜索按钮类型。" },
          { name: "state", type: `"normal" | "hover" | "click" | "finish" | "buttonhover"`, defaultValue: `"normal"`, description: "搜索框与按钮的联合状态。" }
        ]
      },
      {
        id: "date-picker",
        name: "Date Picker 时间选择器",
        summary: "支持 middle / large、单值与范围模式、hover / finish / disable / readonly。",
        preview: (
          <div className="site-demo-stack">
            <div className="site-demo-row">
              <DatePickerField />
              <DatePickerField state="hover" />
              <DatePickerField state="finish" value="2026-03-27" />
            </div>
            <div className="site-demo-row">
              <DatePickerField range />
              <DatePickerField size="large" range state="finish" value="2026-03-27 至 2026-03-31" />
              <DatePickerField size="large" state="readonly" value="只读日期" />
            </div>
          </div>
        ),
        code: `import { DatePickerField } from "./index";

<DatePickerField />
<DatePickerField range />
<DatePickerField size="large" range state="finish" value="2026-03-27 至 2026-03-31" />`,
        api: [
          { name: "range", type: "boolean", defaultValue: "false", description: "是否为范围选择模式。" },
          { name: "size", type: `"middle" | "large"`, defaultValue: `"middle"`, description: "组件尺寸。" },
          { name: "state", type: `"default" | "hover" | "finish" | "disable" | "readonly" | "finish-hover"`, defaultValue: `"default"`, description: "交互状态。" }
        ]
      },
      {
        id: "upload",
        name: "Upload 上传",
        summary: "保留未上传 / hover / disable / 已上传状态，以及 default / small 两种尺寸。",
        preview: (
          <div className="site-demo-row">
            <UploadCard state="idle" />
            <UploadCard state="hover" />
            <UploadCard state="disabled" />
            <UploadCard state="uploaded" fileName="cover.png" />
            <UploadCard size="small" state="uploaded-hover" fileName="avatar.png" />
          </div>
        ),
        code: `import { UploadCard } from "./index";

<UploadCard state="idle" />
<UploadCard state="uploaded" fileName="cover.png" />
<UploadCard size="small" state="uploaded-hover" fileName="avatar.png" />`,
        api: [
          { name: "size", type: `"default" | "small"`, defaultValue: `"default"`, description: "上传卡片尺寸。" },
          { name: "state", type: `"idle" | "hover" | "disabled" | "uploaded" | "uploaded-hover"`, defaultValue: `"idle"`, description: "上传状态。" },
          { name: "fileName", type: "string", defaultValue: `"image.png"`, description: "已上传时显示的文件名。" }
        ]
      },
      {
        id: "choice-controls",
        name: "Switch / Radio / Checkbox",
        summary: "将开关、单选和多选作为一个录入族预览，统一展示 enable / disable / selected 状态。",
        preview: (
          <div className="site-demo-stack">
            <div className="site-demo-row">
              <SwitchField checked />
              <SwitchField />
              <SwitchField checked disabled />
              <SwitchField disabled />
            </div>
            <div className="site-demo-row">
              <RadioOption checked label="默认选中" />
              <RadioOption hover label="Hover 状态" />
              <RadioOption disabled label="禁用状态" />
            </div>
            <div className="site-demo-row">
              <CheckboxOption checked label="已选择" />
              <CheckboxOption hover label="Hover 状态" />
              <CheckboxOption disabled label="禁用状态" />
            </div>
          </div>
        ),
        code: `import { SwitchField, RadioOption, CheckboxOption } from "./index";

<SwitchField checked />
<RadioOption checked label="默认选中" />
<CheckboxOption checked label="已选择" />`,
        api: [
          { name: "checked", type: "boolean", defaultValue: "false", description: "是否选中。" },
          { name: "disabled", type: "boolean", defaultValue: "false", description: "是否禁用。" },
          { name: "hover", type: "boolean", defaultValue: "false", description: "用于静态预览 hover 态。" }
        ]
      },
      {
        id: "cascader",
        name: "Cascader 级联选择",
        summary: "支持单选 / 多选、部分选中、下级菜单和多列级联布局。",
        preview: <CascaderPanel />,
        code: `import { CascaderPanel } from "./index";

<CascaderPanel
  columns={[
    [{ label: "类目 A", state: "selected", hasChildren: true }],
    [{ label: "子类 1", state: "partial", multiple: true, hasChildren: true }],
    [{ label: "叶子节点", state: "selected", multiple: true }]
  ]}
/>`,
        api: [
          { name: "columns", type: "Array<Array<CascaderItemProps>>", defaultValue: "fallback columns", description: "多列级联数据源。" }
        ]
      },
      {
        id: "transfer",
        name: "Transfer 穿梭框",
        summary: "覆盖单向穿梭与带搜索状态，适合中后台双栏选择场景。",
        preview: <Transfer searchable />,
        code: `import { Transfer } from "./index";

<Transfer searchable />
<Transfer oneWay searchable leftTitle="待同步" rightTitle="已同步" />`,
        api: [
          { name: "oneWay", type: "boolean", defaultValue: "false", description: "是否单向穿梭。" },
          { name: "searchable", type: "boolean", defaultValue: "false", description: "列表头部是否带搜索框。" },
          { name: "leftTitle / rightTitle", type: "string", defaultValue: `"候选列表" / "已选列表"`, description: "左右两侧标题。" }
        ]
      }
    ]
  },
  {
    id: "data-display",
    title: "数据展示",
    summary: "偏静态表达的信息承载组件，强调空态、浮层说明与轻量提示。",
    items: [
      {
        id: "empty-state",
        name: "Empty 空状态",
        summary: "对应 Figma 中 text-only、illustration-text、带标题和带引导按钮布局。",
        preview: (
          <div className="site-demo-row">
            <EmptyState layout="text-only" description="当前筛选条件下暂无数据。" />
            <EmptyState layout="illustration-title-text" title="网络异常" description="请检查网络连接后重新加载页面。" />
            <EmptyState layout="illustration-title-text-action" title="暂无内容" description="可以先创建第一个条目。" actionLabel="立即新建" />
          </div>
        ),
        code: `import { EmptyState } from "./index";

<EmptyState layout="text-only" description="当前筛选条件下暂无数据。" />
<EmptyState layout="illustration-title-text-action" title="暂无内容" description="可以先创建第一个条目。" actionLabel="立即新建" />`,
        api: [
          { name: "layout", type: `"text-only" | "illustration-text" | "illustration-title-text" | "illustration-title-text-action"`, defaultValue: `"illustration-title-text"`, description: "空状态布局模式。" },
          { name: "mode", type: `"light" | "dark"`, defaultValue: `"light"`, description: "浅色或深色模式。" },
          { name: "actionLabel", type: "string", defaultValue: "undefined", description: "操作按钮文案，仅在 action 布局下生效。" }
        ]
      },
      {
        id: "tooltip",
        name: "Tooltip 文字提示",
        summary: "支持向上 / 向下 / 向左 / 向右四个方向。",
        preview: (
          <div className="site-demo-row">
            <TooltipBubble placement="top">向上提示</TooltipBubble>
            <TooltipBubble placement="right">向右提示</TooltipBubble>
            <TooltipBubble placement="bottom">向下提示</TooltipBubble>
            <TooltipBubble placement="left">向左提示</TooltipBubble>
          </div>
        ),
        code: `import { TooltipBubble } from "./index";

<TooltipBubble placement="top">向上提示</TooltipBubble>
<TooltipBubble placement="right">向右提示</TooltipBubble>`,
        api: [
          { name: "placement", type: `"top" | "right" | "bottom" | "left"`, defaultValue: `"top"`, description: "气泡方向。" }
        ]
      },
      {
        id: "popover",
        name: "Popover 浮层",
        summary: "支持无标题、有标题、icon+标题和深色模式，最大宽度控制参照 Figma 页面。",
        preview: (
          <div className="site-demo-row" style={{ alignItems: "flex-start" }}>
            <PopoverCard>用于承载单行或多行解释文案。</PopoverCard>
            <PopoverCard title="有标题 Popover">适合携带额外说明、帮助信息或策略提示。</PopoverCard>
            <PopoverCard tone="icon" title="带图标标题">标题前加入语义 icon，增强识别。</PopoverCard>
            <PopoverCard tone="dark" title="深色模式">用于深色背景或更强提示语境。</PopoverCard>
          </div>
        ),
        code: `import { PopoverCard } from "./index";

<PopoverCard>用于承载单行或多行解释文案。</PopoverCard>
<PopoverCard title="有标题 Popover">适合携带额外说明。</PopoverCard>
<PopoverCard tone="dark" title="深色模式">用于深色背景场景。</PopoverCard>`,
        api: [
          { name: "tone", type: `"plain" | "icon" | "dark"`, defaultValue: `"plain"`, description: "浮层风格。" },
          { name: "title", type: "string", defaultValue: "undefined", description: "标题内容。" }
        ]
      }
    ]
  },
  {
    id: "feedback",
    title: "反馈",
    summary: "聚合页面级与全局级反馈组件，适配操作结果、风险提示和流程确认。",
    items: [
      {
        id: "alert",
        name: "Alert 警告提示",
        summary: "支持 info / success / warning / error、标题可选，以及 icon / wording / locked 三种关闭交互。",
        preview: (
          <div className="site-demo-stack">
            <AlertBanner tone="info" action="icon">这是文案</AlertBanner>
            <AlertBanner tone="success" title="这是标题">这是文案</AlertBanner>
            <AlertBanner tone="warning" action="wording">这是文案</AlertBanner>
            <AlertBanner tone="error" action="locked">这是文案</AlertBanner>
          </div>
        ),
        code: `import { AlertBanner } from "./index";

<AlertBanner tone="info" action="icon">这是文案</AlertBanner>
<AlertBanner tone="success" title="这是标题">这是文案</AlertBanner>
<AlertBanner tone="warning" action="wording">这是文案</AlertBanner>`,
        api: [
          { name: "tone", type: `"info" | "success" | "warning" | "error"`, defaultValue: `"info"`, description: "提示语义。" },
          { name: "title", type: "string", defaultValue: "undefined", description: "可选标题。" },
          { name: "action", type: `"icon" | "wording" | "locked"`, defaultValue: `"icon"`, description: "右侧关闭交互方式。" }
        ]
      },
      {
        id: "message",
        name: "Message 全局提示",
        summary: "对应成功、警示、报错、询问等轻量全局反馈形态。",
        preview: (
          <div className="site-demo-stack">
            <MessageToast tone="success">操作成功，内容已保存</MessageToast>
            <MessageToast tone="warning">请稍后重试，系统繁忙</MessageToast>
            <MessageToast tone="error">网络异常，请检查后重新提交</MessageToast>
            <MessageToast tone="info">新的审核结果已同步</MessageToast>
          </div>
        ),
        code: `import { MessageToast } from "./index";

<MessageToast tone="success">操作成功，内容已保存</MessageToast>
<MessageToast tone="error">网络异常，请检查后重新提交</MessageToast>`,
        api: [
          { name: "tone", type: `"success" | "warning" | "error" | "info"`, defaultValue: `"success"`, description: "轻量提示语义色。" }
        ]
      },
      {
        id: "notification",
        name: "Notification 通知提醒框",
        summary: "支持纯文字、提示、报错、成功、警告，以及带按钮的扩展操作。",
        preview: (
          <div className="site-demo-row" style={{ alignItems: "flex-start" }}>
            <NotificationCard title="普通通知" description="用于承载简短跨页面通知。" />
            <NotificationCard tone="success" title="成功通知" description="任务执行完成，已生成可下载结果。" withActions />
          </div>
        ),
        code: `import { NotificationCard } from "./index";

<NotificationCard title="普通通知" description="用于承载简短跨页面通知。" />
<NotificationCard tone="success" title="成功通知" description="任务执行完成，已生成可下载结果。" withActions />`,
        api: [
          { name: "tone", type: `"plain" | "info" | "success" | "warning" | "error"`, defaultValue: `"plain"`, description: "通知类型。" },
          { name: "withActions", type: "boolean", defaultValue: "false", description: "是否显示操作按钮。" },
          { name: "title / description", type: "string", defaultValue: "required", description: "通知标题与说明内容。" }
        ]
      },
      {
        id: "modal",
        name: "Modal 对话框",
        summary: "覆盖提示类 modal 和 s / m / l / xl 基础类尺寸结构。",
        preview: (
          <ModalDialog
            embedded
            kind="info"
            size="m"
            title="基础 Modal"
            description="这里展示的是嵌入式预览模式，方便在文档页里直接浏览组件结构。"
          />
        ),
        code: `import { ModalDialog } from "./index";

<ModalDialog
  kind="info"
  size="m"
  title="基础 Modal"
  description="这里展示的是嵌入式预览模式。"
  embedded
/>`,
        api: [
          { name: "kind", type: `"plain" | "success" | "info" | "warning" | "error"`, defaultValue: `"plain"`, description: "对话框语义类型。" },
          { name: "size", type: `"s" | "m" | "l" | "xl"`, defaultValue: `"m"`, description: "弹层宽度档位。" },
          { name: "embedded", type: "boolean", defaultValue: "false", description: "是否以文档页嵌入方式渲染。" }
        ]
      },
      {
        id: "drawer",
        name: "Drawer 抽屉",
        summary: "对应 small / middle / large / extra large 四种宽度。",
        preview: (
          <DrawerPanel embedded size="small" title="抽屉面板">
            <div className="site-drawer-preview-body">
              <div className="site-fake-chart" />
              <div className="site-fake-chart wide" />
            </div>
          </DrawerPanel>
        ),
        code: `import { DrawerPanel } from "./index";

<DrawerPanel embedded size="small" title="抽屉面板">
  <div className="site-drawer-preview-body">...</div>
</DrawerPanel>`,
        api: [
          { name: "size", type: `"small" | "middle" | "large" | "extra large"`, defaultValue: `"middle"`, description: "抽屉宽度。" },
          { name: "embedded", type: "boolean", defaultValue: "false", description: "文档内嵌预览模式。" },
          { name: "title", type: "string", defaultValue: "required", description: "抽屉标题。" }
        ]
      }
    ]
  }
];
