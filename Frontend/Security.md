前端安全也是一个很重要的点，应该是 web 安全这样更加准确一些。安全上只能做防范

## xss 攻击

xss 攻击常出现在早期的论坛留言板这样的地方，前端没有过滤用户输入的内容，后端没有转义这部分的内容。攻击者模拟用户输入一些恶意的内容，当下次加载输入的内容的时候，就会出现攻击的情况。这种攻击方式目前比较少，因为现在前端基本上都是使用 react vue angular 这三个框架在做，它们会把返回的东西给渲染成 text ，而不是 innerHtml。
启动浏览器的 CSP 安全保护策略
xss 前端需要做的工作是将内容转为 text。而不是 html，这个工作其实已经是被框架给做了的，使用的时候注意不要用 dangerinnnerhtml 这样的方法就可以。
xss 后端需要做的是将前端输入的内容做一下转义和过滤，重要的内容加密传输。

## csrf 跨站点请求伪造

csrf 是一种比较常见的攻击手段，攻击者利用我们的用户在 cookie 中的登录信息，引诱用户跳转到第三方页面，然后利用 cookie 中的身份信息发起攻击。
这种攻击难以预防的地方在于，这个行为确实是我们的用户发起的，虽然是被攻击者利用的。这种攻击是在第三方页面发生的，攻击者只能利用 cookie ，但是他不知道 cookie 的内容，也不能对 cookie 做出修改，这时候我们就可以利用同源策略做出预防。也可以用专属 csrf token 做二次认证等手段。防范攻击者。

## iframe 安全

### 自己的网站不被其他的使用

```js
通过 top.location 和 self.location 是不是相等，不相等的时候，设置 top.location 的值为想要设置的值
```

### sandbox

在 response 头信息中，通过设置 sandbox 可以提高 iframe 的安全系数

- allow-same-origin 允许被视为同源，可操作父级 DOM 或者 cookie 等
- allow-top-navigation 允许当前的 iframe 引用网页通过 url 进行跳转
- allow-forms 允许表单提交
- allow-scripts 允许执行脚本文件
- allow-popups 允许浏览器打开新窗口进行跳转
- '' 设置为空的时候，allow-same-origin allow-top-navigation allow-forms allow-scripts allow-popups 都不允许

## opener

一般在项目中，打开新标签跳转一般是两种情况

```
HTML <a target="_blank" herf="xx.xx.com"> </a>

JS window.open('xx.xx.com')
```

跳转攻击的主要漏洞在 opener 对象上，我们可以有两种方案或者最好是两种方案结合。

方案 1： rel 设置
<a href="https://an.evil.site" target="_blank" rel="noopener noreferrer nofollow">进入一个“邪恶”的网站</a>
**noopener** 设置 opener 对象为 null，但是老旧浏览器不兼容 edge 以下的
**noreferrer** 阻止浏览器导航到另一个页面时，通过 Referer：HTTP header 将该页面地址或任何其他值作为 Referrer 发送。
**nofollow** seo 权重
方案 2： 编写跳转函数处理兼容性问题。

```js
openUrl(url){
    const newTab = window.open(url);
    newTab.opener = null;
    newTab.location = null;
}
```

## CSRF 跨站请求伪造

攻击者盗用了登录的用户身份，然后用这个身份做攻击。可以使用双重 token 验证，登录的时候用户请求头里添加 Auth 认证。涉及到数据修改的时候严格使用 post 不能用 get 。利用同源策略进行预防，

## CDN 劫持

出于性能考虑，前端会把一些静态资源存放在 CDN 服务器上，这么做可以显著提高前端的访问速度，但是会引发一个新的问题，就是攻击者会劫持 CDN ，我们可以使用 SRI 来预防这个问题
SRI === subresource integrity 子资源完整性，浏览器通过验证子资源完整性，来判断资源是不是被篡改。
给 link 标签或者 script 标签添加 integrity 就可以开启 SRI 功能，例如

```html
<script
  type="text/script"
  src="www.baidu.com"
  integrity="sha256-xxssxxxx  sha512-sssxxxxx"
></script>
```

integrity 属性中的前面的 shaxxx- 代表的加密方式，后面的 xxx 就是 hash
[流量劫持 cnd 小绝](https://www.zhihu.com/question/35720092/answer/523563873)
