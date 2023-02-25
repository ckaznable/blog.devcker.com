---
title: 用原生JS實作簡易彈出選項 Simple Option Menu
tags:
  - css
  - Javascript
  - 簡易實作
id: '851'
categories:
  - - developer
    - 前端簡易實作
  - - 程式開發
date: 2019-12-20 21:32:57
---

今天來用原生JS搭配CSS來實現簡易的彈出選項，大致上說明一下原理，主要是利用CSS有一個後選擇器搭配input checkbox就可以做出一個純css的開關，然後用JS去控制blur的事件使整個選單在操作上更完整

關於後選擇器的部分，網路上有很多不錯的文章可以直接過去參考，這邊就不贅述了

[CSS沒有極限- Checkbox的妙用 卡斯伯Blog - 前端，沒有極限](https://wcc723.github.io/css/2013/10/07/css-chechbox/)

首先第一步，我們先建構出基本的一些元件

```php
<div>
  <label for="option-btn1">
    <div>
      開啟選項菜單
    </div>
  </label>
  <input type="checkbox" id="option-btn1">
  <div class="menu">
    <span>選項1</span>
    <span>選項2</span>
    <span>選項3</span>
    <span>選項4</span>
    <span>選項5</span>
    <span>選項6</span>
  </div>
</div>
```

給checkbox一個id好讓label綁定在它上面，然後讓checkbox隱藏，這樣看起來就像是用按鈕去開關

```css
input.option-btn {
  display: none;
}
```

再來就是把後選擇器的style設定上去

```css
input.option-btn ~ .menu {
  display: none;
}

input.option-btn:checked ~ .menu {
  display: flex;
}
```

然後裝飾一下，純css的開關菜單就完成了

See the Pen [Simple Option Menu Demo1](https://codepen.io/kami25565/pen/dyPNzXB) by kami8112 ([@kami25565](https://codepen.io/kami25565)) on [CodePen](https://codepen.io).

不過這個菜單只有點開關才可以去開啟關閉，我們可能希望可以讓他點外面的時候，也可以關閉菜單，所以要加上一些JS事件讓他支援這個功能

See the Pen [Simple Option Menu Demo2](https://codepen.io/kami25565/pen/MWYJLVM) by kami8112 ([@kami25565](https://codepen.io/kami25565)) on [CodePen](https://codepen.io).

這邊主要是在menu加上了blur事件，但是這邊有一個地方要注意的是，div本身並不支援focus跟blur，但是只要幫div加上tabindex他就能有focus和blur事件的監聽

然後是可以看到我們checkbox有綁定一個change的事件，這邊這樣做是因為，blur的前提是你要先focus這個dom，但是我們按按鈕並不會focus到menu，所以才需要監聽checkbox被開啟的時候順便focus menu，這樣才不會按完按鈕，然後按外面卻沒有反應

再來就是我們會希望菜單是浮在上面的，而不是像上面的範例會占用到實際的位置，這邊直接加上**position: absolute**來補全就ok了

See the Pen [Simple Option Menu Demo3](https://codepen.io/kami25565/pen/qBERgzm) by kami8112 ([@kami25565](https://codepen.io/kami25565)) on [CodePen](https://codepen.io).

到這邊簡易的可開關彈出選單就完成了!!!