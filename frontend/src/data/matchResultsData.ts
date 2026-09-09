export type TMatchThreshold = { threshold: number; comment: string };

export const matchThresholds: TMatchThreshold[] = [
  {
    threshold: 20,
    comment: "This can still work out – let's talk more about your project.",
  },
  {
    threshold: 50,
    comment:
      "Some things match – let's discuss the details before moving forward.",
  },
  {
    threshold: 70,
    comment:
      "Most things match! That's a great start – let's discuss the details.",
  },
  { threshold: 80, comment: "Awesome match, let's work together!" },
  {
    threshold: 90,
    comment: "Great, it's a perfect match! We can get started ASAP.",
  },
];

export function findMatchingTier(score: number): TMatchThreshold {
  return (
    matchThresholds.findLast((t) => score >= t.threshold) ?? matchThresholds[0]
  );
}
