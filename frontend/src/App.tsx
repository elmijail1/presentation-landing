import { Intro } from "./components/Intro";
import { TablesSection } from "./components/TablesSection";

function App() {
	return (
		<main className="flex flex-col w-full min-h-screen items-center bg-emerald-100 p-4">
			<Intro />
			<TablesSection />
			{/* <Matcher /> */}
		</main>
	);
}

export default App;
