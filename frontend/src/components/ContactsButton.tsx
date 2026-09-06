import { useEffect, useState } from "react";

const URL_LINKEDIN = import.meta.env.VITE_URL_LINKEDIN || "";
const URL_GITHUB = import.meta.env.VITE_URL_GITHUB || "";
const EMAIL_ADDRESS = import.meta.env.VITE_EMAIL_ADDRESS || "";

export function ContactsButton() {
	const [contactsOpen, setContactsOpen] = useState(false);
	const [emailCopied, setEmailCopied] = useState(false);
	const [emailCopyingFailed, setEmailCopyingFailed] = useState(false);

	useEffect(() => {
		if (emailCopied) {
			setTimeout(() => {
				setEmailCopied(false);
			}, 2000);
		}
		if (emailCopyingFailed) {
			setTimeout(() => {
				setEmailCopyingFailed(false);
			}, 2000);
		}
	}, [emailCopied, emailCopyingFailed]);

	async function handleCopyEmail() {
		try {
			await navigator.clipboard.writeText(EMAIL_ADDRESS);
			setEmailCopied(true);
		} catch (err) {
			setEmailCopyingFailed(true);
			console.error("Failed to copy email to clipboard: ", err);
		} finally {
			setContactsOpen(false);
		}
	}

	return (
		<>
			<div className="fixed bottom-4 right-4 text-2xl">
				<button
					type="button"
					onClick={() => setContactsOpen((prev) => !prev)}
					className="text-2xl bg-linear-to-r from-orange-400 to-orange-500 text-white p-3 rounded-2xl cursor-pointer hover:brightness-90 z-20"
				>
					Contacts
				</button>
				<ul
					className={`absolute -top-34 right-0 bg-linear-to-r from-orange-400 to-orange-500 text-white p-3 rounded-2xl cursor-pointer text-center transition-all duration-500 z-10 flex flex-col gap-1 ${contactsOpen ? "opacity-100" : "opacity-0 translate-y-5"}`}
				>
					<li className="hover:underline underline-offset-2">
						<a
							href={URL_LINKEDIN}
							target="_blank"
							onClick={() => setContactsOpen(false)}
						>
							LinkedIn
						</a>
					</li>
					<li className="underline-offset-2">
						<button
							type="button"
							className="hover:underline cursor-pointer"
							onClick={handleCopyEmail}
						>
							Email
						</button>
					</li>
					<li className="hover:underline underline-offset-2">
						<a
							href={URL_GITHUB}
							target="_blank"
							onClick={() => setContactsOpen(false)}
						>
							GitHub
						</a>
					</li>
					<button
						type="button"
						onClick={() => setContactsOpen(false)}
						className="absolute -top-8 right-0 px-2 rounded-2xl font-normal text-lg bg-orange-500 flex justify-center items-center cursor-pointer hover:brightness-90"
					>
						<span className="rotate-45">✚</span>
					</button>
				</ul>
			</div>
			{/*
			 */}
			{emailCopied && (
				<div className="fixed top-3 mx-auto bg-purple-100 text-lg font-normal px-4 py-2 rounded-xl">
					✅ Email copied
				</div>
			)}
			{emailCopyingFailed && (
				<div className="fixed top-3 mx-auto bg-red-100 text-lg font-normal px-4 py-2 rounded-xl">
					❌ Failed to copy email – try again in a while
				</div>
			)}
		</>
	);
}
