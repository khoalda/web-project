-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2023 at 08:33 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bkshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `aId` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level` int(1) NOT NULL CHECK (`level` >= 1 and `level` <= 2),
  `name` varchar(255) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `urlAvatar` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL CHECK (`status` >= 0 and `status` <= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`aId`, `username`, `password`, `level`, `name`, `dateOfBirth`, `urlAvatar`, `phoneNumber`, `email`, `address`, `status`) VALUES
(1, 'laptrinhweb', '$2y$10$CG2z..VPEA3CMbQoCr3W/ufb6rXGWrwbILmhsMShxwKrD2E4BwSXm', 2, 'admin', '1999-05-06', 'https://tenten.vn/tin-tuc/wp-content/uploads/2022/09/2-6.png', '0362704387', 'admin123@gmail.com', 'Ký túc xá khu A đại học Quốc gia TP.HCM', 1),
(2, 'customer', '$2y$10$bK5KGBVRL8i3PtZ17LN0yOk1VTIWbXcVsQhsKQSzAJSQvcpay.tpW', 1, 'Nguyễn Văn Tân', '2001-08-09', 'https://afamilycdn.com/150157425591193600/2022/8/25/img2760-166143316409263801587.jpg', '0362704387', 'tan@gmail.com', 'Ký túc xá khu A đại học Quốc gia TP.HCM', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `accountId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cId`, `name`) VALUES
(1, 'Beverages'),
(4, 'Burgers'),
(3, 'Chicken'),
(2, 'Potato'),
(5, 'Salads');

-- --------------------------------------------------------

--
-- Table structure for table `orderaccount`
--

CREATE TABLE `orderaccount` (
  `oId` char(16) NOT NULL,
  `aId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderaccount`
--

INSERT INTO `orderaccount` (`oId`, `aId`) VALUES
('BK26042023000003', NULL),
('BK26042023000004', 1),
('BK26042023000001', 2),
('BK26042023000002', 2),
('BK26042023000005', 2),
('BK26042023000006', 2),
('BK26042023000007', 2);

-- --------------------------------------------------------

--
-- Table structure for table `ordering`
--

CREATE TABLE `ordering` (
  `oId` char(16) NOT NULL,
  `time` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `statusId` int(11) DEFAULT NULL,
  `deliveryCost` int(11) DEFAULT NULL,
  `totalPrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ordering`
--

INSERT INTO `ordering` (`oId`, `time`, `name`, `address`, `phoneNumber`, `statusId`, `deliveryCost`, `totalPrice`) VALUES
('BK26042023000001', '2023-04-26 00:17:12', 'Nguyen Van A', 'Ký túc xá khu B Đại học quốc gia TP.HCM', '0934897659', 1, 20000, 115000),
('BK26042023000002', '2023-04-26 00:17:12', 'Nguyen Van B', '26 Trường Chinh, thành phố Pleiku, tỉnh Gia Lai', '0134892371', 2, 20000, 305000),
('BK26042023000003', '2023-04-26 00:17:12', 'Nguyen Van C', '58 Lê Lai, Ba Đình, Hà Nội', '01648785758', 3, 20000, 116000),
('BK26042023000004', '2023-04-26 00:37:40', 'Nguyen Van Tan', 'KTX khu A', '0999765231', 1, 50000, 275000),
('BK26042023000005', '2023-04-26 00:38:29', 'Nguyen Van Tan', 'KTX khu A', '0999765231', 1, 50000, 435000),
('BK26042023000006', '2023-04-26 01:17:32', 'Nguyen Van Tan', 'KTX khu A', '0999765231', 1, 60000, 584000),
('BK26042023000007', '2023-04-26 01:19:06', 'Nguyen Van Tan', 'KTX khu A', '0999765231', 1, 60000, 584000);

--
-- Triggers `ordering`
--
DELIMITER $$
CREATE TRIGGER `before_Ordering_insert` BEFORE INSERT ON `ordering` FOR EACH ROW BEGIN
	declare maxi int;
	insert into S value (NULL);
	select max(_no) from S into maxi;
    SET NEW.oId = CONCAT('BK', LPAD(DAY(CURRENT_DATE()), 2, '0'), 
									  LPAD(MONTH(CURRENT_DATE()), 2, '0'), 
									  YEAR(CURRENT_DATE()), 
                                      LPAD(maxi, 6, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `orderproduct`
--

CREATE TABLE `orderproduct` (
  `oId` char(16) NOT NULL,
  `pId` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `totalPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderproduct`
--

INSERT INTO `orderproduct` (`oId`, `pId`, `count`, `totalPrice`) VALUES
('BK26042023000001', 2, 1, 15000),
('BK26042023000001', 3, 2, 50000),
('BK26042023000001', 10, 1, 30000),
('BK26042023000002', 6, 1, 35000),
('BK26042023000002', 9, 5, 250000),
('BK26042023000003', 20, 4, 96000),
('BK26042023000004', 1, 4, 80000),
('BK26042023000004', 4, 2, 40000),
('BK26042023000004', 6, 1, 35000),
('BK26042023000004', 22, 1, 70000),
('BK26042023000005', 1, 2, 40000),
('BK26042023000005', 4, 5, 100000),
('BK26042023000005', 6, 1, 35000),
('BK26042023000005', 22, 3, 210000),
('BK26042023000006', 4, 5, 100000),
('BK26042023000006', 8, 1, 14000),
('BK26042023000006', 15, 2, 200000),
('BK26042023000006', 22, 3, 210000),
('BK26042023000007', 4, 5, 100000),
('BK26042023000007', 8, 1, 14000),
('BK26042023000007', 15, 2, 200000),
('BK26042023000007', 22, 3, 210000);

--
-- Triggers `orderproduct`
--
DELIMITER $$
CREATE TRIGGER `after_OrderProduct_insert` AFTER INSERT ON `orderproduct` FOR EACH ROW BEGIN
    declare ttPrice int;
    declare delCost int;
    select totalPrice from Ordering where oId = NEW.oId into ttPrice;
    select deliveryCost from Ordering where oId = NEW.oId into delCost;
    IF ttPrice IS NULL THEN
        SET ttPrice = 0;
    END IF;
    IF ttPrice = 0 THEN
        UPDATE Ordering SET totalPrice = delCost + ttPrice + NEW.totalPrice WHERE oId = NEW.oId;
    ELSE
    	UPDATE Ordering SET totalPrice = ttPrice + NEW.totalPrice WHERE oId = NEW.oId;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_OrderProduct_insert` BEFORE INSERT ON `orderproduct` FOR EACH ROW BEGIN
    declare oPrice int;
    IF NEW.totalPrice IS NULL OR NEW.totalPrice=0 THEN
        select price from Product where pId = NEW.pId into oPrice;
        SET NEW.totalPrice = oPrice * NEW.count;
    END IF; 
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL CHECK (`price` > 0),
  `description` varchar(1000) NOT NULL,
  `image` varchar(512) NOT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pId`, `name`, `price`, `description`, `image`, `categoryId`) VALUES
(1, 'Cocacola Bottle', 20000, 'Thức uống mát lạnh để giải khát', 'coca1.png', 1),
(2, 'Cocacola', 15000, 'Thức uống mát lạnh để giải khát', 'coca2.png', 1),
(3, 'Lemon Juice', 25000, 'Nước chanh tươi mát', 'lemon.png', 1),
(4, 'Potato big', 20000, 'Khoai tây chiên giòn rụm', 'potato.png', 2),
(5, 'Potato small', 14000, 'Khoai tây chiên giòn rụm', 'potato3.png', 2),
(6, 'Chicken McNuggets', 35000, 'Gà chiên trong dai ngoài giòn', 'chicken (2).png', 3),
(7, 'Big Mac Burger', 40000, 'Burger siêu đặc biệt ăn không no không tính tiền', 'buger5.png', 4),
(8, 'Potato slices', 14000, 'Khoai tây cắt lát chiên giòn tan', 'potato2.png', 2),
(9, 'Combo Chicken', 50000, 'Combo gà đặc biệt với nhiều món cho bạn bữa ăn thật no và ngon', 'chicken.png', 3),
(10, 'Big Burger', 30000, 'Burger lớn nhiều thịt nhiều rau', 'burger.png', 4),
(11, 'Mac Burger', 35000, 'Burger đặc biệt nhiều thịt nhiều rau', 'burger1.png', 4),
(12, 'Medium Mac Burger', 30000, 'Burger đặc biệt loại nhỏ', 'burger2.png', 4),
(13, 'Mashed Potato', 30000, 'Khoai tây nghiền, ăn là ghiền', 'potato4.png', 2),
(14, 'Chicken Small', 28000, 'Gà chiên loại nhỏ, lớp vỏ giòn rụm', 'chicken2.png', 3),
(15, 'Chicken Big Max', 100000, 'Combo gà chiên cho nhiều người ăn', 'chicken4.png', 3),
(16, 'Salat 1', 20000, 'Salat ăn kèm nhiều chất xơ, chống ngán hiệu quả', 'salat1.png', 5),
(17, 'Salat 2', 23000, 'Salat ăn kèm nhiều chất xơ, chống ngán hiệu quả', 'salat2.png', 5),
(18, 'Pepsi', 16000, 'Pepsi mát lạnh, sảng khoái', 'pepsi1.png', 1),
(19, 'Salat 3', 25000, 'Salat ăn kèm nhiều chất xơ, chống ngán hiệu quả', 'salat3.png', 5),
(20, 'Salat 4', 24000, 'Salat ăn kèm nhiều chất xơ, chống ngán hiệu quả', 'salat4.png', 5),
(21, 'Sprite', 16000, 'Sprite mát lạnh thơm nồng vị chanh', 'sprite2.png', 1),
(22, 'Chicken Medium', 70000, 'Gà chiên trong dai ngoài giòn', 'chicken 8.png', 3),
(23, 'Sprite Bottle', 20000, 'Sprite mát lạnh thơm nồng vị chanh', 'sprite1.png', 1),
(24, 'Pepsi Bottle', 20000, 'Pepsi mát lạnh, sảng khoái', 'pepsi2.png', 1),
(25, 'Orange Juice', 25000, 'Nước cam ép đến từ thiên nhiên, không phẩm màu không chất bảo quản', 'orange.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `rId` int(11) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `star` int(1) NOT NULL CHECK (`star` >= 1 and `star` <= 5),
  `aId` int(11) DEFAULT NULL,
  `pId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`rId`, `comment`, `star`, `aId`, `pId`) VALUES
(1, 'Sản phẩm thật tuyệt vời', 5, 2, 6),
(2, 'Nước chanh rất ngon', 4, 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `s`
--

CREATE TABLE `s` (
  `_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `s`
--

INSERT INTO `s` (`_no`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7);

-- --------------------------------------------------------

--
-- Table structure for table `statusorder`
--

CREATE TABLE `statusorder` (
  `sId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `statusorder`
--

INSERT INTO `statusorder` (`sId`, `name`) VALUES
(3, 'Cancel'),
(2, 'Confirmed'),
(1, 'Waiting');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`aId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`accountId`,`productId`),
  ADD KEY `fk_Cart_Product_pId` (`productId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cId`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `orderaccount`
--
ALTER TABLE `orderaccount`
  ADD PRIMARY KEY (`oId`),
  ADD KEY `fk_oAccount_Account_aId` (`aId`);

--
-- Indexes for table `ordering`
--
ALTER TABLE `ordering`
  ADD PRIMARY KEY (`oId`),
  ADD KEY `fk_Ordering_Status_sId` (`statusId`);

--
-- Indexes for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD PRIMARY KEY (`oId`,`pId`),
  ADD KEY `fk_oProduct_Product_pId` (`pId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pId`),
  ADD UNIQUE KEY `image` (`image`),
  ADD KEY `fk_product_category_id` (`categoryId`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rId`),
  ADD KEY `fk_rating_account_aId` (`aId`),
  ADD KEY `fk_rating_product_pId` (`pId`);

--
-- Indexes for table `s`
--
ALTER TABLE `s`
  ADD PRIMARY KEY (`_no`);

--
-- Indexes for table `statusorder`
--
ALTER TABLE `statusorder`
  ADD PRIMARY KEY (`sId`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `aId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `rId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `s`
--
ALTER TABLE `s`
  MODIFY `_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `statusorder`
--
ALTER TABLE `statusorder`
  MODIFY `sId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_Cart_Account_oId` FOREIGN KEY (`accountId`) REFERENCES `account` (`aId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Cart_Product_pId` FOREIGN KEY (`productId`) REFERENCES `product` (`pId`) ON DELETE CASCADE;

--
-- Constraints for table `orderaccount`
--
ALTER TABLE `orderaccount`
  ADD CONSTRAINT `fk_oAccount_Account_aId` FOREIGN KEY (`aId`) REFERENCES `account` (`aId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_oAccount_Ordering_oId` FOREIGN KEY (`oId`) REFERENCES `ordering` (`oId`) ON DELETE CASCADE;

--
-- Constraints for table `ordering`
--
ALTER TABLE `ordering`
  ADD CONSTRAINT `fk_Ordering_Status_sId` FOREIGN KEY (`statusId`) REFERENCES `statusorder` (`sId`) ON DELETE SET NULL;

--
-- Constraints for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD CONSTRAINT `fk_oProduct_Ordering_oId` FOREIGN KEY (`oId`) REFERENCES `ordering` (`oId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_oProduct_Product_pId` FOREIGN KEY (`pId`) REFERENCES `product` (`pId`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_category_id` FOREIGN KEY (`categoryId`) REFERENCES `category` (`cId`) ON DELETE SET NULL;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `fk_rating_account_aId` FOREIGN KEY (`aId`) REFERENCES `account` (`aId`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_rating_product_pId` FOREIGN KEY (`pId`) REFERENCES `product` (`pId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
