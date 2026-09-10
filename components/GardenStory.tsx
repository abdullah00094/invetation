"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

export function GardenStory() {
  const chapterRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let frame = 0;
    const mobileQuery = window.matchMedia("(max-width: 520px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateViewport = () => setIsMobile(mobileQuery.matches);
    const updateMotion = () => setReduceMotion(motionQuery.matches);
    const update = () => {
      frame = 0;
      const chapter = chapterRef.current;
      if (!chapter) return;
      const rect = chapter.getBoundingClientRect();
      const travel = Math.max(1, chapter.offsetHeight - window.innerHeight);
      setProgress(clamp(-rect.top / travel));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    updateViewport();
    updateMotion();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobileQuery.addEventListener("change", updateViewport);
    motionQuery.addEventListener("change", updateMotion);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobileQuery.removeEventListener("change", updateViewport);
      motionQuery.removeEventListener("change", updateMotion);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const firstChapter = clamp(progress / (isMobile ? 0.68 : 0.64));
  const joinedChapter = smooth(
    (progress - (isMobile ? 0.76 : 0.7)) / (isMobile ? 0.18 : 0.2),
  );
  const abdullahJourney = smooth(
    firstChapter < 0.36
      ? firstChapter * 1.25
      : firstChapter < 0.52
        ? 0.45
        : 0.45 + (firstChapter - 0.52) * 1.15,
  );
  const yousraJourney = smooth(
    firstChapter < 0.16
      ? 0
      : firstChapter < 0.62
        ? (firstChapter - 0.16) * 1.35
        : 0.62 + (firstChapter - 0.62),
  );

  const captionOpacity = clamp(1 - joinedChapter * 2.6);
  const chapterTitleOpacity = clamp(1 - joinedChapter * 2.4);
  const abdullahLeft = isMobile
    ? 20 + abdullahJourney * 18 - joinedChapter * 4
    : 17 + abdullahJourney * 23 + joinedChapter * 2;
  const yousraLeft = isMobile
    ? 80 - yousraJourney * 18 + joinedChapter * 4
    : 83 - yousraJourney * 23 - joinedChapter * 2;
  const abdullahTop = isMobile
    ? 72 - abdullahJourney * 41 + joinedChapter * 29
    : 69 - abdullahJourney * 42 + joinedChapter * 34;
  const yousraTop = isMobile
    ? 66 - yousraJourney * 35 + joinedChapter * 29
    : 69 - yousraJourney * 42 + joinedChapter * 34;

  const rootStyle = {
    "--left-dash": 1 - firstChapter,
    "--right-dash": 1 - clamp(firstChapter * 0.94),
    "--shared-dash": 1 - joinedChapter,
    "--blue-field-shift": `${abdullahJourney * -5}%`,
    "--rose-field-shift": `${yousraJourney * -4}%`,
    "--blue-botanical-shift": `${abdullahJourney * -16}px`,
    "--rose-botanical-shift": `${yousraJourney * 18}px`,
    "--chapter-title-opacity": chapterTitleOpacity,
    "--caption-opacity": captionOpacity,
    "--abdullah-left": `${abdullahLeft}%`,
    "--abdullah-top": `${abdullahTop}%`,
    "--abdullah-rotation": `${-4 + abdullahJourney * 5 - joinedChapter}deg`,
    "--yousra-left": `${yousraLeft}%`,
    "--yousra-top": `${yousraTop}%`,
    "--yousra-rotation": `${4 - yousraJourney * 5 + joinedChapter}deg`,
    "--finale-shift": `${(1 - joinedChapter) * 22}px`,
  } as React.CSSProperties;

  const beat = (at: number, span = 0.13) =>
    clamp(1 - Math.abs(progress - at) / span);
  const finaleOpacity = smooth((progress - (isMobile ? 0.91 : 0.84)) / 0.08);

  if (reduceMotion) {
    return (
      <section className="tp-chapter tp-chapter--reduced" aria-label="Two paths, one story">
        <div className="tp-sticky tp-sticky--reduced">
          <div className="tp-paper" aria-hidden />
          <div className="tp-blue-field" aria-hidden />
          <div className="tp-rose-field" aria-hidden />
          <div className="tp-botanical tp-blue-botanical" aria-hidden><i /><i /><i /><b /><b /></div>
          <div className="tp-botanical tp-rose-botanical" aria-hidden><i /><i /><i /><b /><b /><b /></div>
          <div className="tp-title"><p>Yousra &amp; Abdullah</p><span>Scroll gently</span></div>
          <div className="tp-portrait-stage tp-portrait-stage--reduced">
            <figure className="tp-portrait tp-abdullah">
              <div className="tp-photo-mat"><Image src="/concepts/little-abdullah.png" alt="Abdullah as a child" fill sizes="(max-width: 520px) 36vw, 190px" priority className="tp-photo" /></div>
              <figcaption>Abdullah</figcaption>
            </figure>
            <figure className="tp-portrait tp-yousra">
              <div className="tp-photo-mat"><Image src="/concepts/little-yousra.png" alt="Yousra as a child" fill sizes="(max-width: 520px) 36vw, 190px" priority className="tp-photo" /></div>
              <figcaption>Yousra</figcaption>
            </figure>
          </div>
          <div className="tp-milestones tp-milestones--reduced">
            <p className="tp-beat">Two beginnings</p>
            <p className="tp-beat tp-beat--middle">Two paths</p>
            <p className="tp-beat tp-beat--promise">One promise</p>
          </div>
          <div className="tp-final tp-final--reduced">
            <p>Two stories</p>
            <h2>One beginning</h2>
            <span className="tp-shared-caption">Yousra &amp; Abdullah</span>
          </div>
        </div>
        <div className="tp-line-frame" aria-hidden />
        <div className="tp-bottom-fade" aria-hidden />
      </section>
    );
  }

  return (
    <section ref={chapterRef} className="tp-chapter" style={rootStyle} aria-label="Two paths, one story">
      <div className="tp-sticky">
        <div className="tp-paper" aria-hidden />
        <div className="tp-blue-field" aria-hidden />
        <div className="tp-rose-field" aria-hidden />
        <div className="tp-botanical tp-blue-botanical" aria-hidden><i /><i /><i /><b /><b /></div>
        <div className="tp-botanical tp-rose-botanical" aria-hidden><i /><i /><i /><b /><b /><b /></div>

        <div className="tp-title">
          <p>Yousra &amp; Abdullah</p>
          <span>Scroll gently</span>
        </div>

        <svg className="tp-paths" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden>
          <path className="tp-left-path" pathLength="1" d="M110 875 C100 720 350 680 300 610 C335 555 420 530 500 520" />
          <path className="tp-right-path" pathLength="1" d="M890 875 C910 700 655 665 700 610 C665 555 580 530 500 520" />
          <path className="tp-shared-path" pathLength="1" d="M500 520 C500 440 500 350 500 270" />
        </svg>

        <div className="tp-portrait-stage">
          <figure className="tp-portrait tp-abdullah">
            <div className="tp-photo-mat"><Image src="/concepts/little-abdullah.png" alt="Abdullah as a child" fill sizes="(max-width: 520px) 36vw, 190px" priority className="tp-photo" /></div>
            <figcaption>Abdullah</figcaption>
          </figure>
          <figure className="tp-portrait tp-yousra">
            <div className="tp-photo-mat"><Image src="/concepts/little-yousra.png" alt="Yousra as a child" fill sizes="(max-width: 520px) 36vw, 190px" priority className="tp-photo" /></div>
            <figcaption>Yousra</figcaption>
          </figure>
        </div>

        <div className="tp-milestones">
          <p className="tp-beat" style={{ opacity: beat(0.13, 0.09) }}>Two beginnings</p>
          <p className="tp-beat tp-beat--middle" style={{ opacity: beat(0.38, 0.09) }}>Two paths</p>
          <p className="tp-beat tp-beat--promise" style={{ opacity: beat(0.62, 0.075) }}>One promise</p>
        </div>

        <div className="tp-final" style={{ opacity: finaleOpacity }} aria-hidden={finaleOpacity < 0.1}>
          <p>Two stories</p>
          <h2>One beginning</h2>
          <span className="tp-shared-caption">Yousra &amp; Abdullah</span>
        </div>

        <div className="tp-progress" aria-hidden><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
      <div className="tp-line-frame" aria-hidden />
      <div className="tp-bottom-fade" aria-hidden />
    </section>
  );
}
