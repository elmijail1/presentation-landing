const INTRO_SEEN_KEY = "intro-seen-at";
const INTRO_REPLAY_COOLDOWN_MS = 1000 * 60 * 60 * 24 * 7; // 1 week

export function hasSeenIntroRecently(): boolean {
	try {
		const raw = localStorage.getItem(INTRO_SEEN_KEY);
		if (!raw) return false;

		const seenAt = Number(raw);
		if (Number.isNaN(seenAt)) return false;

		const timePassedAfterSeeingIntro = Date.now() - seenAt;
		const hasUserSeenIntroRecently =
			timePassedAfterSeeingIntro < INTRO_REPLAY_COOLDOWN_MS;
		return hasUserSeenIntroRecently;
	} catch {
		return false;
	}
}

export function markIntroSeen(): void {
	try {
		localStorage.setItem(INTRO_SEEN_KEY, String(Date.now()));
	} catch {
		console.warn("Failed to mark the intro as 'already seen'");
	}
}
