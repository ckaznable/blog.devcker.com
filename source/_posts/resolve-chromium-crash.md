---
title: 解決chromium系列瀏覽器開多個視窗卡頓問題
tags:
  - 瀏覽器
id: '1862'
categories:
  - - dev-env
    - 瀏覽器
comments: false
date: 2021-02-27 10:50:54
---

自己之前有遇過這問題，雖然只要開一個分頁就沒問題，但還是會有些不方便，所以就有上網找一下怎麼解決，後來就有找到問題所在，也順利的解決了，現在使用就跟之前一樣無障礙

我自己是用linux Mint我不確定是不是只有這個os會有這個問題，但我看ptt還是其他論壇都沒有人有這問題，所以我先記錄下來

我自己是在某次chrome更新之後才有這個問題，而且不只chrome，只要是chromium系列的瀏覽器都有這問題，像是brave跟新版的edge

解決方法是只要關掉硬體加速就可以解決這問題，下面講一下主流瀏覽器關閉硬體加速的方法



### chrome

先到設定頁面，或網址直接打chrome://settings 也能進去

然後直接在網址列上面打硬體加速就可以直接找到選項，之後就是直接把它關掉重開

![](https://blog.devcker.com/wp-content/uploads/2021/02/chrome_QBt2OMUeBS-1.png)

或者點左側的進階->系統 也可以找到這選項

![](https://blog.devcker.com/wp-content/uploads/2021/02/chrome_RF5eFx1B9G.png)

### Brave

brave的做法其實跟chrome差不多

一樣到設定頁面或網址打 brave://settings

進去之後左上角有一個放大鏡，點下去可以搜尋，一樣找硬體加速也能找到選項

![](https://blog.devcker.com/wp-content/uploads/2021/02/brave_bvj84gLs0d-1024x231.png)

不想用找的一樣左側的額外設定 -> 系統 也能找到

### Edge

這邊的edge是指新版本的edge喔，因為新版的才是chromium

操作方法大同小異，進入設定頁或輸入網址 edge://settings

然後左上角有一個很明顯的搜尋框，一樣直接搜尋硬體加速

![](https://blog.devcker.com/wp-content/uploads/2021/02/msedge_AhGjzxM4D1-1024x212.png)

不用搜尋的左側直接點系統也能找到選項

### 結論

雖然這情況很少人遇到，但真的遇到還真不知道該怎辦，所以特別寫這文章記錄一下，不然又要繞一圈國外的論壇(汗