---
layout:    post
title:     "Ruby RVM is not working with ZSH"
subtitle:  
date:      2016-4-23
author:    "maniaU"
header-img: "img/ruby.jpg"
tags:      RVM ZSH 
---

##  安装ZSH后RUBY GEM无法工作

最近到了新公司，有人介绍给了我ZSH这个插件来美化Terminal，但是安装了ZSH之后，我用Jekyll搭建的博客在本地就无法运行了，在本地没办法调试的话，每次都要上传服务器调试，会特别麻烦。terminal报错显示：

	/Users/maniauuuuu/.rvm/rubies/ruby-2.2.3/lib/ruby/site_ruby/2.2.0/rubygems/dependency.rb:315:in `to_specs': 
	Could not find 'jekyll' (>= 0) among 11 total gem(s) (Gem::LoadError)
	Checked in 'GEM_PATH=/Users/maniauuuuu/.gem/ruby/2.2.0:/Users/maniauuuuu/.rvm/rubies/ruby-2.2.3/lib/ruby/gems/2.2.0', execute `gem env` for more information

其实，每次打开Terminal都会显示：

	Warning: PATH set to RVM ruby but GEM_HOME and/or GEM_PATH not set, see:
    https://github.com/rvm/rvm/issues/3212

他已经告诉你ruby RVM的路径设置了，但是GEM_HOME和GEM-PATH没有设置，你可以到[https://github.com/rvm/rvm/issues/3212](https://github.com/rvm/rvm/issues/3212)上去找解决方法，但是这个页面也没有给出直接的解决方法，@mpapis告诉你OMZ并没有设置路径，你可以重新设置RVM的默认路径，[https://rvm.io/rubies/default](https://rvm.io/rubies/default)有直接的解决方法：

### 使用特定版本的ruby：

	$ rvm --default use 2.2.3
	# 把2.1.1替换为你已经安装过的ruby版本
	
	$ ruby -v
	# ruby 2.2.3p173 (2015-08-18 revision 51636) [x86_64-darwin15]

### 使用你的系统版本ruby：

	$ rvm use system

	$ ruby -v
	# 会显示你的系统版本ruby

### 使用你设置的默认版本ruby

	$ rvm default

	$ ruby -v
	# 显示你的默认版本ruby

### 显示你现在设置的默认版本ruby

	$ rvm list
	
	rvm rubies

	ruby-2.2.1 [ x86_64 ]
	=* ruby-2.2.3 [ x86_64 ]

	# => - current
	# =* - current && default
	#  * - default

我使用了设置默认版本ruby就搞定了，你可以自己挑选一个方法试试看啦~

——————————————————————————————————

5.25更新

[新的解决办法戳我](https://stackoverflow.com/questions/27784961/received-warning-message-path-set-to-rvm-after-updating-ruby-version-using-rvm/28080063)。

希望大家自取~

