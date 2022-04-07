-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 07 avr. 2022 à 12:51
-- Version du serveur : 5.7.31
-- Version de PHP : 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lawfirm`
--

-- --------------------------------------------------------

--
-- Structure de la table `cases`
--

DROP TABLE IF EXISTS `cases`;
CREATE TABLE IF NOT EXISTS `cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `closed_at` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cases`
--

INSERT INTO `cases` (`id`, `ref`, `description`, `closed_at`, `createdAt`, `updatedAt`) VALUES
(1, 'Divorce ', 'Divorce simple sur demande de Mme is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type sp', NULL, '2022-04-07 12:41:24', '2022-04-07 12:47:50'),
(2, 'Vol', 'Affaire  de vol concernant Mr X, is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type spe', NULL, '2022-04-07 12:42:46', '2022-04-07 12:48:27'),
(3, 'AVP Moto', 'AVP en Moto', NULL, '2022-04-07 12:43:07', '2022-04-07 12:48:03'),
(4, 'Liquidation entreprise', 'Liquidation d\'entreprise ', '2022-07-04', '2022-04-07 12:43:31', '2022-04-07 12:50:43');

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `name`, `firstname`, `address`, `birthdate`, `createdAt`, `updatedAt`) VALUES
(1, 'Breuil', 'Allan', '45 rue de Lorraine, 57700, Hayange', '2022-04-14', '2022-04-07 12:39:28', '2022-04-07 12:39:28'),
(2, 'Calvet', 'Yann', '453 bis avenue Jeanne d\'Arc, 67899, Florange', '2022-04-21', '2022-04-07 12:39:51', '2022-04-07 12:39:51'),
(3, 'Idlbi', 'Abdoul', '45 Rue du Saulcy, 88000, City', '2022-04-27', '2022-04-07 12:40:23', '2022-04-07 12:40:23'),
(4, 'Guerder', 'Marie', '35 Avenue de Lorraine, 57190, Florange', '2022-04-05', '2022-04-07 12:40:42', '2022-04-07 12:40:42');

-- --------------------------------------------------------

--
-- Structure de la table `client_case`
--

DROP TABLE IF EXISTS `client_case`;
CREATE TABLE IF NOT EXISTS `client_case` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clientId` int(11) NOT NULL,
  `caseId` int(11) NOT NULL,
  PRIMARY KEY (`clientId`,`caseId`),
  KEY `caseId` (`caseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `client_case`
--

INSERT INTO `client_case` (`createdAt`, `updatedAt`, `clientId`, `caseId`) VALUES
('2022-04-07 12:44:14', '2022-04-07 12:44:14', 1, 1),
('2022-04-07 12:49:29', '2022-04-07 12:49:29', 1, 2),
('2022-04-07 12:49:35', '2022-04-07 12:49:35', 1, 3),
('2022-04-07 12:48:33', '2022-04-07 12:48:33', 3, 2),
('2022-04-07 12:50:30', '2022-04-07 12:50:30', 3, 4),
('2022-04-07 12:49:24', '2022-04-07 12:49:24', 4, 2),
('2022-04-07 12:49:40', '2022-04-07 12:49:40', 4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `caseId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `caseId` (`caseId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `description`, `duration`, `createdAt`, `updatedAt`, `caseId`) VALUES
(1, 'Première rencontre', 45, '2022-04-07 12:45:49', '2022-04-07 12:45:49', 1),
(2, 'Lorem Ipsum', 60, '2022-04-07 12:46:40', '2022-04-07 12:46:40', 1),
(3, 'Création du dossier', 60, '2022-04-07 12:47:01', '2022-04-07 12:47:01', 1),
(4, 'Rencontre avec monsieur ', 60, '2022-04-07 12:48:44', '2022-04-07 12:48:44', 2),
(5, 'Elaboration du dossier', 90, '2022-04-07 12:48:56', '2022-04-07 12:48:56', 2),
(6, 'Appel telephonique', 200, '2022-04-07 12:49:09', '2022-04-07 12:49:09', 2),
(7, 'Rencontre monsieur X', 60, '2022-04-07 12:49:56', '2022-04-07 12:49:56', 3),
(8, 'Ecriture du dossier', 120, '2022-04-07 12:50:19', '2022-04-07 12:50:19', 3),
(9, 'Rencontre avec monsieur X', 50, '2022-04-07 12:50:40', '2022-04-07 12:50:40', 4);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `client_case`
--
ALTER TABLE `client_case`
  ADD CONSTRAINT `client_case_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `client_case_ibfk_2` FOREIGN KEY (`caseId`) REFERENCES `cases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`caseId`) REFERENCES `cases` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
