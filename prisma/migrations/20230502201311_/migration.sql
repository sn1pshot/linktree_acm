/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[catid]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[catname]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[link_id]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linktreeid]` on the table `Linktreelink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryname` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_categoryId_fkey";

-- DropIndex
DROP INDEX "Link_categoryId_key";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "categoryId",
ADD COLUMN     "categoryname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_catid_key" ON "Category"("catid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_catname_key" ON "Category"("catname");

-- CreateIndex
CREATE UNIQUE INDEX "Link_link_id_key" ON "Link"("link_id");

-- CreateIndex
CREATE UNIQUE INDEX "Linktreelink_linktreeid_key" ON "Linktreelink"("linktreeid");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_categoryname_fkey" FOREIGN KEY ("categoryname") REFERENCES "Category"("catname") ON DELETE RESTRICT ON UPDATE CASCADE;
