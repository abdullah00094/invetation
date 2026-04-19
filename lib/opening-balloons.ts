/**
 * Floating forms — matte, muted, slow drift (editorial / cinematic, not toy-like).
 * ↑ `floatSec` = slower float · ↓ `drift` / `rotate` = calmer motion
 */
export type BalloonSpec = {
  left: string;
  top: string;
  w: number;
  h: number;
  tone: "rose" | "gold" | "cream";
  floatSec: number;
  drift: number;
  rotate: number;
  delay: number;
  exitX: string;
  exitY: string;
  exitRotate: number;
  z: number;
  opacity: number;
};

export const OPENING_BALLOONS: BalloonSpec[] = [
  { left: "8%", top: "18%", w: 52, h: 72, tone: "rose", floatSec: 11, drift: 7, rotate: 2.2, delay: 0, exitX: "-42vw", exitY: "-32vh", exitRotate: -11, z: 1, opacity: 0.52 },
  { left: "88%", top: "22%", w: 44, h: 62, tone: "gold", floatSec: 13, drift: 5.5, rotate: -2.8, delay: 0.2, exitX: "44vw", exitY: "-26vh", exitRotate: 9, z: 2, opacity: 0.48 },
  { left: "14%", top: "62%", w: 48, h: 68, tone: "cream", floatSec: 12.5, drift: 8, rotate: -1.8, delay: 0.1, exitX: "-38vw", exitY: "28vh", exitRotate: -7, z: 1, opacity: 0.44 },
  { left: "82%", top: "58%", w: 56, h: 78, tone: "rose", floatSec: 10.5, drift: 6.5, rotate: 3, delay: 0.24, exitX: "40vw", exitY: "34vh", exitRotate: 11, z: 3, opacity: 0.5 },
  { left: "22%", top: "38%", w: 36, h: 50, tone: "gold", floatSec: 11.8, drift: 4.5, rotate: -2.2, delay: 0.06, exitX: "-32vw", exitY: "-16vh", exitRotate: -14, z: 0, opacity: 0.4 },
  { left: "72%", top: "40%", w: 40, h: 54, tone: "cream", floatSec: 12.2, drift: 5.2, rotate: 1.6, delay: 0.14, exitX: "34vw", exitY: "-20vh", exitRotate: 10, z: 1, opacity: 0.42 },
  { left: "5%", top: "42%", w: 34, h: 46, tone: "rose", floatSec: 14, drift: 3.8, rotate: -1.2, delay: 0.22, exitX: "-34vw", exitY: "6vh", exitRotate: -5, z: 0, opacity: 0.36 },
  { left: "92%", top: "48%", w: 38, h: 52, tone: "gold", floatSec: 11, drift: 7, rotate: 2.4, delay: 0.04, exitX: "40vw", exitY: "10vh", exitRotate: 6, z: 1, opacity: 0.38 },
  { left: "30%", top: "12%", w: 42, h: 58, tone: "cream", floatSec: 13.5, drift: 5.5, rotate: -3, delay: 0.28, exitX: "-20vw", exitY: "-38vh", exitRotate: -6, z: 2, opacity: 0.42 },
  { left: "68%", top: "14%", w: 46, h: 64, tone: "rose", floatSec: 10.8, drift: 6.2, rotate: 2.2, delay: 0.12, exitX: "26vw", exitY: "-36vh", exitRotate: 7, z: 2, opacity: 0.46 },
  { left: "48%", top: "8%", w: 32, h: 44, tone: "gold", floatSec: 13.8, drift: 3.6, rotate: -1.6, delay: 0.22, exitX: "-6vw", exitY: "-44vh", exitRotate: -4, z: 0, opacity: 0.34 },
  { left: "38%", top: "72%", w: 50, h: 70, tone: "rose", floatSec: 11.2, drift: 7.2, rotate: 2.8, delay: 0.08, exitX: "-26vw", exitY: "38vh", exitRotate: 5, z: 2, opacity: 0.44 },
  { left: "58%", top: "70%", w: 44, h: 60, tone: "cream", floatSec: 12.8, drift: 6, rotate: -2.4, delay: 0.16, exitX: "28vw", exitY: "40vh", exitRotate: -8, z: 1, opacity: 0.4 },
  { left: "50%", top: "78%", w: 36, h: 48, tone: "gold", floatSec: 11.5, drift: 4.8, rotate: 1.2, delay: 0.32, exitX: "4vw", exitY: "44vh", exitRotate: 4, z: 0, opacity: 0.36 },
  { left: "18%", top: "28%", w: 30, h: 42, tone: "cream", floatSec: 14.5, drift: 3.2, rotate: -1.4, delay: 0.34, exitX: "-28vw", exitY: "-6vh", exitRotate: -11, z: 0, opacity: 0.32 },
  { left: "78%", top: "30%", w: 34, h: 46, tone: "rose", floatSec: 12.6, drift: 4.5, rotate: 1.8, delay: 0.13, exitX: "32vw", exitY: "-5vh", exitRotate: 11, z: 1, opacity: 0.35 },
];
