/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : localhost:3306
 Source Schema         : network_disk

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 27/05/2021 16:20:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file_list
-- ----------------------------
DROP TABLE IF EXISTS `file_list`;
CREATE TABLE `file_list`  (
  `f_id` int(0) NOT NULL AUTO_INCREMENT,
  `f_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `f_size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `f_dow_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `f_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `f_grouping` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `f_transfer_state` int(0) DEFAULT 0,
  `f_history_state` int(0) DEFAULT 0,
  `u_id` int(0) DEFAULT NULL,
  `u_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `version` bigint(0) DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`f_id`) USING BTREE,
  UNIQUE INDEX `f_id`(`f_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file_list
-- ----------------------------
INSERT INTO `file_list` VALUES (1, 'dkxt.rar', '106401468', 'public/upload/users/shanjianL/dkxt.rar', 'application/octet-stream', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2020-08-24 16:51:56', '2020-09-14 17:43:05', '2020-09-14 17:53:41');
INSERT INTO `file_list` VALUES (2, 'dkxt.rar', '106401468', 'public/upload/users/shanjianL/dkxt.rar', 'application/octet-stream', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2020-08-25 13:12:32', '2020-09-14 16:00:39', '2020-09-15 15:58:00');
INSERT INTO `file_list` VALUES (3, 'dkxt.rar', '106401468', 'public/upload/users/shanjianL/dkxt.rar', 'application/octet-stream', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2020-08-25 17:05:08', '2020-09-15 16:15:59', '2020-09-15 16:16:15');
INSERT INTO `file_list` VALUES (4, 'Office_2010_激活工具.zip', '19062796', 'public/upload/users/shanjianL/Office_2010_激活工具.zip', 'application/x-zip-compressed', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2020-08-31 22:25:03', '2020-09-15 16:17:28', '2020-09-15 16:17:35');
INSERT INTO `file_list` VALUES (5, 'Office_2010_激活工具.zip', '19062796', 'public/upload/users/shanjianL/Office_2010_激活工具.zip', 'application/x-zip-compressed', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2020-08-31 22:26:03', '2020-09-14 16:03:34', '2020-09-15 16:04:10');
INSERT INTO `file_list` VALUES (6, 'hodgepodge-master.zip', '131067', 'public/upload/users/shanjianL/hodgepodge-master.zip', 'application/x-zip-compressed', 'shanjianL', 0, 0, 1, 'shanjianL', 0, '2020-09-03 14:57:28', '2020-09-03 14:57:28', '2020-09-15 16:12:17');
INSERT INTO `file_list` VALUES (7, 'hodgepodge-master.zip', '131067', 'public/upload/users/shanjianL/hodgepodge-master.zip', 'application/x-zip-compressed', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2020-09-03 15:00:17', '2020-09-14 16:05:58', '2020-09-15 16:12:17');
INSERT INTO `file_list` VALUES (8, 'download.zip', '24063', 'public/upload/users/shanjianL / shanjianL/2/5/download.zip', 'application/x-zip-compressed', 'shanjianL/2/5', 0, 0, 1, 'shanjianL', 0, '2020-09-03 15:00:58', '2020-09-03 15:00:58', NULL);
INSERT INTO `file_list` VALUES (9, 'dkxt.rar', '106401468', 'public/upload/users/shanjianL/2/dkxt.rar', 'application/octet-stream', 'shanjianL/2', 0, 0, 1, 'shanjianL', 0, '2020-09-03 15:03:47', '2020-09-03 15:03:47', NULL);
INSERT INTO `file_list` VALUES (10, 'Interop.QuartzTypeLib.dll', '18944', 'public/upload/users/shanjianL/2/Interop.QuartzTypeLib.dll', 'application/x-msdownload', 'shanjianL/2', 0, 0, 1, 'shanjianL', 0, '2020-09-08 11:25:58', '2020-09-08 11:25:58', NULL);
INSERT INTO `file_list` VALUES (11, 'content.txt', '0', 'public/upload/users/shanjianL/content.txt', 'text/plain', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2020-09-15 16:20:21', '2020-09-15 16:20:28', '2020-09-15 16:20:37');
INSERT INTO `file_list` VALUES (12, 'content.txt', '0', 'public/upload/users/shanjianL/content.txt', 'text/plain', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2020-09-15 16:21:10', '2020-09-15 16:21:23', '2020-09-15 16:21:28');
INSERT INTO `file_list` VALUES (13, 'personalBlog.sql', '45356', 'public/upload/users/shanjianL/personalBlog.sql', 'application/octet-stream', 'shanjianL', 0, 1, 1, 'shanjianL', 0, '2021-04-22 14:25:26', '2021-04-22 14:25:43', NULL);
INSERT INTO `file_list` VALUES (14, 'user.png.png', '7702', 'public/upload/users/shanjianL/user.png.png', 'image/png', 'shanjianL', 0, 0, 1, 'shanjianL', 0, '2021-05-14 13:53:35', '2021-05-14 13:53:35', NULL);
INSERT INTO `file_list` VALUES (15, 'user.png.png', '7702', 'public/upload/users/tourist/user.png.png', 'image/png', 'tourist', 1, 1, 9, 'tourist', 0, '2021-05-20 16:24:18', '2021-05-27 15:22:10', '2021-05-27 15:27:52');
INSERT INTO `file_list` VALUES (16, 'personalBlog.sql', '45356', 'public/upload/users/tourist/personalBlog.sql', 'application/octet-stream', 'tourist', 1, 1, 9, 'tourist', 0, '2021-05-20 16:25:58', '2021-05-27 15:29:58', '2021-05-27 15:30:03');
INSERT INTO `file_list` VALUES (17, 'vue2-elm-master.zip', '13153220', 'public/upload/users/tourist/vue2-elm-master.zip', 'application/x-zip-compressed', 'tourist', 1, 1, 9, 'tourist', 0, '2021-05-21 16:12:40', '2021-05-27 15:33:48', '2021-05-27 15:33:55');
INSERT INTO `file_list` VALUES (18, 'index.vue', '4793', 'public/upload/users/tourist/index.vue', 'application/octet-stream', 'tourist', 1, 1, 9, 'tourist', 0, '2021-05-21 17:03:33', '2021-05-27 15:32:27', '2021-05-27 15:32:35');
INSERT INTO `file_list` VALUES (19, '新建文件夹 (21).rar', '117056', 'public/upload/users/tourist/新建文件夹 (21).rar', 'application/octet-stream', 'tourist', 0, 0, 9, 'tourist', 0, '2021-05-25 13:58:05', '2021-05-27 15:42:58', '2021-05-27 15:43:02');
INSERT INTO `file_list` VALUES (20, 'vue-eleme-master.zip', '1096687', 'public/upload/users/tourist/vue-eleme-master.zip', 'application/x-zip-compressed', 'tourist', 0, 0, 9, 'tourist', 0, '2021-05-25 13:58:15', '2021-05-27 15:46:02', '2021-05-27 15:46:05');
INSERT INTO `file_list` VALUES (21, 'tianlula.github.io-main.zip', '2843', 'public/upload/users/tourist/tianlula.github.io-main.zip', 'application/x-zip-compressed', 'tourist', 1, 1, 9, 'tourist', 0, '2021-05-25 15:30:15', '2021-05-27 16:15:47', '2021-05-27 16:15:52');
INSERT INTO `file_list` VALUES (22, 'aoaoe-master.zip', '8348349', 'public/upload/users/tourist/aoaoe-master.zip', 'application/x-zip-compressed', 'tourist', 0, 0, 9, 'tourist', 0, '2021-05-25 15:32:32', '2021-05-25 15:32:32', NULL);
INSERT INTO `file_list` VALUES (23, '模型评测原型_需先设计的副本.zip', '641970', 'public/upload/users/tourist/模型评测原型_需先设计的副本.zip', 'application/x-zip-compressed', 'tourist', 0, 0, 9, 'tourist', 0, '2021-05-25 15:47:58', '2021-05-27 15:48:04', '2021-05-27 15:48:07');
INSERT INTO `file_list` VALUES (24, '3q-api.pdf', '103762', 'public/upload/users/tourist/3q-api.pdf', 'application/pdf', 'tourist', 0, 1, 9, 'tourist', 0, '2021-05-25 16:27:45', '2021-05-27 16:15:06', '2021-05-27 16:15:09');
INSERT INTO `file_list` VALUES (25, 'eleme-master.zip', '755421', 'public/upload/users/tourist/eleme-master.zip', 'application/x-zip-compressed', 'tourist', 0, 0, 9, 'tourist', 0, '2021-05-25 16:30:23', '2021-05-25 16:30:23', NULL);
INSERT INTO `file_list` VALUES (26, 'shop.rar', '1328016', 'public/upload/users/tourist/shop.rar', 'application/octet-stream', 'tourist', 0, 0, 9, 'tourist', 0, '2021-05-25 16:31:50', '2021-05-25 16:31:50', NULL);
INSERT INTO `file_list` VALUES (27, 'l.rar', '95413', 'public/upload/users/tourist/l.rar', 'application/octet-stream', 'tourist', 0, 0, 9, 'tourist', 0, '2021-05-25 16:54:32', '2021-05-25 16:54:32', NULL);
INSERT INTO `file_list` VALUES (28, 'l.rar', '95413', 'public/upload/users/tourist/l.rar', 'application/octet-stream', 'tourist', 0, 1, 9, 'tourist', 0, '2021-05-25 17:03:25', '2021-05-27 15:36:29', '2021-05-27 15:36:45');
INSERT INTO `file_list` VALUES (29, '新建文件夹 (21).rar', '117056', 'public/upload/users/tourist/新建文件夹 (21).rar', 'application/octet-stream', 'tourist', 0, 0, 9, 'tourist', 0, '2021-05-25 17:04:30', '2021-05-25 17:04:30', NULL);

-- ----------------------------
-- Table structure for user_list
-- ----------------------------
DROP TABLE IF EXISTS `user_list`;
CREATE TABLE `user_list`  (
  `u_id` int(0) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `u_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `u_capacity` int(0) NOT NULL DEFAULT 10,
  `u_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '123456',
  `u_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  `version` bigint(0) DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) DEFAULT NULL,
  `u_used_capacity` tinyint(0) DEFAULT NULL,
  PRIMARY KEY (`u_id`) USING BTREE,
  UNIQUE INDEX `u_id`(`u_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_list
-- ----------------------------
INSERT INTO `user_list` VALUES (1, 'shanjianL', '272781702@qq.com', 10, '123456', 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 0, '2020-08-11 17:30:49', '2020-08-11 17:30:49', NULL, 0);
INSERT INTO `user_list` VALUES (9, 'tourist', '769840101@qq.com', 10, '123456', 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', 0, '2021-05-20 15:50:27', '2021-05-20 15:50:27', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
