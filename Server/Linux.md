## 基础命令

[基础命令](https://zhuanlan.zhihu.com/p/36801617)

### **find** 查找文件

find -name xxx.xxx 找到名字是 xxx 的文件

### useradd

useradd 在使用的时候会出现 -m 和 -M 的区别，一个是创建 home 一个是不创建 home
[user add 命令](https://zhuanlan.zhihu.com/p/101343524)

### 组

[组的查询](https://learnku.com/articles/31223)

### 用户

我在设置 Nginx 的时候，把用户设置成 admin 用户了，在 root 用户下启动 Nginx 的时候，就会启动 master 和 worker 两个进程，

```bash
[root@VM-0-5-centos ~]# ps aux|grep nginx
root      8735  0.0  0.0  19204   844 ?        Ss   09:17   0:00 nginx: master process nginx
admin     8736  0.0  0.0  21752  1584 ?        S    09:17   0:00 nginx: worker process
root      8756  0.0  0.0 112784   688 pts/0    R+   09:17   0:00 grep --color=auto nginx
```

#### Linux 给普通用户设置密码

`passwd admin` 直接回车，然后设置密码。

## 查询权限

需要查询某个文件夹和下面的所有文件属于哪个用户。

```bash
[root@VM-0-5-centos ~]# ls -lh
total 8.0K
drwxr-xr-x 2 root root 4.0K Mar 15 14:36 dist
drwxr-xr-x 6 root root 4.0K Mar 11 21:45 soft
```

基石
