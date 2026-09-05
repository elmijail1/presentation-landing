import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import type { TSkill } from "@/types";

type TTableBGColor = "orange" | "purple";

interface ITableSkillsProps {
	caption: string;
	skills: TSkill[];
	color: TTableBGColor;
	secondColHeader: string;
}

export function TableSkills({
	caption,
	skills,
	color,
	secondColHeader,
}: ITableSkillsProps) {
	const [visitorSkills, setVisitorSkills] = useState<Set<string>>(new Set());

	function determineColor(color: TTableBGColor, element: "body" | "header") {
		if (element === "body") {
			return color === "orange" ? "bg-orange-50" : "bg-purple-50";
		} else {
			return color === "orange" ? "bg-orange-100" : "bg-purple-100";
		}
	}

	function toggleVisitorSkill(id: string, checked: boolean) {
		setVisitorSkills((prev) => {
			const next = new Set(prev);
			if (checked) {
				next.add(id);
			} else {
				next.delete(id);
			}
			return next;
		});
	}

	return (
		<div className="w-1/2 max-md:w-full flex flex-col items-center">
			<h2 className="font-bold mb-3 text-nowrap">{caption}</h2>
			<div className="max-w-150 mx-auto max-h-80 overflow-y-auto w-full rounded-2xl overflow-hidden">
				<Table className="text-2xl">
					<TableHeader
						className={`sticky top-0 z-10 ${determineColor(color, "header")}`}
					>
						<TableRow>
							<TableHead className="sticky top-0">Skill</TableHead>
							<TableHead className="sticky top-0">{secondColHeader}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className={`text-center ${determineColor(color, "body")}`}>
						{skills.map((skill) => (
							<TableRow key={skill.id}>
								<TableCell>{skill.name}</TableCell>
								<TableCell>
									<Checkbox
										className="mx-auto"
										checked={visitorSkills.has(skill.id) ?? false}
										onCheckedChange={(checked) =>
											toggleVisitorSkill(skill.id, checked)
										}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
