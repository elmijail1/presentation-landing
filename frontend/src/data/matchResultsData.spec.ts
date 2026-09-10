import { findMatchingTier, matchThresholds } from "./matchResultsData";

describe("findMatchingTier", () => {
	it("returns the highest tier for a score above the highest threshold", () => {
		const result = findMatchingTier(95);

		expect(result).toBe(matchThresholds[matchThresholds.length - 1]);
	});

	it("returns the tier whose threshold exactly equals the score (inclusive boundary)", () => {
		const result = findMatchingTier(50);

		expect(result).toBe(matchThresholds[1]);
	});

	it("falls back to the first (lowest) tier for a score below the lowest threshold", () => {
		const result = findMatchingTier(10);

		expect(result).toBe(matchThresholds[0]);
	});
});
