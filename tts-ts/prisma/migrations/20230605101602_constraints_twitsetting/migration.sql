/*
  Warnings:

  - A unique constraint covering the columns `[botUsername]` on the table `TwitchSetting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[botOauth]` on the table `TwitchSetting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `TwitchSetting_botUsername_key` ON `TwitchSetting`(`botUsername`);

-- CreateIndex
CREATE UNIQUE INDEX `TwitchSetting_botOauth_key` ON `TwitchSetting`(`botOauth`);
