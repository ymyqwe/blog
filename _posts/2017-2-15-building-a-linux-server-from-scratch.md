---
layout:    post
title:     "从零开始搭建一个Linux云服务器"
subtitle:  Building A Linux Server from Scratch
date:      2017-2-15
author:    "maniaU"
header-img: "img/linux-server.jpg"
tags:      Linux 云服务器
---

最近在腾讯云上买了个服务器，准备捣鼓一些自己的项目，由于之前都是用别人现成的环境，因此如何配置一个适合自己的Linux服务器又是一个问题，现学现卖，把自己配置的过程记下来。

不过本人也是Linux新手，所以这份教程也只是野路子，欢迎批评指点。

### 配置环境

1. 本机系统：macOS Sierra v10.12.1
2. 服务器：腾讯云CentOS 7.2（64位）

### 目录

1. [无密码ssh登陆](#无密码ssh登陆)
2. [配置git](#配置git)
3. [配置舒适的开发环境](#配置舒适的开发环境)
4. [结束语](#结束语)

## 无密码ssh登陆

首先，你购买之后云服务供应商会告诉你机器的账号的密码，然后直接

```zsh
ssh account@your.server.ip
```

其中的account就是的云服务器账号，后面则是你服务器的ip地址。如果账号和密码都对的话你就应该成功登陆服务器了，但是每次都要输入密码，是不是很烦呀，这次我们就来配置一下密钥对，实现免密码登陆。

### 本地制作密钥对

```bash
ssh-keygen -t rsa   <== 生成密钥对
Generating public/private rsa key pair.    <== 生成中
Enter file in which to save the key(/root/.ssh/id_rsa):     <== 选择保存地址
Created directory '/root/.ssh'.  
Enter passphrase (empty for no passphrase):     <== 输入私钥密码（使用私钥的时候输入，可以为空）
Enter same passphrase again:    <== 再次输入私钥密码
Your identification has been saved in/root/.ssh/id_rsa.     <== 私钥
Your public key has been saved in/root/.ssh/id_rsa.pub.     <== 公钥
The key fingerprint is:  
7b:aa:08:a0:99:fc:d9:cc:d8:2e:4b:1a:c0:6b:da:e4your@local  
The keys randomart image is:  
+--[ RSA 2048]----+  
| |  
| |  
| |  
|. |  
|o. S |  
|++. . |  
|+=o. . . |  
|o+=oB. o |  
|..E==*... |  
+-----------------+  
```

私钥一定要好好保护，丢失了会发生比你想象的更严重的事。

### 上传公钥到服务器

这里我们使用scp

```bash
scp ~/.ssh/id_rsa.pub account@your.server.ip:~/.ssh/
```

这样我们就把公钥复制到服务器上了，随后我们在服务器上安装公钥，首先登陆并进入服务器的`~/.ssh`目录

```bash
ssh account@your.server.ip
cd ~/.ssh
cat id_rsa.pub >> authorized_keys
```

这样公钥就在服务器上安装好了，但是我们还是要修改一下文件的权限，确保可以成功连接

```bash
chmod 600 authorized_keys
```

安装完之后，我们就可以不输入密码直接登陆服务器啦！

## 配置git

github作为最大的开源社区，上面当然有这无数的优秀开源项目，更何况是Javascript这种基本不需要配置的语言，所以配置一个git是必须的啦。

首先查看服务器上是否安装了git

```bash
git
```

如果`command not found`,那就赶紧安装git

```bash
yum install git
```

如果你是基于Debian的系统，比如Ubuntu，那就试一下apt-get

```bash
apt-get install git
```

这样git就安装完毕了，接下来是配置git，绑定账号（什么，你没有git账号？那还不赶紧去注册一个？[Github](https://github.com)）

```bash
git config --global user.name "your name"
git config --global user.email "your email"
```

以上均填写你注册github时使用的信息，但是，访问git也是需要公钥的，否则就会出现`Permission denied (publickey).`，随后我们就来添加公钥

```bash
ssh-keygen -t rsa -C "your@github.account"
```

后面的邮箱就是你的github账号，随后的步骤和上面制作密钥对差不多，这样我们的公钥就制作完了。

我们还需要把SSH key添加到ssh-agent中，[参考这里](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)，添加ssh密钥到ssh账户的时候要确保ssh-agent在运行，因此先执行如下命令

```bash
# start the ssh-agent in the background if it's not already running
eval "$(ssh-agent -s)"
Agent pid 59566 <== 进程号
```

随后运行

```bash
ssh-add ~/.ssh/id_rsa
```


添加到了ssh-agent之后，我们要在github中绑定公钥，复制`id_rsa.pub`中的内容，前往github个人设置，随后点击<i>SSH and GPG keys</i>，如下图

<img src="{{  site.baseurl }}/img/github-setting.jpg" alt="" style="margin:auto">

然后点击new ssh-key

<img src="{{ site.baseurl }}/img/new-key.jpg" alt="">

title是你自己取的密钥名，key就把刚才复制的内容粘贴过来，粘贴完后点击<i>Add SSH key</i>。

这样我们的git就配置完啦。在终端输入

```bash
ssh -T git@github.com
Hi your-name! You've successfully authenticated, but GitHub does not provide shell access.
```

配置成功了！真棒！

## 配置舒适的开发环境

接下来就是安装主要的开发环境了

### zsh & oh-my-zsh

从前的终端都是黑白的，自从有了zsh，一下子变得五颜六色（杀马特）起来，这正是我们非主流青年想要的！详情请看[官网](https://github.com/robbyrussell/oh-my-zsh)

```
yum -y install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

<img src="{{ site.baseurl }}/img/oh-my-zsh.jpg" alt="">

怎么样，是不是很棒！

### tmux

tmux是一个终端复用软件，你可以在一个终端中打开多个会话多个窗格，并且可以保持状态，下次进入的时候依然打开这么多会话和窗格，对于终端界面实在是太方便了！他的界面如下，

<img src="{{ site.baseurl }}/img/tmux.jpg" alt="">

具体的操作指令可以见这篇[博客](http://harttle.com/2015/11/06/tmux-startup.html)

### node & npm

这想必就不用多做介绍了吧，如何安装在[这里](https://nodejs.org/en/download/package-manager/)，由于node比较大，所以安装会比较久一点。

而npm在国内是非常慢的，所以我用的是[cnpm](https://npm.taobao.org/)，它上面的包更新是几乎和npm同步的，所以除了指令是cnpm外，基本没有什么区别，但是速度可是差了好几百倍。


##  结束语

这样，我们的Linux环境基本就安装完啦！赶紧尽情享受Linux吧！





