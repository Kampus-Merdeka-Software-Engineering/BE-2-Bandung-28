/*
  Warnings:

  - You are about to drop the column `penulisId` on the `Berita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Berita` DROP COLUMN `penulisId`,
    ADD COLUMN `namapenulis` VARCHAR(255) NULL;
