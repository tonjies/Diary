### uniapp+egg.js+react实现全栈笔记WebApp应用

> 这是一个笔记WebApp，前台使用uniapp，后端使用egg.js，后台管理系统使用react，[项目地址](https://github.com/tonjies/Diary)，[文章地址](https://www.jianshu.com/p/e2582852a8dc)



### 前台

![编辑页面.png](https://upload-images.jianshu.io/upload_images/4002920-102728c5756c9a41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

编辑和登录页面

![编辑页面2.png](https://upload-images.jianshu.io/upload_images/4002920-14dc11776b86c7a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### CMS后台

![后台CMS](https://upload-images.jianshu.io/upload_images/4002920-c49bf6d04f6ac736.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 文件夹简介及注意事项

文件夹：

- Admin:  CMS后台前端代码

- AdminService:  CMS后台后端代码

- app：安卓原生打包代码

- resource: 资源文件（sql数据，.xd原型，图片）

- server： egg.js实现的后端代码

- web：uniapp前端代码


注意事项：

- 项目应该提前创建好数据库名(使用如dataGrip)，并在server和AdminService下各自的config/config.default.js中配置自己的信息（根据自己创建数据库时的地址和用户名）

```
// config/config.${env}.js
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: 'root',
    // 数据库名
    database: 'diary',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
exports.keys = 'my-cookie-secret-key';
exports.security={
  csrf: {
    enable: false,
  },
  domainWhiteList: ['*'], //允许访问域名的白名单,*表示都能访问
}
exports.cors={
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', //允许请求的方法
}
exports.jwt={
  secret: '123456', // token的加密的密钥,自己随便设置
}

```

- 创建好数据库后，resource文件夹下有一个init.sql初始文件，可以使用datagrip导入相关的表结构和默认表数据（默认有tonjies，密码123的用户以及该用户写的几篇日记，有一个名为admin，密码123的CMS管理员账号）


- 项目要先运行server程序（npm run dev)，再运行web端（HBuilder，运行，运行到浏览器），要注意自己本地实际运行起来后的端口，如果server运行起来后端口不是7001，则应该到web文件夹中，util/config中进行配置
- 同样，运行CMS程序需要先运行AdminService，再运行service
- diary.xd为项目设计文件，可以下载AdobeXd打开并使用蓝湖进行上传标注

![设计文件](https://upload-images.jianshu.io/upload_images/4002920-5186be672fc45f4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





### 后端API文档

### 客户端文档

#### 登录

接口地址：http://127.0.0.1:7001/user/login

返回格式：json

请求方式：post

接口备注：传入用户名和用户密码进行登录，获取到用户的token，如果该用户没有被创建过，将自动注册并登录

**请求参数说明：**

| 名称     | 必填 | 类型   | 说明       |
| -------- | ---- | ------ | ---------- |
| username | 是   | string | 登录用户名 |
| password | 是   | string | 登录密码   |

**返回参数说明：**

| 名称   | 类型    | 说明                |
| ------ | ------- | ------------------- |
| status | boolean | 请求是否成功        |
| result | object  | 返回结果集          |
| token  | string  | 用户登录返回的token |
| msg    | string  | 接口返回的提示信息  |

请求参数示例：

```java
{
    "username":"tonjies",
    "password":"123"
}
```

JSON返回示例：

```json
{
    "status": true,
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbmppZXMiLCJwYXNzd29yZCI6IjEyMyIsInVzZXJJZCI6MjUsImlhdCI6MTYyNzgwNDk4NSwiZXhwIjoxNjI3ODkxMzg1fQ.LgxdnOoKcEbj1yK24ttUq5urjAWABABTw9T-xW-fwyk"
    },
    "msg": "登录成功",
    "code": 200
}
```





#### 所有文档

接口地址：http://127.0.0.1:7001/doc/getAll

返回格式：json

请求方式：post

header:token

接口备注：获取已经用户已经写过的所有文档

**请求参数说明：**

无

**返回参数说明：**

| 名称    | 类型    | 说明               |
| ------- | ------- | ------------------ |
| status  | boolean | 请求是否成功       |
| result  | array   | 返回结果集         |
| addtime | string  | 文档添加时间       |
| title   | string  | 稳定标题           |
| tag     | string  | 文档添加时间戳     |
| content | string  | 文档内容           |
| user_id | int     | 文档所属用户id     |
| id      | int     | 文档id             |
| msg     | string  | 接口返回的提示信息 |
| code    | int     | 请求状态码         |

请求参数示例：

```json
header:
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbmppZXMiLCJwYXNzd29yZCI6IjEyMyIsInVzZXJJZCI6MjUsImlhdCI6MTYyNzgwNDk4NSwiZXhwIjoxNjI3ODkxMzg1fQ.LgxdnOoKcEbj1yK24ttUq5urjAWABABTw9T-xW-fwyk"
```



JSON返回示例：

```json
{
    "status": true,
    "body": [
        {
            "addtime": "2021年7月22号",
            "title": "多抓鱼上海探店",
            "tag": "1627241751",
            "content": "位于上海安福路，定位是“循环商店”（北京的是“书店”），总共三层，营业时间：周一至五 13:00-22:00，周六日 10:00-22:00。\n1F 是长长的走廊，一如既往是多抓鱼擅长的品牌介绍、小型展览、周边贩售机；2F 是二手书，3F 是二手衣物\n\n二手书部分\n1.选书个人感觉比较差，不知道是没经验还是二手书库存不均问题导致；\n2.书的背面只有二维码、没有价格，要手机扫码查看价格；\n3.书的码，是自增的唯一码（每本书都不一样），扫码后能知道书是不是在线下店、在哪家店、有没有被卖掉。看起来，一本书不能同时在线上和线下销售，因此实体店不是“前置仓”；\n4.支付的时候，用多抓鱼自研的线上收银台，所以也支持多抓鱼的平台余额支付。\n\n二手衣物部分\n是最近多抓鱼重点拓展的品类。现在多抓鱼有书、电子产品、衣物三个品类，虽然衣物也支持回收，但还没有开放线上购买的常驻入口。\n\n1，有试衣间了；\n2，标签上面明码标价，跟二手书不同；\n3，\n按品牌分区。",
            "user_id": 25,
            "id": 5
        },
        {
            "addtime": "2021年7月23号",
            "title": "过去一个月发生了什么？",
            "tag": "1627155351",
            "content": "微信上线音频产品“微信听书”\n看起来出自微信读书团队之手，整合了书籍的音频版以及独立的音频内容。同样有类似“无限卡”的会员机制以及好友关系授权。\n抖音“剪映”推出 Mac 专业版\n在视频剪辑客户端中，率先推出了桌面客户端对标 iMovie，但又结合了擅长了音乐/字体等素材、语音识别等功能。https://lv.ulikecam.com/\n陌陌上线新即时聊天工具“咔咔”\n主打“相机短信”，点击对话框，默认打开半屏对话框，并可同时输入文字。同时也可以发布公开的照片动态\n职人社发布线上活动举办平台“场遇”\n职人社此前办了很多知识分享活动，现在将举办活动的工具产品化。注册即可发起，从报名到直播、聊天室再到最终生成录像，支持免费和付费参与，也可以在上面发现其它人举办的活动。https://zhiren.cn/\n\n过去一周发生了什么？\n百度推出兴趣学习社区“有噗”\nUGC 社区，以挑战和打卡为主，内容涵盖技能类（吉他、书画）、生活类（早起、晒图）等\n腾讯推出教育类产品“Z星球”\n主要面向小学中学生，主打直播的学习资料、内容问答交流，并配有“小叶子姐姐” AI 问答聊天助手\n阿里云旗下的网盘动向\n“阿里云云盘”改名为“阿里云盘”，Teambition 也开始内测面向 C 端用户的云盘功能（没有独立产品）\n\n快手开始内测小程序\n目前只面向企业邀请内测，除了有最近使用、收藏等入口外，还会提供信息流分发、搜索推荐、视频/直播间关联的能力。",
            "user_id": 25,
            "id": 6
        },
        {
            "addtime": "2021年7月24号",
            "title": "知乎内测图文转视频工具",
            "tag": "1627068951",
            "content": "能一键将自己的回答或文章，转成视频配音和字幕，并支持快速插入相册图片进行编辑、生成视频。\nTwitter 灰度阅后即焚“Stories”功能 fleet\n开始在部分地区灰度，发布后 24 小时会消失，入口在 timeline 顶部，但 fleet 目前不能点赞和转发。（fleet 直译是军舰的意思。）\n树莓派推出主机键盘二合一套件 Raspberry Pi 400 \n连上鼠标、显示器，插上 micro SD 卡，就能成为一台标准电脑。单机售价 70 美元，包含电源鼠标拓展卡的套装售价 100 美元。\n轻松记录想法的工具 flomo.app\n来自“产品沉思录”和 EverMemo app 作者刘少楠，用于快速记录图文想法，可以通过网页 flomo.app 或公众号快速保存内容。目前还处于内测阶段。\n影视类自媒体“影视飓风”推出付费图文视频素材库\n通过官网 ysjf.com 访问即可使用，提供高质量的、面向专业视频用户的视频素材。",
            "user_id": 25,
            "id": 7
        },
        {
            "addtime": "2021年7月25号",
            "title": "Thinkpad 发布折叠屏笔记本电脑 X1 Fold",
            "tag": "1626982551",
            "content": "年初亮相，现在国行终于正式发售。一块 13.3 英寸 2k 屏幕，厚度 11.5mm，折叠后体积缩减到 9 英寸左右，重量 1kg，自带蓝牙键盘和手写笔。\n256G Wi-Fi 版和 512G 5G 版售价分别是 19199 元、23999 元。\n坚果推出新一代桌面生产力方案 TNT go\n坚果新品发布会除了有新一代旗舰手机 R2，还更新了“下一代电脑” TNT go。其实是块 12 英寸 2k 触控屏幕，不能离开手机运行，但手机上的 app、聊天记录和资料也得以完全同步，并适配大屏的交互。\n有线版、无线版分别是 1999 元、2999 元\nB 站投资视频剪辑 App“不咕剪辑”\n出品方叫 Versa，旗下图片编辑工具“马卡龙玩图”曾经多次被 App Store 推荐。视频制作完成后，支持一键分享到 B 站\n墨刀 6.0 在线协作工具开始内测\n包含基础的多人协作、画布、钢笔工具、布尔运算等功能，对标 figma（连网页路径都叫 sigma图片）。\n并且，墨刀的设计文件可以跟其它原型、思维导图、流程图文件，一并存在墨刀的 dashboard 里",
            "user_id": 25,
            "id": 9
        },
        {
            "addtime": "2021年7月26号 ",
            "title": "fourdesire 推出游戏化 to-do 工具“记事探险”",
            "tag": "1626896151",
            "content": "fourdesire 工作室一直以游戏化的方式做效率工具而闻名，代表作有步数统计的 Walkr、记账的记账都市、提醒喝水的植物保姆。\n这次的记事探险是 to-do list 待办事项工具，以探险的方式让用户养成记录和完成任务的习惯。\n中短视频平台 Quibi 宣布关停\n在今年 4 月推出，当时马上成为明星产品、累计获得 17.5 亿美元融资。虽然有接近 200 部影视版权，流媒体在疫情期间也大受欢迎，但最终付费用户太少、不符合预期。",
            "user_id": 25,
            "id": 10
        }
    ],
    "msg": "success",
    "code": 200
}
```



#### 添加文档

接口地址：http://127.0.0.1:7001/doc/createdoc

返回格式：json

请求方式：post

header: token

接口备注：添加单个文档，文档添加时间由服务端生成并返回

**请求参数说明：**

| 名称    | 必填 | 类型   | 说明     |
| ------- | ---- | ------ | -------- |
| title   | 是   | string | 文档标题 |
| content | 是   | string | 文档内容 |



**返回参数说明：**

| 名称    | 类型    | 说明               |
| ------- | ------- | ------------------ |
| status  | boolean | 请求是否成功       |
| result  | object  | 返回结果集         |
| addtime | string  | 文档添加时间       |
| title   | string  | 稳定标题           |
| tag     | string  | 文档添加时间戳     |
| content | string  | 文档内容           |
| user_id | int     | 文档所属用户id     |
| msg     | string  | 接口返回的提示信息 |
| code    | int     | 请求状态码         |

请求参数示例：

```java
{
    "title":"标题2s",
    "content":"内容3s"
}
```

JSON返回示例：

```json
{
    "status": true,
    "body": {
        "addtime": "2021年1月1号",
        "tag": 1627806261000,
        "user_id": 25,
        "title": "标题2s",
        "content": "内容3s"
    },
    "msg": "success",
    "code": 200
}
```



#### 文档信息

接口地址：http://127.0.0.1:7001/doc/readsingle

返回格式：json

请求方式：post

header: token

接口备注：获取单个文档的信息

**请求参数说明：**

| 名称 | 必填 | 类型   | 说明     |
| ---- | ---- | ------ | -------- |
| tag  | 是   | string | 文档标签 |



**返回参数说明：**

| 名称    | 类型    | 说明               |
| ------- | ------- | ------------------ |
| status  | boolean | 请求是否成功       |
| result  | object  | 返回结果集         |
| addtime | string  | 文档添加时间       |
| title   | string  | 稳定标题           |
| tag     | string  | 文档添加时间戳     |
| content | string  | 文档内容           |
| user_id | int     | 文档所属用户id     |
| msg     | string  | 接口返回的提示信息 |
| code    | int     | 请求状态码         |

请求参数示例：

```java
{
    "tag":"1626896151"
}
```

JSON返回示例：

```json
{
    "status": true,
    "body": [
        {
            "user_id": 25,
            "addtime": "2021年7月26号 ",
            "title": "fourdesire 推出游戏化 to-do 工具“记事探险”",
            "tag": "1626896151",
            "content": "fourdesire 工作室一直以游戏化的方式做效率工具而闻名，代表作有步数统计的 Walkr、记账的记账都市、提醒喝水的植物保姆。\n这次的记事探险是 to-do list 待办事项工具，以探险的方式让用户养成记录和完成任务的习惯。\n中短视频平台 Quibi 宣布关停\n在今年 4 月推出，当时马上成为明星产品、累计获得 17.5 亿美元融资。虽然有接近 200 部影视版权，流媒体在疫情期间也大受欢迎，但最终付费用户太少、不符合预期。",
            "id": 10
        }
    ],
    "msg": "success",
    "code": 200
}
```



#### 修改文档

接口地址：http://127.0.0.1:7001/doc/update

返回格式：json

请求方式：post

header: token

接口备注：修改已经存在的文档

**请求参数说明：**

| 名称    | 必填 | 类型   | 说明     |
| ------- | ---- | ------ | -------- |
| title   | 是   | string | 文档标题 |
| content | 是   | string | 文档内容 |



**返回参数说明：**

| 名称    | 类型    | 说明               |
| ------- | ------- | ------------------ |
| status  | boolean | 请求是否成功       |
| result  | object  | 返回结果集         |
| addtime | string  | 文档添加时间       |
| title   | string  | 稳定标题           |
| tag     | string  | 文档添加时间戳     |
| content | string  | 文档内容           |
| user_id | int     | 文档所属用户id     |
| msg     | string  | 接口返回的提示信息 |
| code    | int     | 请求状态码         |

请求参数示例：

```java
{
    "title":"标题2s",
    "content":"内容3s"
}
```

JSON返回示例：

```json
{
    "status": true,
    "body": {
        "addtime": "2021年1月1号",
        "tag": 1627806261000,
        "user_id": 25,
        "title": "标题2s",
        "content": "内容3s"
    },
    "msg": "success",
    "code": 200
}
```










#### 删除文档

接口地址：http://127.0.0.1:7001/doc/update

返回格式：json

请求方式：http post

header: token

接口备注：传入用户名和用户密码进行登录，获取到用户的token，如果该用户没有被创建过，将自动注册并登录

**请求参数说明：**

| 名称    | 必填 | 类型   | 说明     |
| ------- | ---- | ------ | -------- |
| title   | 是   | string | 文档标题 |
| content | 是   | string | 文档内容 |



**返回参数说明：**

| 名称    | 类型    | 说明               |
| ------- | ------- | ------------------ |
| status  | boolean | 请求是否成功       |
| result  | object  | 返回结果集         |
| addtime | string  | 文档添加时间       |
| title   | string  | 稳定标题           |
| tag     | string  | 文档添加时间戳     |
| content | string  | 文档内容           |
| user_id | int     | 文档所属用户id     |
| msg     | string  | 接口返回的提示信息 |
| code    | int     | 请求状态码         |

请求参数示例：

```java
{
    "title":"标题2s",
    "content":"内容3s"
}
```

JSON返回示例：

```json
{
    "status": true,
    "body": {
        "addtime": "2021年1月1号",
        "tag": 1627806261000,
        "user_id": 25,
        "title": "标题2s",
        "content": "内容3s"
    },
    "msg": "success",
    "code": 200
}
```





### CMS后台文档

#### 登录

接口地址：http://127.0.0.1:7001/admin/login

返回格式：json

请求方式：post

接口备注：传入管理员名字和密码进行登录，获取到管理员的token

**请求参数说明：**

| 名称     | 必填 | 类型   | 说明         |
| -------- | ---- | ------ | ------------ |
| username | 是   | string | 管理员用户名 |
| password | 是   | string | 管理员密码   |

**返回参数说明：**

| 名称   | 类型    | 说明                |
| ------ | ------- | ------------------- |
| status | boolean | 请求是否成功        |
| result | object  | 返回结果集          |
| token  | string  | 用户登录返回的token |
| msg    | string  | 接口返回的提示信息  |

请求参数示例：

```java
{
    "username":"admin",
    "password":"123"
}
```

JSON返回示例：

```json
{
    "status": true,
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbmppZXMiLCJwYXNzd29yZCI6IjEyMyIsInVzZXJJZCI6MjUsImlhdCI6MTYyNzgwNDk4NSwiZXhwIjoxNjI3ODkxMzg1fQ.LgxdnOoKcEbj1yK24ttUq5urjAWABABTw9T-xW-fwyk"
    },
    "msg": "登录成功",
    "code": 200
}
```





#### 获取用户列表

接口地址：http://127.0.0.1:7001/admin/getUserList

返回格式：json

请求方式：post

接口备注：获取当前已注册用户列表

header: 管理员token



**请求参数说明：**

无

**返回参数说明：**

| 名称         | 类型    | 说明                |
| ------------ | ------- | ------------------- |
| status       | boolean | 请求是否成功        |
| result       | object  | 返回结果集          |
| token        | string  | 用户登录返回的token |
| msg          | string  | 接口返回的提示信息  |
| username     | string  | 用户名              |
| registerdate | long    | 用户注册时间        |
| id           | int     | 用户id              |

JSON返回示例：

```json
{
    "status": true,
    "body": [
        {
            "username": "tonjies",
            "registerdate": null,
            "id": 25
        },
        {
            "username": "user1",
            "registerdate": "1628999003000",
            "id": 45
        },
        {
            "username": "user3",
            "registerdate": "1628999003000",
            "id": 47
        },
        {
            "username": "tonjeis",
            "registerdate": "1629160055000",
            "id": 51
        }
    ],
    "msg": "success",
    "code": 200
}
```