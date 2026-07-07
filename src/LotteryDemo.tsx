import { useEffect, useState } from "react";

import prizeCoupon from "./assets/lottery/prize-coupon.png";
import prizePerfume from "./assets/lottery/prize-perfume.png";
import productCase from "./assets/lottery/product-case.png";
import productPerfume from "./assets/lottery/product-perfume.png";
import screenModal from "./assets/lottery/screen-unrevealed.png";
import ticketBack from "./assets/lottery/ticket-back.png";
import topBack from "./assets/lottery/top-back.png";
import topBattery from "./assets/lottery/top-battery.png";
import topCellular from "./assets/lottery/top-cellular.png";
import topRibbon from "./assets/lottery/top-ribbon.png";
import topRules from "./assets/lottery/top-rules.png";
import topTime from "./assets/lottery/top-time.png";
import topTitle from "./assets/lottery/top-title.png";
import topWifi from "./assets/lottery/top-wifi.png";

const cards = [
  { id: "perfume", action: "去下单" },
  { id: "again", action: "继续抽" },
  { id: "locked", action: "未解锁" },
  { id: "coupon", action: "未解锁", coupon: true },
  { id: "middle", action: "未解锁" },
  { id: "last", action: "未解锁" }
];

function TopArtwork() {
  return (
    <div className="lottery-top-art" aria-hidden="true">
      <img className="lottery-top-time" src={topTime} alt="" />
      <img className="lottery-top-cellular" src={topCellular} alt="" />
      <img className="lottery-top-wifi" src={topWifi} alt="" />
      <img className="lottery-top-battery" src={topBattery} alt="" />
      <img className="lottery-top-back" src={topBack} alt="" />
      <img className="lottery-top-title" src={topTitle} alt="" />
      <img className="lottery-top-rules" src={topRules} alt="" />
      <img className="lottery-top-ribbon" src={topRibbon} alt="" />
    </div>
  );
}

function TicketBack() {
  return <img className="lottery-ticket-img lottery-ticket-back-img" src={ticketBack} alt="揭开好运" />;
}

function ProductPrize() {
  return <img className="lottery-ticket-img lottery-ticket-prize-img" src={prizePerfume} alt="立减16元 ¥92" />;
}

function CouponPrize() {
  return <img className="lottery-ticket-img lottery-ticket-coupon-img" src={prizeCoupon} alt="必得 ¥100" />;
}

function LotteryCard({
  index,
  action,
  isRevealed,
  coupon
}: {
  index: number;
  action: string;
  isRevealed: boolean;
  coupon?: boolean;
}) {
  return (
    <div className={`lottery-card ${index === 0 ? "is-first" : ""} ${isRevealed ? "is-revealed" : ""}`}>
      <div className="lottery-flip">
        <div className="lottery-face lottery-face-back">
          {coupon ? <CouponPrize /> : <TicketBack />}
        </div>
        <div className="lottery-face lottery-face-front">
          <ProductPrize />
        </div>
      </div>
      <button className={action === "未解锁" ? "is-light" : ""} type="button">
        {action}
      </button>
    </div>
  );
}

function ProductList() {
  return (
    <div className="lottery-products">
      <div className="lottery-tabs">
        {["精选", "鞋类", "数码", "潮玩", "女装", "美妆", "手表"].map((tab, index) => (
          <span className={index === 0 ? "is-active" : ""} key={tab}>{tab}</span>
        ))}
      </div>
      <div className="lottery-product-grid">
        <article>
          <img className="lottery-product-image lottery-product-image-case" src={productCase} alt="仔仔象 多巴胺小狗 TPU" />
          <span>已减21元</span>
          <p>仔仔象 多巴胺小狗 TPU</p>
          <strong>¥ 29 <del>¥50</del></strong>
          <em>1.3万+人付款</em>
        </article>
        <article>
          <img className="lottery-product-image lottery-product-image-perfume" src={productPerfume} alt="冰希黎 精粹香氛 皂感香" />
          <span>已减12元</span>
          <p>冰希黎 精粹香氛 皂感香</p>
          <strong>¥ 86 <del>¥98</del></strong>
          <em>91人付款</em>
        </article>
      </div>
    </div>
  );
}

function ModalStateImage({ onClose }: { onClose: () => void }) {
  return (
    <div className="lottery-modal-state">
      <img src={screenModal} alt="支付成功，送你抽签福利" />
      <button className="lottery-modal-state-close" type="button" aria-label="关闭弹窗" onClick={onClose} />
      <button className="lottery-modal-state-primary" type="button" aria-label="立即抽签" onClick={onClose} />
    </div>
  );
}

export function LotteryDemo() {
  const [showModal, setShowModal] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (showModal) {
      setRevealed(false);
      return;
    }

    const timer = window.setTimeout(() => setRevealed(true), 720);
    return () => window.clearTimeout(timer);
  }, [showModal]);

  return (
    <main className="lottery-page dui-root">
      <section className="lottery-phone" aria-label="抽签赢好礼动效演示">
        <TopArtwork />
        <div className="lottery-board">
          {cards.map((card, index) => (
            <LotteryCard
              action={card.action}
              coupon={card.coupon}
              index={index}
              isRevealed={index === 0 && revealed}
              key={card.id}
            />
          ))}
        </div>
        <ProductList />
        {showModal ? <ModalStateImage onClose={() => setShowModal(false)} /> : null}
      </section>
    </main>
  );
}
