---
title: 用少量js跟css簡單實現手機側邊欄效果
tags:
  - Javascript
  - 前端
  - 程式開發
  - 簡易實作
id: '987'
categories:
  - - developer
    - 前端簡易實作
  - - 程式開發
date: 2020-01-06 08:50:08
---

這篇文章用簡單的的js以及css簡單實作基本的手機側邊欄效果，我會介紹兩種的側邊欄效果，希望大家喜歡

## 基本的側邊攔

基本的側邊欄效果就是在手機上常看到的從左滑出來的效果，他會覆蓋內容，實作的想法基本上跟之前[實作簡單彈出popup](https://blog.devcker.com/wp-admin/post.php?action=edit&post=851 "實作簡單彈出popup")一樣,都是用了checkbox的checked跟~後選擇器做的

See the Pen [simple slide demo1](https://codepen.io/kami25565/pen/abzVaqd) by kami8112 ([@kami25565](https://codepen.io/kami25565)) on [CodePen](https://codepen.io).

整個設計的套路是用transform跟duration做出滑動的特效，再來就是用checkbox當作是開關，slide的部分用fixed，z-index使他浮在上層，然後讓slide預設transform是transitionX(-300px)這樣他一開始就是藏起來的狀態了

```CSS
.slide-wrap {
  min-height: 100vh;
  max-height: 100vh;
  min-width: 300px;
  max-width: 300px;
  background: #DDD;
  border-right: 1px #888 solid;
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  transform: translateX(-300px);
  transition-duration: 0.8s;
}
```

再來就是讓checkbox隱藏起來，設定當checkbox被勾選的時候，再讓slide跑出來

```css
input.toggle {
  display: none;
}

input.toggle:checked ~ .slide-wrap {
  transform: translateX(0);
}
```

到了這邊應該就發現可以打開slide了，但是問題來了，因為slide把checkbox擋住了，所以會關不掉，所以這時候會需要點外面的時候把它關掉，而實現這個最簡單的方法就是點其他地方的時候讓他關掉

所以乾脆監聽slide被blur的事件，這樣他每次開完slide只要點不是slide的地方就會觸發關閉

```javascript
var checkbox = document.getElementById("toggle")
checkbox.addEventListener("change", function() {
  var slide = document.getElementById("slide");
  // 判斷他點擊勾選才讓他focus
  // focus是為了讓他之後可以吃到blur的事件
  if(checkbox.checked) {
    slide.focus();
  }
});
// 點其他地方的時候會觸發blur 這個時候直接關掉slide
slide.addEventListener("blur", function() {
  checkbox.checked = false;
})
```

這樣就實作完一般的側邊欄效果