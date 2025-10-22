-- AlterTable
ALTER TABLE "Charge" ADD COLUMN     "boletoDueDate" TIMESTAMP(3),
ADD COLUMN     "cardInstallments" INTEGER,
ADD COLUMN     "pixCopyCole" TEXT,
ADD COLUMN     "pixDueDate" TIMESTAMP(3);
