---
layout: post
title: "黑苹果Mojave 10.14.15安装实录"
subtitle: "Hackintosh-with-mojave-10.14.15"
date: 2019-06-15
author: "maniaU"
header-img: "img/hacker.png"
tags: 苹果 硬件
catalog: true
---

# i7-8700 b360m 黑苹果安装日志

## 背景

这次组装黑苹果和 win 10，主要有三大目的

1. 剪视频，做设计工作
1. 偶尔开发代码
1. 玩游戏（才不是最重要的

其实过程中主要碰到的问题就是蓝牙，其他的由于我选的都是比较省事的硬件，网上有现成的 EFI 配置，所以基本没什么特别经验总结，实在要说的话，就是   选对硬件，安装黑苹果非常轻松简单。

## 配置选择

- 主板：微星迫击炮 b360m  549 元

这个板子属于 M-ATX 版型，该有的接口都有了，大小合适，网上黑苹果适配也有很多案例，EFI 也有现成的，黑苹果抄作业首选！<br />购于京东，使用了 plus 会员满 500-20 优惠券<br />

- CPU：酷睿 i7-8700  2099 元

本身不用超频，因此往上往下不用纠结太多，小白又不敢直接买散片，因此买了个盒装。<br />购于淘宝易华旗舰店<br />

- 显卡：蓝宝石 RX580 8G 2304SP  1142 元

首选 A 卡，因为黑苹果免驱，而且不怎么玩大型 3A，最多玩玩 DOTA2， 渲染渲染视频，所以选择了这款。记得要选 2304SP 款，否则黑苹果还需要修改 SMBIOS。土豪请上 Vega64。<br />购于京东，使用了 plus 会员满 1000-40 优惠券<br />

- 内存：金士顿 HYPERX DDR4 3000MHz 16G \* 2  1138 元

内存拉满，不过还是买高了，b360m 最高支持频率为 2666，但是 3000 和 2666 就差几十块钱，我当时想着以以后内存条说不定可以保留，因此买了这个。<br />购于 HYPERX 旗舰店，使用了淘宝 88 会员满 1000-100 优惠券<br />

- 硬盘：西部数据 SN750 M.2 500G 549 元

本来打算买 intel 760p 的，发热量小，结果不仅要购货，保修还需要发票，还比小黑盘贵，果断换了西数小黑盘。这个盘用来装 macOS，其实应该狠狠心直接买 1T 的 SSD，毕竟剪辑视频分分钟就把容量占满了，不过买都买了，就先用着吧。<br />购于淘宝南京梵多电子科技，这个盘发热比较高，记得找带散热片的卖家，或者买原装散热片<br />硬盘入门介绍：[https://mp.weixin.qq.com/s/Hhrg4zcopJfOLSYHv2L_BQ](https://mp.weixin.qq.com/s/Hhrg4zcopJfOLSYHv2L_BQ)<br />

- 硬盘：三星 860 Evo 1T  729 元

该盘用来装 win 10 系统<br />购于京东<br />

- 电源：酷冷至尊 MWE 全模组 550W  444 元

小白建议选择全模组电源，省去自己布线的烦恼<br />如何挑选电源功率：[https://kknews.cc/digital/xpmy34r.html](https://kknews.cc/digital/xpmy34r.html)<br />嫌麻烦也可以看下图<br />
![step1.png]({{  site.baseurl }}/img/hackintosh/step1.png)
<br />
购于淘宝酷冷至尊官方旗舰店<br />

- 散热器 酷冷至尊 t400i  69 元

这个主要是跟着机箱和 CPU 走，不超频其实盒装散热器就够了，但是作为高端玩家，怎么能用原装呢！<br />购于京东<br />散热器采购参考：
![usb-device.png]({{  site.baseurl }}/img/hackintosh/usb-device.png)
<br />

- 机箱：NZXT H500 白色   429 元

机箱首选就是颜值，再次就是散热性、尺寸<br />购于京东，使用了 plus 会员满 200-10 优惠券<br />

- 网卡：BCM94360CD 4 天线版 335 元

既然装了黑苹果，苹果生态的 airdrop 和 handoff 怎么能缺少，因此选一张蓝牙网卡是必要的，我原先 BCM943602CS 3 天线版，但是信号非常差，因此直接换了 4 天线版的。<br />购于淘宝小齐本本旗舰店<br />

- 显示器：DELL U2715H

显示器我两年前就买了，这边有条件建议上 4K 就不展开了<br />
<br />共计 7483 元，相比于普通台式机，我在内存和硬盘上的投入是很大的，大家可以根据自己的目的来选择合适的硬件。

## 装机过程

装机主要是参考[https://www.bilibili.com/video/av37032107?from=search&seid=10226694031135197707](https://www.bilibili.com/video/av37032107?from=search&seid=10226694031135197707)，里面内容基本都涵盖了，而且现在的主板基本都是防呆插口，你想插反也是非常不容易，甚至要花点力气的。<br />如果教程里的内容和你的机型稍有差异，看说明书或者问客服都行，相信以大家的动手能力，还是很容易克服的。<br />

## 系统安装过程

### Windows 10 安装

#### 制作 windows 启动盘

安装系统尽量用官方镜像，不要去搞什么乱七八糟的 PE，带了什么软件，改了什么东西你都不知道。由于我手边没有 windows 电脑，所以这边用的是 macOS 下制作启动盘，方法也很简单

1. 下载 win 10 镜像，[https://msdn.itellyou.cn/](https://msdn.itellyou.cn/)，这个比微软官方快多了，我选择的是家庭版 1903
1. 将 U 盘格式化为 FAT32 格式
1. 展示镜像包内容，把所有内容复制到 U 盘里

以上三步，就把 windows 启动盘做好了

#### 安装 Win 10 系统

安装 windows 系统是在是很无脑，没啥难点，大步骤就两步

1. 打开主板 BIOS 设置，设置启动方式为 U 盘启动优先
2. 重启电脑，再次进来的时候，就会进入 windows 安装界面，像傻瓜一样一步步点下去就行了

安装系统很简单，进入系统之后，一般来说，除了无线网卡和显卡，硬件的驱动都是齐全的，显卡驱动根据你的品牌型号去官网下载就好，由于无线网卡上还有蓝牙，所以下驱动的时候记得把蓝牙的驱动也一并下载了，我这款的链接如下[http://www.minihere.com/broadcom-bcm943602cs-1750mbps-pci-e-wifi-adapter-driver-download.html](http://www.minihere.com/broadcom-bcm943602cs-1750mbps-pci-e-wifi-adapter-driver-download.html)。<br />至此，我们的 Windows 10 就安装完了，接下来就是装游戏和各类软件了。

### OSX 安装

#### 教程参考

我参考的教程有如下两篇

- 文字教程，他的标题是错的，其实内容是在 macOS 下制作黑苹果安装盘：[https://blog.daliansky.net/MacOS-installation-tutorial-XiaoMi-Pro-installation-process-records.html](https://blog.daliansky.net/MacOS-installation-tutorial-XiaoMi-Pro-installation-process-records.html)
- 视频教程：[https://www.bilibili.com/video/av19235761?zw](https://www.bilibili.com/video/av19235761?zw)

配置参考如下：

- EFI 配置：[https://github.com/SuperNG6/MSI-B360-10.14.5-EFI](https://github.com/SuperNG6/MSI-B360-10.14.5-EFI)
- OSX 镜像：[https://blog.daliansky.net/macOS-Mojave-10.14.5-18F132-official-version-with-Clover-4928-original-image.html#more](https://blog.daliansky.net/macOS-Mojave-10.14.5-18F132-official-version-with-Clover-4928-original-image.html#more)

有了以上两个文件，安装也基本就是傻瓜式安装了，过程如下

#### 制作黑苹果安装盘

1. 准备一个 8G 以上 U 盘，使用[etcher](https://www.balena.io/etcher/)，打开镜像，选择 U 盘，开始 Flash
2. 通过**_diskutil_**挂载镜像及安装盘中的 EFI 分区，将镜像中的 EFI 配置复制覆盖到 U 盘中的 EFI 配置

如果你的硬件和 EFI 中的配置符合，那么你需要自己去网上寻找并修改 EFI 中的 config.plist 或者 kext。<br />

#### 安装黑苹果系统

1. 先将需要安装 OSX 的硬盘格式化，分区格式选择 GPT
2. 进入 BIOS 高级设置设置 UEFI，b360m 的话是 Hard Disk BBR 那个选项，其余主板自行去网上查找，这里可以顺便把蓝牙、键盘唤醒电脑一并在高级设置里设置了
3. 重启电脑，进入 Clover 界面，选择 Boot OS X Install from macOS Mojave，接下来会引导 macOS，在实用工具页面，格式化你的安装盘为 APFS 格式，然后再选择安装 macOS

<br />

4. 安装完系统之后，会有一系列的设置，跟着感觉走，或者跟着你以前的设置来就行
5. 此时 EFI 还位于你的 U 盘安装盘中，同样通过**_diskutil_**来操作挂载 U 盘以及系统盘的 EFI 分区，将 U 盘中的 EFI 复制覆盖到你的系统盘里
6. 重启电脑，进入 BIOS 设置，将启动顺序设置为硬盘优先（安装 OSX 的硬盘），这样以后每次启动都会进入 Clover，你可以选择进入 WIN 或者是 OSX 操作系统

以上过程如果遇到任何问题，可以去远景或者 tonymacx86.com 上查找。

## 问题解决

### 蓝牙问题

由于我的 SN750 是后来才到的，一开始我我首次买的网卡型号是 BCM943602CS，安装的时候插入 PCIe 接口，插上蓝牙 USB 接线，拧好挡板螺丝一气呵成，启动 Windows，将准备好的驱动装上，蓝牙和无线网都完美驱动，直接连上了蓝牙音箱，美滋滋。

后来 SN750 到了，装完了黑苹果，发现硬件都不需要驱动，只要改下 EFI 引导就行，但是连接蓝牙的时候，发现只能搜到手机，搜不到蓝牙音箱，就感觉很神奇，明明 Windows 下可以搜到的啊，这一段可以说折腾了我很久。

OSX 下发现连上手机蓝牙之后，也是没法传输数据，连上直接断了。切回了 Windows，发现蓝牙音箱连上之后也是各种卡顿，调整了下天线，发现可以流畅听歌了，再切回 OSX，发现还是搜不到蓝牙。按照如下步骤判断错误：

#### 检查硬件

1. 打开**Spotlight** => **System Information**
1. 分别检查**System Information**中的 Bluetooth 和 USB，如果都有，就是检测到了硬件，如果没有，要么就是你线没插对，或者就是坏了

![usb-device.png]({{  site.baseurl }}/img/hackintosh/usb-device.png)

![bluetooth-device.png]({{  site.baseurl }}/img/hackintosh/bluetooth-device.png)

#### 重置蓝牙模块

1. 按住**Option**和**Shift**，点击 Menu Bar 上的蓝牙，随后点击**调试** => **重置蓝牙模块**
2. 关闭蓝牙，删除*/Library/Preferences/com.apple.Bluetooth.plist*

![debug-bluetooth.png]({{  site.baseurl }}/img/hackintosh/debug-bluetooth.png)

#### 使用开发工具检测蓝牙

1. 首先下载 Xcode，然后去[https://developer.apple.com/download/more/](https://developer.apple.com/download/more/)下载**Additional_Tools_for_Xcode_10.2**
2. 打开**Additional_Tools_for_Xcode_10.2.dmg => Hardware => Bluetooth Explorer**
3. 在 Menu bar 上点击 Device => Show Device Discovery，接下来就会显示所有检测到过的列表，就算信号很差，没有在设备列表里显示，这边也会出现。

![bluetooth-developer.png]({{  site.baseurl }}/img/hackintosh/bluetooth-developer.png)
<br />

4.点击 Tools => RSSI sweeper，点击 start，接下来会扫描所有频段，结束后，一般会扫到你的设备。

![device-discovery.png]({{  site.baseurl }}/img/hackintosh/device-discovery.png)
<br />

5.接下来去添加你的蓝牙设备

#### 查看蓝牙设备信号

1. 按住**Option，**点击 Menu Bar 上的蓝牙
2. 发现如图，第一张是黑苹果的，第二张是我的 Macbook Pro 的，dBm 的知识这边就不同步了，蓝牙信号可以参考下表

-50 ~ 0dBm      信号强<br />-70 ~-50dBm  信号中<br /><-70dBm        信号弱

![signal1.png]({{  site.baseurl }}/img/hackintosh/signal1.png)
<br />
<br />
![signal2.png]({{  site.baseurl }}/img/hackintosh/signal2.png)

随后不管怎么调整信号天线，依旧很弱，因此就是信号问题，和店家反馈之后，果断换了个四天线版本。

换好了无线网卡，重置蓝牙模块，信号果断强多了，虽然还不是太理想，但是也算能用了！<br />
![signal3.png]({{  site.baseurl }}/img/hackintosh/signal3.png)

## 黑苹果软件推荐

1. [显示器亮度调整](https://github.com/the0neyouseek/MonitorControl/releases)
2. [键盘映射调整](https://pqrs.org/osx/karabiner/)
