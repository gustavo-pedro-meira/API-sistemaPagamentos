/*
  Warnings:

  - You are about to drop the column `boletoDueDate` on the `Charge` table. All the data in the column will be lost.
  - You are about to drop the column `cardDueDate` on the `Charge` table. All the data in the column will be lost.
  - You are about to drop the column `pixDueDate` on the `Charge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Charge" DROP COLUMN "boletoDueDate",
DROP COLUMN "cardDueDate",
DROP COLUMN "pixDueDate",
ADD COLUMN     "chargeDueDate" TIMESTAMP(3);
