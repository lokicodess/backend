-- AlterTable
ALTER TABLE "author" ALTER COLUMN "biography" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "shipping_address" DROP NOT NULL,
ALTER COLUMN "payment_info" DROP NOT NULL;
