---
title: 將chrome extension轉換成safari extension的各種坑分享
tags:
  - Javascript
  - 瀏覽器
  - 程式開發
id: '1979'
categories:
  - - developer
    - 前端填坑系列
  - - dev-env
    - 瀏覽器
  - - 程式開發
comments: false
date: 2021-11-28 11:04:07
---

因為公司有這需求，所以最近在將公司的chrome extension轉換成macos上的safari extension，之後發現各種資源真的有夠少，開發社群看起來也不活躍，加上大部分都是英文，真的是有點痛苦xd

不過最後還是給他用出來了，來分享一下這次轉換有踩到的坑



### 1\. 對macos不熟

因為safari需要用到xcode去build，所以需要用到macos環境來跑這個東西，對上班用linux，回家用windows的我來說，macos真的是非常陌生xd

雖然公司有配一台mac mini給我，但我還是花了半天來熟悉這個OS跟建立整個開發環境

### 2\. icon popup內的內容不會自動inject content script

正確來說應該是icon popup內的iframe不會去載入all frame的content script

在chrome系跟firefox是可以正常工作的，但是在safari不知道是還沒實作還是覺得這樣太危險，所以就會有這個限制

因為我這邊有寫一個跟extension溝通用的sdk，原本會直接被all frame的content script給載入到各個視窗，方便我在各畫面都可以透過sdk去跟extension background做溝通

但是safari上做不到這點，所以後來我的解法是將sdk移到popup page上的script，用popup page來當iframe跟background的橋，iframe內原本的window.postMessage就換成window.parent.postMessage來發訊息

這樣有個好處是這樣做不管是原本的chrome或firefox也是可以正常工作的

### 3\. icon popup的window.close不管用

window.close在一般頁面上只要不是由js去開啟的頁面，都會不允許你使用window.close去關閉

但這個限制在chrome跟firefox的extension上不適用於icon popup page，所以在popup page內直接使用window.close可以正常關掉popup

但是在safari就比較嚴格，他在popup內也有這個限制，因為iframe內有換頁的需求，切換頁面也會導致這個問題而不能關掉popup

最後我的寫法是iframe內的路由我重新規劃都統一使用window.location.replace來換頁，這樣一來每頁都算是js開啟的頁面，自然而然popup的window.close就能作用了

只是這個做法就是要把iframe內所有會換頁的連結都改成這個方法，真的是有點累，但是之後只要都遵循這個原則就沒問題，chrome跟firefox也是通吃

### 4\. 要給別台macos debug的問題

這個問題主要是我自己一開始不知道xcode的發佈流程，一開始是用開發者的憑證去簽app，結果發現到其他台macos會說開不起來，後來查到要用Developer ID去簽這個app

但是簽完後還要傳上去給apple公證，之後就是匯出，匯出之後又發現，安裝之後的彈出視窗他有一個預設按鈕點了沒有反應，後來才知道是要放到macos內的應用程式才會正常跑

### ex. 結論

整個轉換過程其實很無痛，xcode有個工具可以直接將chrome extension轉換成safari extension，除了以上踩到的坑之外，其實也沒遇到什麼問題

比較頭痛的點大概就是專案的資料夾結構要考慮一下，因為他會建立一個xcode用的專案資料夾xd