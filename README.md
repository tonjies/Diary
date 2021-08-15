### Uniapp+Egg.js+React实现全栈日记应用

> 这是一个笔记App，主要使用的技术是uniapp+egg.js+react，[项目地址](https://github.com/tonjies/Diary)，[文章地址](https://www.jianshu.com/p/e2582852a8dc)
>

![编辑页面.png](https://upload-images.jianshu.io/upload_images/4002920-102728c5756c9a41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

编辑和登录页面

![编辑页面2.png](https://upload-images.jianshu.io/upload_images/4002920-14dc11776b86c7a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

CMS后台
![后台CMS](https://upload-images.jianshu.io/upload_images/4002920-c49bf6d04f6ac736.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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