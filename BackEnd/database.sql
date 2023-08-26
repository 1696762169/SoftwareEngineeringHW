DROP SCHEMA IF EXISTS `TaxHailingSystem` ;
CREATE SCHEMA IF NOT EXISTS `TaxHailingSystem` DEFAULT CHARACTER SET utf8 ;
USE `TaxHailingSystem` ;

-- -----------------------------------------------------
-- Table `location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TaxHailingSystem`.`location` ;

CREATE TABLE IF NOT EXISTS `TaxHailingSystem`.`location` (
    `location_no` VARCHAR(10) NOT NULL,
    `longitude` double(50,6) NOT NULL COMMENT '经度',
    `latitude` double(50,6) NOT NULL COMMENT '纬度',
    `location_name` VARCHAR(100),#详细地名
    `current_time` DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`location_no`)
    )ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `passenger`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TaxHailingSystem`.`passenger` ;

CREATE TABLE IF NOT EXISTS `TaxHailingSystem`.`passenger` (
  `passenger_name` VARCHAR(30) NOT NULL,
  `passenger_no` VARCHAR(15) NOT NULL,#微信号的位数在6-15之间
  `passenger_phonenumber` VARCHAR(11) NOT NULL DEFAULT '',
  `passenger_score` INT NOT NULL DEFAULT 10,#分数从0-10分，初始默认10分
  `location_no` VARCHAR(10),
  PRIMARY KEY (`passenger_no`),
  FOREIGN KEY(location_no) REFERENCES `location`(location_no)
  )ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `driver`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TaxHailingSystem`.`driver` ;

CREATE TABLE IF NOT EXISTS `TaxHailingSystem`.`driver` (
    `driver_name` VARCHAR(30) NOT NULL,
    `driver_no` VARCHAR(15) NOT NULL,#司机微信号
    `driver_phonenumber` VARCHAR(11) NOT NULL DEFAULT '',
    `car_no` VARCHAR(5) NOT NULL DEFAULT '',#5位车牌号
    `car_description` VARCHAR(300) NOT NULL DEFAULT"",#长度300字符的车辆描述，包括颜色、品牌等
    `current_content` INT NOT NULL DEFAULT 0,#车子当前载客量
    `driver_score` INT NOT NULL DEFAULT 10,#司机评分
    `location_no` VARCHAR(10) ,
    `driver_status` VARCHAR(10) NOT NULL DEFAULT "off",#司机上下班状态："on""off",默认是下班"off"
    `driver_duration` TIME NOT NULL  DEFAULT "00:00:00",#司机工作时间
    `driver_salary` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    PRIMARY KEY (`driver_no`),
    FOREIGN KEY(location_no) REFERENCES `location`(location_no)
    )ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TaxHailingSystem`.`comment` ;

CREATE TABLE IF NOT EXISTS `TaxHailingSystem`.`comment` (
    `comment_no` VARCHAR(10) NOT NULL,
    `order_no` VARCHAR(10) NOT NULL,
    `comment_class` INT NOT NULL,#评价等级0-10
    `comment_content` VARCHAR(300) NOT NULL,#评价内容，不多于300字符
    `comment_time` DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`comment_no`)
    )ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `order`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `TaxHailingSystem`.`order` ;

CREATE TABLE IF NOT EXISTS `TaxHailingSystem`.`order` (
    `order_number` VARCHAR(10) NOT NULL,
    `order_time` DATETIME  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    `order_status` INT NOT NULL,#订单状态 0-乘客下单、1-司机接单、2-司机已到达乘车点、3-开始行程、4-行程结束、5-支付成功、6-订单取消、7-订单关闭
    `passenger_no` VARCHAR(15) ,
    `driver_no` VARCHAR(15) ,
    `order_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `order_start_longitude` double(50,6) NOT NULL COMMENT '起点经度',
    `order_start_latitude` double(50,6) NOT NULL COMMENT '起点纬度',
    `order_end_longitude` double(50,6) NOT NULL COMMENT '终点经度',
    `order_end_latitude` double(50,6) NOT NULL COMMENT '终点纬度',
    `order_start` VARCHAR(100) NOT NULL,#出发地
    `order_end` VARCHAR(100) NOT NULL,#目的地
    `P_comment_no` VARCHAR(10)  ,
    `D_comment_no` VARCHAR(10)  ,
    PRIMARY KEY (`order_number`),
    FOREIGN KEY(passenger_no) REFERENCES `passenger`(passenger_no),
    FOREIGN KEY(driver_no) REFERENCES `driver`(driver_no),
    FOREIGN KEY(P_comment_no) REFERENCES `comment`(comment_no),
    FOREIGN KEY(D_comment_no) REFERENCES `comment`(comment_no)
    )ENGINE = InnoDB;

USE `TaxHailingSystem`

INSERT INTO `TaxHailingSystem`.`location` (
    `location_no` ,
    `longitude`,
    `latitude` ,
    `location_name`,
    `current_time`
    )VALUES('123456','123.123','123.123','djskfhjkd',DEFAULT);

/* INSERT INTO `TaxHailingSystem`.`passenger` (`passenger_name`,
  `passenger_no`,
  `passenger_phonenumber`,
  `passenger_score` ,
  `location_no` ) 
  VALUES ('wu', '123456','123456', 10, '123456'); */
INSERT INTO `TaxHailingSystem`.`passenger` (`passenger_name`,
  `passenger_no` ) 
  VALUES ('wu', '123456');

INSERT INTO `TaxHailingSystem`.`DRIVER` (`DRIVER_name`,
  `DRIVER_no` ) 
  VALUES ('HALLEN', '654321');

select * from `TaxHailingSystem`.`passenger`;

INSERT INTO `TaxHailingSystem`.`order`(`order_number` ,`order_time`,`order_status` ,`passenger_no` ,`driver_no` ,`order_price`,`order_start` ,
            `order_end`) 
            VALUES('123456',DEFAULT,7,"123456","654321",20.01,"adsad","dadasd");

COMMIT;