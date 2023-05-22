/*
  Warnings:

  - You are about to drop the column `listenChannel` on the `twitchsetting` table. All the data in the column will be lost.
  - Added the required column `listenToUserChannel` to the `TwitchAuthorizedUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `twitchauthorizeduser` ADD COLUMN `listenToUserChannel` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `twitchsetting` DROP COLUMN `listenChannel`;
