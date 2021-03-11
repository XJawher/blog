# 腾讯云免密登录
有感于最近在登录自己的服务器的时候，一直要输入密码，但是又老是记不住密码。想起了之前在项目中实施过免密登录服务器的方案，记录一下。

```bash
#!/usr/bin/env bash

buildFeProject() {
    echo -e "\033[32m 即将开始打包，估计需要一段时间。。。 \033[0m"
    start=$(date +%s)
    npm run build
    end=$(date +%s)
    take=$((end - start))
    echo -e "\033[32m 打包结束，耗时间共计：${take}秒 \033[0m"
    echo -e "\033[32m 开始scp文件到服务器上。 \033[0m"
}

echo "你即将开始执行打包且自动传输到服务器：$1 上的操作。"
buildFeProject
echo -e "开始设置免密登录，请在执行后输入服务器密码 \n"
echo -e "\033[42;37m 若跳过，则说明已经执行过免密操作，会直接上传文件并执行命令 \033[0m \n"
sleep 3
ssh-copy-id -i ~/.ssh/id_rsa.pub root@$1
echo -e "\033[41;37m 免密设置成功 \033[0m \n\n\n"
scp -r dist/csm-frontend root@$1:/root
echo -e "\033[42;37m 文件上传成功 \033[0m \n"
ssh root@$1 -- "docker cp csm-frontend frontend:/opt/expontech/"
echo -e "\033[45;37m 替换服务器生产包执行成功，请刷新 $1 页面 \033[0m"

```

上面的脚本是之前写过的一个蒋代码打包上传到服务器中的，其中就有免密的部分
不过在腾讯云的这个服务器上直接执行上面的免密操作不行，因为公司的服务器都是经过 docker 封装的所以不能直接使用上面的这个。

## 免密修改过程
###  修改 sshd 服务的配置文件
首先 `vim /etc/ssh/sshd_config` 打开配置文件，然后将下面的三个全部打开。
```bash
PubkeyAuthentication yes
RSAAuthentication yes

# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile .ssh/authorized_keys
```
修改完以后 `systemctl restart sshd`
### 在本地机器上生成公钥和私钥
这个网络上有很多教程，就不再赘述了。
### 添加本地公钥
将本地的公钥 cat 出来，然后添加到服务器的 **~/.ssh/authorized_keys** 的这个文件中。
### 配置本地 config 文件
打开本地机器的 ./ssh/config 如果没有就 touch 一个。
```
Host lipcs
    HostName 82.156.44.208
    User root
    Port 22
    IdentityFile /home/lipc/.ssh/id_qq_rsa
```
需要注意的就是 IdentityFile 的路径，如果不知道的话就在 id_qq_rsa 文件那里 pwd 一下