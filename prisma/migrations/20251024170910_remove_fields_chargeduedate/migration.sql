/*
  Warnings:

  - You are about to drop the column `chargeDueDate` on the `Charge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Charge" DROP COLUMN "chargeDueDate",
ADD COLUMN     "boletoCode" TEXT;
