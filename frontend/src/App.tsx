import { useState } from "react";
import { Intro } from "./components/Intro";
import { TablesSection } from "./components/TablesSection";

function App() {
	const [isIntroComplete, setIsIntroComplete] = useState(false);
	return (
		<main className="flex flex-col w-full min-h-screen items-center bg-linear-to-r from-emerald-50 to-emerald-100 p-4 pb-20">
			<Intro onComplete={() => setIsIntroComplete(true)} />
			<TablesSection isIntroComplete={isIntroComplete} />
		</main>
	);
}

export default App;
