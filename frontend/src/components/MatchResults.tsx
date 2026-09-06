import type { TMatcherStage, TMatchResultData } from "@/types";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { ToastCopyFailure, ToastCopySuccess } from "./Toasts";

const URL_LINKEDIN = import.meta.env.VITE_URL_LINKEDIN || "";
const URL_GITHUB = import.meta.env.VITE_URL_GITHUB || "";
const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_ADDRESS || "";

interface IMatchResultsProps {
	stage: TMatcherStage;
	data: TMatchResultData;
}

export function MatchResults({ stage, data }: IMatchResultsProps) {
	function determineColor() {
		if (data.score === 5 || data.score === 4) {
			return "from-teal-400 to-teal-500";
		} else if (data.score === 3 || data.score === 2) {
			return "from-amber-400 to-amber-500";
		} else {
			return "from-orange-400 to-orange-500";
		}
	}
	const { justCopied, copyFailed, copy } = useCopyToClipboard();

	return (
		<div
			className={`mt-10 w-[90%] flex flex-col items-center gap-2 duration-1000 transition-all ease-out ${stage === "match" ? "opacity-100" : "opacity-0 h-0 hidden"}`}
		>
			<h2>How do we match? 👀</h2>
			<p
				className={`text-6xl font-extrabold bg-linear-to-r bg-clip-text text-transparent ${determineColor()}`}
			>
				{data.score}/5
			</p>
			<div className="w-full text-3xl text-gray-500 flex flex-col gap-1 items-center text-center">
				<p>{data.comment} Reach out in any way you like:</p>
				<ul className="list-disc text-left underline leading-12">
					<li>
						<a href={URL_LINKEDIN} target="_blank" rel="noopener">
							LinkedIn
						</a>
					</li>
					<li>
						<button
							type="button"
							className="underline cursor-pointer"
							onClick={() => copy(EMAIL_ADDRESS)}
						>
							Email
						</button>
					</li>
					<li>
						<a href={URL_GITHUB} target="_blank" rel="noopener">
							GitHub
						</a>
					</li>
				</ul>
			</div>
			{justCopied && <ToastCopySuccess />}
			{copyFailed && <ToastCopyFailure />}
		</div>
	);
}
