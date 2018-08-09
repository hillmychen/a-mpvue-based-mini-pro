
DROP TABLE IF EXISTS `booksInfo`;
CREATE TABLE `booksInfo` (
  id int(11) NOT NULL auto_increment PRIMARY KEY,
  isbn varchar(255) NOT NULL,
  openid varchar(50) NOT NULL,
  title varchar(255) NOT NULL,
  imageurl varchar(255) NOT NULL,
  alt varchar(255) NOT NULL,
  publisher varchar(255) NOT NULL,
  summary varchar(255) NOT NULL,
  price varchar(255) NOT NULL,
  rate float DEFAULT NULL,
  tags VARCHAR(255) DEFAULT NULL,
  author VARCHAR(255) DEFAULT NULL
)ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
