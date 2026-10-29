import { useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

import fastwamParadigms from './assets/fastwam-paradigms.png';
import fastwamRealworld from './assets/fastwam-realworld.png';
import openwamOverview from './assets/openwam-overview.png';
import huaweiArch from './assets/huawei-arch.png';
import hustArch from './assets/hust-arch.png';
import santsOverview from './assets/sants-overview.png';
import santsFig3Coarse from './assets/sants-fig3-coarse.png';
import santsFig3Fine from './assets/sants-fig3-fine.png';
import simplewamSchemes from './assets/simplewam-schemes.png';
import simplewamTdenoise from './assets/simplewam-tdenoise.png';
import simplewamFindings from './assets/simplewam-findings-hi.jpg';
import imagewamOverview from './assets/imagewam-overview.jpg';
import imagewamFig2 from './assets/imagewam-fig2.jpg';
import prowamArch from './assets/prowam-arch.png';
import prowamAblation from './assets/prowam-ablation.png';
import prowamFgp from './assets/prowam-fgp.png';
import fastwamCover from './assets/covers/fastwam.jpg';
import openwamCover from './assets/covers/openwam.jpg';
import huaweiCover from './assets/covers/huawei.jpg';
import santsCover from './assets/covers/sants.jpg';
import simplewamCover from './assets/covers/simplewam.jpg';
import hustCover from './assets/covers/hust.jpg';
import imagewamCover from './assets/covers/imagewam.jpg';
import prowamCover from './assets/covers/prowam.jpg';
import geobonCover from './assets/covers/geobon.jpg';
import geobonFig1 from './assets/geobon-fig1.jpg';
import metaLogo from './assets/logos/meta.svg';
import nvidiaLogo from './assets/logos/nvidia.svg';
import huaweiLogo from './assets/logos/huawei.svg';
import avatarImg from './assets/logos/samynhn.png';

export const design: DesignSystem = {
  palette: { bg: '#F6F4EE', text: '#1C2230', accent: '#2B59C3' },
  fonts: {
    display: '"PingFang TC", "Heiti TC", "Noto Sans TC", "Noto Sans CJK TC", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: '"PingFang TC", "Heiti TC", "Noto Sans TC", "Noto Sans CJK TC", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  typeScale: { hero: 112, body: 30 },
  radius: 14,
};

// Extra tokens outside the DesignSystem shape
const muted = '#6B6F7B';
const line = '#DAD5C8';
const card = '#FFFFFF';
const warm = '#B5482E';
const grey = '#B9BCC4';
const accentSoft = '#E4EBF8';
const warmSoft = '#F6E6E0';
const mono = 'ui-monospace, "SF Mono", Menlo, monospace';

/* ───────────────────────── shared pieces ───────────────────────── */

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  boxSizing: 'border-box',
};

/** Author badge pinned to the top-left corner of every page; links to GitHub. */
const AuthorBadge = () => (
  <a
    href="https://github.com/samynhn"
    target="_blank"
    rel="noopener noreferrer"
    data-osd-interactive=""
    style={{
      position: 'absolute',
      left: 36,
      top: 24,
      zIndex: 5,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '5px 14px 5px 5px',
      borderRadius: 999,
      background: card,
      border: `1px solid ${line}`,
      color: 'var(--osd-text)',
      textDecoration: 'none',
      fontFamily: mono,
      fontSize: 18,
      fontWeight: 700,
    }}
  >
    <img src={avatarImg} style={{ width: 30, height: 30, borderRadius: 15, display: 'block' }} />
    samynhn
  </a>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 36,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 22,
        color: muted,
        fontFamily: mono,
        borderTop: `1px solid ${line}`,
        paddingTop: 14,
      }}
    >
      <span>World Action Model · Paper Reading</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Shell = ({
  chapter,
  title,
  affil,
  children,
}: {
  chapter: string;
  title: ReactNode;
  affil?: ReactNode;
  children: ReactNode;
}) => (
  <div style={{ ...fill, padding: '80px 120px 0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 36 }}>
      <div style={{ fontFamily: mono, fontSize: 24, color: 'var(--osd-accent)', letterSpacing: '0.08em' }}>
        {chapter}
      </div>
      {affil ? <div style={{ display: 'flex', gap: 10 }}>{affil}</div> : null}
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 56,
        fontWeight: 800,
        lineHeight: 1.2,
        margin: '8px 0 0',
      }}
    >
      {title}
    </h2>
    <div style={{ marginTop: 40 }}>{children}</div>
    <AuthorBadge />
    <Footer />
  </div>
);

/** Affiliation chip: brand logo when available, otherwise a colored monogram. */
const Org = ({ name, mark, color, logo }: { name: string; mark?: string; color?: string; logo?: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 36,
      padding: '0 14px 0 6px',
      background: card,
      border: `1px solid ${line}`,
      borderRadius: 18,
      fontSize: 20,
      fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    {logo ? (
      <img src={logo} style={{ width: 24, height: 24, margin: '0 2px' }} />
    ) : (
      <span
        style={{
          minWidth: 26,
          height: 26,
          padding: '0 4px',
          boxSizing: 'border-box',
          borderRadius: 13,
          background: color,
          color: '#FFFFFF',
          fontSize: 13,
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: mono,
        }}
      >
        {mark}
      </span>
    )}
    {name}
  </div>
);

const Fig = ({ src, w, h, source }: { src: string; w: number; h: number; source: string }) => (
  <div
    style={{
      background: card,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: 16,
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 8,
    }}
  >
    <img src={src} style={{ width: w, height: h, objectFit: 'contain', display: 'block' }} />
    <div style={{ fontSize: 20, color: muted, fontFamily: mono }}>{source}</div>
  </div>
);

/** Horizontal bar: value mapped onto [min, max]. */
const HBar = ({
  label,
  value,
  min,
  max,
  width,
  color,
  text,
  labelWidth = 300,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  width: number;
  color: string;
  text: string;
  labelWidth?: number;
}) => {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 54, gap: 20 }}>
      <div style={{ width: labelWidth, fontSize: 26, textAlign: 'right', whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ width, height: 34, background: '#ECE9E1', borderRadius: 6, position: 'relative' }}>
        <div style={{ width: width * pct, height: 34, background: color, borderRadius: 6 }} />
      </div>
      <div style={{ fontSize: 26, fontFamily: mono, fontWeight: 700, whiteSpace: 'nowrap' }}>{text}</div>
    </div>
  );
};

const AxisNote = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 22, color: muted, fontFamily: mono, marginTop: 10 }}>{children}</div>
);

const Callout = ({ title, children, tone = 'accent' }: { title: string; children: ReactNode; tone?: 'accent' | 'warm' }) => (
  <div
    style={{
      background: tone === 'accent' ? accentSoft : warmSoft,
      borderLeft: `6px solid ${tone === 'accent' ? 'var(--osd-accent)' : warm}`,
      borderRadius: 10,
      padding: '22px 28px',
    }}
  >
    <div style={{ fontSize: 26, fontWeight: 800, color: tone === 'accent' ? 'var(--osd-accent)' : warm }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, marginTop: 8 }}>{children}</div>
  </div>
);

const Point = ({ k, children }: { k: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
    <div style={{ fontFamily: mono, fontSize: 24, color: 'var(--osd-accent)', fontWeight: 700, minWidth: 40 }}>{k}</div>
    <div style={{ fontSize: 29, lineHeight: 1.5 }}>{children}</div>
  </div>
);

const AffFastWam = () => (
  <>
    <Org name="Tsinghua IIIS" mark="TH" color="#660874" />
    <Org name="Galaxea AI" mark="GA" color="#222831" />
  </>
);
const AffOpenWam = () => <Org name="Stanford" mark="S" color="#8C1515" />;
const AffHuawei = () => (
  <>
    <Org name="Huawei Noah's Ark" logo={huaweiLogo} />
    <Org name="McGill · Mila" mark="M" color="#ED1B2F" />
    <Org name="U Toronto" mark="UT" color="#1E3765" />
  </>
);
const AffSants = () => (
  <>
    <Org name="Fudan" mark="FD" color="#0E419C" />
    <Org name="NVIDIA" logo={nvidiaLogo} />
  </>
);
const AffSimpleWam = () => (
  <>
    <Org name="Tsinghua" mark="TH" color="#660874" />
    <Org name="USTC" mark="US" color="#004EA1" />
    <Org name="BIT" mark="BIT" color="#00704A" />
  </>
);
const AffHust = () => (
  <>
    <Org name="HUST" mark="HU" color="#0A4DA2" />
    <Org name="D-Robotics" mark="DR" color="#E8590C" />
    <Org name="Horizon Robotics" mark="HR" color="#4B2E83" />
    <Org name="Xiamen U" mark="XM" color="#003F88" />
  </>
);
const AffImageWam = () => (
  <>
    <Org name="SJTU" mark="SJ" color="#C8161D" />
    <Org name="EIT" mark="EIT" color="#0A6E8C" />
    <Org name="Tencent Robotics X" mark="TC" color="#1E6FFF" />
    <Org name="Tsinghua" mark="TH" color="#660874" />
    <Org name="ZGCA" mark="ZG" color="#555B66" />
  </>
);
const AffProWam = () => (
  <>
    <Org name="SJTU" mark="SJ" color="#C8161D" />
    <Org name="SII" mark="SII" color="#2F4F9F" />
    <Org name="Meta" logo={metaLogo} />
    <Org name="Imperial" mark="IC" color="#0000CD" />
  </>
);

const AffGeoBoN = () => (
  <>
    <Org name="U Michigan" mark="UM" color="#00274C" />
    <Org name="NVIDIA" logo={nvidiaLogo} />
  </>
);

/* ───────────────────────── 01 Cover ───────────────────────── */

const Cover: Page = () => (
  <div style={{ ...fill, padding: '0 160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={{ fontFamily: mono, fontSize: 26, color: 'var(--osd-accent)', letterSpacing: '0.16em' }}>
      PAPER READING · WORLD ACTION MODEL
    </div>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 900,
        lineHeight: 1.15,
        margin: '36px 0 0',
      }}
    >
      推論時，WAM 還需要
      <br />
      「想像未來」嗎？
    </h1>
    <div style={{ width: 160, height: 6, background: 'var(--osd-accent)', margin: '56px 0 40px' }} />
    <p style={{ fontSize: 34, lineHeight: 1.6, color: muted, margin: 0, maxWidth: 1400 }}>
      從 Fast-WAM / OpenWAM 出發，經 Faster-WAM、SANTS、Simple-WAM，到 ImageWAM 與 ProWAM
    </p>
    <div style={{ position: 'absolute', left: 160, bottom: 80, fontFamily: mono, fontSize: 24, color: muted }}>
      2026-10-29 · 9 papers · 2026.03 – 2026.10
    </div>
    <AuthorBadge />
  </div>
);

/* ───────────────────────── 02 Agenda + Timeline ───────────────────────── */

const Chapter = ({ n, title, papers }: { n: string; title: string; papers: string }) => (
  <div style={{ display: 'flex', gap: 22, paddingBottom: 26, marginBottom: 26, borderBottom: `1px solid ${line}` }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 900, color: 'var(--osd-accent)', lineHeight: 1 }}>
      {n}
    </div>
    <div>
      <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.3 }}>{title}</div>
      <div style={{ fontSize: 23, color: muted, marginTop: 6, lineHeight: 1.4 }}>{papers}</div>
    </div>
  </div>
);

const TimelineRow = ({
  date,
  name,
  ch,
  tldr,
  full,
}: {
  date: string;
  name: string;
  ch: string;
  tldr: string;
  full: string;
}) => (
  <div style={{ display: 'flex', alignItems: 'center', height: 78, position: 'relative' }}>
    <div style={{ width: 120, fontFamily: mono, fontSize: 23, color: muted }}>{date}</div>
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: 9,
        background: 'var(--osd-accent)',
        border: '4px solid var(--osd-bg)',
        boxShadow: `0 0 0 2px var(--osd-accent)`,
        marginRight: 26,
        flexShrink: 0,
      }}
    />
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div style={{ width: 380, fontSize: 27, fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0 }}>
          {name}
          <span style={{ fontFamily: mono, fontSize: 20, color: 'var(--osd-accent)', marginLeft: 10 }}>{ch}</span>
        </div>
        <div style={{ fontSize: 24, color: 'var(--osd-text)', whiteSpace: 'nowrap' }}>{tldr}</div>
      </div>
      <div style={{ fontSize: 20, color: muted, whiteSpace: 'nowrap', marginTop: 4, fontStyle: 'italic' }}>{full}</div>
    </div>
  </div>
);

const Agenda: Page = () => (
  <Shell chapter="CONTENTS · TIMELINE · TL;DR" title="目錄與 Paper 時間軸">
    <div style={{ display: 'flex', gap: 72 }}>
      <div style={{ width: 470, flexShrink: 0 }}>
        <Chapter n="1" title="推論要不要 future video？" papers="Fast-WAM · OpenWAM" />
        <Chapter n="2" title="Action ＝ Video 表徵的轉移" papers="Faster-WAM（Huawei）" />
        <Chapter n="3" title="Future 要 denoise 多少？" papers="SANTS · Simple-WAM · Faster-WAM（HUST）" />
        <Chapter n="4" title="Future 該長什麼樣子？" papers="ImageWAM（final goal）· ProWAM（sub-goal）" />
        <Chapter n="5" title="用 future 挑 action" papers="Gated GeoBoN（test-time scaling）" />
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 128, top: 20, bottom: 20, width: 2, background: line }} />
        <TimelineRow date="2026.03" name="Fast-WAM" ch="Ch1" full="Fast-WAM: Do World Action Models Need Test-time Future Imagination?" tldr="訓練靠 video co-train；推論不生成 future 也行" />
        <TimelineRow date="2026.05" name="SANTS" ch="Ch3" full="SANTS: A State-Adaptive Scheduler for World Action Models" tldr="不必 full denoise，依狀態停在中間 noise level" />
        <TimelineRow date="2026.06" name="ImageWAM" ch="Ch4" full="ImageWAM: Do World Action Models Really Need Video Generation, or Just Image Editing?" tldr="把 final goal 包成 image edit，用 edit KV 當條件" />
        <TimelineRow date="2026.07" name="Gated GeoBoN" ch="Ch5" full="Test-Time Scaling for World Action Models via Zero-Shot Geometric Verification" tldr="多抽幾個 rollout，用跨視角幾何一致性挑最好的" />
        <TimelineRow date="2026.08" name="Faster-WAM · Huawei" ch="Ch2" full="Faster-WAM: Do World Action Models Need Deep Action Modules?" tldr="單層 action expert，action 由 video 表徵讀出" />
        <TimelineRow date="2026.08" name="Faster-WAM · HUST" ch="Ch3" full="Faster-WAM: Efficient Inference-Time Future Conditioning for Robust World Action Models" tldr="Future noise slots ＋ SparseMoT，一次 forward" />
        <TimelineRow date="2026.09" name="Simple-WAM" ch="Ch3" full="What Makes World Action Models Generalize? An Empirical Study of Test-Time Future Modeling" tldr="純噪聲 future token 一次 forward 就足以泛化" />
        <TimelineRow date="2026.10" name="ProWAM" ch="Ch4" full="World Action Modeling with Progressive Visual Planning" tldr="介於 final goal 與 full video：預測 sub-goals" />
        <TimelineRow date="2026.10" name="OpenWAM" ch="Ch1" full="OpenWAM: An Open Framework for Composable World-Action Models" tldr="統一比較 VTA / ATV / Joint / Decoupled" />
      </div>
    </div>
  </Shell>
);

/* ───────────────────────── Ch1 · Fast-WAM ───────────────────────── */

const Paradigms: Page = () => (
  <Shell chapter="CH1 · FAST-WAM" affil={<AffFastWam />} title="三種 WAM 推論範式：Joint、IDM（VTA）、Fast-WAM">
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <Fig src={fastwamParadigms} w={1120} h={605} source="Fast-WAM, Fig. 1 (arXiv 2603.16666)" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 8 }}>
        <Point k="A">
          <b>Joint</b>：video 與 action
          <br />
          同時 denoise
        </Point>
        <Point k="B">
          <b>IDM / VTA</b>：先 denoise
          <br />
          video，再 denoise action
        </Point>
        <Point k="C">
          <b>Fast-WAM</b>：訓練仍有
          <br />
          video loss；推論只做一次
          <br />
          video forward 取 KV
        </Point>
        <Callout title="核心問題">future video 是「訓練訊號」還是「推論條件」？</Callout>
      </div>
    </div>
  </Shell>
);

const FastWamControlled: Page = () => (
  <Shell chapter="CH1 · FAST-WAM" affil={<AffFastWam />} title="有用的是訓練時的 video，不是推論時的 future">
    <div style={{ display: 'flex', gap: 80 }}>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 18 }}>RoboTwin 2.0 success rate（%）</div>
        <HBar label="Fast-WAM（不生成）" value={91.8} min={80} max={95} width={640} color="var(--osd-accent)" text="91.8" labelWidth={340} />
        <HBar label="Fast-WAM-IDM" value={91.3} min={80} max={95} width={640} color={grey} text="91.3" labelWidth={340} />
        <HBar label="Fast-WAM-Joint" value={90.6} min={80} max={95} width={640} color={grey} text="90.6" labelWidth={340} />
        <HBar label="w/o video co-train" value={83.8} min={80} max={95} width={640} color={warm} text="83.8" labelWidth={340} />
        <AxisNote>軸從 80% 起；Section 4.3.2 同一架構下的受控比較</AxisNote>
        <div style={{ display: 'flex', gap: 28, marginTop: 52 }}>
          <div style={{ background: card, border: `1px solid ${line}`, borderRadius: 14, padding: '24px 32px', width: 440 }}>
            <div style={{ fontSize: 24, color: muted }}>拿掉 video co-training</div>
            <div style={{ fontSize: 64, fontWeight: 900, color: warm, fontFamily: mono }}>−8.0 pp</div>
          </div>
          <div style={{ background: card, border: `1px solid ${line}`, borderRadius: 14, padding: '24px 32px', width: 440 }}>
            <div style={{ fontSize: 24, color: muted }}>推論時生成 future video</div>
            <div style={{ fontSize: 64, fontWeight: 900, color: muted, fontFamily: mono }}>±1 pp</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30, paddingTop: 10 }}>
        <Callout title="作者結論">
          Video co-training 對 WAM 很重要；但推論時先生成 future 再出 action，成功率沒有明顯提升。
        </Callout>
      </div>
    </div>
  </Shell>
);

const FastWamReal: Page = () => (
  <Shell chapter="CH1 · FAST-WAM" affil={<AffFastWam />} title="真機摺毛巾：IDM 最準，但慢在 video denoising">
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <Fig src={fastwamRealworld} w={1060} h={408} source="Fast-WAM, Fig. 4 — towel folding" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: 520 }}>
        <Point k="①">Fast-WAM ≈ Joint 成功率，但常常無法一步到位</Point>
        <Point k="②">IDM 成功率最高（0.9 vs 0.75），平均完成時間只多一點</Point>
        <Point k="③">IDM latency 810 ms vs 190 ms：瓶頸在 video denoise</Point>
      </div>
    </div>
    <div style={{ marginTop: 40 }}>
      <Callout title="作者結論">Fast-WAM 以低延遲達到強的真機表現；拿掉 video co-training 後，成功率與完成時間都變差。</Callout>
    </div>
  </Shell>
);

/* ───────────────────────── Ch1 · OpenWAM ───────────────────────── */

const OpenWam: Page = () => (
  <Shell chapter="CH1 · OPENWAM" affil={<AffOpenWam />} title="OpenWAM：VTA 竟然比 Joint 好">
    <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
      <Fig src={openwamOverview} w={860} h={406} source="OpenWAM, Fig. 1 (arXiv 2610.07922)" />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 14 }}>LIBERO 四套件平均（%）</div>
        <HBar label="VTA  V→A" value={98.6} min={95} max={100} width={330} color="var(--osd-accent)" text="98.6" labelWidth={250} />
        <HBar label="Decoupled V‖A" value={98.0} min={95} max={100} width={330} color={grey} text="98.0" labelWidth={250} />
        <HBar label="Joint  V↔A" value={97.6} min={95} max={100} width={330} color={grey} text="97.6" labelWidth={250} />
        <HBar label="Fast-WAM" value={97.6} min={95} max={100} width={330} color={grey} text="97.6" labelWidth={250} />
        <HBar label="ATV  A→V" value={96.8} min={95} max={100} width={330} color={warm} text="96.8" labelWidth={250} />
        <AxisNote>軸從 95% 起；各設定 std ±0.2–0.6</AxisNote>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
      <div style={{ flex: 1 }}>
        <Callout title="VTA > Joint">先把 video denoise 好、再讓 action 讀它，比同時 denoise 更好。</Callout>
      </div>
      <div style={{ flex: 1 }}>
        <Callout title="Decoupled ≈ VTA">推論時不看 future 的 Decoupled 只差 0.6 pp，與 Fast-WAM 結論一致。</Callout>
      </div>
    </div>
  </Shell>
);

const Evidence = ({ paper, a, b, note }: { paper: string; a: string; b: string; note: string }) => (
  <div style={{ flex: 1, background: card, border: `1px solid ${line}`, borderRadius: 14, padding: '26px 32px' }}>
    <div style={{ fontSize: 26, fontWeight: 800 }}>{paper}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 10 }}>
      <span style={{ fontFamily: mono, fontSize: 48, fontWeight: 900, color: 'var(--osd-accent)' }}>{a}</span>
      <span style={{ fontFamily: mono, fontSize: 30, color: muted }}>vs {b}</span>
    </div>
    <div style={{ fontSize: 24, color: muted, marginTop: 6 }}>{note}</div>
  </div>
);

const Ch1Synthesis: Page = () => (
  <Shell chapter="CH1 · SYNTHESIS" title="Fast-WAM × OpenWAM：共同結論">
    <div
      style={{
        background: 'var(--osd-text)',
        color: 'var(--osd-bg)',
        borderRadius: 'var(--osd-radius)',
        padding: '40px 56px',
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: '0.1em', opacity: 0.7 }}>SHARED CONCLUSION</div>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 48, fontWeight: 800, lineHeight: 1.4, marginTop: 16 }}>
        Video generation 訓練對 WAM 很有幫助；推論時 video-then-action 幫助不大。
      </div>
    </div>
    <div style={{ display: 'flex', gap: 28, marginTop: 32 }}>
      <Evidence paper="Fast-WAM · RoboTwin" a="91.8" b="91.3" note="不生成 future vs IDM（先 denoise video）" />
      <Evidence paper="OpenWAM · LIBERO" a="98.0" b="98.6" note="Decoupled（不看 future）vs VTA" />
    </div>
    <div style={{ marginTop: 32 }}>
      <Callout title="伏筆" tone="warm">兩篇都在 in-distribution 上比較。換成 OOD 之後，結果會翻盤（Ch3、Ch4）。</Callout>
    </div>
  </Shell>
);

/* ───────────────────────── Ch2 · Faster-WAM (Huawei) ───────────────────────── */

const KeyCard = ({ k, title, body }: { k: string; title: string; body: string }) => (
  <div style={{ flex: 1, background: card, border: `1px solid ${line}`, borderRadius: 14, padding: '24px 28px' }}>
    <div style={{ fontFamily: mono, fontSize: 22, color: 'var(--osd-accent)', fontWeight: 700 }}>{k}</div>
    <div style={{ fontSize: 29, fontWeight: 800, marginTop: 6 }}>{title}</div>
    <div style={{ fontSize: 24, color: muted, marginTop: 8, lineHeight: 1.5 }}>{body}</div>
  </div>
);

const HuaweiMethod: Page = () => (
  <Shell chapter="CH2 · FASTER-WAM" affil={<AffHuawei />} title="把 Action 視為 Video 表徵的「轉移」">
    <Fig src={huaweiArch} w={1300} h={412} source="Faster-WAM (Huawei), Fig. 2 — Dock of Transformers (arXiv 2608.02365v2)" />
    <div style={{ display: 'flex', gap: 28, marginTop: 32 }}>
      <KeyCard k="01" title="單層 Action Expert" body="Action 不再是深的 DiT，只是一層讀頭" />
      <KeyCard k="02" title="Lite KV-Fusion" body="全部 video layers 的 KV 以 per-head 權重融合（720 個 logits）" />
      <KeyCard k="03" title="World-model-only conditioning" body="Language／proprio 只進 video；action 全靠 video 表徵" />
    </div>
  </Shell>
);

const MetricPair = ({ name, a, b, max, unit, better }: { name: string; a: number; b: number; max: number; unit: string; better: string }) => (
  <div style={{ flex: 1, background: card, border: `1px solid ${line}`, borderRadius: 14, padding: '24px 28px' }}>
    <div style={{ fontSize: 26, fontWeight: 800 }}>{name}</div>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 26, height: 230, marginTop: 18 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ fontFamily: mono, fontSize: 24, fontWeight: 700 }}>
          {a}
          {unit}
        </div>
        <div style={{ width: 90, height: (a / max) * 170, background: grey, borderRadius: 6 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, color: 'var(--osd-accent)' }}>
          {b}
          {unit}
        </div>
        <div style={{ width: 90, height: (b / max) * 170, background: 'var(--osd-accent)', borderRadius: 6 }} />
      </div>
    </div>
    <div style={{ fontSize: 22, color: muted, marginTop: 10 }}>{better}</div>
  </div>
);

const HuaweiResults: Page = () => (
  <Shell chapter="CH2 · FASTER-WAM" affil={<AffHuawei />} title="一層 action 就夠：OOD 大升、延遲 1/3.8">
    <div style={{ display: 'flex', gap: 18, fontSize: 24, color: muted, marginBottom: 18, alignItems: 'center' }}>
      <span style={{ width: 22, height: 22, background: grey, borderRadius: 4, display: 'inline-block' }} /> Fast-WAM
      <span style={{ width: 22, height: 22, background: 'var(--osd-accent)', borderRadius: 4, display: 'inline-block', marginLeft: 20 }} /> Faster-WAM（Huawei）
    </div>
    <div style={{ display: 'flex', gap: 24 }}>
      <MetricPair name="LIBERO" a={97.6} b={98.3} max={100} unit="" better="+0.7 pp" />
      <MetricPair name="RoboTwin 2.0" a={91.8} b={90.5} max={100} unit="" better="−1.3 pp" />
      <MetricPair name="LIBERO-Plus（OOD）" a={51.5} b={78.3} max={100} unit="" better="+26.8 pp" />
      <MetricPair name="Latency / chunk" a={196} b={52} max={200} unit="ms" better="3.77× faster" />
    </div>
  </Shell>
);

/* ───────────────────────── Ch3 · SANTS ───────────────────────── */

const SantsMethod: Page = () => (
  <Shell chapter="CH3 · SANTS" affil={<AffSants />} title="SANTS：取 denoise 的「中間段」給 action">
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <Fig src={santsOverview} w={1060} h={510} source="SANTS, Fig. 1 (arXiv 2605.27947)" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: 520 }}>
        <div style={{ background: card, border: `1px solid ${line}`, borderRadius: 14, padding: '22px 28px' }}>
          <div style={{ fontSize: 24, color: muted }}>Depth-scan：最低 action error 不在 full denoise 的片段</div>
          <div style={{ fontSize: 60, fontWeight: 900, fontFamily: mono, color: 'var(--osd-accent)' }}>55.65%</div>
        </div>
        <Point k="①">Stop head ＋ Jump head：決定何時停、跳多遠</Point>
        <Point k="②">Action branch 凍結，用 path-level reward post-train scheduler</Point>
        <Point k="③">WAM 先以不同 noise 程度的 video 微調 action</Point>
      </div>
    </div>
  </Shell>
);

const T1Row = ({ k, a, b, hi = false, head = false }: { k: string; a: string; b: string; hi?: boolean; head?: boolean }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '250px 1fr 1fr',
      columnGap: 16,
      alignItems: 'center',
      padding: '16px 18px',
      borderBottom: `1px solid ${line}`,
      background: hi ? accentSoft : 'transparent',
      fontSize: head ? 24 : 26,
      fontWeight: head ? 800 : 400,
      color: head ? muted : 'var(--osd-text)',
    }}
  >
    <div style={{ fontWeight: 700 }}>{k}</div>
    <div style={{ fontFamily: mono, textAlign: 'right', fontWeight: hi ? 800 : 400, color: hi ? 'var(--osd-accent)' : undefined }}>{a}</div>
    <div style={{ fontFamily: mono, textAlign: 'right', fontWeight: hi ? 800 : 400, color: hi ? 'var(--osd-accent)' : undefined }}>{b}</div>
  </div>
);

const SantsDepthScan: Page = () => (
  <Shell chapter="CH3 · SANTS" affil={<AffSants />} title="Depth-scan：denoise 到底，不一定最好">
    <div style={{ display: 'flex', gap: 44, alignItems: 'flex-start' }}>
      <div>
        <div style={{ display: 'flex', gap: 24 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Coarse（approach · transport）</div>
            <Fig src={santsFig3Coarse} w={470} h={337} source="SANTS, Fig. 3 (top)" />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Fine（contact · grasp · insert）</div>
            <Fig src={santsFig3Fine} w={470} h={327} source="SANTS, Fig. 3 (bottom)" />
          </div>
        </div>
        <div style={{ marginTop: 28, width: 1028 }}>
          <Callout title="平均曲線">
            以 4% depth 為 1.0 正規化：Coarse 只降到 0.89，Fine 降到 0.67；灰線是單一片段，常見平台期與回升。
          </Callout>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Table 1 · Offline depth-scan</div>
        <div style={{ background: card, border: `1px solid ${line}`, borderRadius: 14, overflow: 'hidden' }}>
          <T1Row head k="Metric" a="Coarse" b="Fine" />
          <T1Row hi k="100% not best" a="55.65%" b="41.33%" />
          <T1Row k="Adjacent increase" a="87.90%" b="77.49%" />
          <T1Row k="Oracle mean" a="0.8433" b="0.6084" />
          <T1Row k="Fixed 100% mean" a="0.8943" b="0.6571" />
        </div>
        <div style={{ fontSize: 22, color: muted, lineHeight: 1.55, marginTop: 16 }}>
          500 個片段 × 7 個 depth（4%–100%）。Oracle：每段挑最低誤差的 depth；Fixed 100%：一律 full denoise。
        </div>
      </div>
    </div>
  </Shell>
);

const SantsResults: Page = () => (
  <Shell chapter="CH3 · SANTS" affil={<AffSants />} title="同樣的延遲，adaptive 比固定排程高 7.2 pp">
    <div style={{ display: 'flex', gap: 64 }}>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 14 }}>Success rate（%）· latency</div>
        <HBar label="Fixed-5-step" value={87.2} min={85} max={95} width={520} color={grey} text="87.2 · 554ms" labelWidth={230} />
        <HBar label="Fixed-full" value={89.8} min={85} max={95} width={520} color={grey} text="89.8 · 2769ms" labelWidth={230} />
        <HBar label="Jump-only" value={91.6} min={85} max={95} width={520} color={grey} text="91.6 · 1138ms" labelWidth={230} />
        <HBar label="Stop-only" value={92.7} min={85} max={95} width={520} color={grey} text="92.7 · 1329ms" labelWidth={230} />
        <HBar label="SANTS" value={94.4} min={85} max={95} width={520} color="var(--osd-accent)" text="94.4 · 524ms" labelWidth={230} />
        <AxisNote>軸從 85% 起；SANTS Table 4</AxisNote>
        <div style={{ fontSize: 28, fontWeight: 800, margin: '40px 0 14px' }}>跨方法（Table 2）</div>
        <HBar label="Fast-WAM" value={91.8} min={85} max={95} width={520} color={grey} text="91.8 · 190ms" labelWidth={230} />
        <HBar label="LingBot-VA" value={92.2} min={85} max={95} width={520} color={grey} text="92.2 · 2868ms" labelWidth={230} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Callout title="Future video 還是要">只是不需要 full denoise；Fixed-full 沒比 Fast-WAM 高多少。</Callout>
        <Callout title="Benchmark" tone="warm">只有 RoboTwin ＋ 7 個真機任務，沒有 LIBERO。</Callout>
      </div>
    </div>
  </Shell>
);

/* ───────────────────────── Ch3 · Simple-WAM ───────────────────────── */

const DeltaRow = ({ k, d, tone }: { k: string; d: string; tone: 'muted' | 'warm' }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '9px 0', borderBottom: `1px solid ${line}`, fontSize: 25 }}>
    <div style={{ fontWeight: 700 }}>{k}</div>
    <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 30, color: tone === 'warm' ? warm : muted }}>{d}</div>
  </div>
);

const Legend = ({ color, name, score, children }: { color: string; name: string; score: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <div style={{ width: 24, height: 24, borderRadius: 5, background: color, marginTop: 6, flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 25, fontWeight: 800 }}>{name}</span>
        <span style={{ fontFamily: mono, fontSize: 24, fontWeight: 800 }}>F2 {score}</span>
      </div>
      <div style={{ fontSize: 22, lineHeight: 1.45, color: muted, marginTop: 2 }}>{children}</div>
    </div>
  </div>
);

const SimpleWamFindings: Page = () => (
  <Shell chapter="CH3 · SIMPLE-WAM" affil={<AffSimpleWam />} title="Figure 1：ID 幾乎一樣，泛化就分開了">
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <Fig src={simplewamFindings} w={760} h={638} source="Simple-WAM, Fig. 1 (right) — Findings" />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>F1 · Explicit vs Latent（SR %）</div>
        <div style={{ fontSize: 22, color: muted, marginBottom: 4 }}>Latent 相對 Explicit 的差距（pp）</div>
        <DeltaRow k="In-Distribution（97.75 vs 96.85）" d="−0.9" tone="muted" />
        <DeltaRow k="Environment perturbation" d="−14.0" tone="warm" />
        <DeltaRow k="Data efficiency" d="−8.5" tone="warm" />
        <DeltaRow k="Task generalization" d="−34.1" tone="warm" />
        <div style={{ fontSize: 26, fontWeight: 800, margin: '26px 0 12px' }}>圖例：三種推論方式</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Legend color="#2E6A9E" name="Explicit WAM（with denoising）" score="72.3">
            推論時對 future video 持續多步 denoise，action expert 使用逐步更新的 future features。
          </Legend>
          <Legend color="#E08A2E" name="Latent WAM" score="37.3">
            推論時移除 future video tokens，只用當前 observation 的特徵預測 action。
          </Legend>
          <Legend color="#8DB4D6" name="Explicit WAM（without denoising）" score="71.8">
            保留 future tokens 但只 forward 一次；future 仍是純 Gaussian noise，features 交給 action expert。
          </Legend>
        </div>
      </div>
    </div>
  </Shell>
);

const SimpleWamMethod: Page = () => (
  <Shell chapter="CH3 · SIMPLE-WAM" affil={<AffSimpleWam />} title="Simple-WAM：純噪聲 future，一次 forward">
    <Fig src={simplewamSchemes} w={1380} h={420} source="Simple-WAM, Fig. 3 (arXiv 2609.34981)" />
    <div style={{ display: 'flex', gap: 28, marginTop: 34 }}>
      <div style={{ flex: 1 }}>
        <Callout title="F1 · 沒有 future 就泛化差">
          Latent WAM 在 ID 只差 0.9 pp，但環境擾動 −14.0、資料效率 −8.5、任務泛化 −34.1。
        </Callout>
      </div>
      <div style={{ flex: 1 }}>
        <Callout title="F2 · 一步就夠">差距幾乎全來自第一個 denoise step：好處在「準備 future」，不在「生成 future」。</Callout>
      </div>
    </div>
  </Shell>
);

const SimpleWamData: Page = () => (
  <Shell chapter="CH3 · SIMPLE-WAM" affil={<AffSimpleWam />} title="1 步之後，多 denoise 幾步幾乎沒差">
    <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
      <Fig src={simplewamTdenoise} w={640} h={562} source="Simple-WAM — SR vs. t_denoise" />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 14 }}>F2：泛化設定下 success rate（%，Fig. 1）</div>
        <HBar label="Explicit w/ denoise" value={72.3} min={0} max={100} width={380} color={grey} text="72.3" labelWidth={300} />
        <HBar label="Latent（無 future）" value={37.3} min={0} max={100} width={380} color={warm} text="37.3" labelWidth={300} />
        <HBar label="1-pass noisy future" value={71.8} min={0} max={100} width={380} color="var(--osd-accent)" text="71.8" labelWidth={300} />
        <div style={{ marginTop: 36 }}>
          <Callout title="衝突：SANTS vs Simple-WAM" tone="warm">
            SANTS：每個狀態都有自己最適合的 denoise 點。
            <br />
            Simple-WAM：一律 denoise 一步就好。
          </Callout>
        </div>
      </div>
    </div>
  </Shell>
);

/* ───────────────────────── Ch3 · Faster-WAM (HUST) ───────────────────────── */

const HustMethod: Page = () => (
  <Shell chapter="CH3 · FASTER-WAM" affil={<AffHust />} title="另一篇 Faster-WAM：noise slots ＋ SparseMoT">
    <div style={{ display: 'flex', gap: 44, alignItems: 'flex-start' }}>
      <Fig src={hustArch} w={1000} h={386} source="Faster-WAM (HUST), Fig. 2 (arXiv 2608.04404)" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 590 }}>
        <Point k="①">Current obs ＋ Gaussian future noise slots，video 只 forward 一次</Point>
        <Point k="②">SparseMoT stride-4：約 8 個 action stage 讀 video KV</Point>
        <Point k="③">Interval KV-Fusion 聚合多層 future 表徵</Point>
      </div>
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, margin: '30px 0 8px' }}>LIBERO-Plus（OOD）ablation · %</div>
    <div style={{ display: 'flex', gap: 40 }}>
      <div>
        <HBar label="Faster-WAM" value={73.57} min={40} max={80} width={560} color="var(--osd-accent)" text="73.57" labelWidth={300} />
        <HBar label="− KV-Fusion" value={69.99} min={40} max={80} width={560} color={grey} text="69.99" labelWidth={300} />
        <HBar label="− future slots" value={51.0} min={40} max={80} width={560} color={warm} text="51.00" labelWidth={300} />
      </div>
      <div style={{ flex: 1, alignSelf: 'center' }}>
        <Callout title="與 Simple-WAM 同一結論">拿掉 noisy future，OOD 掉 22.6 pp</Callout>
      </div>
    </div>
  </Shell>
);

const TRow = ({ k, a, b, head = false }: { k: string; a: string; b: string; head?: boolean }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '300px 1fr 1fr',
      gap: 32,
      padding: '14px 0',
      borderBottom: `1px solid ${line}`,
      fontSize: head ? 26 : 26,
      fontWeight: head ? 800 : 400,
      color: head ? 'var(--osd-accent)' : 'var(--osd-text)',
      lineHeight: 1.45,
    }}
  >
    <div style={{ fontWeight: 800, color: head ? 'var(--osd-accent)' : muted }}>{k}</div>
    <div>{a}</div>
    <div>{b}</div>
  </div>
);

const FasterVsFaster: Page = () => (
  <Shell chapter="CH3 · FASTER-WAM vs FASTER-WAM" title="同名兩篇：future 條件 vs 淺 action">
    <TRow head k="" a="HUST：Future Conditioning" b="Huawei：Deep Action?" />
    <TRow k="Video 輸入" a="Current obs ＋ future noise slots" b="只有 current obs" />
    <TRow k="Action Expert" a="保留深層，SparseMoT 稀疏讀 KV" b="單層，重用融合 KV" />
    <TRow k="KV-Fusion" a="Interval：分段融合給對應 stage" b="Lite：全層 per-head 融合" />
    <TRow k="LIBERO-Plus" a="49.14 → 73.57（+24.4）" b="51.5 → 78.3（+26.8）" />
    <TRow k="加速（同篇）" a="1.27×（L20）" b="3.77×（24 GiB GPU）" />
    <div style={{ marginTop: 36 }}>
      <Callout title="同名、不同團隊">HUST（arXiv 2608.04404）與 Huawei（arXiv 2608.02365）是兩篇獨立論文，不是彼此的版本更新。</Callout>
    </div>
  </Shell>
);

/* ───────────────────────── Ch4 · ImageWAM ───────────────────────── */

const Stat = ({ label, a, b, note }: { label: string; a: string; b: string; note: string }) => (
  <div style={{ background: card, border: `1px solid ${line}`, borderRadius: 14, padding: '12px 26px' }}>
    <div style={{ fontSize: 23, color: muted }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 4 }}>
      <span style={{ fontFamily: mono, fontSize: 40, fontWeight: 900, color: 'var(--osd-accent)' }}>{a}</span>
      <span style={{ fontFamily: mono, fontSize: 26, color: muted }}>vs {b}</span>
    </div>
    <div style={{ fontSize: 22, color: muted }}>{note}</div>
  </div>
);

/* Inference-time future: schematic token strips */
const Slot = ({ kind, label }: { kind: 'obs' | 'empty' | 'frame' | 'goal'; label?: string }) => {
  const base: CSSProperties = {
    width: 50,
    height: 38,
    borderRadius: 7,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: mono,
    fontSize: 15,
    fontWeight: 800,
    flexShrink: 0,
  };
  if (kind === 'obs') return <div style={{ ...base, background: 'var(--osd-accent)', color: '#FFFFFF' }}>o_t</div>;
  if (kind === 'frame') return <div style={{ ...base, background: '#BFD3F2', color: '#2B59C3' }}>{label}</div>;
  if (kind === 'goal') return <div style={{ ...base, background: '#E9B8E2', color: '#7A2A6E', border: '2px solid #B9529F' }}>{label}</div>;
  return <div style={{ ...base, border: `2px dashed ${grey}` }} />;
};

const ActTiles = () => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
    <div style={{ fontSize: 26, color: muted, margin: '0 8px' }}>→</div>
    <div style={{ width: 30, height: 38, borderRadius: 6, background: '#F2B88A' }} />
    <div style={{ width: 30, height: 38, borderRadius: 6, background: '#F2B88A' }} />
    <div style={{ width: 30, height: 38, borderRadius: 6, background: '#F2B88A' }} />
  </div>
);

const SchemeRow = ({ name, ex, on = false, children }: { name: string; ex: string; on?: boolean; children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '8px 14px',
      borderRadius: 10,
      background: on ? accentSoft : 'transparent',
      border: on ? '2px solid var(--osd-accent)' : '2px solid transparent',
    }}
  >
    <div style={{ width: 240, flexShrink: 0 }}>
      <div style={{ fontSize: 23, fontWeight: 800, color: on ? 'var(--osd-accent)' : 'var(--osd-text)' }}>{name}</div>
      <div style={{ fontSize: 18, color: muted }}>{ex}</div>
    </div>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{children}</div>
    <ActTiles />
  </div>
);

const SchemeHeader = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 14px', fontSize: 18, color: muted, fontFamily: mono }}>
    <div style={{ width: 240, fontFamily: 'var(--osd-font-body)', fontSize: 22, fontWeight: 800, color: 'var(--osd-text)' }}>推論時的 future</div>
    <div style={{ width: 398, display: 'flex', justifyContent: 'space-between' }}>
      <span>t（現在）</span>
      <span>→ t+H</span>
    </div>
    <div style={{ marginLeft: 20 }}>action</div>
  </div>
);

const ImageWam: Page = () => (
  <Shell chapter="CH4 · IMAGEWAM" affil={<AffImageWam />} title="ImageWAM：把 final goal 包裝成 image edit">
    <div style={{ display: 'flex', gap: 44, alignItems: 'flex-start' }}>
      <div style={{ width: 932 }}>
        <Fig src={imagewamOverview} w={796} h={340} source="ImageWAM, Fig. 1 (2026-06-19)" />
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <SchemeHeader />
          <SchemeRow name="No future" ex="Fast-WAM">
            <Slot kind="obs" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
          </SchemeRow>
          <SchemeRow name="Full video" ex="Joint / IDM WAM">
            <Slot kind="obs" />
            <Slot kind="frame" label="f1" />
            <Slot kind="frame" label="f2" />
            <Slot kind="frame" label="f3" />
            <Slot kind="frame" label="f4" />
            <Slot kind="frame" label="f5" />
            <Slot kind="frame" label="f6" />
          </SchemeRow>
          <SchemeRow name="Last frame only" ex="ImageWAM（image edit）" on>
            <Slot kind="obs" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="goal" label="G" />
          </SchemeRow>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <Stat label="LIBERO-Plus（OOD）" a="83.1" b="51.5" note="ImageWAM (FLUX.2 4B) vs Fast-WAM" />
        <Stat label="Real-world 4 tasks" a="84.5" b="79.0" note="vs Fast-WAM" />
        <Stat label="Latency（Table 5 · A6000）" a="263ms" b="302" note="比 Fast-WAM（1 step）快 13%；IDM 為 1081 ms" />
        <Stat label="TFLOPs（Table 5）" a="9.72" b="13.21" note="比 Fast-WAM 少 26%；IDM 為 63.65" />
        <div style={{ fontSize: 21, color: muted, lineHeight: 1.5, marginTop: 6 }}>
          推論時不 decode 目標圖，只拿 image-editing denoising 的 KV cache 給 action expert。
        </div>
      </div>
    </div>
  </Shell>
);

/* ───────────────────────── Ch4 · ProWAM ───────────────────────── */

const FgpPilot: Page = () => (
  <Shell chapter="CH4 · PROWAM" affil={<AffProWam />} title="加上 final-goal 預測，兩種 WAM 都變好">
    <Fig src={prowamFgp} w={1500} h={459} source="ProWAM, Fig. 6 — Final-Goal Prediction (FGP)" />
    <div style={{ display: 'flex', gap: 28, marginTop: 34 }}>
      <div style={{ flex: 1 }}>
        <Callout title="Final goal 有效">Zero-imagination（Fast-WAM）加上 FGP，資料越少增益越大。</Callout>
      </div>
      <div style={{ flex: 1 }}>
        <Callout title="仍然不夠" tone="warm">Zero-imagination 整體仍最差；final goal 缺少「怎麼走過去」的過程。</Callout>
      </div>
    </div>
  </Shell>
);

const SpecNode = ({ title, sub, on }: { title: string; sub: string; on?: boolean }) => (
  <div
    style={{
      flex: 1,
      background: on ? 'var(--osd-accent)' : card,
      color: on ? '#FFFFFF' : 'var(--osd-text)',
      border: `2px solid ${on ? 'var(--osd-accent)' : line}`,
      borderRadius: 14,
      padding: '18px 22px',
      textAlign: 'center',
    }}
  >
    <div style={{ fontSize: 28, fontWeight: 800 }}>{title}</div>
    <div style={{ fontSize: 22, marginTop: 4, opacity: on ? 0.9 : 1, color: on ? '#FFFFFF' : muted }}>{sub}</div>
  </div>
);

const Arrow = () => <div style={{ fontSize: 34, color: muted, alignSelf: 'center' }}>→</div>;

const ProWamMethod: Page = () => (
  <Shell chapter="CH4 · PROWAM" affil={<AffProWam />} title="ProWAM：在 no future 與 final goal 之間取 sub-goals">
    <div style={{ display: 'flex', gap: 44, alignItems: 'flex-start' }}>
      <div style={{ width: 932 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SchemeHeader />
          <SchemeRow name="No future" ex="Fast-WAM">
            <Slot kind="obs" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
          </SchemeRow>
          <SchemeRow name="Last frame only" ex="ImageWAM">
            <Slot kind="obs" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="goal" label="G" />
          </SchemeRow>
          <SchemeRow name="Sub-goals" ex="ProWAM（r = 40%, 80%）" on>
            <Slot kind="obs" />
            <Slot kind="empty" />
            <Slot kind="empty" />
            <Slot kind="goal" label="G1" />
            <Slot kind="empty" />
            <Slot kind="goal" label="G2" />
            <Slot kind="empty" />
          </SchemeRow>
          <SchemeRow name="Full video" ex="Joint / IDM WAM">
            <Slot kind="obs" />
            <Slot kind="frame" label="f1" />
            <Slot kind="frame" label="f2" />
            <Slot kind="frame" label="f3" />
            <Slot kind="frame" label="f4" />
            <Slot kind="frame" label="f5" />
            <Slot kind="frame" label="f6" />
          </SchemeRow>
        </div>
        <div style={{ marginTop: 16 }}>
          <Fig src={prowamArch} w={772} h={290} source="ProWAM, Fig. 2 (2026-10-05)" />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, flex: 1, paddingTop: 10 }}>
        <Point k="①">Video-only 預訓練：從無 action label 的影片學 sub-goal</Point>
        <Point k="②">推論：video expert 一次 forward，cache sub-goal KV</Point>
        <Point k="③">Replan 時只需輕量 action denoising</Point>
        <Callout title="Sub-goal 的位置">
          G 以任務進度 r 索引（例如 40%、80%），比只給終點多了「怎麼走過去」的視覺錨點。
        </Callout>
      </div>
    </div>
  </Shell>
);

const ProWamResults: Page = () => (
  <Shell chapter="CH4 · PROWAM" affil={<AffProWam />} title="OOD 一路排下來：no future → final goal → sub-goals">
    <div style={{ display: 'flex', gap: 64 }}>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Table 1 · LIBERO-Plus（zero-shot）%</div>
        <HBar label="Fast-WAM" value={51.5} min={0} max={100} width={330} color={warm} text="51.5（ID 97.6）" labelWidth={210} />
        <HBar label="ImageWAM" value={83.1} min={0} max={100} width={330} color={grey} text="83.1（ID 98.4）" labelWidth={210} />
        <HBar label="ProWAM-Base" value={80.3} min={0} max={100} width={330} color={grey} text="80.3（ID 99.2）" labelWidth={210} />
        <HBar label="ProWAM" value={85.8} min={0} max={100} width={330} color="var(--osd-accent)" text="85.8（ID 98.8）" labelWidth={210} />
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Table 2 · RoboTwin Random（OOD）%</div>
        <HBar label="Fast-WAM" value={6.3} min={0} max={100} width={330} color={warm} text="6.3" labelWidth={210} />
        <HBar label="ImageWAM" value={37.6} min={0} max={100} width={330} color={grey} text="37.6" labelWidth={210} />
        <HBar label="ProWAM-Base" value={67.4} min={0} max={100} width={330} color={grey} text="67.4" labelWidth={210} />
        <HBar label="ProWAM" value={75.7} min={0} max={100} width={330} color="var(--osd-accent)" text="75.7" labelWidth={210} />
      </div>
    </div>
    <div style={{ display: 'flex', gap: 36, marginTop: 28, alignItems: 'flex-start' }}>
      <Fig src={prowamAblation} w={1200} h={368} source="ProWAM, Fig. 4 — cost / K / horizon" />
    </div>
  </Shell>
);

/* ───────────────────────── Paper intro pages ───────────────────────── */

/** Real first page of the paper (rendered from arXiv), shown as a card whose lower half fades out. */
const paperCardKeyframes = `
@keyframes wamPaperFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes wamPaperOpen {
  0% { transform: scale(1); }
  35% { transform: scale(0.955); }
  70% { transform: scale(1.045); }
  100% { transform: scale(1); }
}
@keyframes wamPaperRing { 0% { opacity: 0.9; transform: scale(1); } 100% { opacity: 0; transform: scale(1.08); } }
`;

/** Floating first-page card: parallax tilt on hover, click animates then opens the paper on alphaXiv in a new tab. */
const PaperCard = ({ src, href }: { src: string; href: string }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [opening, setOpening] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (opening) return;
    setOpening(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer');
      setOpening(false);
    }, 520);
  };

  const hoverTransform = hover
    ? `translate(${-tilt.x * 18}px, ${-tilt.y * 18}px) rotateX(${-tilt.y * 7}deg) rotateY(${tilt.x * 7}deg) scale(1.025)`
    : 'translate(0, 0) rotateX(0deg) rotateY(0deg) scale(1)';

  return (
    <div style={{ position: 'absolute', right: 120, top: 150, width: 800, perspective: 1400 }}>
      <style>{paperCardKeyframes}</style>
      <div style={{ animation: 'wamPaperFloat 6s ease-in-out infinite' }}>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
            setTilt({ x: 0, y: 0 });
          }}
          onMouseMove={onMove}
          onClick={onClick}
          data-osd-interactive=""
          role="link"
          aria-label="Open paper on alphaXiv"
          style={{
            position: 'relative',
            cursor: 'pointer',
            transform: hoverTransform,
            transformStyle: 'preserve-3d',
            transition: hover ? 'transform 120ms ease-out' : 'transform 500ms cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <div
            style={{
              background: card,
              borderRadius: 18,
              border: `1px solid ${hover ? 'var(--osd-accent)' : line}`,
              boxShadow: hover ? '0 44px 80px rgba(28, 34, 48, 0.22)' : '0 30px 60px rgba(28, 34, 48, 0.14)',
              overflow: 'hidden',
              transition: 'box-shadow 300ms ease, border-color 300ms ease',
              animation: opening ? 'wamPaperOpen 520ms cubic-bezier(.3,.7,.3,1)' : 'none',
              WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 45%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, #000 0%, #000 45%, transparent 100%)',
            }}
          >
            <img src={src} draggable={false} style={{ width: 800, display: 'block', userSelect: 'none' }} />
          </div>
          {opening ? (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 18,
                border: '4px solid var(--osd-accent)',
                animation: 'wamPaperRing 520ms ease-out forwards',
                pointerEvents: 'none',
              }}
            />
          ) : null}
          <div
            style={{
              position: 'absolute',
              top: -20,
              right: 24,
              background: 'var(--osd-accent)',
              color: '#FFFFFF',
              fontFamily: mono,
              fontSize: 18,
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: 999,
              boxShadow: '0 8px 20px rgba(43, 89, 195, 0.3)',
              opacity: hover || opening ? 1 : 0,
              transform: hover || opening ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 200ms ease, transform 200ms ease',
              pointerEvents: 'none',
            }}
          >
            {opening ? 'Opening alphaXiv…' : 'Open on alphaXiv ↗'}
          </div>
        </div>
      </div>
    </div>
  );
};

const PaperIntro = ({
  chapter,
  short,
  full,
  meta,
  affil,
  tldr,
  children,
}: {
  chapter: string;
  short: string;
  full: string;
  meta: string;
  affil: ReactNode;
  tldr: string;
  children: ReactNode;
}) => (
  <div style={{ ...fill, padding: '0 120px', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', left: 120, top: 150, width: 860 }}>
      <div style={{ fontFamily: mono, fontSize: 24, color: 'var(--osd-accent)', letterSpacing: '0.08em' }}>{chapter}</div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 96,
          fontWeight: 900,
          lineHeight: 1.1,
          marginTop: 22,
          color: 'var(--osd-accent)',
        }}
      >
        {short}
      </div>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 800, lineHeight: 1.3, marginTop: 20 }}>
        {full}
      </div>
      <div style={{ fontFamily: mono, fontSize: 24, color: muted, marginTop: 26 }}>{meta}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>{affil}</div>
      <div style={{ marginTop: 40 }}>
        <Callout title="TL;DR">{tldr}</Callout>
      </div>
    </div>
    {children}
    <AuthorBadge />
    <Footer />
  </div>
);

const FastWamIntro: Page = () => (
  <PaperIntro
    chapter="CH1 · PAPER 1"
    short="Fast-WAM"
    full="Do World Action Models Need Test-time Future Imagination?"
    meta="arXiv 2603.16666 · 2026.03"
    affil={<AffFastWam />}
    tldr="訓練時保留 video co-training，推論時跳過 future 生成；成功率不輸 imagine-then-execute，延遲 190 ms。"
  >
    <PaperCard src={fastwamCover} href="https://www.alphaxiv.org/abs/2603.16666" />
  </PaperIntro>
);

const OpenWamIntro: Page = () => (
  <PaperIntro
    chapter="CH1 · PAPER 2"
    short="OpenWAM"
    full="An Open Framework for Composable World-Action Models"
    meta="arXiv 2610.07922 · 2026.10"
    affil={<AffOpenWam />}
    tldr="同一個 Wan2.2 backbone 上統一比較 Joint、VTA、ATV、Decoupled 四種 video–action 互動方式。"
  >
    <PaperCard src={openwamCover} href="https://www.alphaxiv.org/abs/2610.07922" />
  </PaperIntro>
);

const HuaweiIntro: Page = () => (
  <PaperIntro
    chapter="CH2 · PAPER 3"
    short="Faster-WAM"
    full="Do World Action Models Need Deep Action Modules?"
    meta="arXiv 2608.02365v2 · 2026.08（v2 2026.10）"
    affil={<AffHuawei />}
    tldr="容量集中在 video world model；只用單層 action expert 把 video 表徵轉成動作，比 Fast-WAM 快約 3.7×。"
  >
    <PaperCard src={huaweiCover} href="https://www.alphaxiv.org/abs/2608.02365" />
  </PaperIntro>
);

const SantsIntro: Page = () => (
  <PaperIntro
    chapter="CH3 · PAPER 4"
    short="SANTS"
    full="A State-Adaptive Scheduler for World Action Models"
    meta="arXiv 2605.27947 · 2026.05"
    affil={<AffSants />}
    tldr="Video 不必 denoise 到底；依當下狀態決定停在 noise trajectory 的哪個點，再交給 action。"
  >
    <PaperCard src={santsCover} href="https://www.alphaxiv.org/abs/2605.27947" />
  </PaperIntro>
);

const SimpleWamIntro: Page = () => (
  <PaperIntro
    chapter="CH3 · PAPER 5"
    short="Simple-WAM"
    full="What Makes World Action Models Generalize? An Empirical Study of Test-Time Future Modeling"
    meta="arXiv 2609.34981 · 2026.09"
    affil={<AffSimpleWam />}
    tldr="拿掉推論時的 future 會傷泛化；但只要一次 forward 純噪聲 future token 就能拿回幾乎全部好處。"
  >
    <PaperCard src={simplewamCover} href="https://www.alphaxiv.org/abs/2609.34981" />
  </PaperIntro>
);

const HustIntro: Page = () => (
  <PaperIntro
    chapter="CH3 · PAPER 6"
    short="Faster-WAM"
    full="Efficient Inference-Time Future Conditioning for Robust World Action Models"
    meta="arXiv 2608.04404 · 2026.08"
    affil={<AffHust />}
    tldr="推論時保留 future noise slots，只 forward 一次；SparseMoT 稀疏互動，OOD 從 49.14% 升到 73.57%。"
  >
    <PaperCard src={hustCover} href="https://www.alphaxiv.org/abs/2608.04404" />
  </PaperIntro>
);

const ImageWamIntro: Page = () => (
  <PaperIntro
    chapter="CH4 · PAPER 7"
    short="ImageWAM"
    full="Do World Action Models Really Need Video Generation, or Just Image Editing?"
    meta="2026.06.19"
    affil={<AffImageWam />}
    tldr="用 image-editing 模型取代 video 生成：只想像「目標狀態」，以 edit 的 KV cache 條件化 action。"
  >
    <PaperCard src={imagewamCover} href="https://www.alphaxiv.org/abs/2606.19531" />
  </PaperIntro>
);

const ImageWamPipeline: Page = () => (
  <Shell chapter="CH4 · IMAGEWAM" affil={<AffImageWam />} title="Figure 2：ImageWAM pipeline">
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <Fig src={imagewamFig2} w={1100} h={436} source="ImageWAM, Fig. 2" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, flex: 1, paddingTop: 8 }}>
        <Point k="①">Image editing backbone 讀 o_t ＋ 指令，目標是終點影格 ô_t+H+1</Point>
        <Point k="②">只在某個 editing timestep 取各層 KV cache，推論時不 decode 圖</Point>
        <Point k="③">Action Expert 以 joint attention 讀 KV，加上 state 與 action noise 輸出 a_t:t+H</Point>
      </div>
    </div>
    <div style={{ marginTop: 32 }}>
      <Callout title="(o_t, l) → ô_edit ≡ ô_t+H+1 → a_t:t+H">
        LLM 與 VAE 凍結，只調 editing backbone 和 action expert；backbone 可換成 OmniGen2、Ovis-U1、FLUX.2。
      </Callout>
    </div>
  </Shell>
);

const ProWamIntro: Page = () => (
  <PaperIntro
    chapter="CH4 · PAPER 8"
    short="ProWAM"
    full="World Action Modeling with Progressive Visual Planning"
    meta="2026.10.05"
    affil={<AffProWam />}
    tldr="介於 final goal 與 full video 之間：預測一串稀疏的 sub-goals 當視覺錨點，video 只 forward 一次。"
  >
    <PaperCard src={prowamCover} href="https://www.alphaxiv.org/abs/2610.02508" />
  </PaperIntro>
);

const GeoBoNIntro: Page = () => (
  <PaperIntro
    chapter="CH5 · PAPER 9"
    short="Gated GeoBoN"
    full="Test-Time Scaling for World Action Models via Zero-Shot Geometric Verification"
    meta="arXiv 2607.17454 · 2026.07"
    affil={<AffGeoBoN />}
    tldr="Training-free 的 test-time scaling：先用 action–future 一致性決定要不要多抽，再用跨視角深度重投影挑最好的 rollout。"
  >
    <PaperCard src={geobonCover} href="https://www.alphaxiv.org/abs/2607.17454" />
  </PaperIntro>
);

const GeoBoNMethod: Page = () => (
  <Shell chapter="CH5 · GATED GEOBON" affil={<AffGeoBoN />} title="兩階段：先 gate，再用幾何挑 rollout">
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Fig src={geobonFig1} w={1280} h={431} source="Gated GeoBoN, Fig. 1 (arXiv 2607.17454)" />
    </div>
    <div style={{ display: 'flex', gap: 28, marginTop: 26 }}>
      <KeyCard k="STAGE 1" title="Action–future gate" body="optical flow（現在畫面 → 預測 future 影格）vs 投影的末端位移；cos < τ 才多抽" />
      <KeyCard k="STAGE 2" title="GeoBoN（Best-of-N）" body="N 個 rollout 的 primary / wrist 預測影格丟進 VGGT，選深度重投影誤差最小者" />
    </div>
  </Shell>
);

const GainRow = ({ k, wam, a, b, d }: { k: string; wam: string; a: string; b: string; d: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '210px 210px 1fr 110px', alignItems: 'baseline', padding: '11px 0', borderBottom: `1px solid ${line}`, fontSize: 25 }}>
    <div style={{ fontWeight: 800 }}>{k}</div>
    <div style={{ color: muted, fontSize: 22 }}>{wam}</div>
    <div style={{ fontFamily: mono }}>
      {a} → <b style={{ color: 'var(--osd-accent)' }}>{b}</b>
    </div>
    <div style={{ fontFamily: mono, fontWeight: 800, color: 'var(--osd-accent)', textAlign: 'right' }}>{d}</div>
  </div>
);

const GeoBoNResults: Page = () => (
  <Shell chapter="CH5 · GATED GEOBON" affil={<AffGeoBoN />} title="增益 +1～2 pp，但前提是 future 要畫清楚">
    <div style={{ display: 'flex', gap: 56 }}>
      <div style={{ width: 1010 }}>
        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Table 1 · GeoBoN N=8 vs 單一 rollout（SR %）</div>
        <GainRow k="RoboCasa" wam="Cosmos Policy" a="66.3" b="68.4" d="+2.1" />
        <GainRow k="RoboCasa" wam="X-WAM" a="80.8" b="82.5" d="+1.7" />
        <GainRow k="LIBERO-Long" wam="Cosmos Policy" a="97.5" b="99.3" d="+1.8" />
        <GainRow k="LIBERO-Long" wam="LingBot-VA" a="97.2" b="98.3" d="+1.1" />
        <GainRow k="RoboTwin 2.0" wam="Motus" a="87.8" b="89.9" d="+2.1" />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Stat label="Gate 觸發率（平均）" a="26.2%" b="100%" note="只有約 1/4 的決策點多抽" />
        <Stat label="保留 always-on 增益" a="74.8%" b="100%" note="Gated vs 每步都做 GeoBoN" />
      </div>
    </div>
    <div style={{ marginTop: 28 }}>
      <Callout title="缺點：需要 clear denoise（future 必須完整生成並 decode）" tone="warm">
        <span>
          ① Gate 的 optical flow 與 VGGT 深度重投影都在像素空間，必須 full denoise 出清楚的 primary / wrist 影格。
          <br />② 每個候選都要跑完整 video denoise，N=8 成本高；和 Fast-WAM、Simple-WAM、ImageWAM 這類不 decode future 的方法不相容。
          <br />③ 需要多視角相機；N=16 時常飽和甚至下降。
        </span>
      </Callout>
    </div>
  </Shell>
);

/* ───────────────────────── Summary ───────────────────────── */

const SumRow = ({ level, what, papers, ood }: { level: string; what: string; papers: string; ood: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '60px 440px 640px 1fr',
      gap: 24,
      alignItems: 'center',
      padding: '16px 0',
      borderBottom: `1px solid ${line}`,
      fontSize: 27,
    }}
  >
    <div style={{ fontFamily: mono, fontWeight: 800, color: 'var(--osd-accent)' }}>{level}</div>
    <div style={{ fontWeight: 800 }}>{what}</div>
    <div>{papers}</div>
    <div style={{ color: muted, fontSize: 24 }}>{ood}</div>
  </div>
);

const Summary: Page = () => (
  <Shell chapter="SUMMARY" title="推論時給 action「多少 future」？">
    <SumRow level="0" what="不給 future" papers="Fast-WAM · OpenWAM-Dec. · Huawei Faster" ood="ID 強；OOD 51.5 / 6.3" />
    <SumRow level="½" what="純噪聲 future，一次 forward" papers="Simple-WAM · Faster-WAM (HUST)" ood="OOD 大幅回升" />
    <SumRow level="~" what="依狀態停在中間 noise" papers="SANTS" ood="RoboTwin 94.4%" />
    <SumRow level="1" what="Final goal（image edit）" papers="ImageWAM" ood="LIBERO-Plus 83.1" />
    <SumRow level="K" what="Progressive sub-goals" papers="ProWAM" ood="LIBERO-Plus 85.8 · Random 75.7" />
    <SumRow level="∞" what="Full future video" papers="IDM / VTA / Joint" ood="準，但慢 3–15×" />
    <SumRow level="∞×N" what="Full video × N ＋ 幾何驗證" papers="Gated GeoBoN" ood="+1～2 pp，需 clear future" />
    <div style={{ display: 'flex', gap: 28, marginTop: 34 }}>
      <div style={{ flex: 1 }}>
        <Callout title="Takeaway">In-distribution 看不出差異；future 的價值在 OOD 泛化。關鍵是「準備 future」，不是把它畫清楚。</Callout>
      </div>
    </div>
  </Shell>
);

const ToRead = ({ title, tag, orgs, tldr }: { title: string; tag: string; orgs: string; tldr: string }) => (
  <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start', padding: '8px 0', borderBottom: `1px solid ${line}` }}>
    <div style={{ width: 24, height: 24, border: `2.5px solid ${muted}`, borderRadius: 6, marginTop: 3, flexShrink: 0 }} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 23, fontWeight: 800, whiteSpace: 'nowrap', lineHeight: 1.3 }}>{title}</div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', marginTop: 2, fontSize: 19, whiteSpace: 'nowrap', lineHeight: 1.4 }}>
        <span style={{ background: accentSoft, color: 'var(--osd-accent)', fontWeight: 700, borderRadius: 6, padding: '1px 10px' }}>{tag}</span>
        <span style={{ color: muted, fontFamily: mono, fontSize: 18 }}>{orgs}</span>
        <span>{tldr}</span>
      </div>
    </div>
  </div>
);

const ReadingList: Page = () => (
  <Shell chapter="NEXT · READING LIST" title="待讀清單（Heptabase · World Action Model）">
    <div style={{ marginTop: -18 }}>
      <ToRead title="Flash-WAM: Modality-Aware Distillation for World Action Models" tag="加速 · 蒸餾" orgs="Northeastern · UGA · EmbodyX" tldr="video / action 分開做 consistency distillation，各 1 步；LingBot-VA 快 23×" />
      <ToRead title="1Step-WAM: Your World Action Model but Faster using 1-Step Action Generation" tag="加速" orgs="Fudan · USTC · PKU · SII" tldr="action 軌跡近直線，校正第一步速度即可 1 步出 action；Fast-WAM 快 7.44×" />
      <ToRead title="DIDO: Distilling Interaction-Centric Dynamics into One-Step Denoising for WAMs" tag="加速 · 蒸餾" orgs="CASIA · BAAI · XJTU" tldr="把多步 video 的夾爪–物件互動動態蒸餾進 1 步；LIBERO-Plus 76.6%" />
      <ToRead title="Efficient-WAM: A 1B-Parameter World-Action Model with Low-Cost Future Imagination" tag="加速" orgs="HKU · PKU · CASIA" tldr="1B 小 video expert＋粗糙 future 當引導；實機 98 ms / chunk" />
      <ToRead title="Complementary Future Token Pruning for World Action Models (CF-Prune)" tag="加速" orgs="SNU · KAIST" tldr="training-free 剪掉 future tokens，1.2–1.3× 加速且成功率持平" />
      <ToRead title="GlanceWAM: Sparse Test-Time Imagination for World-Action Models" tag="Future 介面" orgs="Virginia Tech · Purdue" tldr="慢時鐘非同步想像一張 lookahead frame，控制迴圈只需 48 ms" />
      <ToRead title="Foresight Without Seeing: Latent Futures for World Action Models (ForeWAM)" tag="Future 介面" orgs="SJTU · SII" tldr="Future-KV：一次 prefill noise future slots＋單層 decoder；LIBERO-Plus 77.6%" />
      <ToRead title="Long-WAM: Scaling the Context of World-Action Models" tag="Context" orgs="NVIDIA · MIT · HKU" tldr="AR 預訓練下拉長歷史 context；RoboCasa GR-1 63.3% → 78.7%" />
      <ToRead title="Foveated Diffusion: Efficient Spatially Adaptive Image and Video Generation" tag="相關技術" orgs="Stanford" tldr="依注視點分配 token 密度，加速 image / video 生成" />
    </div>
  </Shell>
);

export const meta: SlideMeta = {
  title: 'World Action Model：推論時還需要想像未來嗎？',
  createdAt: '2026-10-29T01:54:37.818Z',
};

export default [
  Cover,
  Agenda,
  FastWamIntro,
  Paradigms,
  FastWamControlled,
  FastWamReal,
  OpenWamIntro,
  OpenWam,
  Ch1Synthesis,
  HuaweiIntro,
  HuaweiMethod,
  HuaweiResults,
  SantsIntro,
  SantsMethod,
  SantsDepthScan,
  SantsResults,
  SimpleWamIntro,
  SimpleWamFindings,
  SimpleWamMethod,
  SimpleWamData,
  HustIntro,
  HustMethod,
  FasterVsFaster,
  ImageWamIntro,
  ImageWam,
  ImageWamPipeline,
  ProWamIntro,
  ProWamMethod,
  ProWamResults,
  FgpPilot,
  GeoBoNIntro,
  GeoBoNMethod,
  GeoBoNResults,
  Summary,
  ReadingList,
] satisfies Page[];
