import { Form } from "@base-ui/react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MatchResults } from "./MatchResults";
import type { TMatcherStage } from "../types";
import { matchResutlsData } from "../data/matchResultsData";

interface IMatcherProps {
	isIntroComplete: boolean;
}

export function Matcher({ isIntroComplete }: IMatcherProps) {
	const [skills, setSkills] = useState<string[]>([""]);
	const [stage, setStage] = useState<TMatcherStage>("match");

	function updateSkill(index: number, value: string) {
		setSkills((prev) => prev.map((skill, i) => (i === index ? value : skill)));
	}
	function addSkillField() {
		if (skills.length < 5) {
			setSkills((prev) => [...prev, ""]);
		}
	}
	function removeSkillField(index: number) {
		if (skills.length > 1) {
			setSkills((prev) => prev.filter((_i, ind) => index !== ind));
		}
	}
	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		setStage("loading");
		const nonEmptySkills = skills.map((s) => s.trim()).filter(Boolean);
		setTimeout(() => {
			setStage("match");
		}, 1000);
		// TODO: send nonEmptySkills via a GraphQL mutation
	}

	if (isIntroComplete && stage === "loading") {
		return (
			<div
				className={`mt-10 text-gray-400 animate-pulse duration-1000 transition-all ease-out ${isIntroComplete && stage === "loading" ? "opacity-100" : "opacity-0 h-0 hidden"}`}
			>
				Loading...
			</div>
		);
	}

	if (isIntroComplete && stage === "match") {
		return <MatchResults stage={stage} data={matchResutlsData[0]} />;
	}

	return (
		<div
			className={`mt-10 w-[90%] flex flex-col items-center text-center duration-1000 transition-all ease-out ${isIntroComplete && stage === "form" ? "opacity-100" : "opacity-0 h-0"}`}
		>
			<h2>What skills are you looking for in a developer? 👀</h2>
			<p className="text-2xl text-gray-400 mt-2 mb-4">
				Enter up to 5 most important skills to see how well I match your case!
			</p>
			<Form onSubmit={(e) => handleSubmit(e)} className="w-[70%]">
				<div className="flex flex-col gap-2">
					{skills.map((skill, index) => {
						const key = index;
						return (
							<div key={key} className="relative">
								<Input
									type="text"
									placeholder="Enter skill"
									value={skill}
									onChange={(e) => updateSkill(index, e.target.value)}
									className="bg-white h-10 p-8 placeholder:text-gray-300 text-2xl text-center font-normal"
								/>
								{index !== 0 && (
									<button
										type="button"
										className="absolute rotate-45 -top-1 right-1 text-gray-500"
										onClick={() => removeSkillField(index)}
									>
										+
									</button>
								)}
							</div>
						);
					})}
				</div>
				<div className="mt-4 flex justify-around">
					<Button
						type="button"
						variant="outline"
						onClick={addSkillField}
						className="cursor-pointer text-xl h-10 p-7 font-bold rounded-4xl"
						disabled={skills.length > 4}
					>
						Add skill
					</Button>
					<Button
						type="submit"
						className="cursor-pointer text-xl h-10 p-7 font-bold rounded-4xl bg-linear-to-r from-teal-400 to-teal-500 hover:brightness-90"
					>
						Check match
					</Button>
				</div>
			</Form>
		</div>
	);
}
