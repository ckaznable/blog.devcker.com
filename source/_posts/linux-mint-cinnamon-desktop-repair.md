---
title: 修復因為升級python導致 Linux mint 桌面掛掉
tags:
  - cinnamon
  - Linux
  - mint
  - python
id: '1090'
categories:
  - - dev-env
    - Linux
  - - developer
    - 開發環境
date: 2020-02-02 11:01:30
---

因為一些原因工作上要升級python到python3.6，不升級還沒問題，一升級問題嚴重了，升級完之後我發現我的終端機打不開，然後我就reboot，重新開機再登入之後發現整個桌面變黑了，只剩下桌面的捷徑還在，當下我有夠慌張，於是開始找辦法修復

## **開始嘗試解決問題**

由於終端也打不開所以我直接ctrl+alt+F1進到tty1登入

> ctrl+alt+F1~6 可以進到tty1~6, ctrl+alt+F7可以回到原本的gui

我當下第一個想法就是先把python3.6刪掉，因為問題是因為裝了python3.6之後才發生了

```shell
sudo apt-get remove python3.6
```

移除完之後又reboot，發現結果沒有變化，這時我想說死定了，第一次遇到這種情況，還好vscode之類的桌面捷徑還可以開啟，我就開始先備份程式碼，開始commit push到gitlab上，畢竟等下出了什麼事情，不能救回來就要做白工了

在commit的過程中我又想到既然是cinnamon掛掉的話，裝gnome能不能救回來，於是我又開始切到tty1開始裝gnome3跟gdm，裝完之後reboot, 在登入的時候選gnome桌面，發現沒有問題，可以正常進入gnome，當下有夠感動，但是又發現另一個問題，那就是gnome的終端也打不開，不過gnome的桌面跟快捷功能都是正常的

上網google了一下，有xterm這個東西，但是說真的不太習慣，而且內建的終端機不能開也是很奇怪，所以我直接用xterm打開gnome的終端直接輸入

```shell
gnome-terminal
```

## **發現主要問題**

發現他跳了一個關於python的錯誤，大概就是寫他找不到\_gi的套件，上網直接用\_gi當關鍵字去找，終於找到有人跟我有類似的情況，原來就是因為python3.6少了\_gi所以每次開的時候會噴這個錯誤所以就掛了，之後我照著網路上的解法終於解決了這次的問題

## **大致上解法**

解法就是去把python3.5的\_gi複製給pytohn3.6用，先進到python3 gi的資料夾

```shell
cd /usr/lib/python3/dist-packages/gi/
```

然後輸入看一下目錄下的檔案，會發現有名字很長然後gi開頭的檔案，會長的類似這個名字

```shell
_gi.cpython-35m-aarch64-linux-gnu.so
_gi_cairo.cpython-35m-aarch64-linux-gnu.so
```

用cp複製一份，檔名就把35m的部分改成36m

```shell
sudo cp _gi.cpython-35m-aarch64-linux-gnu.so _gi.cpython-36m-aarch64-linux-gnu.so
sudo cp _gi_cairo.cpython-35m-aarch64-linux-gnu.so _gi_cairo.cpython-36m-aarch64-linux-gnu.so
```

複製完之後我開啟gnome的終端機，已經是正常了，再來就是登出，登入的時候選擇cinnamon，登入也正常了，我看到正常我也是鬆了一口氣

## **結論**

雖然說多裝了gnome但是問題解決我就覺得ok了，雖然說我覺得這應該不是最正確的解法，但至少這個方法讓我解決這次問題，在還沒裝gnome之前我還想說直接重灌mint好了，還好有多試試看其他方法