DROP DATABASE IF EXISTS Deploy;
CREATE SCHEMA Deploy;
USE Deploy;

DELIMITER $$
CREATE PROCEDURE init()
BEGIN

DROP TABLE IF EXISTS User;

CREATE TABLE User(
		pid INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
		nameGit VARCHAR(50) NOT NULL DEFAULT "none",
    	passGit VARCHAR(200) NOT NULL  DEFAULT "none",
        token VARCHAR(200) NOT NULL  DEFAULT "none",
        emailGit VARCHAR(100) NOT NULL  DEFAULT "none",
        ipServer VARCHAR(200) NOT NULL  DEFAULT "gitlab.dcae.pub.ro",
    	UNIQUE(nameGit));
END $$
DELIMITER ;

-- realizez apelarea procedurii init() definita mai sus
call init();
