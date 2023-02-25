---
title: 瀏覽器開發中實作document_start時插入script
tags:
  - Javascript
  - plugin
  - 前端
  - 插件
  - 簡易實作
id: '1779'
categories:
  - - developer
    - 前端簡易實作
comments: false
date: 2021-01-09 14:07:35
---

常常在開發瀏覽器插件時會遇到一個需求就是，要在頁面script開始前先執行自己的程式碼，這問題看似簡單，但寫完會發現因為會在一開始執行，所以整個dom都還沒讀完，所以導致找不到可以插入的點

我也有試過用document.appendChild之類的方式，但這個會直接噴錯，看起來是不允許這樣做，但是指向document.body或document.head會跟你說他找不到，因為他根本還沒建構這些dom

後來找到了這個解法，其實這解法之前就有用到，只是最近又遇到了所以就寫個文章來記錄

之前寫的文章: [在瀏覽器插件中實作關閉網頁 alert confirm prompt](https://blog.devcker.com/extension-disable-alert/ "在瀏覽器插件中實作關閉網頁 alert confirm prompt")

以下就是解法

```javascript
const script = document.createElement("script")
script.textContent = "要插入的程式碼"

// 主要就是這段
document.documentElement.insertBefore(script, document.documentElement.firstChild  null)
```