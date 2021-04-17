## 教你朋友 CLI

### 什麼是 Comand Line Interface呢？
操控電腦主要有 Graphical User Interface (GUI) 圖形化使用者介面 & Command line interface (CLI) 命令列介面這兩種方法。其中 CLI 為用文字對電腦下指令的一種使用者介面。

### 為什麼要使用 CLI 介面？
相較於 GUI 來說，CLI 因為為純文字介面，不用下載圖像，所以較節省電腦耗能，且有時可能會受限於環境沒辦法使用 GUI ，這時便需要使用 CLI 來執行命令。

### 前置作業
1. IOS 系統：去 spotlight 搜尋 terminal；或下載 [iterm2](https://iterm2.com/) 
2. Windows 系統：建議安裝 [git](https://git-scm.com/)

### 簡單指令介紹
* `PWD`

為Print working directory的簡寫，功能為顯示你目前所在的資料夾

* `Ls`

列出目前有哪些檔案，使用 ` ls -al` 可以列出隱藏的項目

*  `cd` 

為 change directory 的簡寫，可以切換資料夾，使用方式為 `cd <directory>`

*  `Touch`

    * `touch <new file>` touch 後面接一個新的檔案，可以新增檔案
    * `touch <file already exists>` touch 後面接舊的檔案，可以修改檔案時間，可使用 ls -al 去確認檔案時間是否有被修改

* `mkdir` 

為make directory的簡稱，功能為建立資料夾，使用方式為`mkdir <new directory>`

### 開始執行指令

學完以上指令後，就可以開始建立檔案及資料夾囉，請參考步驟如下：

1. 先使用`pwd`查看自己現在的位置，確認要把資料夾建在這裡
2. 輸入`mkdir <wifi>`
3. 輸入`ls -al` 確認資料夾有新增成功
4. 輸入`cd wifi` 到 wifi 這個資料夾
5. 輸入 `touch <afu.js>` 建立名稱為 afu.js 的檔案
6. 輸入`ls -al` 確認檔案有新增成功



