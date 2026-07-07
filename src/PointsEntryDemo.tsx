import { useState } from "react";

import coin from "./assets/points-entry/coin-uhd.png";
import entryBase from "./assets/points-entry/entry-bg-label-uhd.png";
import screenFinal from "./assets/points-entry/screen-final-uhd.png";

function PointsEntry({ playId }: { playId: number }) {
  return (
    <div className="points-entry-pill" key={playId}>
      <img className="points-entry-base" src={entryBase} alt="" />
      <span className="points-entry-coin">
        <img src={coin} alt="" />
      </span>
    </div>
  );
}

export function PointsEntryDemo() {
  const [playId, setPlayId] = useState(0);

  return (
    <main className="points-entry-page dui-root">
      <section className="points-entry-phone" aria-label="积分中心入口动效演示">
        <img className="points-entry-screen" src={screenFinal} alt="随心省会员权益页" />
        <PointsEntry playId={playId} />
      </section>

      <aside className="points-entry-controls">
        <span className="points-entry-kicker">Motion Preview</span>
        <h1>积分中心入口</h1>
        <p>右侧滑入 640ms，稳定 180ms 后，金币沿 Y 轴完成一次翻转。</p>
        <div className="points-entry-timeline" aria-hidden="true">
          <span className="points-entry-step points-entry-step-slide">滑入</span>
          <span className="points-entry-step points-entry-step-wait">停顿</span>
          <span className="points-entry-step points-entry-step-flip">金币翻转</span>
        </div>
        <button type="button" onClick={() => setPlayId((value) => value + 1)}>
          重新播放
        </button>
      </aside>
    </main>
  );
}
