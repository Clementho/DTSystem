-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2023 at 01:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dtsystem_db`
--
CREATE DATABASE IF NOT EXISTS `dtsystem_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dtsystem_db`;

-- --------------------------------------------------------

--
-- Table structure for table `asset`
--

CREATE TABLE `asset` (
  `assetID` int(11) NOT NULL,
  `assetName` varchar(50) NOT NULL,
  `assetDescription` varchar(550) NOT NULL,
  `assetPrice` float NOT NULL,
  `ownerAddress` varchar(255) NOT NULL,
  `creatorAddress` varchar(255) NOT NULL,
  `collectionID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `asset`
--

INSERT INTO `asset` (`assetID`, `assetName`, `assetDescription`, `assetPrice`, `ownerAddress`, `creatorAddress`, `collectionID`) VALUES
(1, 'Cosmic Voyager', 'A space-themed NFT with galactic wonders.', 0.5, '0x27bB703dDB0D91E327A4D1a16be04bcDc5799E48', '0x7215b03FD17BF7B5405A72167489E040807a4c9A', 1),
(2, 'Crypto Wizard', 'A magical NFT for crypto enthusiasts.', 1.2, '0x7215b03FD17BF7B5405A72167489E040807a4c9A', '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', 2),
(3, 'Neon Tiger', 'A vibrant tiger-themed NFT.', 0.8, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x98101479aCe93A7E389524ae50B4c515d3c00D70', 3),
(4, 'RoboGuardian', 'A futuristic robotic guardian NFT.', 1.5, '0x98101479aCe93A7E389524ae50B4c515d3c00D70', '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', 4),
(5, 'Fantasy Dragon', 'A majestic dragon NFT for fantasy lovers.', 1.8, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x98101479aCe93A7E389524ae50B4c515d3c00D70', 5),
(6, 'Steampunk Explorer', 'A steampunk-themed NFT adventure.', 1.3, '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', 6),
(7, 'Pirate\'s Treasure', 'Discover the hidden pirate treasure NFT.', 0.7, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', 7),
(8, 'Underwater Odyssey', 'Dive into the depths of the ocean with this NFT.', 0.9, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x98101479aCe93A7E389524ae50B4c515d3c00D70', 8),
(9, 'Samurai Honor', 'Embrace the way of the samurai with this NFT.', 1.2, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', 9),
(10, 'Zen Garden', 'Find tranquility in this Zen garden NFT.', 0.6, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', 10),
(11, 'Time Traveler', 'Explore the past and future with this NFT.', 1.4, '0x7215b03FD17BF7B5405A72167489E040807a4c9A', '0x0c9A3F0B2de35936bf2279A51e40325403768C2a', 11),
(12, 'Mythical Unicorn', 'A mythical unicorn NFT with enchanting beauty.', 1.1, '0x0c9A3F0B2de35936bf2279A51e40325403768C2a', '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', 12),
(13, 'Galactic Explorer', 'Embark on an interstellar journey with this NFT.', 1.6, '0x7215b03FD17BF7B5405A72167489E040807a4c9A', '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', 13),
(14, 'Desert Nomad', 'Roam the endless desert as a nomad in this NFT.', 0.7, '0x0c9A3F0B2de35936bf2279A51e40325403768C2a', '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', 14),
(15, 'Cyberpunk Assassin', 'Become a futuristic assassin with this NFT.', 1.3, '0x7215b03FD17BF7B5405A72167489E040807a4c9A', '0x0c9A3F0B2de35936bf2279A51e40325403768C2a', 15),
(16, 'Enchanted Forest', 'Discover the magic of the enchanted forest NFT.', 0.8, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x7215b03FD17BF7B5405A72167489E040807a4c9A', 16),
(17, 'Alien Encounter', 'Experience close encounters with aliens in this NFT.', 1, '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', '0x0c9A3F0B2de35936bf2279A51e40325403768C2a', 17),
(18, 'Samurai Ronin', 'A masterless samurai roams in this NFT.', 1.2, '0x98101479aCe93A7E389524ae50B4c515d3c00D70', '0x0c9A3F0B2de35936bf2279A51e40325403768C2a', 18),
(19, 'Crystal Caverns', 'Explore the crystalline depths of these caverns NFT.', 0.9, '0x98101479aCe93A7E389524ae50B4c515d3c00D70', '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', 19),
(20, 'Futuristic DJ', 'Party in the future with this DJ-themed NFT.', 1.5, '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', 20),
(21, 'Astronaut Adventure', 'Embark on an epic space journey as an astronaut.', 1, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x7215b03FD17BF7B5405A72167489E040807a4c9A', 1),
(22, 'Cryptic Sorcerer', 'Unleash magical powers with this sorcerer-themed NFT.', 1.4, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x98101479aCe93A7E389524ae50B4c515d3c00D70', 2),
(23, 'Electric Cheetah', 'A high-speed electric cheetah NFT.', 0.9, '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', '0x7215b03FD17BF7B5405A72167489E040807a4c9A', 3),
(24, 'RoboCompanion', 'A loyal robotic companion NFT.', 1.6, '0x7215b03FD17BF7B5405A72167489E040807a4c9A', '0x27bB703dDB0D91E327A4D1a16be04bcDc5799E48', 4),
(25, 'Mythical Griffin', 'An enchanting griffin NFT from the mythical world.', 1.2, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', 5),
(26, 'Steampunk Aviator', 'Take flight in a steampunk adventure with this NFT.', 1.1, '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', '0x98101479aCe93A7E389524ae50B4c515d3c00D70', 6),
(27, 'Pirate Captain', 'Lead your pirate crew with this NFT.', 1, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x98101479aCe93A7E389524ae50B4c515d3c00D70', 7),
(28, 'Deep Sea Explorer', 'Discover the mysteries of the deep sea with this NFT.', 0.8, '0xC2B5Eb3ae2c95070228EAC89ECCB495791216918', '0x4752Ef25d06FbA837A1D5A71326A2D251C8E26fF', 8);

-- --------------------------------------------------------

--
-- Table structure for table `asset_property`
--

CREATE TABLE `asset_property` (
  `assetPropertyID` int(11) NOT NULL,
  `assetID` int(11) NOT NULL,
  `propertyID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `asset_property`
--

INSERT INTO `asset_property` (`assetPropertyID`, `assetID`, `propertyID`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 3),
(6, 3, 5),
(7, 4, 6),
(8, 4, 7),
(9, 5, 1),
(10, 5, 8),
(11, 6, 9),
(12, 6, 10),
(13, 7, 11),
(14, 7, 12),
(15, 8, 9),
(16, 8, 2),
(17, 9, 15),
(18, 9, 16),
(19, 10, 9),
(20, 10, 16),
(21, 11, 17),
(22, 11, 18),
(23, 12, 3),
(24, 12, 4),
(25, 13, 19),
(26, 13, 20),
(27, 14, 21),
(28, 14, 22),
(29, 15, 23),
(30, 15, 24),
(31, 16, 25),
(32, 16, 26),
(33, 17, 23),
(34, 17, 27),
(35, 18, 28),
(36, 18, 16),
(37, 19, 29),
(38, 19, 30),
(39, 20, 31),
(40, 20, 32),
(41, 21, 33),
(42, 21, 34),
(43, 22, 35),
(44, 22, 36),
(45, 23, 35),
(46, 23, 37),
(47, 24, 38),
(48, 24, 45),
(49, 25, 35),
(50, 25, 39),
(51, 26, 9),
(52, 26, 41),
(53, 27, 42),
(54, 27, 43),
(55, 28, 44),
(56, 28, 45);

-- --------------------------------------------------------

--
-- Table structure for table `collection`
--

CREATE TABLE `collection` (
  `collectionID` int(11) NOT NULL,
  `collectionName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection`
--

INSERT INTO `collection` (`collectionID`, `collectionName`) VALUES
(1, 'Celestial Dreams'),
(2, 'Crypto Spells'),
(3, 'Neon Wildlife'),
(4, 'Cyber Guardians'),
(5, 'Mythical Beasts'),
(6, 'Steampunk Chronicles'),
(7, 'Pirate Legends'),
(8, 'Aquatic Wonders'),
(9, 'Ancient Warriors'),
(10, 'Serene Landscapes'),
(11, 'Temporal Journeys'),
(12, 'Enchanted Creatures'),
(13, 'Cosmic Adventures'),
(14, 'Desert Wanderers'),
(15, 'Cybernetic Killers'),
(16, 'Mystical Realms'),
(17, 'Extraterrestrial Mysteries'),
(18, 'Ronin Warriors'),
(19, 'Crystal Adventures'),
(20, 'Futuristic Grooves');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `propertyID` int(11) NOT NULL,
  `propertyName` varchar(50) NOT NULL,
  `propertyRarity` float NOT NULL,
  `propertyCatID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`propertyID`, `propertyName`, `propertyRarity`, `propertyCatID`) VALUES
(1, 'Red Fedora', 0.88, 1),
(2, 'Golden Lasers', 0.43, 2),
(3, 'Pointed Wizard Hat', 0.21, 1),
(4, 'Mystic Blue', 0.5, 2),
(5, 'Neon Green', 0.65, 2),
(6, 'Helmet', 0.95, 1),
(7, 'Laser Vision', 0.67, 2),
(8, 'Fiery Red', 0.3, 2),
(9, 'Goggles', 0.62, 1),
(10, 'Gear Mechanism', 0.12, 2),
(11, 'Pirate Hat', 0.43, 1),
(12, 'X Marks', 0.78, 2),
(13, 'Diving Helmet', 0.7, 1),
(14, 'Deep Blue', 0.72, 2),
(15, 'Samurai Helmet', 0.91, 1),
(16, 'Meditation', 0.95, 2),
(17, 'Time Traveler\'s Hat', 0.32, 1),
(18, 'Chrono Vision', 0.13, 2),
(19, 'Space Helmet', 0.71, 1),
(20, 'Stellar Gaze', 0.84, 2),
(21, 'Turban', 0.37, 1),
(22, 'Sandstorm Vision', 0.94, 2),
(23, 'Cyber Mask', 0.75, 1),
(24, 'Enhanced HUD', 0.64, 2),
(25, 'Leafy Crown', 0.39, 1),
(26, 'Forest Wisps', 0.42, 2),
(27, 'Glowing Green', 0.98, 2),
(28, 'Tattered Straw Hat', 0.74, 1),
(29, 'Crystal Crown', 0.14, 1),
(30, 'Shimmering Crystals', 0.85, 2),
(31, 'DJ Headset', 0.75, 1),
(32, 'Neon Lights', 0.73, 2),
(33, 'Astronaut Helmet', 0.11, 1),
(34, 'Starry View', 0.49, 2),
(35, 'Enchanted Sorcerer Hat', 0.69, 1),
(36, 'Mystical Aura', 0.21, 2),
(37, 'Electric Blue', 0.86, 2),
(38, 'Digital Visor', 0.72, 1),
(39, 'Golden Feathers', 0.79, 2),
(40, 'Aviator Goggles', 0.98, 1),
(41, 'Airship Navigator', 0.85, 2),
(42, 'Captain\'s Hat', 0.48, 1),
(43, 'Treasure Map', 0.1, 2),
(44, 'Deep-Sea Suit', 0.23, 1),
(45, 'Enhanced HUD', 0.38, 2);

-- --------------------------------------------------------

--
-- Table structure for table `property_category`
--

CREATE TABLE `property_category` (
  `propertyCatID` int(11) NOT NULL,
  `propertyCatName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_category`
--

INSERT INTO `property_category` (`propertyCatID`, `propertyCatName`) VALUES
(1, 'Hat'),
(2, 'Eyes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`assetID`),
  ADD KEY `FK_Collection` (`collectionID`);

--
-- Indexes for table `asset_property`
--
ALTER TABLE `asset_property`
  ADD PRIMARY KEY (`assetPropertyID`),
  ADD KEY `FK_Asset` (`assetID`),
  ADD KEY `FK_Property` (`propertyID`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`collectionID`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`propertyID`),
  ADD KEY `FK_Category` (`propertyCatID`);

--
-- Indexes for table `property_category`
--
ALTER TABLE `property_category`
  ADD PRIMARY KEY (`propertyCatID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asset`
--
ALTER TABLE `asset`
  MODIFY `assetID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `asset_property`
--
ALTER TABLE `asset_property`
  MODIFY `assetPropertyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `collection`
--
ALTER TABLE `collection`
  MODIFY `collectionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `propertyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `property_category`
--
ALTER TABLE `property_category`
  MODIFY `propertyCatID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `asset`
--
ALTER TABLE `asset`
  ADD CONSTRAINT `FK_Collection` FOREIGN KEY (`collectionID`) REFERENCES `collection` (`collectionID`);

--
-- Constraints for table `asset_property`
--
ALTER TABLE `asset_property`
  ADD CONSTRAINT `FK_Asset` FOREIGN KEY (`assetID`) REFERENCES `asset` (`assetID`),
  ADD CONSTRAINT `FK_Property` FOREIGN KEY (`propertyID`) REFERENCES `property` (`propertyID`);

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `FK_Category` FOREIGN KEY (`propertyCatID`) REFERENCES `property_category` (`propertyCatID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
