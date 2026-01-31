-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 31, 2026 at 06:42 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bengkel_motor`
--

-- --------------------------------------------------------

--
-- Table structure for table `loyaltypoints`
--

CREATE TABLE `loyaltypoints` (
  `id` int NOT NULL,
  `points` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `loyaltypoints`
--

INSERT INTO `loyaltypoints` (`id`, `points`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 415, '2026-01-22 07:46:22', '2026-01-30 18:17:50', 2),
(2, 108, '2026-01-25 23:06:25', '2026-01-27 18:50:47', NULL),
(3, 255, '2026-01-28 22:29:44', '2026-01-30 23:18:51', 5),
(4, 210, '2026-01-30 22:26:29', '2026-01-30 22:57:58', 6);

-- --------------------------------------------------------

--
-- Table structure for table `maintenances`
--

CREATE TABLE `maintenances` (
  `id` int NOT NULL,
  `motor_name` varchar(255) NOT NULL,
  `service_date` datetime NOT NULL,
  `next_service` datetime NOT NULL,
  `note` text,
  `reminder_h7` tinyint(1) DEFAULT '0',
  `reminder_h3` tinyint(1) DEFAULT '0',
  `reminder_h1` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `maintenances`
--

INSERT INTO `maintenances` (`id`, `motor_name`, `service_date`, `next_service`, `note`, `reminder_h7`, `reminder_h3`, `reminder_h1`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'Honda Vario 160 CBS', '2026-02-10 00:00:00', '2026-05-10 00:00:00', 'Ganti oli + tune up + cek CVT', 0, 0, 0, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(2, 'Yamaha NMAX 155', '2026-01-15 00:00:00', '2026-04-15 00:00:00', 'Servis rem + ganti kampas', 0, 0, 0, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(3, 'Honda Beat Street', '2025-12-20 00:00:00', '2026-03-20 00:00:00', 'Full servis besar + ganti filter udara', 0, 0, 0, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(4, 'Suzuki Nex II', '2026-03-05 00:00:00', '2026-06-05 00:00:00', 'Ganti aki + cek karburator', 0, 0, 0, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(5, 'Yamaha Aerox 155', '2026-02-01 00:00:00', '2026-05-01 00:00:00', 'Ganti ban belakang + balancing', 0, 0, 0, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(6, 'Honda PCX 160', '2026-04-10 00:00:00', '2026-07-10 00:00:00', 'Servis CVT + ganti oli gear', 0, 0, 0, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(59, 'Honda  CBR1000RR (B 3421 HR)', '2026-01-30 22:30:21', '2026-01-31 07:00:00', 'Ganti oli ', 0, 0, 0, '2026-01-30 22:30:21', '2026-01-30 22:30:21', 6),
(60, 'Suzuki Hayabusa 1000cc (B 1754 RE)', '2026-01-30 22:37:39', '2026-01-31 07:00:00', 'Tune up', 0, 0, 0, '2026-01-30 22:37:39', '2026-01-30 22:37:39', 6),
(62, 'Kawasaki  Ninja 1000cc (B 2341 HQ)', '2026-01-30 22:40:39', '2026-01-31 07:00:00', 'Pergantian Lampu Relay', 0, 0, 0, '2026-01-30 22:40:39', '2026-01-30 22:40:39', 6),
(63, 'Honda Astrea (B 5723 FG)', '2026-01-30 22:59:56', '2026-01-31 07:00:00', 'Wajib Ganti oli setelah Rayen', 0, 0, 0, '2026-01-30 22:59:56', '2026-01-30 22:59:56', 6),
(64, 'Honda Beat ESP (B 9078 AW)', '2026-01-30 23:18:21', '2026-01-31 07:00:00', 'Ganti oli ', 0, 0, 0, '2026-01-30 23:18:21', '2026-01-30 23:18:21', 5);

-- --------------------------------------------------------

--
-- Table structure for table `pushsubscriptions`
--

CREATE TABLE `pushsubscriptions` (
  `id` int NOT NULL,
  `subscription` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pushsubscriptions`
--

INSERT INTO `pushsubscriptions` (`id`, `subscription`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, '{\"keys\": {\"auth\": \"dummy-auth-key\", \"p256dh\": \"dummy-p256dh-key\"}, \"endpoint\": \"https://example-push-service.com/send\"}', '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2);

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE `rewards` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `points_needed` int NOT NULL,
  `stock` int DEFAULT '100',
  `description` text,
  `is_active` tinyint(1) DEFAULT '1',
  `image_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`id`, `name`, `points_needed`, `stock`, `description`, `is_active`, `image_url`, `createdAt`, `updatedAt`) VALUES
(1, 'Diskon 20% Full Servis Besar', 300, 50, 'Potongan 25% untuk servis lengkap', 1, NULL, '2026-01-22 07:46:22', '2026-01-28 23:36:19'),
(3, 'Diskon 10 % Servis Cvt + TB ( Throttle Body)', 100, 9, 'Potongan Diskon 10% Servis CVT + TB', 1, NULL, '2026-01-22 07:46:22', '2026-01-30 23:18:51'),
(5, 'Diskon 5% Downsize Shock depan ', 50, 19, 'Diskon 5% Downsize Shock depan ', 1, NULL, '2026-01-22 07:46:22', '2026-01-30 14:43:20'),
(6, 'Pengecekan Kerusakan Kendaraan Gratis', 20, 100, 'Pengecekan Kendaraan Gratis', 1, NULL, '2026-01-22 07:46:22', '2026-01-28 23:37:56'),
(9, 'Gratis Ganti Oli 1x', 500, 9, 'Kumpulkan sampai 500 POIN akan mendapatkan reward ini', 1, NULL, '2026-01-29 00:25:09', '2026-01-30 18:17:50');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `points` int DEFAULT '0',
  `duration` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `price`, `points`, `duration`, `createdAt`, `updatedAt`) VALUES
(1, 'Service + Ganti Oli', 70000, 5, '15  Menit', '2026-01-22 07:46:22', '2026-01-29 00:26:16'),
(2, 'Tune Up + Cek Injeksi/Karburator ', 150000, 20, '2 Jam', '2026-01-22 07:46:22', '2026-01-29 00:26:55'),
(4, 'Jasa Pemasangan Variasi Motor', 50000, 5, '30 Menit', '2026-01-22 07:46:22', '2026-01-29 00:29:43'),
(5, 'Full Servis Besar (Oli + Filter + Throttle body + Tune Up)', 500000, 100, '5 - 6 jam ', '2026-01-22 07:46:22', '2026-01-29 00:34:20'),
(8, 'Bore up 200cc Motor Matic (Honda)', 4000000, 500, '1-2 Hari', '2026-01-22 07:46:22', '2026-01-29 00:36:30'),
(9, 'Servis CVT (Vario/NMAX/Aerox)', 200000, 25, '1 jam', '2026-01-22 07:46:22', '2026-01-22 07:46:22'),
(10, 'Bore up 200cc Motor Matic (Yamaha)', 6000000, 500, '2-3 Hari', '2026-01-22 07:46:22', '2026-01-29 00:37:32'),
(12, 'Bore up Harian All Matic', 2000000, 200, '1 Hari', '2026-01-29 00:38:34', '2026-01-29 00:38:34');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `amount` int NOT NULL,
  `points_earned` int DEFAULT '0',
  `status` enum('Menunggu','Proses','Selesai') DEFAULT 'Menunggu',
  `note` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  `ServiceId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `amount`, `points_earned`, `status`, `note`, `createdAt`, `updatedAt`, `UserId`, `ServiceId`) VALUES
(4, 150000, 20, 'Selesai', 'Tune up Nex II', '2026-01-22 07:46:22', '2026-01-23 01:20:48', 2, 2),
(5, 350000, 35, 'Selesai', 'Ganti ban Aerox', '2026-01-22 07:46:22', '2026-01-28 23:12:17', 2, 4),
(20, 85000, 10, 'Selesai', 'TEST', '2026-01-28 22:31:51', '2026-01-28 23:21:48', 5, 1),
(23, 450000, 50, 'Selesai', 'tidak', '2026-01-28 23:31:38', '2026-01-30 15:29:28', 5, 5),
(25, 2000000, 200, 'Selesai', 'motor nmax', '2026-01-30 15:37:35', '2026-01-30 18:16:30', 2, 12),
(26, 4000000, 500, 'Selesai', 'motor vario 160', '2026-01-30 15:37:59', '2026-01-30 15:37:59', 5, 8),
(27, 6000000, 500, 'Selesai', 'Aerox 155', '2026-01-30 16:02:00', '2026-01-30 17:33:00', 2, 10),
(28, 500000, 100, 'Selesai', 'test', '2026-01-30 18:06:54', '2026-01-30 18:16:25', 5, 5),
(29, 150000, 20, 'Selesai', 'test', '2026-01-30 18:07:06', '2026-01-30 18:16:21', 5, 2),
(30, 500000, 100, 'Selesai', 'test', '2026-01-30 18:07:18', '2026-01-30 18:16:16', 2, 5),
(31, 50000, 5, 'Selesai', 'test', '2026-01-30 18:07:29', '2026-01-30 18:16:14', 2, 4),
(32, 70000, 5, 'Selesai', 'Motor Honda CBR1000RR ', '2026-01-30 22:27:13', '2026-01-30 22:27:39', 6, 1),
(33, 50000, 5, 'Selesai', 'Pemasangan Lampu Biled', '2026-01-30 22:38:45', '2026-01-30 22:38:52', 6, 4),
(34, 2000000, 200, 'Selesai', 'Motor Astrea ', '2026-01-30 22:57:47', '2026-01-30 22:57:58', 6, 12),
(35, 70000, 5, 'Selesai', 'Motor Beat ESP ', '2026-01-30 23:17:04', '2026-01-30 23:17:12', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin Bengkel', 'admin@bengkel.com', '$2a$10$SekEt4yK3vdz.dV1O.TgO.KobPHwtenLH2bQIkEy8vmEh6UnS/jy6', 'admin', '2026-01-22 07:46:22', '2026-01-22 07:46:22'),
(2, 'Katon', 'katon@bengkel.com', '$2a$12$1BcpblIilZTRqi73sikd3ef.KMXi68iv.jbY.H9Gz43XemU1uU5Pm', 'user', '2026-01-22 07:46:22', '2026-01-22 07:46:22'),
(5, 'Tonsk', 'tonsk@bengkel.com', '$2a$10$YyYlgCXPE6P1Muf9ZcfMb.iaNeszrF/lqg948CamJdYuZlCZJYwiG', 'user', '2026-01-28 22:29:44', '2026-01-28 22:29:44'),
(6, 'Mbappe', 'mbappe@bengkel.com', '$2a$10$TAu1wOj7uLt10SWzbcJrOOcIDsYVudGXgopJkL.R5pIhsZUSbkSNi', 'user', '2026-01-30 22:26:29', '2026-01-30 22:26:29');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int NOT NULL,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `plate` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `brand`, `model`, `plate`, `year`, `color`, `image_url`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'Honda', 'Vario 160 CBS', 'B 1234 XYZ', 2023, 'Hitam Matte', NULL, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(2, 'Yamaha', 'NMAX 155 Connected', 'B 5678 ABC', 2022, 'Merah Metalik', NULL, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(3, 'Honda', 'Beat Street', 'B 9012 DEF', 2021, 'Putih', NULL, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(4, 'Suzuki', 'Nex II 115', 'B 3456 GHI', 2020, 'Biru', NULL, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(5, 'Yamaha', 'Aerox 155 VVA', 'B 7890 JKL', 2023, 'Hitam', NULL, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(6, 'Honda', 'PCX 160 Hybrid', 'B 1122 MNO', 2024, 'Abu-abu Metalik', NULL, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(7, 'Honda', 'Scoopy Prestige', 'B 3344 PQR', 2022, 'Cream', NULL, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(8, 'Yamaha', 'FreeGo S Version', 'B 5566 STU', 2021, 'Silver', NULL, '2026-01-22 07:46:22', '2026-01-22 07:46:22', 2),
(10, 'Honda', 'Vario', 'B 4568 JK', 2019, 'HITAM', NULL, '2026-01-28 22:31:17', '2026-01-28 22:31:17', 5),
(11, 'Kawasaki', 'Ninja RR', 'B 3521 YR', 2015, 'Abu-abu', NULL, '2026-01-30 15:51:57', '2026-01-30 15:51:57', 5),
(12, 'Honda ', 'CBR1000RR', 'B 3421 HR', 2026, 'Merah', NULL, '2026-01-30 22:28:48', '2026-01-30 22:28:48', 6),
(13, 'Suzuki', 'Hayabusa 1000cc', 'B 1754 RE', 2021, 'HITAM', NULL, '2026-01-30 22:35:20', '2026-01-30 22:35:20', 6),
(14, 'Kawasaki ', 'Ninja 1000cc', 'B 2341 HQ', 2021, 'Hijau', NULL, '2026-01-30 22:40:06', '2026-01-30 22:40:06', 6),
(15, 'Honda', 'Astrea', 'B 5723 FG', 2020, 'PUTIH', NULL, '2026-01-30 22:58:40', '2026-01-30 22:58:40', 6),
(16, 'Honda', 'Beat ESP', 'B 9078 AW', 2018, 'PUTIH', NULL, '2026-01-30 23:17:50', '2026-01-30 23:17:50', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loyaltypoints`
--
ALTER TABLE `loyaltypoints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `maintenances`
--
ALTER TABLE `maintenances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `pushsubscriptions`
--
ALTER TABLE `pushsubscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `ServiceId` (`ServiceId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `users_email` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plate` (`plate`),
  ADD UNIQUE KEY `plate_2` (`plate`),
  ADD UNIQUE KEY `plate_3` (`plate`),
  ADD UNIQUE KEY `plate_4` (`plate`),
  ADD UNIQUE KEY `plate_5` (`plate`),
  ADD UNIQUE KEY `plate_6` (`plate`),
  ADD UNIQUE KEY `plate_7` (`plate`),
  ADD UNIQUE KEY `plate_8` (`plate`),
  ADD UNIQUE KEY `plate_9` (`plate`),
  ADD UNIQUE KEY `plate_10` (`plate`),
  ADD UNIQUE KEY `plate_11` (`plate`),
  ADD UNIQUE KEY `plate_12` (`plate`),
  ADD UNIQUE KEY `plate_13` (`plate`),
  ADD UNIQUE KEY `plate_14` (`plate`),
  ADD UNIQUE KEY `plate_15` (`plate`),
  ADD UNIQUE KEY `plate_16` (`plate`),
  ADD KEY `UserId` (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loyaltypoints`
--
ALTER TABLE `loyaltypoints`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `maintenances`
--
ALTER TABLE `maintenances`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `pushsubscriptions`
--
ALTER TABLE `pushsubscriptions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `loyaltypoints`
--
ALTER TABLE `loyaltypoints`
  ADD CONSTRAINT `loyaltypoints_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_10` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_12` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_13` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_14` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_15` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_16` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_17` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_8` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `loyaltypoints_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `maintenances`
--
ALTER TABLE `maintenances`
  ADD CONSTRAINT `maintenances_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_10` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_12` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_13` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_14` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_15` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_16` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_8` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenances_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pushsubscriptions`
--
ALTER TABLE `pushsubscriptions`
  ADD CONSTRAINT `pushsubscriptions_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_10` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_12` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_13` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_14` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_15` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_16` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_17` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_8` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pushsubscriptions_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_10` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_12` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_13` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_14` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_15` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_16` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_17` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_18` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_19` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_20` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_21` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_22` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_23` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_24` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_25` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_26` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_27` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_28` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_29` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_30` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_31` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_32` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_4` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_6` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_8` FOREIGN KEY (`ServiceId`) REFERENCES `services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_10` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_11` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_12` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_13` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_14` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_15` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_16` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_5` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_7` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_8` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicles_ibfk_9` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
