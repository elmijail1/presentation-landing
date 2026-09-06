export type TSkill = {
	id: string;
	name: string;
	category: string;
	iHaveIt: boolean;
};

export type TMatcherStage = "form" | "loading" | "match";
export type TMatchResultData = {
	score: number;
	comment: string;
};
