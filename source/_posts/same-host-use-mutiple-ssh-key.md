---
title: 在gitlab或github下使用同一個主機多個帳號用不同ssh key
tags:
  - git
  - gitlab
  - ssh
id: '901'
categories:
  - - 程式開發
  - - developer
    - 開發環境
date: 2020-01-02 19:50:16
---

這篇是因為我自己最近有遇到類似的問題，所以才紀錄一下，自己的解決過程



我遇到的情況大概是這樣的，我自己電腦原本已經有產生公司那組帳號的SSH Key，之後因為自己的需求需要另外用一隻帳號存自己的專案，結果發現就算產生了另外一組SSH Key也無法讓他被使用到，他會一直讀到原本公司的SSH Key，後來上網找了一些文章，才終於解決這個問題

## 產生另一組SSH Key

### Step 1 檢查SSH Key

我們先假設已經有一組原本正在使用的SSH Key,他預設位置應該會在這裡

```shell
~/.ssh/id_rsa
~/.ssh/id_rsa.pub
```

### Step 2 開始產生另一組SSH Key

然後再產生一組自己要另外用的SSH Key

```shell
sshkey-gen
```

### Step 3 設定SSH Key

之後會詢問你要放哪裡，預設位置會跟你的作業系統有關

> 預設都在 ~/.ssh/id\_rsa windows如果有使用git bash的話也可以直接使用~來直接代表你的家目錄

記得檔案名稱要不一樣，不然會把原本的SSH Key給蓋掉

```shell
Generating public/private rsa key pair.
Enter file in which to save the key (~/.ssh/id_rsa): ~/.ssh/<ssh key檔案名稱>
```

### Step 4 設定密碼

再來會問你這組Key需不需要密碼

> 如果之後做push的時候不想打密碼這邊直接留空

```shell
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

### Step 5 產生完成

出現這樣的畫面代表這組key就產生完成了，他會在你剛輸入的位置產生一組公鑰跟私鑰

> .pub的是公鑰，之後要放上去github或gitlab都用這個

![ssh-keygen](https://blog.devcker.com/wp-content/uploads/2020/01/mintty_N7AnqJ63YY.png)

## 設定ssh

### Step 1 編輯config

接著進去~/.ssh，找找看有沒有一個config的檔案，如果沒有就自己建立一個空的檔案，然後直接編輯他, 以下用gitlab做示範，github也是一樣的做法

```shell
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_rsa

# 這邊可以自己動, 但是求方便都是原本的Host加上使用者名稱
Host gitlab.com-username
    HostName gitlab.com
    User git
    # 剛剛上面產生的ssh key位置 
    # 如果你上面產生的位置在 ~/.ssh/id_rsa_username
    # 那就填入~/.ssh/id_rsa_username 依照自己設定的為主
    #  這邊用~/.ssh/id_rsa_username示範
    IdentityFile ~/.ssh/id_rsa_username
```

分別設定兩組的SSH Key要對應的Host

> Host代表是你在做ssh的時候，系統會去對的位置，想要設定不同的帳號就是要去改變這個值，預設的帳號我們就直接用原本的網域名就好
> 
> HostName跟User不用動，HostName就是系統真的會去叫的位置
> 
> IdentityFile就是你要指定給這個Host的SSH Key檔案

### Step 2 設定完成後存檔

直接存檔就可以了，這邊只是設定ssh Host要去對應哪個SSH Key

## 複製公鑰到gitlab或github

### 複製公鑰

直接把剛剛產生的公鑰打開，我這邊示範預設的指令，另外產生的也是一樣

```shell
cat ~/.ssh/id_rsa.pub
```

打開之後會跑出很多亂碼，把這些亂碼複製起來，這些就是你的公鑰

### 複製到Github

先去github的設定頁，左側有一個SSH and GPG Key直接點進去

![github ssh setting](https://blog.devcker.com/wp-content/uploads/2020/01/firefox_hFt0ovIqMw-144x300.png) 進去之後有一個new SSH key的按鈕點進去

進去之後會看到這樣的畫面，直接把剛剛複製的公鑰貼進去key的欄位裡面，title取一個自己知道的名字就可以了，完成之後直接Add SSH key

![github add ssh key](https://blog.devcker.com/wp-content/uploads/2020/01/firefox_2WTx9sOmRZ-3-1024x495.png)

這樣github上就有你的公鑰了，github的部分就這樣設定完成

### 複製到Gitlab

gitlab跟github是大同小異，一樣先進去設定頁面，一樣左側選單選擇SSH keys

![gitlab setting](https://blog.devcker.com/wp-content/uploads/2020/01/firefox_aKFZ6Ih1Ky-107x300.png) 點進去之後就有一個key的欄位可以直接貼上你的公鑰，title一樣打上你知道的名字就好，輸入完成之後點Add key就OK了

![gitlab add ssh key](https://blog.devcker.com/wp-content/uploads/2020/01/firefox_tUQrsGIhvu-1024x498.png)

gitlab到這邊也就設定完成

## 最後的步驟

最後你要做clone的時候直接把他的域名改成你的host就好，這邊假設你設定的是這樣

> 預設帳號的host gitlab.com 另外一組帳號的host gitlab.com-username

假設clone的指令是以下這樣，如果是用預設帳號就不用改，因為他的域名跟你設定的host是一樣的

```shell
git clone git@gitlab.com:xxx/xxx.git
```

但如果你要用另一組帳號的ssh key的話，就改成這樣就可以了

```shell
git clone git@gitlab.com-username:xxx/xxx.git
```