/*
  Warnings:

  - Made the column `boletoDueDate` on table `Charge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cardInstallments` on table `Charge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pixCopyCole` on table `Charge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pixDueDate` on table `Charge` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Charge" ALTER COLUMN "boletoDueDate" SET NOT NULL,
ALTER COLUMN "cardInstallments" SET NOT NULL,
ALTER COLUMN "pixCopyCole" SET NOT NULL,
ALTER COLUMN "pixDueDate" SET NOT NULL;
