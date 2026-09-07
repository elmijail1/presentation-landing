import { Injectable } from "@nestjs/common";
import type { EMySkillRelation, MSkill } from "./models/skill.model.js";
import { skillsData } from "./skills.data.js";

@Injectable()
export class SkillsService {
	findAll(myRelation?: EMySkillRelation): MSkill[] {
		if (!myRelation) return skillsData;
		return skillsData.filter((s) => s.myRelation === myRelation);
	}
}
