import { EKnowledgeStatus, MUserSkill } from './model/user-skill.model.js';

export const userSkillsData: MUserSkill[] = [
  {
    id: '1',
    userId: '1',
    skillId: '1',
    knowledgeStatus: EKnowledgeStatus.HAS,
    lookingForDevsWithIt: false,
  },
  {
    id: '2',
    userId: '1',
    skillId: '2',
    knowledgeStatus: EKnowledgeStatus.HAS,
    lookingForDevsWithIt: false,
  },
  {
    id: '3',
    userId: '1',
    skillId: '3',
    knowledgeStatus: EKnowledgeStatus.HAS,
    lookingForDevsWithIt: false,
  },
  {
    id: '4',
    userId: '1',
    skillId: '4',
    knowledgeStatus: EKnowledgeStatus.WANTS_TO_LEARN,
    lookingForDevsWithIt: false,
  },
  {
    id: '5',
    userId: '1',
    skillId: '5',
    knowledgeStatus: EKnowledgeStatus.WANTS_TO_LEARN,
    lookingForDevsWithIt: false,
  },
  {
    id: '6',
    userId: '1',
    skillId: '6',
    knowledgeStatus: EKnowledgeStatus.WANTS_TO_LEARN,
    lookingForDevsWithIt: false,
  },
];
