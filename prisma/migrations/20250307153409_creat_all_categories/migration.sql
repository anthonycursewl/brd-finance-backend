/*
  Warnings:

  - You are about to drop the column `amount` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_paid` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_amount` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "amount",
ADD COLUMN     "category_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "is_paid" BOOLEAN NOT NULL,
ADD COLUMN     "type" VARCHAR(255) NOT NULL,
ADD COLUMN     "type_amount" DECIMAL(10,2) NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "icon" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "is_deleted" BOOLEAN,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "category_id" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
