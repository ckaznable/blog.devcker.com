---
title: 在瀏覽器插件中實作關閉網頁 alert confirm prompt
tags:
  - plugin
  - 前端
  - 擴充套件
  - 瀏覽器
  - 程式開發
  - 簡易實作
id: '1258'
categories:
  - - developer
    - 前端填坑系列
    - 前端簡易實作
  - - 程式開發
comments: false
date: 2020-03-28 10:29:10
---

最近在做自動化的瀏覽器插件，但是最近遇到了一個問題是，自動化到了某些頁面，會因為網頁跳出alert confirm prompt而導致content script卡住不能動，background也無法去檢測到這個狀況

一開始我可以想到的想法就是我只要把alert那些的方法覆蓋掉就好，所以我直接新增一個preload.js來處理這件事情，並且在manifest.json設定執行在document start

preload.js

```javascript
// 因為我這邊主要是針對最新版的chrome 所以會直接使用es6以上的語法 最後解法那邊會有舊語法的寫法
const script = document.createElement("script")
script.innerHTML = `
  window.alert = () => {};
  window.prompt = () => {};
  window.confirm = () => {};
`
document.body.insertBefore(script, document.body.firstChild  null)
```

manifest.json

```json
// 直接在content_scripts新增這段
// 讓他直接跑在頁面一開始 還有讓他也注入到全部的iframe
{
      "matches": ["http://*/*", "https://*/*"],
      "js": ["preload.js"],
      "run_at": "document_start",
      "all_frame": true
}
```

這樣做之後呢，我覺得我的方向是對的，但是跑在頁面一開始會有一個問題，那就是他還沒找到body　head，所以就變成我不能用document.body跟document.head實際上也跑不起來，因為他找不到

那怎麼辦呢，我翻了一下MDN結果就找到了這個 [document.documentElement](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/documentElement "document.documentElement")

看到他的說明

> Document.documentElement 會回傳目前文件（document）中的根元素（Element），如：HTML 文件中的 元素

心想這個應該可以喔，這個東西我還是第一次看到，這讓我也開了眼界，原來還可以直接取得html，於是我馬上就改成這個看看

preload.js

```javascript
const script = document.createElement("script")
script.innerHTML = `
  window.alert = () => {};
  window.prompt = () => {};
  window.confirm = () => {};
`
document.documentElement.insertBefore(script, document.documentElement.firstChild  null)

// 如果需要支援舊版瀏覽器可以這樣寫
var script = document.createElement("script")
script.type = "text/javascript";
script.innerHTML = "window.alert=function(){};window.prompt=function(){};window.confirm(){}";

document.documentElement.insertBefore(script, document.documentElement.firstChild  null);
```

改完之後就可以了，原本會卡住的頁面也直接過去了，真的舒暢很多