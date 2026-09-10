import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  EMySkillRelation,
  PrismaClient,
} from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const skills = [
  { name: 'TypeScript', myRelation: EMySkillRelation.HAVE },
  { name: 'React', myRelation: EMySkillRelation.HAVE },
  { name: 'Node.js', myRelation: EMySkillRelation.HAVE },
  { name: 'NestJS', myRelation: EMySkillRelation.HAVE },
  { name: 'GraphQL', myRelation: EMySkillRelation.HAVE },
  { name: 'Docker', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'JavaScript', myRelation: EMySkillRelation.HAVE },
  { name: 'PostgreSQL', myRelation: EMySkillRelation.HAVE },
  { name: 'MongoDB', myRelation: EMySkillRelation.HAVE },
  { name: 'Kubernetes', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'Kafka', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'RabbitMQ', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'Express', myRelation: EMySkillRelation.HAVE },
  { name: 'Fastify', myRelation: EMySkillRelation.HAVE },
  { name: 'Vitest', myRelation: EMySkillRelation.HAVE },
  { name: 'Playwright', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'Vue', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'Python', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'Git', myRelation: EMySkillRelation.HAVE },
  { name: 'GitHub', myRelation: EMySkillRelation.HAVE },
  { name: 'GitLab', myRelation: EMySkillRelation.HAVE },
  {
    name: 'GitHub Actions',
    myRelation: EMySkillRelation.WANT_TO_LEARN,
  },
  { name: 'GitLab CI', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'AWS Lambda', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'Angular', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'Zod', myRelation: EMySkillRelation.HAVE },
  {
    name: 'React Native',
    myRelation: EMySkillRelation.WANT_TO_LEARN,
  },
  { name: 'Fast API', myRelation: EMySkillRelation.WANT_TO_LEARN },
  { name: 'Next.js', myRelation: EMySkillRelation.HAVE },
  { name: 'Claude Code', myRelation: EMySkillRelation.HAVE },
];

async function main() {
  await prisma.userSkill.deleteMany();
  await prisma.skillNameVariant.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({ data: skills });

  const insertedSkills = await prisma.skill.findMany();
  const skillIdByName = new Map(insertedSkills.map((s) => [s.name, s.id]));

  const variants: { spelling: string; skillName: string }[] = [
    { spelling: 'TS', skillName: 'TypeScript' },
    { spelling: 'Type Script', skillName: 'TypeScript' },
    { spelling: 'ReactJS', skillName: 'React' },
    { spelling: 'React.js', skillName: 'React' },
    { spelling: 'React JS', skillName: 'React' },
    { spelling: 'Node JS', skillName: 'Node.js' },
    { spelling: 'NodeJS', skillName: 'Node.js' },
    { spelling: 'Node', skillName: 'Node.js' },
    { spelling: 'Nest', skillName: 'NestJS' },
    { spelling: 'Nest.js', skillName: 'NestJS' },
    { spelling: 'Nest JS', skillName: 'NestJS' },
    { spelling: 'Graph QL', skillName: 'GraphQL' },
    { spelling: 'JS', skillName: 'JavaScript' },
    { spelling: 'Java Script', skillName: 'JavaScript' },
    { spelling: 'ECMA', skillName: 'JavaScript' },
    { spelling: 'ECMAScript', skillName: 'JavaScript' },
    { spelling: 'ECMA Script', skillName: 'JavaScript' },
    { spelling: 'Postgres', skillName: 'PostgreSQL' },
    { spelling: 'Postgre', skillName: 'PostgreSQL' },
    { spelling: 'Postgre SQL', skillName: 'PostgreSQL' },
    { spelling: 'Mongo', skillName: 'MongoDB' },
    { spelling: 'Mongo DB', skillName: 'MongoDB' },
    { spelling: 'Rabbit MQ', skillName: 'RabbitMQ' },
    { spelling: 'Express JS', skillName: 'Express' },
    { spelling: 'ExpressJS', skillName: 'Express' },
    { spelling: 'Express.js', skillName: 'Express' },
    { spelling: 'Next', skillName: 'Next.js' },
    { spelling: 'NextJS', skillName: 'Next.js' },
    { spelling: 'Next JS', skillName: 'Next.js' },
    { spelling: 'Claude', skillName: 'Claude Code' },
  ];

  await prisma.skillNameVariant.createMany({
    data: variants.map((v) => ({
      spelling: v.spelling,
      skillId: skillIdByName.get(v.skillName)!,
    })),
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
