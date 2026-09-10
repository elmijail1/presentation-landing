-- CreateTable
CREATE TABLE "SkillNameVariant" (
    "id" TEXT NOT NULL,
    "spelling" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "SkillNameVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkillNameVariant_spelling_key" ON "SkillNameVariant"("spelling");

-- AddForeignKey
ALTER TABLE "SkillNameVariant" ADD CONSTRAINT "SkillNameVariant_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
