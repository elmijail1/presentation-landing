import { useEffect, useRef, useState } from "react";
import { introGroups } from "../data/introGroups";
import { wait } from "../scripts/utilities";

const LINE_FADE_IN_MS = 900;
const PAUSE_BETWEEN_LINE_FADE_INS_MS = 150;
const PROMPT_APPEARANCE_DELAY_MS = 150;
const PROMPT_PULSING_DEACTIVATION_MS = 200;
const PROMPT_FADE_OUT_DURATION_MS = 600;

function fadeClass(shown: boolean) {
	return shown
		? "opacity-100 translate-y-0 transition-all duration-[400ms] ease-out"
		: "opacity-0 translate-y-3";
}

export function Intro() {
	const [latestShownGroup, setLatestShownGroup] = useState(0);
	const [latestShownLineInGroup, setLatestShownLineInGroup] = useState(0);
	const [isPromptVisible, setIsPromptVisible] = useState(false);
	const [isPromptPulsing, setIsPromptPulsing] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const t = setTimeout(() => setLatestShownGroup(1), 1000);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		if (!isPromptVisible && latestShownLineInGroup > 0) {
			bottomRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [latestShownLineInGroup, isPromptVisible]);

	useEffect(() => {
		async function advanceToNextSection() {
			if (!isPromptVisible) return;
			if (latestShownGroup >= introGroups.length) return;
			setIsPromptPulsing(false);
			await wait(PROMPT_PULSING_DEACTIVATION_MS);
			setIsPromptVisible(false);
			await wait(PROMPT_FADE_OUT_DURATION_MS);
			setLatestShownGroup((g) => g + 1);
			setLatestShownLineInGroup(0);
		}

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key !== "Enter") return;
			e.preventDefault();
			advanceToNextSection();
		}
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("touchstart", advanceToNextSection);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("touchstart", advanceToNextSection);
		};
	}, [isPromptVisible, latestShownGroup]);

	useEffect(() => {
		if (latestShownGroup === 0) return;
		const lines = introGroups[latestShownGroup - 1];

		let cancelled = false;
		const timeouts: ReturnType<typeof setTimeout>[] = [];
		function showLine(index: number) {
			if (cancelled || index >= lines.length) {
				timeouts.push(
					setTimeout(
						() => !cancelled && setIsPromptVisible(true),
						PROMPT_APPEARANCE_DELAY_MS,
					),
				);
				return;
			}
			setLatestShownLineInGroup(index + 1);
			timeouts.push(
				setTimeout(
					() => showLine(index + 1),
					LINE_FADE_IN_MS + PAUSE_BETWEEN_LINE_FADE_INS_MS,
				),
			);
		}
		timeouts.push(setTimeout(() => showLine(0), 0));

		return () => {
			cancelled = true;
			timeouts.forEach(clearTimeout);
		};
	}, [latestShownGroup]);
	console.log("latestshowngroup: ", latestShownGroup);
	return (
		<div className="w-[90%] mt-10 text-4xl font-bold text-green-950">
			{introGroups.map((lines, groupIndex) => {
				const isCurrent = latestShownGroup === groupIndex + 1;
				const isPast = latestShownGroup > groupIndex + 1;
				if (!isCurrent && !isPast) return null;
				const groupKey = groupIndex;
				return (
					<div key={groupKey} className="mt-5 first:mt-0">
						{lines.map((line, i) => {
							const lineKey = i;
							return (
								<p
									key={lineKey}
									className={fadeClass(isPast || latestShownLineInGroup > i)}
								>
									{line}
								</p>
							);
						})}
					</div>
				);
			})}

			{latestShownGroup < introGroups.length && (
				<div
					className={`text-2xl text-gray-400 font-bold transition-opacity duration-500 ease-in-out ${
						isPromptVisible ? "opacity-100" : "opacity-0"
					} ${isPromptPulsing ? "animate-pulse" : ""}`}
					onTransitionEnd={() => isPromptVisible && setIsPromptPulsing(true)}
				>
					Press Enter ⌨️ or touch here 📱 to continue...
				</div>
			)}
			<div ref={bottomRef} className="shrink-0 h-15 w-10" />
		</div>
	);
}
