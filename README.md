# Document

## 前置条件

### 1.npm 下载(下载nodejs以后会自动带上npm)

[Nodejs Download](https://nodejs.org/en)

### 2.git 安装

``` shell
npm i git
```

### 3.项目安装

这里 `fileName` 是文件夹名称,你可以自定义一个，例如: `git clone https://github.com/zhuqingyv/weiwei.git music` 将创建一个music文件夹

``` shell
git clone https://github.com/zhuqingyv/weiwei.git fileName
```

## 基本命令

**cd:** 进入到文件夹,例如:

``` shell
cd ./Desktop
```

**ls:** 查看当前文件目录,例如:

``` shell
ls
```

## 预览项目

### 1.进入文件目录

这里你要知道本地的文件目录

``` shell
cd ./xxxxx
```

### 2.安装依赖

``` shell
npm i
```

### 3.运行预览

``` shell
npm run dev
```

### 3.这时候应该唤起一个浏览器网页

## 打包项目

*打包前要确保已经安装了全部依赖，也就是命令 `npm i`*

### 1.执行命令

``` shell
npm run build
```

### 2.检查文件目录

目录中应该有一个`dist`文件夹
