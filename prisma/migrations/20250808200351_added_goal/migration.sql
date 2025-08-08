/*
  Warnings:

  - You are about to drop the column `weight` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "weight",
ADD COLUMN     "currWeight" DOUBLE PRECISION,
ADD COLUMN     "fitnessLevel" TEXT,
ADD COLUMN     "goalWeight" DOUBLE PRECISION;
