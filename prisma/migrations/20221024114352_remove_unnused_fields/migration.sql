/*
  Warnings:

  - You are about to drop the column `description` on the `cultiveSamples` table. All the data in the column will be lost.
  - You are about to drop the column `grainsPlant1` on the `cultiveSamples` table. All the data in the column will be lost.
  - You are about to drop the column `grainsPlant2` on the `cultiveSamples` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cultiveSamples" DROP COLUMN "description",
DROP COLUMN "grainsPlant1",
DROP COLUMN "grainsPlant2";
