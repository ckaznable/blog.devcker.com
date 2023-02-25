---
title: 用JS建立兩個陣列內容互相組合成的陣列
tags:
  - Javascript
  - 前端
  - 程式設計
  - 簡易實作
id: '1610'
categories:
  - - developer
    - 前端填坑系列
  - - 程式開發
comments: false
date: 2020-11-14 17:09:37
---

用Js建立兩個陣列內容互相組合而成的陣列,像是\[a, b\]跟\[1, 2\]會產出\[a, 1\]\[a, 2\]\[b, 1\]\[b, 2\]這樣的結果

在工作中剛好遇到這個奇怪的需求，然後查了一下，發現不知道怎麼下關鍵字，後來還是找到了，所以放在這邊筆記一下

```javascript
function cartesianProduct(arr, arr2) {
  let combine = []
  arr.forEach(val => {
    arr2.forEach(val2 => {
      combine.push([val, val2])
    })
  })
  return combine
}

function combination(groups) {
  let combine = groups[0]
  for (let index = 1; index < groups.length; index++) {
    combine = cartesianProduct(combine, groups[index])
    if(!combine) {
      return
    }
  }
  return combine
}

combination([["a", "b", "c"], [1,2,3]])
```

可以直接把上面這段code貼到console看看結果是不是想找的那個效果