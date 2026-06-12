import { useState } from "react";

// ─── ACHIEVEMENT DATA ────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
  {
    id: 1,
    name: "Curry Achievement",
    rank: "Cadet Airman",
    abbr: "C/Amn",
    phase: 1,
    phaseLabel: "Phase I — Followership",
    color: "from-sky-600 to-sky-800",
    badge: "🥉",
    waitWeeks: 0,
    overview: "Your very first achievement. Focus on learning the basics: the Cadet Oath, core values, and how to stand in formation.",
    requirements: [
      {
        category: "General",
        icon: "📋",
        items: [
          "Be a current CAP cadet in eServices",
          "Recite the Cadet Oath from memory",
          "Participate actively in unit meetings",
          "Complete the Cadet Welcome Course (available in Absorb LMS or taught at squadron)",
        ],
      },
      {
        category: "Leadership",
        icon: "📖",
        items: [
          "Complete Learn to Lead Chapter 1 interactive module OR pass the online test with 80%+ (open-book, 25 questions / 30 min)",
          "Test location: eServices → Cadet Programs → Online Learning → Absorb LMS",
        ],
        links: [
          { label: "eServices Online Learning (Login Required)", url: "https://eservices.cap.gov" },
          { label: "Learn to Lead Overview — CAP", url: "https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds/curry" },
        ],
      },
      {
        category: "Aerospace",
        icon: "🛩️",
        items: ["No aerospace requirement for the Curry Achievement."],
      },
      {
        category: "Fitness",
        icon: "💪",
        items: [
          "Attempt the Cadet Physical Fitness Test (CPFT) — no passing score required yet",
          "See where you stand relative to th
