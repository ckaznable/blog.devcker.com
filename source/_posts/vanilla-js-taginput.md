---
title: 用原生Javascript手刻一個簡單的Tag Input
tags:
  - Javascript
  - 前端
  - 程式開發
id: '1242'
categories:
  - - developer
    - 前端簡易實作
  - - 程式開發
comments: false
date: 2020-03-22 13:52:54
---

最近因為公司的專案，需要一個這樣的功能，所以上網找了一下有沒有已經造好的輪子，但是找到的都是要綁其他的套件例如jquery之類的，加上功能都太多，我覺得因為一個小需求就把一整個套件放進來是有點太草率了，所以就試著用原生JS刻一個簡單的出來

成品大概長這樣

See the Pen [InputTag](https://codepen.io/kamix/pen/rNVZLPG) by CKR ([@kamix](https://codepen.io/kamix)) on [CodePen](https://codepen.io).

主要功能就是一個大的輸入框，輸入完成之後按下Enter會產生一個tag ![TagInput Demo](https://blog.devcker.com/wp-content/uploads/2020/03/firefox_1mkZlM6x5h.png)

他的值會是 TEST,TEST2,TEST3，有幾個Tag就會用逗號接起來，點擊tag可以刪掉值，就是一個簡單的功能，需要的朋友可以直接抄codepen的程式碼再自己改一下應該就可以了，如果沒興趣知道實做就可以點上一頁走摟

## 實作部分

這個的概念很簡單，就是用一個div偽裝成一個大的input，在裡面藏一個沒有邊框的input，然後監聽keyup事件，如果輸入Enter就會建立一個tag的dom放到最前面，同時tag也監聽點擊事件，如果點擊就把自己刪掉這樣

然後就是值的部分會用一個hidden的input存起來，這樣不管是送表單還是取值都可以直接拿hidden input的值去用，我有另外用一個陣列來管理這些值的狀態，每次更新值的時候hidden input的值會更新成這個陣列.join(",")，這樣後台只要去切到逗號就可以很簡單的取得陣列

```javascript
hidden.value = tmp.join(",")
```

## 最外面的偽輸入框

html

```php
<div class="tagInput" id="tagInput"></div>
```

css讓整塊的corsor都是text，完美偽裝input

```css
.tagInput {
  border: 1px solid #000;
  width: 500px;
  min-height: 100px;
  cursor: text;
  padding: 2px;
}
```

javascript

```javascript
var tagInput = document.getElementById("tagInput")
```

## Input輸入框和放tag的區域

輸入框要分成兩部份，一個是要給使用者輸入用的，一個是隱藏起來存值用的，這邊讓輸入的地方放在tag的後面

html直接放到tagInput的div裡面

```php
<input class="hidden" type="hidden">
  <div class="wrap">
    <div class="tags"></div>
    <input class="input" type="text">
  </div>
```

css這邊讓input的邊框用不見，這樣看起來就會感覺一整塊外面的div都是輸入框

```css
.wrap {
  display: flex;
  flex-wrap: wrap;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
}

.tag {
  padding: 8px;
  border: 1px #666 solid;
  color: #666;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 3px;
  margin-bottom: 3px;
}

.input {
  border: none;
}
```

js的部分先把這些東西找出來，這樣之後會比較好處理 javascipt

```javascript
var input = tagInput.querySelector(".input")
var tags = tagInput.querySelector(".tags")
var hidden = tagInput.querySelector(".hidden")
// 暫存用的陣列
var tmp = []
```

## 監聽最外層的click事件

光是讓外層的cursor變成text是不夠的，還要讓他點擊之後會自動focus到真正的input上面

```javascript
tagInput.addEventListener("click", function() {
  input.focus()
})
```

## 專門處理Tag新增的方法

把新增Tag上去的Code都整理成一個方法，這樣之後可以方便呼叫，Tag除了被新增上去之後還需要監聽點擊事件，因為我們希望可以再點擊Tag之後將這個值刪掉

```javascript
// 方法只需要傳入輸入的值就可以建立一個tag出來
function addTag(value) {
  // 建立一個class是tag的div
  var dom = document.createElement("div")
  dom.classList.add("tag")
  // 將丟進來的值給這個tag
  dom.innerText = value
  // 還需要監聽點擊事件 這樣才可以處理點擊後要刪除自己的部分
  dom.addEventListener("click", function(e) {
    // 不過這部份等下做處理hidden值的時候再來處理
  }
  // 新增剛剛建立的tag上去
  tags.appendChild(dom)
}
```

## 來處理input上面按下Enter的事件

想要的效果是他輸入完成後可以按下Enter送出，並且會增加一個Tag，所以監聽input的keyup事件，並判斷他按的是Enter

```javascript
input.addEventListener("keyup", function(e) {
  var keycode = e.keyCode
  // 13是Enter的keycode
  if(keycode == 13 && input.value) {
    // 這邊要處理新增tag的部分 所以直接呼叫剛剛寫的新增tag的方法 並且把使用者現在打的值傳過去
    addTag()
    // 新增完之後把舊的值去掉 不然體驗上會怪怪的
    input.value = ""
  }
})
```

到這邊你會發現功能好像快完成了，已經看起來可以運行了，但是還沒有因為最重要存值的部分還沒用，這部份沒有用上去，你怎麼去編輯這個input都沒用

## 處理hidden input的值

一開始的時候我有宣告一個tmp的變數，現在要用它來當hidden input跟tag之間的橋樑

```javascript
var tmp = []
```

這邊新增一個方法是讓hidden從tmp取值變成字串

```javascript
// 名字我不知道怎麼取所以就叫做load 這個名字可以自己取 或者不要包成方法 自己手動加在要更新值的地方也可以 包成方法是我自己的習慣而已
function load() {
  // 將hidden的值更新成tmp.join(",")
  // 這樣子如果tag有三個分別是 TEST1 TEST2 TEST3的話那hidden的值會變成TEST1,TEST2,TEST3
  hidden.value = tmp.join(",")
  // 加個console.log檢查更新有沒有成功
  console.log("hidden input vlaue: ", hidden.value)
}
```

Ok有了這個方法之後，我們就可以來修改剛剛說要來處理的地方

```javascript
dom.addEventListener("click", function(e) {
// 找出這個要刪除的tag是第幾個，也從tmp相同的地方刪除值
     tags.querySelectorAll(".tag").forEach(function(child, index) {
      if(child === dom) {
        // 從tmp相同的地方刪除值
        tmp.splice(index, 1)
        // 更新hidden input的值
        load()
      }
    })
    tags.removeChild(dom)
})
```

完整addTag方法會變成這樣

```javascript
// 方法只需要傳入輸入的值就可以建立一個tag出來
function addTag(value) {
  // 建立一個class是tag的div
  var dom = document.createElement("div")
  dom.classList.add("tag")
  // 將丟進來的值給這個tag
  dom.innerText = value
  // 還需要監聽點擊事件 這樣才可以處理點擊後要刪除自己的部分
  dom.addEventListener("click", function(e) {
    tags.querySelectorAll(".tag").forEach(function(child, index) {
      if(child === dom) {
        tmp.splice(index, 1)
        load()
      }
    })
    tags.removeChild(dom)
  })
  // 新增剛剛建立的tag上去
  tags.appendChild(dom)
}
```

再來是處理input監聽Enter事件那邊

```javascript
if(keycode == 13 && input.value) {
    addTag(input.value)
    // 新增的時候也對tmp新增
    tmp.push(input.value)
    // tmp新增完之後也更新hidden input的值
    load()
    input.value = ""
  }
```

整段code會變成這樣

```javascript
input.addEventListener("keyup", function(e) {
  var keycode = e.keyCode
  if(keycode == 13 && input.value) {
    addTag(input.value)
    tmp.push(input.value)
    load()
    input.value = ""
  }
})
```

## 最後的小步驟

加完上面的處理之後，整個邏輯就完成了，現在剩下要記得幫input加上id或name，如果你是要放在表單一起傳的那就加上name，如果是純粹要用js取值的話，可以加上id或name都可以

## 結論

大概js花不到50行就可以簡單的實現tag input，當然像這樣寫要建立好幾個tag input是很麻煩的事情，所以可以包裝一下變成可以複用的元件，當然不想這麼麻煩我是建議可以直接用別人寫好的輪子