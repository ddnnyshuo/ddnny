import type { CSSProperties } from "react";
import { useState } from "react";

import countFireX from "./assets/peadou/count-fire-x.png";
import doneImage from "./assets/peadou/done.png";
import figmaPhone from "./assets/peadou/figma-phone.png";

const drops = [
  { id: 1, x: 179, y: 318, delay: 1340 },
  { id: 2, x: 202, y: 318, delay: 1460 },
  { id: 3, x: 225, y: 318, delay: 1580 },
  { id: 4, x: 190, y: 338, delay: 1700 },
  { id: 5, x: 214, y: 338, delay: 1820 }
];

function PeadouBean({ index, x, y, delay }: { index: number; x: number; y: number; delay: number }) {
  return (
    <span
      className="peadou-bean"
      style={{
        "--bean-delay": `${delay}ms`,
        "--bean-x": `${x}px`,
        "--bean-y": `${y}px`,
        "--bean-start-x": `${34 + index * 56}px`
      } as CSSProperties}
    />
  );
}

function PeadouMotion({ playId }: { playId: number }) {
  return (
    <div className="peadou-motion-layer" key={playId} aria-hidden="true">
      <div className="peadou-focus-shadow" />
      <div className="peadou-zoom-window">
        <img src={figmaPhone} alt="" />
      </div>
      <div className="peadou-outline" />
      <div className="peadou-launch-row">
        {drops.map((drop, index) => (
          <PeadouBean key={drop.id} index={index} x={drop.x} y={drop.y} delay={drop.delay} />
        ))}
      </div>
      <img className="peadou-done" src={doneImage} alt="" />
      <div className="peadou-count-badge">
        <img src={countFireX} alt="" />
        <span className="peadou-count-number" />
      </div>
    </div>
  );
}

export function PeadouProgressDemo() {
  const [playId, setPlayId] = useState(0);

  return (
    <main className="peadou-page dui-root">
      <section className="peadou-phone" aria-label="拼豆进行中动效复刻">
        <img className="peadou-screen" src={figmaPhone} alt="明星拼豆活动页面" />
        <PeadouMotion playId={playId} />
      </section>

      <aside className="peadou-controls">
        <span className="peadou-kicker">Motion Preview</span>
        <h1>拼豆进行中</h1>
        <p>按标注流程复刻：点击后定位拉框蒙层，放大 3 倍，播放拼豆完成贴图，超过 1 次后展示火焰数量，数字从 1 增长到 20。</p>
        <div className="peadou-timeline" aria-hidden="true">
          <span className="peadou-step peadou-step-focus">定位拉框</span>
          <span className="peadou-step peadou-step-zoom">3x 放大</span>
          <span className="peadou-step peadou-step-count">数量递增</span>
        </div>
        <button type="button" onClick={() => setPlayId((value) => value + 1)}>
          重新播放
        </button>
      </aside>
    </main>
  );
}
