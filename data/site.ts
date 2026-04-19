/**
 * Editable site content — update names, dates, copy, and media here.
 * `eventDateIso` drives the live countdown (UTC recommended).
 */
export const site = {
  meta: {
    title: "Yousra & Abdullah — Engagement",
    description:
      "You are warmly invited to celebrate our engagement with an evening of love, laughter, and togetherness.",
  },
  couple: {
    names: ["Yousra", "Abdullah"],
    joiner: "&",
  },
  /** ISO 8601 in UTC, e.g. 2026-06-14T17:00:00.000Z */
  eventDateIso: "2026-06-14T17:00:00.000Z",
  /** Shown in the hero (human-friendly) */
  displayDate: "Saturday, June 14, 2026",
  hero: {
    subtitle: "With joyful hearts, we invite you to celebrate our engagement.",
  },
  /** Full-screen opening — CTA copy */
  opening: {
    tapEn: "Tap to Open",
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
      alt: "Hands with engagement ring",
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
    name: "The Garden Atelier",
    addressLines: ["12 Rue des Lilas", "Casablanca, Morocco"],
    note: "Valet parking is available at the main entrance. Please arrive fifteen minutes early for seating.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Garden+Atelier+Casablanca",
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
