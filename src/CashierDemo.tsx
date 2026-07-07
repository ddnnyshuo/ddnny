import { Glyph } from "./lib/icons";

type PayMethod = {
  id: string;
  label: string;
  icon: "alipay" | "wechat" | "dewu" | "card";
  selected?: boolean;
  action?: string;
  plans?: Array<{
    title: string;
    detail: string;
  }>;
};

const payMethods: PayMethod[] = [
  { id: "alipay", label: "支付宝", icon: "alipay", selected: true },
  { id: "wechat", label: "微信支付", icon: "wechat" },
  { id: "wechat-score", label: "微信支付分", icon: "wechat" },
  {
    id: "dewu-monthly",
    label: "得物月付",
    icon: "dewu",
    plans: [
      { title: "0手续费", detail: "本月买 下月还" },
      { title: "¥39.7x3期", detail: "已减免手续费¥10" },
      { title: "¥10.05x12期", detail: "含手续费¥1.63/期" }
    ]
  },
  { id: "wechat-friend", label: "微信好友代付", icon: "wechat" },
  { id: "card", label: "免输卡号绑卡", icon: "card", action: "添加新卡" }
];

function PayIcon({ icon }: { icon: PayMethod["icon"] }) {
  if (icon === "wechat") {
    return (
      <span className="cashier-pay-icon cashier-pay-icon-wechat" aria-hidden="true">
        <Glyph name="check" size={13} strokeWidth={2.3} color="var(--dui-surface)" />
      </span>
    );
  }

  if (icon === "dewu") {
    return <span className="cashier-pay-icon cashier-pay-icon-dewu" aria-hidden="true">月</span>;
  }

  if (icon === "card") {
    return (
      <span className="cashier-pay-icon cashier-pay-icon-card" aria-hidden="true">
        <span />
      </span>
    );
  }

  return <span className="cashier-pay-icon cashier-pay-icon-alipay" aria-hidden="true">支</span>;
}

function SelectMark({ selected }: { selected?: boolean }) {
  return (
    <span className={selected ? "cashier-select-mark cashier-select-mark-selected" : "cashier-select-mark"} aria-hidden="true">
      {selected ? <Glyph name="check" size={10} strokeWidth={2.4} color="var(--dui-surface)" /> : null}
    </span>
  );
}

function PayMethodRow({ method }: { method: PayMethod }) {
  return (
    <div className="cashier-method-block">
      <button className="cashier-method-row" type="button" aria-pressed={method.selected ? "true" : "false"}>
        <span className="cashier-method-main">
          <PayIcon icon={method.icon} />
          <span className="cashier-method-label">{method.label}</span>
        </span>
        {method.action ? (
          <span className="cashier-method-action">
            {method.action}
            <Glyph name="chevron-right" size={12} color="var(--dui-text-secondary)" />
          </span>
        ) : (
          <SelectMark selected={method.selected} />
        )}
      </button>
      {method.plans ? (
        <div className="cashier-plan-strip" aria-label="分期试算">
          {method.plans.map((plan) => (
            <span className="cashier-plan-card" key={plan.title}>
              <strong>{plan.title}</strong>
              <span>{plan.detail}</span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CashierDemo() {
  return (
    <main className="cashier-page dui-root">
      <div className="cashier-phone">
        <div className="cashier-backdrop">
          <span className="cashier-status-time">10:23</span>
          <Glyph className="cashier-back" name="chevron-right" size={24} color="var(--dui-text-strong)" />
          <span className="cashier-wechat-dot" />
          <Glyph className="cashier-more" name="ellipsis" size={22} color="var(--dui-text-strong)" />
        </div>

        <section className="cashier-sheet" aria-label="收银台页面">
          <button className="cashier-close" type="button" aria-label="关闭">
            <Glyph name="close" size={22} color="var(--dui-text-muted)" />
          </button>

          <header className="cashier-total">
            <div className="cashier-price">
              <span>¥</span>
              <strong>3834.00</strong>
            </div>
            <p>
              支付剩余时间
              <span>07:59</span>
            </p>
          </header>

          <div className="cashier-methods">
            {payMethods.map((method) => (
              <PayMethodRow key={method.id} method={method} />
            ))}
            <button className="cashier-expand" type="button">
              展开更多支付方式
              <Glyph name="chevron-down" size={12} color="var(--dui-text-strong)" />
            </button>
          </div>
        </section>

        <footer className="cashier-bottom-bar">
          <button className="cashier-submit" type="button">立即支付</button>
          <span className="cashier-home-indicator" />
        </footer>
      </div>
    </main>
  );
}
