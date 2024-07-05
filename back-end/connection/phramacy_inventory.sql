-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 20, 2023 at 04:02 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phramacy_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`name`) VALUES
('eye'),
('ux');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(10) NOT NULL,
  `inventory_name` varchar(20) NOT NULL,
  `inventory_capacity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `inventory_name`, `inventory_capacity`) VALUES
(1, 'wfwefw', 1000000000),
(4, 'category1', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` int(11) NOT NULL,
  `invoice_number_products` int(11) NOT NULL,
  `invoice_date` date NOT NULL,
  `invoice_time` time NOT NULL,
  `invoice_total_price` int(10) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_id`, `invoice_number_products`, `invoice_date`, `invoice_time`, `invoice_total_price`, `updated_at`, `user_id`) VALUES
(46, 12, '2023-12-20', '01:02:29', 20111, '2023-12-20 16:12:41', 2);

-- --------------------------------------------------------

--
-- Table structure for table `invoices_products`
--

CREATE TABLE `invoices_products` (
  `array_products` text NOT NULL,
  `invoice_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invoices_products`
--

INSERT INTO `invoices_products` (`array_products`, `invoice_id`) VALUES
('[{\"id\":17,\"quantity\":0},{\"id\":22,\"quantity\":10}]', 46);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(15) NOT NULL,
  `name` varchar(40) NOT NULL,
  `price_of_sale` int(5) NOT NULL,
  `price_of_buy` int(5) NOT NULL,
  `quantity` int(10) NOT NULL,
  `sale` enum('10','15','5','0') DEFAULT '0',
  `expiry_date` varchar(40) NOT NULL,
  `packets_section` int(10) DEFAULT NULL,
  `inventory_id` int(20) DEFAULT NULL,
  `category_id` int(10) DEFAULT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price_of_sale`, `price_of_buy`, `quantity`, `sale`, `expiry_date`, `packets_section`, `inventory_id`, `category_id`, `category_name`) VALUES
(10, 'sdfsdfsdf', 2131, 213123, 0, '15', 'sdfsfsdf324234', 12, 1, NULL, 'ux'),
(15, 'sdf', 1000, 900, 0, '10', 'septermper24', 12, 1, NULL, 'eye'),
(16, 'xcdvdsfsd', 1321, 111111111, 0, '10', 'sdfsd4', 12, 1, NULL, 'eye'),
(17, 'rterte', 1321, 111111111, 20000, '10', 'sdfsd4', 12, 1, NULL, 'eye'),
(19, 'dsfsdffdsf', 1321, 111111111, 170, '10', 'sdfsd4', 12, 1, NULL, 'eye'),
(20, 'ahmed', 1321, 111111111, 0, '10', 'sdfsd4', 12, 1, NULL, 'eye'),
(21, 'felxoniz', 1321, 111111111, 0, '10', 'sdfsd4', 12, 1, NULL, 'eye'),
(22, 'mohamed', 1321, 111111111, 12, '10', 'sdfsd4', 12, 1, NULL, 'eye');

-- --------------------------------------------------------

--
-- Table structure for table `products_purchase`
--

CREATE TABLE `products_purchase` (
  `purchase_id` int(11) NOT NULL,
  `array_products` text NOT NULL,
  `date_purchase` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products_purchase`
--

INSERT INTO `products_purchase` (`purchase_id`, `array_products`, `date_purchase`) VALUES
(45, 'ahmed', '2023-12-14'),
(46, '[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]', '2023-12-14'),
(47, '[{\"name\":\"ahmed\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sfsdsds\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"felxoniz\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":100000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"}]', '2023-12-14'),
(48, '[{\"name\":\"ahmed\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sfsdsds\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"felxoniz\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":100000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"}]', '2023-12-14'),
(49, '[{\"name\":\"mohamed\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":10,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sfsdsds\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"felxoniz\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":100000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"}]', '2023-12-14'),
(50, '[{\"name\":\"mohamed\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":10,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sfsdsds\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"felxoniz\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":100000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"}]', '2023-12-14'),
(51, '[{\"name\":\"mohamed\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":10,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sfsdsds\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"felxoniz\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":100000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"}]', '2023-12-14'),
(52, '[{\"name\":\"mohamed\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":10,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"rterte\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":213123,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sfsdsds\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"dsfsdffdsf\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":1000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"},{\"name\":\"felxoniz\",\"price_of_sale\":1321,\"price_of_buy\":111111111,\"quantity\":100000,\"sale\":\"10\",\"expiry_date\":\"sdfsd4\",\"packets_section\":12,\"inventory_id\":1,\"category_name\":\"eye\"}]', '2023-12-14');

-- --------------------------------------------------------

--
-- Table structure for table `products_suppliers`
--

CREATE TABLE `products_suppliers` (
  `product_id` int(15) NOT NULL,
  `suppllier_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `purchase_id` int(15) NOT NULL,
  `purchase_date` date NOT NULL,
  `total_number_of_products` int(20) NOT NULL,
  `total_price_purchases` int(10) NOT NULL,
  `supplier_id` int(10) NOT NULL,
  `rest_of_mony` int(10) DEFAULT NULL,
  `cash` enum('YES','NO') DEFAULT 'NO',
  `time_purchase` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`purchase_id`, `purchase_date`, `total_number_of_products`, `total_price_purchases`, `supplier_id`, `rest_of_mony`, `cash`, `time_purchase`) VALUES
(45, '2023-12-14', 12, 111111111, 3, 1000, 'YES', '00:00:00'),
(46, '2023-12-14', 12, 111111111, 3, 1000, 'YES', '00:00:00'),
(47, '2023-12-14', 12, 111111111, 3, 1000, 'YES', '00:00:00'),
(48, '2023-12-14', 12, 111111111, 3, 1000, 'YES', '00:00:00'),
(49, '2023-12-14', 12, 111111111, 3, 1000, 'YES', '00:00:00'),
(50, '2023-12-14', 12, 111111111, 3, 1000, 'YES', '00:00:00'),
(51, '2023-12-14', 12, 111111111, 3, 1000, 'YES', '18:28:51'),
(52, '2023-12-14', 12, 111111111, 3, 1000, 'YES', '18:30:58');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplirer_id` int(10) NOT NULL,
  `supplier_name` varchar(20) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplirer_id`, `supplier_name`, `phone`, `address`) VALUES
(1, 'elekab', '01050541668', 'tantaaa'),
(3, 'elradwan', '01118855367', 'tanta');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_age` int(3) NOT NULL,
  `user_phone` varchar(11) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `user_role` enum('admin','superAdmin') NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_age`, `user_phone`, `user_email`, `user_password`, `address`, `user_role`) VALUES
(1, 'ahmed khaled', 20, '01117438734', 'ahemd@gmail.com', 'ahmed123', 'undefined', 'admin'),
(2, 'ahmed', 12, '01092010561', 'sdfdsfdsfs@gmail.com', '123123213', 'sdfdssdfsdfsdf', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `invoices_products`
--
ALTER TABLE `invoices_products`
  ADD KEY `invoice_id` (`invoice_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `inventory_id` (`inventory_id`),
  ADD KEY `category_name` (`category_name`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `products_purchase`
--
ALTER TABLE `products_purchase`
  ADD KEY `purchase_id` (`purchase_id`);

--
-- Indexes for table `products_suppliers`
--
ALTER TABLE `products_suppliers`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `suppllier_id` (`suppllier_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplirer_id`),
  ADD UNIQUE KEY `supplier_name` (`supplier_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchase_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplirer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `invoices_products`
--
ALTER TABLE `invoices_products`
  ADD CONSTRAINT `invoices_products_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`inventory_id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`category_name`) REFERENCES `category` (`name`);

--
-- Constraints for table `products_purchase`
--
ALTER TABLE `products_purchase`
  ADD CONSTRAINT `products_purchase_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`purchase_id`);

--
-- Constraints for table `products_suppliers`
--
ALTER TABLE `products_suppliers`
  ADD CONSTRAINT `products_suppliers_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `products_suppliers_ibfk_2` FOREIGN KEY (`suppllier_id`) REFERENCES `suppliers` (`supplirer_id`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplirer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
