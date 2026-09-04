import type React from "react";

interface ScrollableTextHighlightProps {
	color: "orange" | "purple" | "teal";
	children: React.ReactNode;
}

export function ScrollableTextHighlight({
	color,
	children,
}: ScrollableTextHighlightProps) {
	const gradient = `from-${color}-400 to-${color}-500`;
	const styles = `font-extrabold bg-linear-to-r bg-clip-text text-transparent ${gradient}`;

	return <span className={styles}> {children} </span>;
}
