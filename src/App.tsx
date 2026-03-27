import { useEffect, useMemo, useState } from "react";

import type { ApiField, DocsItem, DocsSection } from "./siteData";
import { sections } from "./siteData";

function getCurrentHash() {
  if (typeof window === "undefined") {
    return "#overview";
  }
  return window.location.hash || "#overview";
}

function OverviewCard({ section }: { section: DocsSection }) {
  return (
    <a href={`#${section.id}`} className="site-overview-card">
      <span className="site-overview-badge">{section.items.length} items</span>
      <h3>{section.title}</h3>
      <p>{section.summary}</p>
      <div className="site-overview-tags">
        {section.items.slice(0, 4).map((item) => (
          <span key={item.id}>{item.name}</span>
        ))}
      </div>
    </a>
  );
}

function ApiTable({ fields }: { fields: ApiField[] }) {
  return (
    <div className="site-doc-panel">
      <div className="site-doc-panel-header">
        <h4>API</h4>
        <span>{fields.length} props</span>
      </div>
      <div className="site-api-table-wrap">
        <table className="site-api-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>类型</th>
              <th>默认值</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.name}>
                <td><code>{field.name}</code></td>
                <td><code>{field.type}</code></td>
                <td><code>{field.defaultValue}</code></td>
                <td>{field.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="site-doc-panel">
      <div className="site-doc-panel-header">
        <h4>代码示例</h4>
        <button type="button" className="site-copy-button" onClick={handleCopy}>
          {copied ? "已复制" : "复制代码"}
        </button>
      </div>
      <div className="site-code-block">
        <div className="site-code-block-header">
          <span>tsx</span>
        </div>
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
}

function PreviewCard({ item }: { item: DocsItem }) {
  return (
    <article className="site-preview-card" id={item.id}>
      <header className="site-preview-card-header">
        <div>
          <h3>{item.name}</h3>
          <p>{item.summary}</p>
        </div>
        <div className="site-preview-card-actions">
          <a href={`#/components/${item.id}`} className="site-detail-link">详情页</a>
          <a href={`#${item.id}`} className="site-anchor-link">#</a>
        </div>
      </header>
      <div className="site-preview-stage">{item.preview}</div>
      <div className="site-doc-grid">
        <CodeBlock code={item.code} />
        <ApiTable fields={item.api} />
      </div>
    </article>
  );
}

function DetailPage({
  item,
  section
}: {
  item: DocsItem;
  section: DocsSection;
}) {
  const relatedItems = section.items.filter((entry) => entry.id !== item.id).slice(0, 3);

  return (
    <div className="site-detail-shell">
      <section className="site-detail-hero">
        <div className="site-detail-copy">
          <a href="#overview" className="site-back-link">← 返回组件总览</a>
          <span className="site-kicker">{section.title}</span>
          <h1>{item.name}</h1>
          <p>{item.summary}</p>
          <div className="site-detail-meta">
            <span>Category: {section.title}</span>
            <span>Code + Preview + API</span>
          </div>
        </div>
      </section>

      <section className="site-detail-section">
        <header className="site-section-header">
          <div>
            <span className="site-section-kicker">Preview</span>
            <h2>组件预览</h2>
            <p>这里展示当前组件在文档站中的标准预览区域，便于快速对照视觉和交互结构。</p>
          </div>
        </header>
        <div className="site-preview-stage site-detail-preview-stage">{item.preview}</div>
      </section>

      <section className="site-detail-two-column">
        <CodeBlock code={item.code} />
        <ApiTable fields={item.api} />
      </section>

      <section className="site-detail-section">
        <header className="site-section-header">
          <div>
            <span className="site-section-kicker">Related</span>
            <h2>相关组件</h2>
            <p>同一分类下的相关组件可以帮助你快速横向浏览相近模式。</p>
          </div>
        </header>
        <div className="site-related-grid">
          {relatedItems.map((related) => (
            <a key={related.id} href={`#/components/${related.id}`} className="site-related-card">
              <h3>{related.name}</h3>
              <p>{related.summary}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [hash, setHash] = useState(getCurrentHash);
  const totalItems = sections.reduce((count, section) => count + section.items.length, 0);
  const flatItems = useMemo(
    () =>
      sections.flatMap((section) =>
        section.items.map((item) => ({
          item,
          section
        }))
      ),
    []
  );

  useEffect(() => {
    function handleHashChange() {
      setHash(getCurrentHash());
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const detailMatch = hash.startsWith("#/components/") ? hash.replace("#/components/", "") : null;
  const activeDetail = detailMatch ? flatItems.find((entry) => entry.item.id === detailMatch) : undefined;

  return (
    <div className="site-shell dui-root">
      <header className="site-header">
        <div className="site-brand">
          <span className="site-brand-mark">D</span>
          <div>
            <strong>Dewu UI Kit</strong>
            <span>Figma to React Preview</span>
          </div>
        </div>
        <nav className="site-header-nav">
          <a href="#overview">总览</a>
          <a href="#quick-start">快速开始</a>
          <a href="#general">通用</a>
          <a href="#data-entry">数据录入</a>
          <a href="#feedback">反馈</a>
        </nav>
        <div className="site-search-chip">Reference: Ant Design / Components / Overview</div>
      </header>

      <div className="site-body">
        <aside className="site-sidebar">
          <div className="site-sidebar-group">
            <span className="site-sidebar-title">总览</span>
            <a href="#overview">组件地图</a>
            <a href="#quick-start">快速开始</a>
            <a href="#all-components">全部预览</a>
          </div>
          {sections.map((section) => (
            <div className="site-sidebar-group" key={section.id}>
              <a className="site-sidebar-title-link" href={`#${section.id}`}>{section.title}</a>
              {section.items.map((item) => (
                <a key={item.id} href={`#/components/${item.id}`}>
                  {item.name}
                </a>
              ))}
            </div>
          ))}
        </aside>

        <main className="site-main">
          {activeDetail ? (
            <DetailPage item={activeDetail.item} section={activeDetail.section} />
          ) : (
            <>
          <section className="site-hero" id="overview">
            <div className="site-hero-copy">
              <span className="site-kicker">Components / Overview</span>
              <h1>把 24 个 Figma 组件节点整理成一个可浏览、可预览、可查 API 的 React 组件网站</h1>
              <p>
                页面结构参考了 Ant Design 组件总览页的组织方式：顶栏导航、左侧分类目录、总览卡片和分组锚点预览。
                这一版继续补齐了每个组件的代码示例和 API Props 表，更接近真正的设计系统网站。
              </p>
              <div className="site-hero-actions">
                <a href="#all-components" className="site-primary-link">浏览全部组件</a>
                <a href="#quick-start" className="site-secondary-link">查看接入方式</a>
              </div>
            </div>
            <div className="site-hero-metrics">
              <div>
                <strong>24</strong>
                <span>Figma Nodes</span>
              </div>
              <div>
                <strong>{totalItems}</strong>
                <span>Preview Entries</span>
              </div>
              <div>
                <strong>{sections.length}</strong>
                <span>Categories</span>
              </div>
            </div>
          </section>

          <section className="site-overview-grid">
            {sections.map((section) => (
              <OverviewCard key={section.id} section={section} />
            ))}
          </section>

          <section className="site-section" id="quick-start">
            <header className="site-section-header">
              <div>
                <span className="site-section-kicker">Getting Started</span>
                <h2>快速开始</h2>
                <p>这部分对应组件官网里常见的安装、运行和目录说明，方便你在空仓库中快速启动预览站。</p>
              </div>
              <span className="site-section-count">3 steps</span>
            </header>
            <div className="site-guide-grid">
              <div className="site-guide-card">
                <h3>1. 安装依赖</h3>
                <pre><code>npm install</code></pre>
              </div>
              <div className="site-guide-card">
                <h3>2. 启动预览站</h3>
                <pre><code>npm run dev</code></pre>
              </div>
              <div className="site-guide-card">
                <h3>3. 核心入口</h3>
                <pre><code>{`src/main.tsx\nsrc/App.tsx\nsrc/siteData.tsx`}</code></pre>
              </div>
            </div>
          </section>

          <section className="site-all-components" id="all-components">
            {sections.map((section) => (
              <section className="site-section" id={section.id} key={section.id}>
                <header className="site-section-header">
                  <div>
                    <span className="site-section-kicker">{section.title}</span>
                    <h2>{section.title}</h2>
                    <p>{section.summary}</p>
                  </div>
                  <span className="site-section-count">{section.items.length} previews</span>
                </header>
                <div className="site-preview-grid">
                  {section.items.map((item) => (
                    <PreviewCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
