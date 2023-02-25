---
title: 解決在WSL下操作npm 發生沒有權限的錯誤
tags:
  - Javascript
  - 前端
  - 填坑
  - 程式設計
  - 程式開發
id: '1532'
categories:
  - - developer
    - 前端填坑系列
    - 開發環境
  - - 程式開發
comments: false
date: 2020-11-01 12:05:15
---

最近因為都用WSL開發，然後在WSL發生npm怎麼操作都會沒有權限，即使加了sudo也是，所以就上網找了解法

一開始以為是WSL2的bug，但是上網找有找到2017的文章，所以應該是老問題，後來發現解法是關掉vscode或先斷掉vscode跟wsl的連結之後操作就沒問題了

因為這個搞了我好久，所以這邊做個筆記以後比較好找到問題