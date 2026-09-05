import type { ReactNode } from "react";
import { IntroTextHighlight } from "../components/IntroTextHighlight";

export const introGroups: ReactNode[][] = [
	[
		<>👋 Hi, I'm Mikhail,</>,
		<>
			a <IntroTextHighlight color="orange">fullstack</IntroTextHighlight>{" "}
			developer.
		</>,
	],
	[
		<>In this small web app</>,
		<>
			I'll tell you about{" "}
			<IntroTextHighlight color="purple">my skills</IntroTextHighlight> 💪
		</>,
	],
	[
		<>Skills I already have</>,
		<>
			and skills I'm{" "}
			<IntroTextHighlight color="teal">keen to learn</IntroTextHighlight> 🙇‍♂️
		</>,
	],
];
