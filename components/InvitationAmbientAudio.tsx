"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Place your track at: `public/sound.mp3` (served as `/sound.mp3`) */
const AMBIENT_SRC = "/sound.mp3";

/** Fade-in length (ms) — tweak for softer / faster build */
const FADE_MS = 1800;

/** Peak volume after fade (0–1) */
const TARGET_VOLUME = 0.88;

type InvitationAmbientAudioContextValue = {
  /** Call once from the opening CTA — same user gesture as balloon reveal */
  startAfterOpeningClick: () => void;
  userMuted: boolean;
  toggleMute: () => void;
  hasStarted: boolean;
};

const InvitationAmbientAudioContext =
  createContext<InvitationAmbientAudioContextValue | null>(null);

export function useInvitationAmbientAudio(): InvitationAmbientAudioContextValue {
  const ctx = useContext(InvitationAmbientAudioContext);
  if (!ctx) {
    throw new Error(
      "useInvitationAmbientAudio must be used within InvitationAmbientAudioProvider",
    );
  }
  return ctx;
}

export function InvitationAmbientAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRaf = useRef<number | null>(null);
  const startedRef = useRef(false);
  const userMutedRef = useRef(false);
  const [userMuted, setUserMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    userMutedRef.current = userMuted;
    const el = audioRef.current;
    if (el) el.muted = userMuted;
  }, [userMuted]);

  useEffect(() => {
    return () => {
      if (fadeRaf.current !== null) cancelAnimationFrame(fadeRaf.current);
    };
  }, []);

  const startAfterOpeningClick = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setHasStarted(true);

    const el = audioRef.current;
    if (!el) return;

    el.volume = 0;
    el.muted = userMutedRef.current;

    const playResult = el.play();
    if (playResult !== undefined) {
      playResult.catch(() => {
        /* missing file, autoplay policy edge case, etc. */
      });
    }

    /** First rAF `now` can be < a prior `performance.now()` — anchor fade to first frame to avoid negative volume */
    let fadeT0 = 0;
    const step = (now: number) => {
      const a = audioRef.current;
      if (!a) return;
      if (fadeT0 === 0) fadeT0 = now;
      const u = Math.max(0, Math.min(1, (now - fadeT0) / FADE_MS));
      a.volume = Math.max(0, Math.min(1, TARGET_VOLUME * u));
      if (u < 1) {
        fadeRaf.current = requestAnimationFrame(step);
      } else {
        fadeRaf.current = null;
        a.volume = Math.max(0, Math.min(1, TARGET_VOLUME));
      }
    };
    fadeRaf.current = requestAnimationFrame(step);
  }, []);

  const toggleMute = useCallback(() => {
    setUserMuted((m) => !m);
  }, []);

  const value: InvitationAmbientAudioContextValue = {
    startAfterOpeningClick,
    userMuted,
    toggleMute,
    hasStarted,
  };

  return (
    <InvitationAmbientAudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={AMBIENT_SRC}
        preload="metadata"
        playsInline
        // ~21s track: no loop; ends naturally when the file finishes
        aria-hidden
      />
      {children}
      {hasStarted ? (
        <button
          type="button"
          onClick={toggleMute}
          className="fixed right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-[90] flex size-11 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--color-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--color-paper)_92%,transparent)] text-lg shadow-soft backdrop-blur-sm transition-[transform,box-shadow] hover:shadow-soft-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] active:scale-[0.97] sm:right-5 sm:top-[max(1rem,env(safe-area-inset-top))]"
          aria-label={userMuted ? "Unmute ambient audio" : "Mute ambient audio"}
          aria-pressed={userMuted}
        >
          <span className="select-none" aria-hidden>
            {userMuted ? "🔇" : "🔊"}
          </span>
        </button>
      ) : null}
    </InvitationAmbientAudioContext.Provider>
  );
}
