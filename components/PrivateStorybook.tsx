"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type StorybookWish = {
  id: string;
  name: string;
  wish: string;
  attendance: "yes" | "maybe" | "no";
  createdAt: string;
};

type StorybookPage =
  | { kind: "cover"; id: "cover" }
  | { kind: "empty"; id: "empty" }
  | ({ kind: "wish" } & StorybookWish);

const cairoFormatter = new Intl.DateTimeFormat("en-EG", {
  timeZone: "Africa/Cairo",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const attendanceCopy: Record<StorybookWish["attendance"], string> = {
  yes: "Joyfully attending",
  maybe: "Hoping to attend",
  no: "Celebrating from afar",
};

function formatCairoTime(timestamp: string) {
  const date = new Date(timestamp);
  return Number.isNaN(date.getTime()) ? "A treasured note" : `${cairoFormatter.format(date)} Cairo`;
}

function CoverPage() {
  return (
    <article className="storybook-page storybook-cover" aria-label="Our Book of Wishes cover">
      <div className="storybook-page-frame" aria-hidden="true" />
      <span className="storybook-cover-kicker">With love, from our guests</span>
      <div className="storybook-cover-ornament" aria-hidden="true"><i /><span>Y</span><b /></div>
      <h1>Our Book<br />of Wishes</h1>
      <p>Yousra <span>&amp;</span> Abdullah</p>
      <small>A keepsake of kind words</small>
    </article>
  );
}

function EmptyPage() {
  return (
    <article className="storybook-page storybook-empty">
      <div className="storybook-page-frame" aria-hidden="true" />
      <span className="storybook-folio">01</span>
      <div className="storybook-sprig" aria-hidden="true"><i /><i /><i /></div>
      <p className="storybook-overline">The first page awaits</p>
      <h2>Kind words will live here</h2>
      <p className="storybook-empty-copy">
        When our guests leave their wishes, every note will become part of this little book.
      </p>
    </article>
  );
}

function WishPage({ page, pageNumber }: { page: Extract<StorybookPage, { kind: "wish" }>; pageNumber: number }) {
  return (
    <article className="storybook-page storybook-wish-page">
      <div className="storybook-page-frame" aria-hidden="true" />
      <span className="storybook-folio">{String(pageNumber).padStart(2, "0")}</span>
      <p className="storybook-overline">A wish from</p>
      <h2>{page.name}</h2>
      <div className="storybook-rule" aria-hidden="true"><span>✦</span></div>
      <blockquote>{page.wish}</blockquote>
      <footer>
        <span className={`storybook-attendance storybook-attendance--${page.attendance}`}>
          {attendanceCopy[page.attendance]}
        </span>
        <time dateTime={page.createdAt}>{formatCairoTime(page.createdAt)}</time>
      </footer>
    </article>
  );
}

function Page({ page, pageNumber }: { page: StorybookPage; pageNumber: number }) {
  if (page.kind === "cover") return <CoverPage />;
  if (page.kind === "empty") return <EmptyPage />;
  return <WishPage page={page} pageNumber={pageNumber} />;
}

export function PrivateStorybook({ wishes }: { wishes: StorybookWish[] }) {
  const pages = useMemo<StorybookPage[]>(
    () => [{ kind: "cover", id: "cover" }, ...(wishes.length ? wishes.map((wish) => ({ ...wish, kind: "wish" as const })) : [{ kind: "empty" as const, id: "empty" as const }])],
    [wishes],
  );
  const spreads = useMemo(() => {
    const result: StorybookPage[][] = [[pages[0]]];
    for (let index = 1; index < pages.length; index += 2) result.push(pages.slice(index, index + 2));
    return result;
  }, [pages]);
  const [mobileViewport, setMobileViewport] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px), (max-width: 1024px) and (orientation: portrait)");
    const update = () => setMobileViewport(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <main className="storybook-shell">
      <div className="storybook-ambient storybook-ambient--one" aria-hidden="true" />
      <div className="storybook-ambient storybook-ambient--two" aria-hidden="true" />

      <section className="storybook-desktop" aria-label="Private book of wedding wishes">
        <p className="storybook-eyebrow">Private keepsake · {wishes.length} {wishes.length === 1 ? "wish" : "wishes"}</p>
        <LeafingBook collections={spreads} mode="spread" keyboardActive={!mobileViewport} />
        <p className="storybook-key-hint">Use the arrow keys to turn the pages</p>
      </section>

      <section className="storybook-mobile" aria-label="Private book of wedding wishes">
        <p className="storybook-eyebrow">Private keepsake · {wishes.length} {wishes.length === 1 ? "wish" : "wishes"}</p>
        <LeafingBook collections={pages.map((page) => [page])} mode="page" keyboardActive={mobileViewport} />
      </section>
    </main>
  );
}

type TurnDirection = "forward" | "backward";

function LeafingBook({
  collections,
  mode,
  keyboardActive,
}: {
  collections: StorybookPage[][];
  mode: "spread" | "page";
  keyboardActive: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [turn, setTurn] = useState<{ from: number; to: number; direction: TurnDirection } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const turningRef = useRef(false);
  const pointerRef = useRef<{ id: number; startX: number; startY: number; startedAt: number; eligible: boolean } | null>(null);
  const [showGestureHint, setShowGestureHint] = useState(mode === "page");
  const isTurning = turn !== null;
  const displayIndex = turn?.to ?? currentIndex;

  const navigate = useCallback((direction: TurnDirection) => {
    if (turningRef.current) return false;
    const delta = direction === "forward" ? 1 : -1;
    const target = currentIndex + delta;
    if (target < 0 || target >= collections.length) return false;

    setShowGestureHint(false);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCurrentIndex(target);
      return true;
    }

    turningRef.current = true;
    setTurn({ from: currentIndex, to: target, direction });
    timerRef.current = setTimeout(() => {
      setCurrentIndex(target);
      setTurn(null);
      turningRef.current = false;
      timerRef.current = null;
    }, 680);
    return true;
  }, [collections.length, currentIndex]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    turningRef.current = false;
  }, []);

  useEffect(() => {
    if (!keyboardActive) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [contenteditable='true'], [data-storybook-gesture-surface]"))) return;
      if (event.key === "ArrowLeft") navigate("backward");
      if (event.key === "ArrowRight") navigate("forward");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [keyboardActive, navigate]);

  const onPaperKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      navigate(event.key === "ArrowLeft" ? "backward" : "forward");
    }
  };

  const onPaperPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== "page" || isTurning || !event.isPrimary) return;
    const target = event.target as HTMLElement;
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startedAt: performance.now(),
      eligible: !target.closest("blockquote, a, button, input, textarea, select, [contenteditable='true']"),
    };
  };

  const clearPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerRef.current?.id === event.pointerId) pointerRef.current = null;
  };

  const onPaperPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current;
    pointerRef.current = null;
    if (mode !== "page" || !pointer || pointer.id !== event.pointerId || !pointer.eligible || isTurning) return;
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (Math.abs(dx) >= 46 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      navigate(dx < 0 ? "forward" : "backward");
      return;
    }
    const isTap = Math.abs(dx) <= 10 && Math.abs(dy) <= 10 && performance.now() - pointer.startedAt <= 550;
    if (!isTap || window.getSelection()?.toString()) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width;
    if (position <= 0.3) navigate("backward");
    if (position >= 0.7) navigate("forward");
  };

  const renderCollection = (collectionIndex: number, layer: "base" | "turning") => {
    const collection = collections[collectionIndex];
    const isSingle = mode === "page" || (collectionIndex === 0 && collection.length === 1);
    const visibleStart = mode === "page" ? collectionIndex : collectionIndex === 0 ? 0 : (collectionIndex - 1) * 2 + 1;
    return (
      <div
        className={`storybook-book ${isSingle ? "storybook-book--single" : ""} storybook-book--${mode} storybook-book-layer storybook-book-layer--${layer}`}
        aria-hidden={layer === "turning" ? true : undefined}
      >
        <div className="storybook-ribbon" aria-hidden="true" />
        {collection.map((page, index) => <Page key={page.id} page={page} pageNumber={visibleStart + index} />)}
        {collection.length === 1 && mode === "spread" && collectionIndex > 0 ? <div className="storybook-blank-page" aria-hidden="true" /> : null}
      </div>
    );
  };

  return (
    <>
      {mode === "page" && showGestureHint ? <p className="storybook-gesture-hint" id="storybook-gesture-hint">Swipe or tap the page to leaf through</p> : null}
      <div
        className={`storybook-book-stage ${mode === "page" ? "storybook-book-stage--gesture" : ""} ${turn ? `storybook-book-stage--${turn.direction}` : ""}`}
        aria-busy={isTurning}
        aria-label={mode === "page" ? "Interactive book page. Swipe left or tap the right edge for the next page; swipe right or tap the left edge for the previous page." : undefined}
        aria-describedby={mode === "page" && showGestureHint ? "storybook-gesture-hint" : undefined}
        data-storybook-gesture-surface={mode === "page" ? "true" : undefined}
        onKeyDown={mode === "page" ? onPaperKeyDown : undefined}
        onPointerCancel={mode === "page" ? clearPointer : undefined}
        onPointerDown={mode === "page" ? onPaperPointerDown : undefined}
        onPointerUp={mode === "page" ? onPaperPointerUp : undefined}
        tabIndex={mode === "page" ? 0 : undefined}
      >
        {renderCollection(displayIndex, "base")}
        {turn ? renderCollection(turn.from, "turning") : null}
        <span className={`storybook-leafing-label ${isTurning ? "is-visible" : ""}`} aria-hidden="true">Leafing through</span>
      </div>
      <nav className="storybook-controls" aria-label="Storybook pages">
        <button type="button" onClick={() => navigate("backward")} disabled={displayIndex === 0 || isTurning} aria-label={mode === "spread" ? "Previous pages" : "Previous page"}>
          <span aria-hidden="true">←</span> Previous
        </button>
        <p aria-live="polite" aria-atomic="true">
          <span>{isTurning ? "Leafing through" : displayIndex === 0 ? "Cover" : mode === "spread" ? `Spread ${displayIndex}` : `Page ${displayIndex}`}</span>
          <small>{displayIndex + 1} of {collections.length}</small>
        </p>
        <button type="button" onClick={() => navigate("forward")} disabled={displayIndex === collections.length - 1 || isTurning} aria-label={mode === "spread" ? "Next pages" : "Next page"}>
          Next <span aria-hidden="true">→</span>
        </button>
      </nav>
    </>
  );
}
