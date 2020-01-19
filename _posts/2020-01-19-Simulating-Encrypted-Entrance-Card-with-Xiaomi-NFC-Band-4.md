---
layout: post
title: "小米手环4 NFC 添加加密门禁卡"
subtitle: "Simulating Encrypted Entrance Card with Xiaomi NFC Band 4"
date: 2020-01-19
author: "maniaU"
header-img: "img/encryption.jpg"
tags: 硬件
catalog: true
---

# 小米手环 4 NFC 添加加密门禁卡

## 背景

最近公司有同事刷门禁的时候用了手环，对于我们这种见识短的农民工，B 格瞬间 MAX，据他们说公司的门禁卡是非加密卡，可以直接模拟，那么加密卡是否可以模拟呢？

产生了这样疑问的我，怀着 Geek 精神，当然要探索一番，网上关于 NFC 设备模拟加密卡的方式已经有很多了，但是关于基础知识及原理的解释很少，所以借此机会顺便梳理一番。当然，如果直接想看模拟加密门禁卡的方式，可以直接跳到后半段。

## 相关知识

### 什么是 NFC

近场通信技术（Near-field communication，NFC）由非接触式射频识别（[RFID](https://zh.wikipedia.org/wiki/RFID)）演变而来，由[飞利浦](https://zh.wikipedia.org/wiki/%E9%A3%9E%E5%88%A9%E6%B5%A6)半导体（现[恩智浦半导体](https://zh.wikipedia.org/wiki/%E6%81%A9%E6%99%BA%E6%B5%A6%E5%8D%8A%E5%AF%BC%E4%BD%93)）、[诺基亚](https://zh.wikipedia.org/wiki/%E8%AB%BE%E5%9F%BA%E4%BA%9E)和[索尼](https://zh.wikipedia.org/wiki/%E7%B4%A2%E5%B0%BC)共同于 2004 年研制开发，其基础是 RFID 及互连技术。近场通信是一种短距高频的无线电技术，在 13.56MHz 频率运行于 20 厘米距离内。其传输速度有 106 Kbit/秒、212 Kbit/秒或者 424 Kbit/秒三种。当前近场通信已通过成为 ISO/IEC IS 18092 国际标准、EMCA-340 标准与 ETSI TS 102 190 标准。NFC 采用主动和被动两种读取模式。

每一个完整的 NFC 设备可以用三种模式工作：

- 卡模拟模式（Card emulation mode）
- 读卡器模式（Reader/Writer mode）
- 点对点模式（P2P mode）

我们要使用的最核心的功能，就是卡模拟模式，一般智能设备，比如手机、手环都有这个功能。

### NFC 卡片分类

#### ID 卡

ID 卡全称身份识别卡(Identification Card)，为低频卡，工作频率为  125KHz-1000Khz（与大部分手机、智能设备工作频率不同，无法模拟），编号固定，卡号公开，不可写入数据，逐步淘汰中

#### IC 卡

全称集成电路卡(Integrated Circuit Card)，又称智能卡(Smart Card)，工作频率为  13.56MHz（与大部分手机 NFC 频率一样，可模拟），可读写，容量大，可加密，在身份认证、银行、电信、公共交通等领域得到越来越多的应用

### 如何区分 ID 卡和 IC 卡

这边讲两个简单方法：

1. 要是扣卡外观刻有数字 00 开头的 10、8、18 位数字，可判定此卡是 ID 卡
1. 带 NFC 功能的安卓手机，会对 IC 卡产生感应，由此可以用来分辨 IC 卡和 ID 卡

### IC 卡数据存储简介

IC 卡有从 0（大家都是从 0 开始数数的） 到 15 共 16 个扇区，每个扇区有 0 到 3 共 4 个区块，每个区块可以保存 16 字节的内容
<br />
![data-save.jpeg]({{  site.baseurl }}/img/nfc/data-save.jpeg)
<br />
<br />
第 0 扇区第 0 块由制造商写入，前 4 个字节为卡号（UID），第 5 个字节为 UID 的校验值，后面几位为厂商信息（大部分门禁卡只读取 UID，不会读取厂商信息，如果读取厂商信息，那模拟门禁卡就没辙了）

<br />
![disk-0.png]({{  site.baseurl }}/img/nfc/disk-0.png)
<br />
<br />
每个扇区第 3 块（尾块）由 A 密钥（前 6 个字节）+控制位（中间 4 个字节）+B 密钥（后 6 个字节）组成，其中控制位用于管理两个密钥的用途，及该扇区各块读写权限

<br />
![data-key.png]({{  site.baseurl }}/img/nfc/data-key.png)
<br />
<br />
扇区的其余区块，则是用来存储各式各样的数据的，比如楼栋号，单元号、楼层、有效时间等等。

### IC 卡类型

由于 ID 卡是无法模拟的，而且逐步被淘汰中，因此本文不做深入探讨，下面介绍一下 IC 卡的几种类型

#### **Mifare S50（M1）**

MIFARE Classic 是恩智浦半导体开发的可用于非接触式智能卡，有 S20，S50(M1)，S70 几种规格。M1 卡容量 1K 字节，每张卡片都有一个 4 字节的全球唯一序列号，0 扇区不可以修改，其他扇区可反复擦写，卡上数据保存期为 10 年，可改写 10 万次，读无限次。日常使用的电梯卡、门禁卡等智能卡发卡商所使用的都是 M1 卡，可以理解为物业发的原卡（母卡）。常见校园卡、公交卡等也是 M1 卡。M1 卡仅仅适合发卡方发新卡使用。

#### UID 卡

普通 IC 复制卡，可以重复擦写所有扇区。UID 可被重复修改，响应后门指令（意味着可被使用后门指令检测是否为克隆卡的机器发现），遇到带有防火墙的读卡器就会失效。平常去地摊上找老大爷配的门禁卡就是这种。

#### CUID 卡

UID 的升级版，可擦写防屏蔽卡，可以重复擦写所有扇区，不响应后门指令(意味着不容易被反克隆系统发现)，可以绕过防火墙。

#### FUID 卡

不可擦写防屏蔽卡，此卡的特点 0 扇区只能写入一次，写入一次后变成 M1 卡，不能重复利用，修改后和 M1 卡完全一样，很难被屏蔽检测。

#### UFUID 卡

高级 IC 复制卡，可以理解为是 UID 和 FUID 的合成卡，需要封卡操作，不封卡就是 UID 卡，封卡后就变为 M1 卡。

#### CPU 卡

CPU 卡芯片内含有一个微处理器，配合操作系统即片上 OS，可以达到金融级别的安全等级。适用于金融、保险、交警、政府行业等多个领域。CPU 卡由 CPU 部分 7K 以及 M1 部分 1K 组成，最多破解其中 M1 部分，CPU 区域数据无法破解。实际上由于 CPU 部分和 M1 部分的数据会交互，所以基本上 CPU 卡无法破解。

### 模拟原理

#### 门禁卡一般制作流程

一般的物业公司制作门禁卡，先把采购的 M1 卡的 UID 录入小区门禁中，随后将一些加密数据（比如楼栋号，单元号、楼层、有效时间等等）录入卡片，这样在对应的刷卡机上，读取卡片数据之后，便可执行对应的功能。

#### 复制流程

现在的卡片复制技术，其实就是复制卡片的所有扇区数据，然后将模拟卡的 UID 置为加密卡的 UID，然后将其余扇区的数据，一并写入 UID，不过由于有些卡片中带有加密时间数据，所以如果你的卡片过期之后，需要重新复制一遍数据，重新模拟。

如果你想要把一张小区门禁卡搞成万能卡，那么你需要解密数据，然后对解密后的数据进行修改，（比如修改小区门号、楼栋、楼层、时间等等），再加密写入模拟卡，这就需要很高的水平，以及很多的时间和精力了，大家量力而行，如果是大佬的话忽略我。。。

由于大部分 NFC 设备是不支持模拟加密卡的，但是支持数据写入，但是我们可以使用曲线救国的方式，模拟一张非加密的 UID 卡，然后将加密数据复制之后，直接写入模拟卡，就 Ok 了！

步骤如图

![procedure.gif]({{  site.baseurl }}/img/nfc/procedure.gif)
<br />
<br />

## 需要设备

1. PN532（淘宝自行搜索）
1. 空白 CUID 卡
1. 加密的门禁卡
1. 一台 WINDOWS 电脑
1. PN532 驱动
1. [MifareOne Tool 1.7](https://github.com/xcicode/MifareOneTool)

## 步骤

### 安装 PN532 驱动

看一下购买的 PN532 是串口驱动还是已经接好了 CH430 转接芯片，如果是 CH430 的话一般不用装驱动，其余的可能要装一下 PL2303 串口驱动，网上很多，随便找一个下就行

### 扫描加密门禁卡

将 PN532 用 USB 与电脑连接，打开 MiFareOne Tool，检测连接

![step1.png]({{  site.baseurl }}/img/nfc/step1.png)

将门禁卡与 PN532 接触，扫描卡片

![step2.png]({{  site.baseurl }}/img/nfc/step2.png)

点击“一键解原卡”，读取卡片 bump 数据，保存

![step3.png]({{  site.baseurl }}/img/nfc/step3.png)

卡的解密时间根据卡的加密数据会有时间的差异，比如我的运行了大约 288 秒，总之等待就行

### 制作同 UID 的普通卡

- 把空白卡放到 PN532 上，扫描卡片
- 复制加密卡的 UID

**高级操作模式 => Hex 编辑器 => 打开刚才的 bump 数据 => 选择扇区 0 => 复制第 0 块的前 8 位数字（原卡的 UID）**
<br />
![step4.png]({{  site.baseurl }}/img/nfc/step4.png)

- 将加密卡的 UID 写到空白卡内：

**高级操作模式 => UID 写号 => 粘贴刚才的 8 位数字**<br />
![step5.png]({{  site.baseurl }}/img/nfc/step5.png)
<br />此时，同 UID 的普通卡已经制作完成

### 小米手环模拟门禁卡

- 使用小米手环模拟刚制作完的普通卡

![step6.jpeg]({{  site.baseurl }}/img/nfc/step6.jpeg)

- 将手环放到 PN532 上，扫描卡片，此时可以检测到普通卡片
- 将刚才保存的原卡 bump 数据写到手环中

**操作：高级操作模式 => CUID 写**

![step7.png]({{  site.baseurl }}/img/nfc/step7.png)

注意：此时软件可能会卡，稍稍等一下就好最后就成功了，然后拿着卡去刷门禁吧！

## 后记

1. 小米手环模拟非加密卡的时候，也很容易失败，比如我们公司的门禁卡，其他同事都模拟成功了，但我模拟的时候一直显示不能模拟加密卡，反正多试几次，就成功了。
1. 据说 PN532 有时候会过热，可以用冰箱降温。。 --源自[https://diygod.me/pn532/](https://diygod.me/pn532/)

## 参考文献

1. Wikipedia. (n.d.). 近场通讯. [online]. Available at: [https://zh.wikipedia.org/wiki/%E8%BF%91%E5%A0%B4%E9%80%9A%E8%A8%8A](https://zh.wikipedia.org/wiki/%E8%BF%91%E5%A0%B4%E9%80%9A%E8%A8%8A)
1. hceng Blog. (n.d.). NFC 手机模拟加密门禁卡. [online]. Available at: [https://hceng.cn/2019/07/12/NFC%E6%89%8B%E6%9C%BA%E6%A8%A1%E6%8B%9F%E5%8A%A0%E5%AF%86%E9%97%A8%E7%A6%81%E5%8D%A1/](https://hceng.cn/2019/07/12/NFC%E6%89%8B%E6%9C%BA%E6%A8%A1%E6%8B%9F%E5%8A%A0%E5%AF%86%E9%97%A8%E7%A6%81%E5%8D%A1/)
1. DZRAB. (n.d.). IC 卡简介. [online]. Available at: [http://pn532.com/portal.php?mod=view&aid=2](http://pn532.com/portal.php?mod=view&aid=2)
1. Yearito Blog. (n.d.). Type A 卡存储结构与通信. [online]. Available at: [http://yearito.cn/posts/storage-structure-of-typeA.html](http://yearito.cn/posts/storage-structure-of-typeA.html)
