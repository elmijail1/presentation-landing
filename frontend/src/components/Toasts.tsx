import type { ReactNode } from "react";

interface IToastProps {
	type: "success" | "failure";
	children: ReactNode;
}

export function Toast({ type, children }: IToastProps) {
	const bgColor = type === "success" ? "bg-purple-100" : "bg-red-100";
	return (
		<div
			className={`fixed top-3 mx-auto text-lg font-normal px-4 py-2 rounded-xl ${bgColor}`}
		>
			{children}
		</div>
	);
}

export function ToastCopySuccess() {
	return <Toast type="success">✅ Email copied</Toast>;
}

export function ToastCopyFailure() {
	return (
		<Toast type="failure">❌ Failed to copy email – try again in a while</Toast>
	);
}
