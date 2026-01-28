/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.14-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 192.168.255.254    Database: bengkel_motor
-- ------------------------------------------------------
-- Server version	9.5.0

USE `bengkel_motor`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `loyaltypoints`
--

DROP TABLE IF EXISTS `LoyaltyPoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `LoyaltyPoints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `points` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `LoyaltyPoints_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LoyaltyPoints`
--

LOCK TABLES `LoyaltyPoints` WRITE;
/*!40000 ALTER TABLE `LoyaltyPoints` DISABLE KEYS */;
INSERT INTO `LoyaltyPoints` VALUES
(1,10,'2026-01-22 07:46:22','2026-01-23 01:23:57',2);
/*!40000 ALTER TABLE `LoyaltyPoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Maintenances`
--

DROP TABLE IF EXISTS `Maintenances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Maintenances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `motor_name` varchar(255) NOT NULL,
  `service_date` datetime NOT NULL,
  `next_service` datetime NOT NULL,
  `note` text,
  `reminder_h7` tinyint(1) DEFAULT '0',
  `reminder_h3` tinyint(1) DEFAULT '0',
  `reminder_h1` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Maintenances_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Maintenances`
--

LOCK TABLES `Maintenances` WRITE;
/*!40000 ALTER TABLE `Maintenances` DISABLE KEYS */;
INSERT INTO `Maintenances` VALUES
(1,'Honda Vario 160 CBS','2026-02-10 00:00:00','2026-05-10 00:00:00','Ganti oli + tune up + cek CVT',0,0,0,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(2,'Yamaha NMAX 155','2026-01-15 00:00:00','2026-04-15 00:00:00','Servis rem + ganti kampas',0,0,0,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(3,'Honda Beat Street','2025-12-20 00:00:00','2026-03-20 00:00:00','Full servis besar + ganti filter udara',0,0,0,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(4,'Suzuki Nex II','2026-03-05 00:00:00','2026-06-05 00:00:00','Ganti aki + cek karburator',0,0,0,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(5,'Yamaha Aerox 155','2026-02-01 00:00:00','2026-05-01 00:00:00','Ganti ban belakang + balancing',0,0,0,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(6,'Honda PCX 160','2026-04-10 00:00:00','2026-07-10 00:00:00','Servis CVT + ganti oli gear',0,0,0,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(7,'Tune up Nex II','2026-01-23 01:16:44','2026-04-23 01:16:44','Servis berkala',0,0,0,'2026-01-23 01:16:44','2026-01-23 01:16:44',2),
(8,'Tune up Nex II','2026-01-23 01:20:48','2026-04-23 01:20:48','Servis berkala',0,0,0,'2026-01-23 01:20:48','2026-01-23 01:20:48',2);
/*!40000 ALTER TABLE `Maintenances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PushSubscriptions`
--

DROP TABLE IF EXISTS `PushSubscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `PushSubscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscription` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `PushSubscriptions_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PushSubscriptions`
--

LOCK TABLES `PushSubscriptions` WRITE;
/*!40000 ALTER TABLE `PushSubscriptions` DISABLE KEYS */;
INSERT INTO `PushSubscriptions` VALUES
(1,'{\"keys\": {\"auth\": \"dummy-auth-key\", \"p256dh\": \"dummy-p256dh-key\"}, \"endpoint\": \"https://example-push-service.com/send\"}','2026-01-22 07:46:22','2026-01-22 07:46:22',2);
/*!40000 ALTER TABLE `PushSubscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rewards`
--

DROP TABLE IF EXISTS `Rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rewards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `points_needed` int NOT NULL,
  `stock` int DEFAULT '100',
  `description` text,
  `is_active` tinyint(1) DEFAULT '1',
  `image_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rewards`
--

LOCK TABLES `Rewards` WRITE;
/*!40000 ALTER TABLE `Rewards` DISABLE KEYS */;
INSERT INTO `Rewards` VALUES
(1,'Diskon 25% Full Servis Besar',150,50,'Potongan 25% untuk servis lengkap',1,NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22'),
(2,'Gratis Ganti Oli Mesin 1x',200,29,'Ganti oli standar gratis',1,NULL,'2026-01-22 07:46:22','2026-01-23 01:23:57'),
(3,'Voucher Cuci Motor + Vakum 5x',80,99,'Cuci motor premium 5 kali gratis',1,NULL,'2026-01-22 07:46:22','2026-01-23 01:23:35'),
(4,'Ganti Ban Depan Gratis (standar)',350,15,'Ganti ban depan tanpa biaya',1,NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22'),
(5,'Helm Half Face Diskon 40%',250,25,'Helm half face original diskon 40%',1,NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22'),
(6,'Servis Rem + Tune Up Gratis',180,40,'Servis rem + tune up tanpa biaya',1,NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22'),
(7,'Jaket Riding Sintink Edition',800,10,'Jaket limited edition Sintink Garage',1,NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22'),
(8,'Ganti Aki Yuasa Diskon 30%',300,20,'Aki motor Yuasa diskon 30%',1,NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22');
/*!40000 ALTER TABLE `Rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Services`
--

DROP TABLE IF EXISTS `Services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `points` int DEFAULT '0',
  `duration` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Services`
--

LOCK TABLES `Services` WRITE;
/*!40000 ALTER TABLE `Services` DISABLE KEYS */;
INSERT INTO `Services` VALUES
(1,'Ganti Oli Mesin Standar',85000,10,'30 menit','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(2,'Tune Up + Cek Injeksi/Karburator',150000,20,'1 jam','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(3,'Servis Rem Depan & Belakang',120000,15,'45 menit','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(4,'Ganti Ban Depan + Balancing',350000,35,'1 jam','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(5,'Full Servis Besar (Oli + Filter + Tune Up)',450000,50,'2 jam','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(6,'Ganti Aki Motor Yuasa',250000,25,'45 menit','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(7,'Cuci Motor + Vakum + Poles Body',75000,8,'30 menit','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(8,'Ganti Kampas Kopling + Oli Gear',180000,20,'1.5 jam','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(9,'Servis CVT (Vario/NMAX/Aerox)',200000,25,'1 jam','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(10,'Ganti Lampu LED + Senja + Sein',95000,12,'30 menit','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(11,'katon',20000,123,'1 jam','2026-01-23 01:21:24','2026-01-23 01:21:32');
/*!40000 ALTER TABLE `Services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `points_earned` int DEFAULT '0',
  `status` enum('Menunggu','Proses','Selesai') DEFAULT 'Menunggu',
  `note` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  `ServiceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `ServiceId` (`ServiceId`),
  CONSTRAINT `Transactions_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Transactions_ibfk_2` FOREIGN KEY (`ServiceId`) REFERENCES `Services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transactions`
--

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
INSERT INTO `Transactions` VALUES
(1,85000,10,'Selesai','Ganti oli Vario 160','2026-01-10 09:45:00','2026-01-22 07:46:22',2,1),
(2,120000,15,'Selesai','Servis rem NMAX','2025-12-15 14:20:00','2026-01-22 07:46:22',2,3),
(3,450000,50,'Selesai','Full servis Beat Street','2025-11-20 10:00:00','2026-01-22 07:46:22',2,5),
(4,150000,20,'Selesai','Tune up Nex II','2026-01-22 07:46:22','2026-01-23 01:20:48',2,2),
(5,350000,35,'Menunggu','Ganti ban Aerox','2026-01-22 07:46:22','2026-01-22 07:46:22',2,4),
(6,250000,25,'Selesai','Ganti aki PCX','2025-10-05 11:30:00','2026-01-22 07:46:22',2,6),
(7,75000,8,'Selesai','Cuci + poles Vario','2025-09-20 15:10:00','2026-01-22 07:46:22',2,7),
(8,200000,25,'Selesai','Servis CVT Scoopy','2025-08-15 13:00:00','2026-01-22 07:46:22',2,9),
(9,12,123,'Selesai','test','2026-01-23 01:22:02','2026-01-23 01:22:02',2,11),
(10,85,10,'Proses','test servis','2026-01-23 01:26:53','2026-01-23 01:26:53',3,1),
(11,150,20,'Menunggu','serviss','2026-01-23 01:27:53','2026-01-23 01:27:53',3,2),
(12,85,10,'Menunggu','testttt','2026-01-23 01:28:55','2026-01-23 01:28:55',3,1);
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
(1,'Admin Bengkel','admin@bengkel.com','$2a$10$SekEt4yK3vdz.dV1O.TgO.KobPHwtenLH2bQIkEy8vmEh6UnS/jy6','admin','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(2,'Katon','katon@bengkel.com','$2a$12$1BcpblIilZTRqi73sikd3ef.KMXi68iv.jbY.H9Gz43XemU1uU5Pm','user','2026-01-22 07:46:22','2026-01-22 07:46:22'),
(3,'mattew','mattew@bengkel.com','$2a$12$1BcpblIilZTRqi73sikd3ef.KMXi68iv.jbY.H9Gz43XemU1uU5Pm','user','2026-01-22 07:46:22','2026-01-22 07:46:22');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehicles`
--

DROP TABLE IF EXISTS `Vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `plate` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `plate` (`plate`),
  UNIQUE KEY `plate_2` (`plate`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Vehicles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehicles`
--

LOCK TABLES `Vehicles` WRITE;
/*!40000 ALTER TABLE `Vehicles` DISABLE KEYS */;
INSERT INTO `Vehicles` VALUES
(1,'Honda','Vario 160 CBS','B 1234 XYZ',2023,'Hitam Matte',NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(2,'Yamaha','NMAX 155 Connected','B 5678 ABC',2022,'Merah Metalik',NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(3,'Honda','Beat Street','B 9012 DEF',2021,'Putih',NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(4,'Suzuki','Nex II 115','B 3456 GHI',2020,'Biru',NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(5,'Yamaha','Aerox 155 VVA','B 7890 JKL',2023,'Hitam',NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(6,'Honda','PCX 160 Hybrid','B 1122 MNO',2024,'Abu-abu Metalik',NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(7,'Honda','Scoopy Prestige','B 3344 PQR',2022,'Cream',NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(8,'Yamaha','FreeGo S Version','B 5566 STU',2021,'Silver',NULL,'2026-01-22 07:46:22','2026-01-22 07:46:22',2),
(9,'Honda','vario','b 123 u',2026,'hitam',NULL,'2026-01-23 01:17:55','2026-01-23 01:17:55',1);
/*!40000 ALTER TABLE `Vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-24 17:40:54
