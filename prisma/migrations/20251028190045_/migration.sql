/*
  Warnings:

  - Made the column `cpf` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
