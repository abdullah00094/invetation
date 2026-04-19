import type { Transition } from "framer-motion";

/** Shared motion — slightly slower, smaller deltas feel more “quiet luxury” */
export const softTransition: Transition = {
  duration: 0.72,
  ease: [0.16, 1, 0.3, 1],
};

export const quickTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

/** Hero mist / cloud parting — long, soft, editorial */
export const mistIntro: Transition = {
  duration: 2.35,
  ease: [0.2, 0.9, 0.2, 1],
};
