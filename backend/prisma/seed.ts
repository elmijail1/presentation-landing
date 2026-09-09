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
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({ data: skills });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
