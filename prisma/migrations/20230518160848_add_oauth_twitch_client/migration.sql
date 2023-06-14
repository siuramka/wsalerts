/*
  Warnings:

  - You are about to drop the column `isBot` on the `twitchauthorizeduser` table. All the data in the column will be lost.
  - Added the required column `botOauth` to the `TwitchSetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listenChannel` to the `TwitchSetting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `twitchauthorizeduser` DROP COLUMN `isBot`;

-- AlterTable
ALTER TABLE `twitchsetting` ADD COLUMN `botOauth` VARCHAR(191) NOT NULL,
    ADD COLUMN `listenChannel` VARCHAR(191) NOT NULL;
