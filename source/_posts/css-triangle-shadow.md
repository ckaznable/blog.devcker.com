---
title: css三角形增加陰影 附對話框範例
tags:
  - css
  - 前端
  - 程式設計
id: '994'
categories:
  - - developer
    - 前端簡易實作
  - - 程式開發
date: 2020-01-26 13:02:22
---

工作上因為有需求所以有自己刻類似對話框的元件，後來發現對話框的三角形部分陰影好像不太好用出來，上網找了一下發現有兩種方法可以實現對話框下方的三角形陰影，所以寫下這一篇文章防止以後忘記要怎麼做

關於三角形的實作這篇就不贅述了，可以使用三角形產生器直接做出來，這篇主要還是講解陰影的部分

#### [三角形產生器](http://apps.eky.hk/css-triangle-generator/zh-hant)

這邊先產生一個對話框的殼出來，position使用relative方便三角形做定位

```css
.chat-block {
  height: 100px;
  width: 200px;
  background: #d6940f;
  border-radius: 8px;
  position: relative;
}
```

然後直接用偽元素after產生出一個三角形，我這邊產生了一個向下、寬40px、高20px且顏色是橘色的三角形，用absolute定位到下方

```css
.chat-block::after{
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: #d6940f transparent transparent;
  z-index: 99;
  position: absolute;
  bottom: -10px;
  left: 10px;
}
```

html的部分

```html
<div class="chat-block"></div>
```

放上去之後應該會長得像下面的圖一樣，接下來就是開始新增邊框

![對話框demo](https://blog.devcker.com/wp-content/uploads/2020/01/firefox_OLfG9aYq7W-300x159.png)

## 方法一   用更大的三角形當邊框

這個方法是用一個黑色的三角形放在橘色三角形的下面，產生一個邊框的效果，但是這種邊框不能用成陰影的效果，要用成陰影的效果要用第二個方法

直接用before偽元素來產生大的黑色三角形，border-width那邊第一個參數有多1是為了上他的黑色可以緊貼對話框的黑色邊框，zindex要比局色三角形小，不然他會蓋到橘色的三角形

```css
.chat-block::before{
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 11px 10px 0 10px;
  border-color: #000 transparent transparent;
  z-index: 98;
  position: absolute;
  bottom: -11px;
  left: 10px;
}
```

成果大概長這樣

![對話框demo 2](https://blog.devcker.com/wp-content/uploads/2020/01/firefox_of7WTh3JN4-300x167.png)

## 方法二   旋轉陰影

這個方法比較適合對話框是用陰影的情況下使用

直接把第一個方法的對話框邊框拿掉換成陰影，before偽元素的邊框顏色設為透明，一樣加上陰影

```css
.chat-block {
  height: 100px;
  width: 200px;
  background: #d6940f;
  border-radius: 8px;
  position: relative;
  z-index: 100;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.chat-block::before{
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: transparent transparent transparent;
  z-index: 98;
  position: absolute;
  bottom: -11px;
  left: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
```

這個時候會發現三角形的陰影跑掉了，這個時候直接用transform轉個45度，再調整一下位置就ok了，一些相關的屬性可以再自己細細調整

```css
.chat-block::before{
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 5px 0 10px;
  border-color: transparent transparent transparent;
  z-index: 98;
  position: absolute;
  bottom: -4px;
  left: 12px;
  box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.2);
  transform: rotate(45deg);
}
```

大概就會像這樣 ![對話框demo 3](https://blog.devcker.com/wp-content/uploads/2020/01/firefox_qxVRLAx2mf-300x173.png)