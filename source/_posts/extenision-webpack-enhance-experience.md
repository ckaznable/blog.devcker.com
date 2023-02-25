---
title: 使用webpack強化chrome瀏覽器套件的開發體驗
tags: []
id: '1181'
categories:
  - - developer
    - 前端填坑系列
    - 開發環境
  - - 程式開發
comments: false
date: 2020-02-28 14:01:11
---

我自己因為工作的關係開始在開發chrome的擴充套件，然而因為瀏覽器套件的上下文都在同一個地方，變數都是全域變數，變成我不太好切模組出來，所以我就開始找有沒有用webpack的解法

另外我也有寫用原生的方式載入esm模組的開發方式，也是可以試試看：[在瀏覽器插件開發中使用import export來優化架構](https://blog.devcker.com/browser-extension-use-import-and-export/ "在瀏覽器插件開發中使用import export來優化架構")

用簡單關鍵字去google了一下發現，很多人有同樣的想法，所以都自己造了輪子，我就用了其中一個輪子來造我的套件，我用的是以下這個套件來當輪子

[samuelsimoes /chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate "samuelsimoes /chrome-extension-webpack-boilerplate ")

他看起來符合我的需求，所以我就直接把他clone下來試試看

## Step 1

他自己的範例是用yarn，但是我自己是習慣用npm我認為這個應該是沒什麼差別所以如果是用yarn的朋友就直接下指令安裝

> yarn

跟我一樣用npm的話，就直接install

> npm install

然後看了一下package.json他有兩個指令，一個是start一個是build

```json
"scripts": {
    "build": "node utils/build.js",
    "start": "node utils/webserver.js"
}
```

start是會開啟hot reload只要你有改檔案，他就會馬上在build一個版本出來，馬上瀏覽器那邊就會重新整理，這正是我所要的開發體驗，而build就只是純粹用production的環境build一個版本而已，這是要發佈的時候才要用，開發的時候用start就可以滿足大部分的需求

## Step 2

大概摸了10分鐘的時候發現，我用npm start每次重新build的時候，build出來的manifest.json會不見，天啊，這是一個嚴重的bug，感覺看起來是manifest.json被webpack清除掉了

終於在他的webpack.config.js找到他有用CleanWebpackPlugin在每次build的時候清除資料夾裡面的檔案，雖然他在下面有用CopyWebpackPlugin試圖把manifest.json複製回來，但感覺是時機不對，複製回來後就被刪除了

![](https://blog.devcker.com/wp-content/uploads/2020/02/code-1024x609.png)

有可能你在看的同時這個bug已經有被作者修正，我這邊會記錄下我目前的解法

我在CleanWebpackPlugin這邊新增了一個選項，確保manifest.json不會被清除

```javascript
new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['!manifest.json']
}),
```

## Step 3

透過以上的修改，目前看起來開發的流程看起來都正常的工作，接下來我開始測試background跟content的開發的時候發現他預設沒有給content.js，回到github看他的readme才有看到原來是要自己加，照著上面的改法新增修改了之後，content也可以開始跑了

但是在測試content.js的時候又發現了另一個問題，那就是修改content的時候似乎不會載入新的content，不過看起來build的時候新的檔案的確有修改進去才對，這個我並不清楚原因，想說可能是瀏覽器沒有讀取到新的content，所以後來去找了怎麼讓瀏覽器動態去重新載入套件最後找到了這個

[andreasvirkus/Extension\_reloader.md](https://gist.github.com/andreasvirkus/c9f91ddb201fc78042bf7d814af47121 "andreasvirkus/Extension_reloader.md")

我就直接在js資料夾內新增hotReload.js並且在webpack那邊設定build的時候也複製一份過去

在CopyWebpackPlugin這邊的設定再多一個設定

```javascript
new CopyWebpackPlugin(
    [
        原本的設定,
        {from: "src/js/hotReload.js"}
    ]
),
```

最後由於這個專案的background並不是直接用background.js，而是還有用background.html的設定，所以不能直接在manifest.json用這個設定

```json
"background": ["reloader.js", "background.js"]
```

所以我們改成在background.html裡面加上這個，讓background自動去載入這段code

改完之後，看來content的設定也可以自動載入新的了

## Step 4

這樣剩下一個問題就是當你瀏覽器啟動著你的套件的時候，你直接去npm start會因為webpack會先清除你的檔案，導致你的瀏覽器會有機會噴他找不到套件的檔案，這邊我就想不到怎麼解了

我目前自己的解法只能每次要npm start的時候先把套件關掉build完成後再打開，但是之後的更改體驗就沒什麼問題了