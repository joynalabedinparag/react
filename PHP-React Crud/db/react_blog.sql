-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 24, 2017 at 04:20 PM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `date_created`) VALUES
(1, 'joynal', '2017-04-24 08:32:30'),
(2, 'abedin', '2017-04-24 10:03:46'),
(3, 'Porag', '2017-04-24 10:03:46');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `author` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `description`, `author`, `date_created`) VALUES
(1, 'test', 'test', 1, '2017-04-24 13:57:40'),
(2, 'test 2', 'test 2', 2, '2017-04-24 14:05:08'),
(3, 'test 3', 'Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum ', 3, '2017-04-24 14:07:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
