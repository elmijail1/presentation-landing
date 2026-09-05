import { skillsMock } from "../data/mockData";
import { TableSkills } from "./TableSkills";

export function TablesSection() {
	return (
		<div className="w-[90%] flex flex-col items-center text-4xl font-bold">
			<div className="flex w-full mt-2 gap-4 justify-between">
				<TableSkills
					caption="Skills I have 🔨"
					skills={skillsMock}
					color="orange"
					secondColHeader="Have it too?"
				/>
				<TableSkills
					caption="Skills I want to learn 🧠"
					skills={skillsMock}
					color="purple"
					secondColHeader="Want to learn it too?"
				/>
			</div>
		</div>
	);
}
