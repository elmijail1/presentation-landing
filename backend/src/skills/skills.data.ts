import { EMySkillRelation, type MSkill } from "./models/skill.model.js";

export const skillsData: MSkill[] = [
	{ id: "1", name: "TypeScript", myRelation: EMySkillRelation.HAVE },
	{ id: "2", name: "React", myRelation: EMySkillRelation.HAVE },
	{ id: "3", name: "Node.js", myRelation: EMySkillRelation.HAVE },
	{ id: "4", name: "NestJS", myRelation: EMySkillRelation.WANT_TO_LEARN },
	{ id: "5", name: "GraphQL", myRelation: EMySkillRelation.WANT_TO_LEARN },
	{ id: "6", name: "Docker", myRelation: EMySkillRelation.WANT_TO_LEARN },
];
