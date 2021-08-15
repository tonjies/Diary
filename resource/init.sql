-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: diary
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_user` (
  `username` text,
  `password` text,
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_user`
--

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` (`username`, `password`, `id`) VALUES ('admin','123',1);
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `addtime` text,
  `title` text,
  `tag` mediumtext,
  `content` text,
  `user_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` (`addtime`, `title`, `tag`, `content`, `user_id`, `id`) VALUES ('2021年7月22号','多抓鱼上海探店该','1626950118','位于上海安福路，定位是“循环商店”（北京的是“书店”），总共三层，营业时间：周一至五 13:00-22:00，周六日 10:00-22:00。\n1F 是长长的走廊，一如既往是多抓鱼擅长的品牌介绍、小型展览、周边贩售机；2F 是二手书，3F 是二手衣物\n\n二手书部分\n1.选书个人感觉比较差，不知道是没经验还是二手书库存不均问题导致；\n2.书的背面只有二维码、没有价格，要手机扫码查看价格；\n3.书的码，是自增的唯一码（每本书都不一样），扫码后能知道书是不是在线下店、在哪家店、有没有被卖掉。看起来，一本书不能同时在线上和线下销售，因此实体店不是“前置仓”；\n4.支付的时候，用多抓鱼自研的线上收银台，所以也支持多抓鱼的平台余额支付。\n\n二手衣物部分\n是最近多抓鱼重点拓展的品类。现在多抓鱼有书、电子产品、衣物三个品类，虽然衣物也支持回收，但还没有开放线上购买的常驻入口。\n\n1，有试衣间了；\n2，标签上面明码标价，跟二手书不同；\n3，\n按品牌分区。',25,5),('2021年7月22号','过去一个月发生了什么？','1626939318','微信上线音频产品“微信听书”\n看起来出自微信读书团队之手，整合了书籍的音频版以及独立的音频内容。同样有类似“无限卡”的会员机制以及好友关系授权。\n抖音“剪映”推出 Mac 专业版\n在视频剪辑客户端中，率先推出了桌面客户端对标 iMovie，但又结合了擅长了音乐/字体等素材、语音识别等功能。https://lv.ulikecam.com/\n陌陌上线新即时聊天工具“咔咔”\n主打“相机短信”，点击对话框，默认打开半屏对话框，并可同时输入文字。同时也可以发布公开的照片动态\n职人社发布线上活动举办平台“场遇”\n职人社此前办了很多知识分享活动，现在将举办活动的工具产品化。注册即可发起，从报名到直播、聊天室再到最终生成录像，支持免费和付费参与，也可以在上面发现其它人举办的活动。https://zhiren.cn/\n\n过去一周发生了什么？\n百度推出兴趣学习社区“有噗”\nUGC 社区，以挑战和打卡为主，内容涵盖技能类（吉他、书画）、生活类（早起、晒图）等\n腾讯推出教育类产品“Z星球”\n主要面向小学中学生，主打直播的学习资料、内容问答交流，并配有“小叶子姐姐” AI 问答聊天助手\n阿里云旗下的网盘动向\n“阿里云云盘”改名为“阿里云盘”，Teambition 也开始内测面向 C 端用户的云盘功能（没有独立产品）\n\n快手开始内测小程序\n目前只面向企业邀请内测，除了有最近使用、收藏等入口外，还会提供信息流分发、搜索推荐、视频/直播间关联的能力。',25,6),('2021年7月23号','知乎内测图文转视频工具','1626969600','能一键将自己的回答或文章，转成视频配音和字幕，并支持快速插入相册图片进行编辑、生成视频。\nTwitter 灰度阅后即焚“Stories”功能 fleet\n开始在部分地区灰度，发布后 24 小时会消失，入口在 timeline 顶部，但 fleet 目前不能点赞和转发。（fleet 直译是军舰的意思。）\n树莓派推出主机键盘二合一套件 Raspberry Pi 400 \n连上鼠标、显示器，插上 micro SD 卡，就能成为一台标准电脑。单机售价 70 美元，包含电源鼠标拓展卡的套装售价 100 美元。\n轻松记录想法的工具 flomo.app\n来自“产品沉思录”和 EverMemo app 作者刘少楠，用于快速记录图文想法，可以通过网页 flomo.app 或公众号快速保存内容。目前还处于内测阶段。\n影视类自媒体“影视飓风”推出付费图文视频素材库\n通过官网 ysjf.com 访问即可使用，提供高质量的、面向专业视频用户的视频素材。',25,7),('2021年7月25号','Thinkpad 发布折叠屏笔记本电脑 X1 Fold','1627142400','年初亮相，现在国行终于正式发售。一块 13.3 英寸 2k 屏幕，厚度 11.5mm，折叠后体积缩减到 9 英寸左右，重量 1kg，自带蓝牙键盘和手写笔。\n256G Wi-Fi 版和 512G 5G 版售价分别是 19199 元、23999 元。\n坚果推出新一代桌面生产力方案 TNT go\n坚果新品发布会除了有新一代旗舰手机 R2，还更新了“下一代电脑” TNT go。其实是块 12 英寸 2k 触控屏幕，不能离开手机运行，但手机上的 app、聊天记录和资料也得以完全同步，并适配大屏的交互。\n有线版、无线版分别是 1999 元、2999 元\nB 站投资视频剪辑 App“不咕剪辑”\n出品方叫 Versa，旗下图片编辑工具“马卡龙玩图”曾经多次被 App Store 推荐。视频制作完成后，支持一键分享到 B 站\n墨刀 6.0 在线协作工具开始内测\n包含基础的多人协作、画布、钢笔工具、布尔运算等功能，对标 figma（连网页路径都叫 sigma图片）。\n并且，墨刀的设计文件可以跟其它原型、思维导图、流程图文件，一并存在墨刀的 dashboard 里',25,9),('2021年7月26号 ','fourdesire 推出游戏化 to-do 工具“记事探险”','1627228800','fourdesire 工作室一直以游戏化的方式做效率工具而闻名，代表作有步数统计的 Walkr、记账的记账都市、提醒喝水的植物保姆。\n这次的记事探险是 to-do list 待办事项工具，以探险的方式让用户养成记录和完成任务的习惯。\n中短视频平台 Quibi 宣布关停\n在今年 4 月推出，当时马上成为明星产品、累计获得 17.5 亿美元融资。虽然有接近 200 部影视版权，流媒体在疫情期间也大受欢迎，但最终付费用户太少、不符合预期。',25,10),('2021年1月1号','标题1s','1627806041000','内容1s',1,11),('2021年7月27号','推出游戏化','1627315200','fourdesire 工作室一直以游戏化的方式做效率工具而闻名，代表作有步数统计的 Walkr、记账的记账都市、提醒喝水的植物保姆。\n这次的记事探险是 to-do list 待办事项工具，以探险的方式让用户养成记录和完成任务的习惯。\n中短视频平台 Quibi 宣布关停\n在今年 4 月推出，当时马上成为明星产品、累计获得 17.5 亿美元融资。虽然有接近 200 部影视版权，流媒体在疫情期间也大受欢迎，但最终付费用户太少、不符合预期。',25,17),('2021年7月28号','知乎内测图文转视频工具','1627401600','年初亮相，现在国行终于正式发售。一块 13.3 英寸 2k 屏幕，厚度 11.5mm，折叠后体积缩减到 9 英寸左右，重量 1kg，自带蓝牙键盘和手写笔。\n256G Wi-Fi 版和 512G 5G 版售价分别是 19199 元、23999 元。\n坚果推出新一代桌面生产力方案 TNT go\n坚果新品发布会除了有新一代旗舰手机 R2，还更新了“下一代电脑” TNT go。其实是块 12 英寸 2k 触控屏幕，不能离开手机运行，但手机上的 app、聊天记录和资料也得以完全同步，并适配大屏的交互。\n有线版、无线版分别是 1999 元、2999 元\nB 站投资视频剪辑 App“不咕剪辑”\n出品方叫 Versa，旗下图片编辑工具“马卡龙玩图”曾经多次被 App Store 推荐。视频制作完成后，支持一键分享到 B 站\n墨刀 6.0 在线协作工具开始内测\n包含基础的多人协作、画布、钢笔工具、布尔运算等功能，对标 figma（连网页路径都叫 sigma图片）。\n并且，墨刀的设计文件可以跟其它原型、思维导图、流程图文件，一并存在墨刀的 dashboard 里',25,18),('2021年8月5日','标题1','1628788768000','内容1',37,32),('2021年8月5日','标题2','1628788779000','内容2',37,33);
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `registerdate` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`username`, `password`, `id`, `registerdate`) VALUES ('user1','pass1',45,'1628999003000'),('user3','pass3',47,'1628999003000'),('tonjies','123',50,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-16  4:13:25
