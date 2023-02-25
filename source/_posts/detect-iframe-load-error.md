---
title: 用JS判斷iframe跨網域下是否不正常載入
tags:
  - iframe
  - Javascript
  - 前端
  - 擴充套件
  - 程式設計
  - 程式開發
  - 簡易實作
id: '1126'
categories:
  - - developer
    - 前端簡易實作
  - - 程式開發
comments: false
date: 2020-02-10 19:16:28
---

用一段簡短的js來判斷一個iframe是否有正常載入，如果說iframe是在同網域跑的話，是還好，因為你對於他的控制權更多

但是目前我遇到的是跨網域的問題，因為我是寫瀏覽器套件的時候遇到的，很常要注入iframe結果對方網站有鎖同網域的iframe，這時候就可以用這個判斷如果失敗就隱藏或者是做一些失敗的處理

這個也是我在網路上找了一段時間才找到的，想說做個筆記記錄下來，順便也分享給需要的人

先來直接看code，我這邊直接假設id ifm是一個iframe

```javascript
// 第一步當然是把它找出來
var iframe = document.getElementById("ifm");
// 綁定onload事件 這樣他載入完之後就可以開始判斷
iframe.addEventListener("load", function(event) {
    if(event.target.contentWindow.window.length === 0){
        // 這邊就是載入失敗了 可以開始失敗處理
        // do somting.....
    }
})
```

這段最重要的就是這個

```javascript
event.target.contentWindow.window.length
```

這個方法你還需要再iframe內的網站上放一個空的iframe，這樣就可以用這個方法來判斷

這是我在stackoverflow找到的解答，我覺得是滿酷的，看起來很像是一個hack方法，但其實他只是判斷iframe裡面的window對象有沒有正常而已，當他為0的時候就是iframe載入失敗了，當她為1的時候就代表iframe載入成功了

可以看一下MDN的範例就知道了 [HTMLIFrameElement.contentWindow](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow "HTMLIFrameElement.contentWindow")