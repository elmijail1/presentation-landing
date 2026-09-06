import { useEffect, useState } from "react";

const FEEDBACK_DURATION_MS = 2000;

export function useCopyToClipboard() {
	const [justCopied, setJustCopied] = useState(false);
	const [copyFailed, setCopyFailed] = useState(false);

	useEffect(() => {
		if (!justCopied && !copyFailed) return;
		const t = setTimeout(() => {
			setJustCopied(false);
			setCopyFailed(false);
		}, FEEDBACK_DURATION_MS);
		return () => clearTimeout(t);
	}, [justCopied, copyFailed]);

	async function copy(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			setJustCopied(true);
		} catch (error) {
			setCopyFailed(true);
			console.error("Failed to copy to clipboard: ", error);
		}
	}

	return { justCopied, copyFailed, copy };
}
