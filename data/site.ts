/**
 * Editable site content — update names, dates, copy, and media here.
 * `eventDateIso` drives the live countdown.
 */
export const site = {
  meta: {
    title: "Yousra & Abdullah — Katb Al-Kitab ceremony ",
    description:
      "You are warmly invited to celebrate our Katb Al-Kitab ceremony  with an evening of love, laughter, and togetherness.",
  },
  couple: {
    names: ["Yousra", "Abdullah"],
    joiner: "&",
  },
  /** Sunday, October 4, 2026 at 7:00 PM in Cairo (UTC+03:00). */
  eventDateIso: "2026-10-04T19:00:00+03:00",
  /** Shown in the hero (human-friendly) */
  displayDate: "Sunday, October 4, 2026",
  hero: {
    subtitle: "With joyful hearts, we invite you to celebrate our Katb Al-Kitab ceremony .",
  },
  /** Full-screen opening — CTA copy */
  opening: {
    tapEn: "Open Invitation",
    hint: "A gentle lift before your story begins.",
  },
  invitation: {
    heading: "Together, with you",
    paragraphs: [
      "We would be honored to have you beside us as we mark the beginning of this new chapter — quiet in its promise, deep in its meaning.",
      "Your presence has shaped our story in ways we carry every day. Sharing this moment with you would make it complete.",
    ],
  },
  timeline: [
    {
      title: "Ceremony",
      time: "5:00 PM",
      description: "A short, intimate blessing surrounded by those we love most.",
    },
    {
      title: "Dinner",
      time: "6:30 PM",
      description: "A seated meal with soft candlelight, gentle music, and warm conversation.",
    },
    {
      title: "Celebration",
      time: "8:30 PM",
      description: "Music, dessert, and dancing — unhurried, joyful, and full of heart.",
    },
  ],
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-ef289293cb31?w=800&q=80",
      alt: "Couple walking together outdoors",
    },
    {
      src: "https://images.unsplash.com/photo-1522673606160-de0bda48a286?w=800&q=80",
      alt: "Hands with Katb Al-Kitab ceremony  ring",
    },
    {
      src: "https://images.unsplash.com/photo-1529636796338-32bd17d9e848?w=800&q=80",
      alt: "Champagne glasses celebration",
    },
    {
      src: "https://images.unsplash.com/photo-1469371670807-61357738f247?w=800&q=80",
      alt: "Floral arrangement soft light",
    },
  ],
  venue: {
    name: "El Mwasah Wedding Venue & Elderly Care",
    addressLines: ["El Mwasah Wedding Venue & Elderly Care"],
    note: "",
    mapUrl: "https://maps.app.goo.gl/2gqKsSTddCCDBzNB8",
  },
  rsvp: {
    heading: "Kindly respond",
    attendanceOptions: [
      { value: "yes", label: "Joyfully accepts" },
      { value: "no", label: "Regretfully declines" },
      { value: "maybe", label: "Still deciding" },
    ],
    successTitle: "Thank you",
    successMessage:
      "Your response has been received. We are so grateful — and we cannot wait to celebrate with you.",
  },
  footer: {
    line: "With love,",
    names: "Yousra & Abdullah",
    closing: "We will cherish this day because you are part of it.",
  },
} as const;

export type AttendanceValue = (typeof site.rsvp.attendanceOptions)[number]["value"];
