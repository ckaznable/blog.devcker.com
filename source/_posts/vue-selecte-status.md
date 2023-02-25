---
title: 用vue簡單實作 全選跟取消全選的checkbox狀態
tags:
  - Javascript
  - 前端
  - 程式設計
  - 程式開發
id: '1464'
categories:
  - - developer
    - 前端簡易實作
  - - 程式開發
comments: false
date: 2020-09-05 09:50:56
---

簡單用vue實作常見的checkbox list全選跟取消全選，還有當以下手動全選後，全選的checkbox自動變化

直接上code:

See the Pen [simple select all status use uve](https://codepen.io/kami25565/pen/VwarNdN) by kami8112 ([@kami25565](https://codepen.io/kami25565)) on [CodePen](https://codepen.io).

### 實作

這段邏輯的核心在computed的selectAllStatus，用getter跟setter達到讓他自己判斷目前選取的數量要呈現哪個狀態

```javascript
selectAllStatus: {
      get() {
         return this.selected > 0 && this.selected === this.items.length
      },
      set(val) {
        this.items = this.items.map(item => {
          item.selected = val
          return item
        })
      }
}
```

#### getter

判斷目前選取的數量是不是全部的數量，如果是的話狀態就是選取，如果不是就是取消選取

```javascript
get() {
         return this.selected > 0 && this.selected === this.items.length
}
```

#### setter

checkbox在變更狀態的時候會觸發setter，所以判斷目前的狀態是點全選還是取消全選，然後把items全部的selected狀態變成true或全部變成false

```javascript
set(val) {
        this.items = this.items.map(item => {
          item.selected = val
          return item
        })
}
```