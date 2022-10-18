/*
  Warnings:

  - Added the required column `heightPlantA` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heightPlantB` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoPlantA` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoPlantB` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `podsPlantA` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `podsPlantB` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stagePlantA` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stagePlantB` to the `cultiveSamples` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cultiveSamples" ADD COLUMN     "heightPlantA" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "heightPlantB" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "photoPlantA" TEXT NOT NULL,
ADD COLUMN     "photoPlantB" TEXT NOT NULL,
ADD COLUMN     "podsPlantA" INTEGER NOT NULL,
ADD COLUMN     "podsPlantB" INTEGER NOT NULL,
ADD COLUMN     "stagePlantA" INTEGER NOT NULL,
ADD COLUMN     "stagePlantB" INTEGER NOT NULL;
