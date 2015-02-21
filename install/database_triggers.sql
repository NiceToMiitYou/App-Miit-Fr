USE `fr_miit_app`;

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
-- Trigger for LiveEvents `confchatmessage`
--

DROP TRIGGER IF EXISTS GenerateTokenOfEventTrigger;

DELIMITER //

CREATE TRIGGER GenerateTokenOfEventTrigger 
BEFORE INSERT
   ON `confliveapplicationevent` FOR EACH ROW

BEGIN

    -- variable declarations
    DECLARE nextToken integer;

    -- Get next token
    SELECT COUNT(*) 
        FROM confliveapplicationevent
        WHERE conference = NEW.conference
        INTO nextToken;

    -- Define the new token ( count + 1 )
    SET NEW.token = nextToken + 1;

END; //

DELIMITER ;