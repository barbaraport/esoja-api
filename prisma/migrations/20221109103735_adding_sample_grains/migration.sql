/*
  Warnings:

  - Added the required column `grainsPlantA` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grainsPlantB` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cultiveSamples" ADD COLUMN     "grainsPlantA" INTEGER NOT NULL,
ADD COLUMN     "grainsPlantB" INTEGER NOT NULL;
