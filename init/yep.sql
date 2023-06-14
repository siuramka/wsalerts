-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2023 at 09:16 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wsalerts`
--

-- --------------------------------------------------------

--
-- Table structure for table `provider`
--

CREATE TABLE `provider` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `provider`
--

INSERT INTO `provider` (`id`, `name`) VALUES
(23, 'Uberduck'),
(41, 'Streamlabs');

-- --------------------------------------------------------

--
-- Table structure for table `selectedprovider`
--

CREATE TABLE `selectedprovider` (
  `id` int(11) NOT NULL,
  `providerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `selectedprovider`
--

INSERT INTO `selectedprovider` (`id`, `providerId`) VALUES
(99, 41);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `muted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `muted`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `twitchauthorizeduser`
--

CREATE TABLE `twitchauthorizeduser` (
  `id` int(11) NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `twitchId` int(11) NOT NULL,
  `listenToUserChannel` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `twitchauthorizeduser`
--

INSERT INTO `twitchauthorizeduser` (`id`, `username`, `twitchId`, `listenToUserChannel`) VALUES
(1, 'mariuspure', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `twitchsetting`
--

CREATE TABLE `twitchsetting` (
  `id` int(11) NOT NULL,
  `botUsername` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `botOauth` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `twitchsetting`
--

INSERT INTO `twitchsetting` (`id`, `botUsername`, `botOauth`) VALUES
(1, 'botDoris', 'oauth:w6992nh6iqemxuceibk10czbprqkev');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discordId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discriminator` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `avatar`, `discordId`, `discriminator`) VALUES
(1, 'marius', '', '', ''),
(3, 'marius', '3da61ce59263547112c2cc2803b83748', '164006905365135360', '0650');

-- --------------------------------------------------------

--
-- Table structure for table `voice`
--

CREATE TABLE `voice` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `displayName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `selected` tinyint(1) NOT NULL DEFAULT 0,
  `providerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `voice`
--

INSERT INTO `voice` (`id`, `name`, `displayName`, `selected`, `providerId`) VALUES
(1, 'snoop-dogg-cod', 'Snoopdog', 1, 23),
(2, 'patrick', 'Spongebob Patrick', 1, 23),
(4, 'heavy', 'Heavy voice', 1, 23),
(5, 'cr1tikal', 'MoistCritical', 0, 23),
(87, 'Brian', 'Brian', 1, 41),
(88, 'Astrid', 'Astrid', 1, 41);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('00b8128c-830b-48cf-9bfb-ef62e8a309a5', '5aa238047916c9b6e6550045ae937fa6635b9b771ffe02d2a4336b168911b64b', '2023-06-09 15:38:02.870', '20230609153802_add_settings_model', NULL, NULL, '2023-06-09 15:38:02.845', 1),
('0f2d9f10-72c0-4a1f-b810-fde7e0746cf8', 'e23eb4a289eda8c2b90304ef81f38ece0645bb3b9692e7b48d174b53826a9044', '2023-05-18 16:09:01.970', '20230518160848_add_oauth_twitch_client', NULL, NULL, '2023-05-18 16:09:01.928', 1),
('276c79be-1fba-43d5-afa6-70f33ebd62eb', 'c2bcf25a2d7ab400ac96d986034ad6657e7ff493b92a0f98703314441b1dc211', '2023-05-25 13:56:40.140', '20230525135640_remove_role', NULL, NULL, '2023-05-25 13:56:40.115', 1),
('51241ef9-e1de-4210-a0e8-1e1c4ada55a7', '08246c2aa0dae5a4224720e3b890a85b981d3d60ab51de7a6318a8f293d5aea2', '2023-05-15 13:09:38.840', '20230515130938_init', NULL, NULL, '2023-05-15 13:09:38.607', 1),
('940a325e-09c0-4c60-8314-088ed38c76cc', '22892b4d4029c530fd98da9d3315a651096f8a1983a8c6905aa84a6910c17132', '2023-06-05 10:16:02.770', '20230605101602_constraints_twitsetting', NULL, NULL, '2023-06-05 10:16:02.747', 1),
('9c114e10-4eab-4316-b372-0cd226a6614d', '3d284dbfea1811a92d09ed421959f02e30d8710367796bb39c1b1d6facb4774d', '2023-05-20 22:05:43.507', '20230520220529_add_listen_user_channel_boolean_twitch_setting', NULL, NULL, '2023-05-20 22:05:43.441', 1),
('ddab443e-7f2b-4c3c-a41c-6281080df07f', 'b5a3d176d672dfd7de9239ce7c685bfd3a44ef2d61688c86980cf99672def194', '2023-06-05 10:13:17.174', '20230605101317_selected_provider', NULL, NULL, '2023-06-05 10:13:17.115', 1),
('e889b5d7-6318-4200-a738-ce782b06410b', '0ee4b8c40d8448a40569eb6d11ba9e6dc14a310c9687eb28ce3ba26c8efb2cf9', '2023-05-25 10:06:18.609', '20230525100609_add_discord_user_data', NULL, NULL, '2023-05-25 10:06:18.580', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selectedprovider`
--
ALTER TABLE `selectedprovider`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SelectedProvider_providerId_key` (`providerId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `twitchauthorizeduser`
--
ALTER TABLE `twitchauthorizeduser`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TwitchAuthorizedUser_twitchId_fkey` (`twitchId`);

--
-- Indexes for table `twitchsetting`
--
ALTER TABLE `twitchsetting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `TwitchSetting_botUsername_key` (`botUsername`),
  ADD UNIQUE KEY `TwitchSetting_botOauth_key` (`botOauth`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_discordId_key` (`discordId`);

--
-- Indexes for table `voice`
--
ALTER TABLE `voice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Voice_providerId_fkey` (`providerId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `provider`
--
ALTER TABLE `provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `selectedprovider`
--
ALTER TABLE `selectedprovider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `twitchauthorizeduser`
--
ALTER TABLE `twitchauthorizeduser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `twitchsetting`
--
ALTER TABLE `twitchsetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `voice`
--
ALTER TABLE `voice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `selectedprovider`
--
ALTER TABLE `selectedprovider`
  ADD CONSTRAINT `SelectedProvider_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `provider` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `twitchauthorizeduser`
--
ALTER TABLE `twitchauthorizeduser`
  ADD CONSTRAINT `TwitchAuthorizedUser_twitchId_fkey` FOREIGN KEY (`twitchId`) REFERENCES `twitchsetting` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `voice`
--
ALTER TABLE `voice`
  ADD CONSTRAINT `Voice_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `provider` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
