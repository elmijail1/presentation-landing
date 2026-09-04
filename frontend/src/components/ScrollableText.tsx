import { useEffect, useState } from "react";
import { ScrollableTextHighlight } from "./ScrollableTextHighlight";

const REVEAL_DURATION = 900;
const LINE_GAP = 150;
const PROMPT_DELAY = 150;

function fadeClass(shown: boolean) {
	return shown
		? "opacity-100 translate-y-0 transition-all duration-[400ms] ease-out"
		: "opacity-0 translate-y-3";
}

export function ScrollableText() {
	const [visibleCount, setVisibleCount] = useState(0);
	const [isScrollPromptVisible, setIsScrollPromptVisible] = useState(false);
	const [isScrollPromptPulsing, setIsScrollPromptPulsing] = useState(false);
	const LINES_COUNT = 2;

	useEffect(() => {
		let cancelled = false;
		const timeouts: ReturnType<typeof setTimeout>[] = [];
		function showLine(index: number) {
			if (cancelled || index >= LINES_COUNT) {
				timeouts.push(
					setTimeout(
						() => !cancelled && setIsScrollPromptVisible(true),
						PROMPT_DELAY,
					),
				);
				return;
			}
			setVisibleCount(index + 1);
			timeouts.push(
				setTimeout(() => showLine(index + 1), REVEAL_DURATION + LINE_GAP),
			);
		}

		timeouts.push(setTimeout(() => showLine(0), 1000));

		return () => {
			cancelled = true;
			timeouts.forEach(clearTimeout);
		};
	}, []);

	return (
		<div className="w-[90%] mt-10 text-4xl font-bold text-green-950">
			<p className={fadeClass(visibleCount >= 1)}>👋 Hi, I'm Mikhail,</p>
			<p className={fadeClass(visibleCount >= 2)}>
				a
				<ScrollableTextHighlight color="orange">
					fullstack
				</ScrollableTextHighlight>
				developer.
			</p>

			{/* <div className="mt-5">
				<p>In this small web app</p>
				<p>
					I'll tell you about
					<ScrollableTextHighlight color="purple">
						my skills
					</ScrollableTextHighlight>
					💪
				</p>
			</div>

			<div className="mt-5">
				<p>Skills I already have</p>
				<p>
					and skills I'm{" "}
					<ScrollableTextHighlight color="teal">
						keen to learn
					</ScrollableTextHighlight>
					🙇‍♂️
				</p>
			</div> */}

			{/* shown on a short inactivity timer after the previous part has been shown */}
			{/* must be flickering */}

			<div
				className={`text-2xl text-gray-400 font-bold transition-opacity duration-600 ease-out
                        ${isScrollPromptVisible ? "opacity-100" : "opacity-0"}
                        ${isScrollPromptPulsing ? "animate-pulse" : ""}
                        `}
				onTransitionEnd={() =>
					isScrollPromptVisible && setIsScrollPromptPulsing(true)
				}
			>
				Scroll down to continue...
			</div>
		</div>
	);
}
