/*
  Warnings:

  - You are about to drop the column `heightCm` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "heightCm",
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION;
