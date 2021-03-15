网络上有很多的 Nginx 的安装方法，这里采用的是编译安装的方案。
编译完成以后，启动 Nginx ，先要把 Nginx 挂载到全局路径上 `ln -s /home/admin/nginx/sbin/nginx /usr/local/bin/`
## Nginx 部署
目前的需求就是将 80 的端口启动，然后把 index.html 给加载出来。

```conf
#运行用户
user nobody;
#启动进程,通常设置成和cpu的数量相等
worker_processes  1;

#全局错误日志及PID文件
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

#工作模式及连接数上限
events {
    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,
    #仅用于linux2.6以上内核,可以大大提高nginx的性能
    use   epoll;

    #单个后台worker process进程的最大并发链接数
    worker_connections  1024;

    # 并发总数是 worker_processes 和 worker_connections 的乘积
    # 即 max_clients = worker_processes * worker_connections
    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么
    # 为什么上面反向代理要除以4，应该说是一个经验值
    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000
    # worker_connections 值的设置跟物理内存大小有关
    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数
    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右
    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：
    # $ cat /proc/sys/fs/file-max
    # 输出 34336
    # 32000 < 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内
    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置
    # 使得并发总数小于操作系统可以打开的最大文件数目
    # 其实质也就是根据主机的物理CPU和内存进行配置
    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。
    # ulimit -SHn 65535

}


http {
    #设定mime类型,类型由mime.type文件定义
    include    mime.types;
    default_type  application/octet-stream;
    #设定日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，
    #对于普通应用，必须设为 on,
    #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，
    #以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile     on;
    #tcp_nopush     on;

    #连接超时时间
    #keepalive_timeout  0;
    keepalive_timeout  65;
    tcp_nodelay     on;

    #开启gzip压缩
    gzip  on;
    gzip_disable "MSIE [1-6].";

    #设定请求缓冲
    client_header_buffer_size    128k;
    large_client_header_buffers  4 128k;


    #设定虚拟主机配置
    server {
        #侦听80端口
        listen    80;
        #定义使用 www.nginx.cn访问
        server_name  www.nginx.cn;

        #定义服务器的默认网站根目录位置
        root html;

        #设定本虚拟主机的访问日志
        access_log  logs/nginx.access.log  main;

        #默认请求
        location / {

            #定义首页索引文件的名称
            index index.php index.html index.htm;

        }

        # 定义错误提示页面
        error_page   500 502 503 504 /50x.html;
        location = /50x.html {
        }

        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {

            #过期30天，静态文件不怎么更新，过期可以设大一点，
            #如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.
        location ~ .php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        #禁止访问 .htxxx 文件
            location ~ /.ht {
            deny all;
        }

    }
}
```

目前我的需求：一个可以指定位置的 单页面前端项目那么就有一个 index.html 文件，使用 Nginx 代理后可以直接访问 80 端口。因为目前只有我一个人在操作和写代码，就暂时不考虑并发等行为，

## Nginx 启动
我的 Nginx 是位于 `/home/admin/nginx/` 下，所以在修改文件的时候就是要去这个目录下修改 conf 。修改完成后用 nginx -s reload 重启。

## 403 Forbidden
我把 conf 文件中目录位置做了修改，这时候访问出现了 403 forbidden，经过查询，出现这个的原因是有下面的三个方面
* 缺少索引文件
* 权限问题
* SELinux 状态

### 索引文件
```conf
server {
  listen       7777;
  server_name  localhost;
  index  index.html;
  root  /root/dist/index.html;
}
```
当我们的索引文件 index.html 在下面的这个目录下没找到的时候，就会出现 403 的报错问题。
### 权限问题
通过 bash 可以查到当前的这个 dist 文件是属于 root 用户和root 组的，而我们的 Nginx 是 admin 用户和 admin 用户的，所以在这里就出现了刚看到的 403 的问题，修改的方法很简单，就是在 conf 最开始加入用户，如下

```conf
user  root;
```
指定完用户以后，重启 Nginx ，这时候就出现了我们的 index.html 。

### SELinux 状态
[SELinux 入门](https://linuxtoy.org/archives/selinux-introduction.html)
这部分比较复杂，暂时属于我没有涉及到的内容，先做个记录吧。