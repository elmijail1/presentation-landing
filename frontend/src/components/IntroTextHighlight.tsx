import type React from "react";

interface IntroTextHighlightProps {
	color: "orange" | "purple" | "teal";
	children: React.ReactNode;
}

export function IntroTextHighlight({
	color,
	children,
}: IntroTextHighlightProps) {
	function determineGradient() {
		if (color === "purple") {
			return "from-purple-400 to-purple-500";
		} else if (color === "orange") {
			return "from-orange-400 to-orange-500";
		} else {
			return "from-teal-400 to-teal-500";
		}
	}
	const styles = `font-extrabold bg-linear-to-r bg-clip-text text-transparent ${determineGradient()}`;

	return <span className={styles}> {children} </span>;
}
