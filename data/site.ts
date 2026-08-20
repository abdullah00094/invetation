/**
 * Editable site content — update names, dates, copy, and media here.
 * `eventDateIso` drives the live countdown.
 */
export const site = {
  meta: {
    title: "Yousra & Abdullah — Engagement",
    description:
      "You are warmly invited to celebrate our engagement with an evening of love, laughter, and togetherness.",
  },
  couple: {
    names: ["Yousra", "Abdullah"],
    first: "Yousra",
    second: "Abdullah",
    joiner: "&",
  },
  /** Sunday, October 4, 2026 at 7:00 PM in Cairo (UTC+03:00). */
  eventDateIso: "2026-10-04T19:00:00+03:00",
  /** Shown in the hero (human-friendly) */
  displayDate: "Sunday, October 4, 2026",
  displayTime: "7:00 PM",
  hero: {
    subtitle: "With joyful hearts, we invite you to celebrate the beginning of our forever.",
  },
  /** Full-screen opening — CTA copy */
  opening: {
    label: "YOU ARE INVITED",
    event: "Engagement Celebration",
    date: "04 · 10 · 2026",
    button: "OPEN INVITATION",
  },
  invitation: {
    heading: "Together, with you",
    paragraphs: [
      "We would be honored to have you beside us as we mark the beginning of this new chapter — quiet in its promise, deep in its meaning.",
      "Your presence has shaped our story in ways we carry every day. Sharing this moment with you would make it complete.",
    ],
  },
  story: {
    heading: "Toward a Beautiful Beginning",
    paragraphs: [
      "Every great journey begins with a single step, and ours began with a simple hello. Over time, that hello grew into a profound connection, filled with shared dreams and countless moments of joy.",
      "As we stand on the threshold of our future, we look back with immense gratitude for the path that led us here, and look forward to the beautiful life we are building together."
    ],
  },
  faq: [
    {
      question: "When should I arrive?",
      answer: "Please aim to arrive by 6:30 PM to get settled before the celebration officially begins."
    },
    {
      question: "Where is the venue?",
      answer: "The engagement will be held at our beloved venue. Please refer to the Event Details section for the exact location."
    },
    {
      question: "Is there a dress code?",
      answer: "We kindly request formal evening attire to match the elegance of our celebration."
    },
  ],
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
    name: "fe 2abl 3abdallah",
    addressLines: ["wara el re2aten kda :D"],
    note: "ew3a 7ad yet2a5r :') .",
    mapUrl:
      "https://maps.app.goo.gl/amvDZSJoT78TN8Ef8",
  },
  rsvp: {
    heading: "Will You Celebrate With Us?",
    subtitle: "We would be delighted to have you with us.",
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
    date: "04 · 10 · 2026",
    names: "Yousra & Abdullah",
    closing: "Thank you for being part of our beginning.",
  },
} as const;

export type AttendanceValue = (typeof site.rsvp.attendanceOptions)[number]["value"];
