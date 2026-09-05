import { skillsMock } from "../data/mockData";
import { TableSkills } from "./TableSkills";

interface ITableSectionProp {
	isIntroComplete: boolean;
}

export function TablesSection({ isIntroComplete }: ITableSectionProp) {
	return (
		<div
			className={`w-[90%] text-4xl font-bold duration-1000 transition-all ease-out ${isIntroComplete ? "opacity-100" : "opacity-0 h-0"}`}
		>
			<div className="flex max-md:flex-col w-full mt-2 gap-4 max-md:gap-10 justify-between">
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
