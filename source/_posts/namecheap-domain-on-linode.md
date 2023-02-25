---
title: 在Linode上設定namecheap上買的網域
tags:
  - linode
  - vps
id: '1203'
categories:
  - - developer
    - 開發環境
comments: false
date: 2020-02-29 16:08:46
---

最近因為想做一些小專案，所以想租vps來玩玩看，後來挑來挑去就選linode來當我第一台vps，用的方案是最便宜的一個月5美金的方案，另外有在namecheap上面買比較便宜的域名來用，不過都買完之後發現問題來了，我並不會dns相關的設定，然後發現這方面文章都是英文居多，所以大概折騰了兩天才搞好，這邊分享一下我自己的作法順便紀錄一下，以免之後忘記

另外有想使用linode但是想玩玩看，還沒註冊的朋友可以用我的邀請連結註冊喔

#### _[Linode邀請連結](https://www.linode.com/?r=64065cbcc62df964564e7eff9dac422b47d9ba72 "Linode邀請連結")_

這篇文章的前提是你已經在namecheap買好了域名，linode那邊也已經設定好的情況下喔，因為linode設定在網路上都找得到所以這邊都不贅述了

## Step 1

先進入Linode的[Dashboard](https://cloud.linode.com/dashboard "Dashboard")，左邊選單有一個選項是Domains直接進去 ![Linode Domains Option](https://blog.devcker.com/wp-content/uploads/2020/02/firefox_pX53vJ9CEI.png)

之後右上角的地方有一個Add a Domain一樣直接點下去，他會跑出一個設定的視窗

![Linode Domain Setting](https://blog.devcker.com/wp-content/uploads/2020/02/firefox_SJ89k9AZKI.png)

Domain那欄填上你買的Domain名稱，例如我在namecheap買的Domain是devcker.xyz那我就填上devcker.xyz

SOA Email Address就填上你常用的email

Add Tags是你有在管理tag的話就自己選自己要放在哪個tag，沒有的話就直接留空

Insert Default Record這項選擇跟圖片上一樣的他會幫你把最常用的DNS設定都設定好

Linode這攔就選你這個Domain是要給哪一台vps用的

## Step 2

之後按下確認，就可以看到一整個DNS的設定，其中最重要的就是NS Record，可以看下圖Linode給我了五個name server，而我們只需要把這五個設定到namecheap就行了，之前不知道我還把這頁全部的設定都輸入到namecheap，結果等了一天之後發現失敗了XD

![Linode NS Record](https://blog.devcker.com/wp-content/uploads/2020/02/firefox_Vc7g9dsfuO-3-1024x291.png)

到這邊Linode這邊就設定完了，接下來切換到namecheap的頁面

## Step 3

一樣先進去namecheap的[Dashboard](https://ap.www.namecheap.com/dashboard "Dashboard")，如果你已經有買Domain應該會出現跟下圖差不多的選項，這邊選MANAGE

![namecheap domain](https://blog.devcker.com/wp-content/uploads/2020/02/firefox_MQAGiWiBrR-1024x84.png)

進去之後往下滑到Nameservers的地方，這邊選項原本是Namecheap Basic DNS把它改成Custom DNS，之後下方會出現可以填的選項，這邊把Linode剛剛給的那五個設定上去

![namecheap set linode name server](https://blog.devcker.com/wp-content/uploads/2020/02/firefox_tsJ9SonmMg.png)

## Step 4

如此一來，namecheap跟Linode都設定好了，接下來就是等DNS紀錄傳播開來，大概等個幾小時，如果有設定成功，你用nslookup就會看到網域的ip已經換到你Linode VPS的ip了