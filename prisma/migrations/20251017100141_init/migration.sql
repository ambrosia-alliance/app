/*
  Warnings:

  - You are about to drop the column `published_date` on the `Article` table. All the data in the column will be lost.
  - Added the required column `sourceUrl` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `therapyId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "published_date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "journal" TEXT,
ADD COLUMN     "publishedDate" TIMESTAMP(3),
ADD COLUMN     "sourceUrl" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "therapyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Therapy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pros" TEXT[],
    "cons" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Therapy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_therapyId_fkey" FOREIGN KEY ("therapyId") REFERENCES "Therapy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
