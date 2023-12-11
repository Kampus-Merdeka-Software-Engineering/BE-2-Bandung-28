/*
  Warnings:

  - You are about to drop the column `namapenulis` on the `Berita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Berita` DROP COLUMN `namapenulis`,
    ADD COLUMN `namepenulis` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `comment` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
