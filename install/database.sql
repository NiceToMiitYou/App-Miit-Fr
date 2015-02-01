CREATE DATABASE  IF NOT EXISTS `fr_miit_app` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `fr_miit_app`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: fr_miit_app
-- ------------------------------------------------------
-- Server version 5.5.41-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `confchatmessage`
--

DROP TABLE IF EXISTS `confchatmessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confchatmessage` (
  `message` varchar(255) DEFAULT NULL,
  `chatroom` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confchatmessage`
--

LOCK TABLES `confchatmessage` WRITE;
/*!40000 ALTER TABLE `confchatmessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `confchatmessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confchatroom`
--

DROP TABLE IF EXISTS `confchatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confchatroom` (
  `name` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confchatroom`
--

LOCK TABLES `confchatroom` WRITE;
/*!40000 ALTER TABLE `confchatroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `confchatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confconference`
--

DROP TABLE IF EXISTS `confconference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confconference` (
  `name` varchar(255) DEFAULT NULL,
  `clientName` varchar(255) DEFAULT NULL,
  `logo` longtext,
  `token` varchar(255) DEFAULT NULL,
  `colorScheme` longtext,
  `description` longtext,
  `restrictions` longtext,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confconference`
--

LOCK TABLES `confconference` WRITE;
/*!40000 ALTER TABLE `confconference` DISABLE KEYS */;
/*!40000 ALTER TABLE `confconference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confconfig`
--

DROP TABLE IF EXISTS `confconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confconfig` (
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confconfig`
--

LOCK TABLES `confconfig` WRITE;
/*!40000 ALTER TABLE `confconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `confconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confliveapplicationevent`
--

DROP TABLE IF EXISTS `confliveapplicationevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confliveapplicationevent` (
  `name` varchar(255) DEFAULT NULL,
  `data` longtext,
  `expire` datetime DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expire` (`expire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confliveapplicationevent`
--

LOCK TABLES `confliveapplicationevent` WRITE;
/*!40000 ALTER TABLE `confliveapplicationevent` DISABLE KEYS */;
/*!40000 ALTER TABLE `confliveapplicationevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confnote`
--

DROP TABLE IF EXISTS `confnote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confnote` (
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confnote`
--

LOCK TABLES `confnote` WRITE;
/*!40000 ALTER TABLE `confnote` DISABLE KEYS */;
/*!40000 ALTER TABLE `confnote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confpresentation`
--

DROP TABLE IF EXISTS `confpresentation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confpresentation` (
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `authors` longtext,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `conference` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confpresentation`
--

LOCK TABLES `confpresentation` WRITE;
/*!40000 ALTER TABLE `confpresentation` DISABLE KEYS */;
/*!40000 ALTER TABLE `confpresentation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionpresentation`
--

DROP TABLE IF EXISTS `confquestionpresentation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionpresentation` (
  `question` varchar(255) DEFAULT NULL,
  `isAnswered` tinyint(1) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `question` (`question`),
  KEY `isAnswered` (`isAnswered`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionpresentation`
--

LOCK TABLES `confquestionpresentation` WRITE;
/*!40000 ALTER TABLE `confquestionpresentation` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionpresentation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionpresentation_tags__conftag_questions`
--

DROP TABLE IF EXISTS `confquestionpresentation_tags__conftag_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionpresentation_tags__conftag_questions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `confquestionpresentation_tags` int(11) DEFAULT NULL,
  `conftag_questions` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionpresentation_tags__conftag_questions`
--

LOCK TABLES `confquestionpresentation_tags__conftag_questions` WRITE;
/*!40000 ALTER TABLE `confquestionpresentation_tags__conftag_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionpresentation_tags__conftag_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionpresentationlike`
--

DROP TABLE IF EXISTS `confquestionpresentationlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionpresentationlike` (
  `isLiked` tinyint(1) DEFAULT NULL,
  `question` int(11) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question` (`question`),
  KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionpresentationlike`
--

LOCK TABLES `confquestionpresentationlike` WRITE;
/*!40000 ALTER TABLE `confquestionpresentationlike` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionpresentationlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionquizz`
--

DROP TABLE IF EXISTS `confquestionquizz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionquizz` (
  `question` varchar(255) DEFAULT NULL,
  `required` tinyint(1) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `quizz` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `quizz` (`quizz`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionquizz`
--

LOCK TABLES `confquestionquizz` WRITE;
/*!40000 ALTER TABLE `confquestionquizz` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionquizz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionquizzanswer`
--

DROP TABLE IF EXISTS `confquestionquizzanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionquizzanswer` (
  `answer` varchar(255) DEFAULT NULL,
  `question` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionquizzanswer`
--

LOCK TABLES `confquestionquizzanswer` WRITE;
/*!40000 ALTER TABLE `confquestionquizzanswer` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionquizzanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionquizzanswer_users__confuser_quizzanswers`
--

DROP TABLE IF EXISTS `confquestionquizzanswer_users__confuser_quizzanswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionquizzanswer_users__confuser_quizzanswers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `confquestionquizzanswer_users` int(11) DEFAULT NULL,
  `confuser_quizzAnswers` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionquizzanswer_users__confuser_quizzanswers`
--

LOCK TABLES `confquestionquizzanswer_users__confuser_quizzanswers` WRITE;
/*!40000 ALTER TABLE `confquestionquizzanswer_users__confuser_quizzanswers` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionquizzanswer_users__confuser_quizzanswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionslide`
--

DROP TABLE IF EXISTS `confquestionslide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionslide` (
  `question` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `isClosed` tinyint(1) DEFAULT NULL,
  `slide` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `slide` (`slide`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionslide`
--

LOCK TABLES `confquestionslide` WRITE;
/*!40000 ALTER TABLE `confquestionslide` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionslide` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionslideanswer`
--

DROP TABLE IF EXISTS `confquestionslideanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionslideanswer` (
  `answer` varchar(255) DEFAULT NULL,
  `question` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question` (`question`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionslideanswer`
--

LOCK TABLES `confquestionslideanswer` WRITE;
/*!40000 ALTER TABLE `confquestionslideanswer` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionslideanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquestionslideanswer_users__confuser_slideanswers`
--

DROP TABLE IF EXISTS `confquestionslideanswer_users__confuser_slideanswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquestionslideanswer_users__confuser_slideanswers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `confquestionslideanswer_users` int(11) DEFAULT NULL,
  `confuser_slideAnswers` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquestionslideanswer_users__confuser_slideanswers`
--

LOCK TABLES `confquestionslideanswer_users__confuser_slideanswers` WRITE;
/*!40000 ALTER TABLE `confquestionslideanswer_users__confuser_slideanswers` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquestionslideanswer_users__confuser_slideanswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confquizz`
--

DROP TABLE IF EXISTS `confquizz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confquizz` (
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  `maxTime` int(11) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confquizz`
--

LOCK TABLES `confquizz` WRITE;
/*!40000 ALTER TABLE `confquizz` DISABLE KEYS */;
/*!40000 ALTER TABLE `confquizz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confresource`
--

DROP TABLE IF EXISTS `confresource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confresource` (
  `name` varchar(255) DEFAULT NULL,
  `path` longtext,
  `category` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confresource`
--

LOCK TABLES `confresource` WRITE;
/*!40000 ALTER TABLE `confresource` DISABLE KEYS */;
/*!40000 ALTER TABLE `confresource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confresource_slides__confslide_resources`
--

DROP TABLE IF EXISTS `confresource_slides__confslide_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confresource_slides__confslide_resources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `confresource_slides` int(11) DEFAULT NULL,
  `confslide_resources` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confresource_slides__confslide_resources`
--

LOCK TABLES `confresource_slides__confslide_resources` WRITE;
/*!40000 ALTER TABLE `confresource_slides__confslide_resources` DISABLE KEYS */;
/*!40000 ALTER TABLE `confresource_slides__confslide_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confresourcecategory`
--

DROP TABLE IF EXISTS `confresourcecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confresourcecategory` (
  `name` varchar(255) DEFAULT NULL,
  `isVisible` tinyint(1) DEFAULT NULL,
  `conference` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `isVisible` (`isVisible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confresourcecategory`
--

LOCK TABLES `confresourcecategory` WRITE;
/*!40000 ALTER TABLE `confresourcecategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `confresourcecategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confslide`
--

DROP TABLE IF EXISTS `confslide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confslide` (
  `notes` longtext,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `time` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `presentation` int(11) DEFAULT NULL,
  `question` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confslide`
--

LOCK TABLES `confslide` WRITE;
/*!40000 ALTER TABLE `confslide` DISABLE KEYS */;
/*!40000 ALTER TABLE `confslide` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conftag`
--

DROP TABLE IF EXISTS `conftag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conftag` (
  `name` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conftag`
--

LOCK TABLES `conftag` WRITE;
/*!40000 ALTER TABLE `conftag` DISABLE KEYS */;
/*!40000 ALTER TABLE `conftag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conftrack`
--

DROP TABLE IF EXISTS `conftrack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conftrack` (
  `action` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conftrack`
--

LOCK TABLES `conftrack` WRITE;
/*!40000 ALTER TABLE `conftrack` DISABLE KEYS */;
/*!40000 ALTER TABLE `conftrack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confuser`
--

DROP TABLE IF EXISTS `confuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confuser` (
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `society` varchar(255) DEFAULT NULL,
  `avatar` longtext,
  `mail` varchar(255) DEFAULT NULL,
  `roles` longtext,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confuser`
--

LOCK TABLES `confuser` WRITE;
/*!40000 ALTER TABLE `confuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `confuser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-01 23:16:03
