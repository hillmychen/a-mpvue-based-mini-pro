
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL auto_increment PRIMARY KEY,
  `openid` varchar(50) NOT NULL,
  `bookid` varchar(20) NOT NULL,
  `comment` VARCHAR(255) ,
  `phone` VARCHAR(255),
  `location` VARCHAR(255)
)ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
