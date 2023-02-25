---
title: 解決firebase下firefox在service worker無法觸發notificationclick事件
tags:
  - firebase
  - firefox
  - Javascript
  - js
  - service worker
  - 前端
  - 填坑
id: '902'
categories:
  - - developer
    - 前端填坑系列
  - - 程式開發
date: 2019-12-25 19:55:26
---

今天上班的時候採了一個firebase的坑，主要是firefox沒辦法去觸發notificationonclick的問題，上網到處找，終於讓我在stackoverflow找到答案，這是一個firefox自己的問題，我寫這篇文章來防止自己忘記怎麼解

解法很簡單就是在建立messaging物件之前先監聽notificationclick的事件，主要是因為FCM他本身自己有預設的notificationclick的事件，然後firefox又因為一些自己的原因，所以會導致之後監聽的notificationclick事件無效

所以只要把監聽事件往前就可以解決

```javascript
self.addEventListener('notificationclick', function(event){....})
messaging = firebase.messaging();
```

然後附上我找到的stackoverflow上的解法 [\[傳送門\]](https://stackoverflow.com/questions/53595019/service-worker-notificationclick-event-doesnt-focus-or-open-my-website-in-tab)

這個問題害我整個早上都在處理這個bug..