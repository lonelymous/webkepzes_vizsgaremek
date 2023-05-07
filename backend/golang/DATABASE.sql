CREATE DATABASE `webkepzes` CHARACTER SET = utf8mb4 COLLATE = utf8mb4_hungarian_ci;

USE `webkepzes`;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(63) NOT NULL,
  `Description` VARCHAR(255) NOT NULL,
  `Price` DECIMAL(10,2) NOT NULL,
  `Quantity` INT(11) NOT NULL,
   PRIMARY KEY (`Id`)
) CHARACTER SET = utf8mb4 COLLATE = utf8mb4_hungarian_ci;