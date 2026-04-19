"use client";

import type { ReactNode } from "react";
import { InvitationAmbientAudioProvider } from "@/components/InvitationAmbientAudio";

export function Providers({ children }: { children: ReactNode }) {
  return <InvitationAmbientAudioProvider>{children}</InvitationAmbientAudioProvider>;
}
