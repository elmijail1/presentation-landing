import { useState } from "react";
import { Intro } from "./components/Intro";
import { Matcher } from "./components/Matcher";
import { TablesSection } from "./components/TablesSection";
import { ContactsButton } from "./components/ContactsButton";

function App() {
	const [isIntroComplete, setIsIntroComplete] = useState(false);
	return (
		<main className="flex flex-col w-full min-h-screen items-center bg-linear-to-r from-emerald-50 to-emerald-100 p-4 pb-80 gap-10 relative">
			<Intro onComplete={() => setIsIntroComplete(true)} />
			<TablesSection isIntroComplete={isIntroComplete} />
			<Matcher isIntroComplete={isIntroComplete} />
			<ContactsButton />
		</main>
	);
}

export default App;
