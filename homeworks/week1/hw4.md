## 跟你朋友介紹 Git

### 什麼是版本控制？
假設你現在和同事一起協作採購總表的檔案，每更新一次檔案都要按另存新檔留底，所以現在採購總表有很多不同的版本，叫採購總表v1、採購總表v2、採購總表v3⋯⋯採購總表v51，你覺得檔案很多不好整理，而且也不知道每個版本之間的差異是什麼，所以希望能有一個程式，讓你可以查看更動的歷史紀錄，幫你管理不同版本的採購總表，這個程式在做的事情就是版本控制。

### Git 簡介
Git 是一個負責作版本控制的程式，可以管理不同版本的檔案，優點為可以查看更動的歷史紀錄。
另外，同個檔案可以有不同分支，讓使用者可以在不同分支上更動檔案，最後在將分支合併起來，分支的部分在後面會再做補充。

### 在正式介紹 Git 之前，先來思考要怎麼用資料夾來做版本控制：

拿蔡哥的笑話來舉例：

* 沒有版本控制的資料夾長這樣：
![Imgur](https://i.imgur.com/xoJFcQh.png)

  * 不同的版本用流水號來表示。笑話需和笑話說明需一起使用，更新笑話，不一定也會更新笑話說明。舉例來說，笑話 v2 和 v1 都是和笑話說明 v1 搭配。
  * 當更新笑話版本為 v3、笑話說明為 v2時，若沒有特別加註解，使用者可能會誤以為笑話 v2 須要搭配笑話說明 v2。

* 當用資料夾來作版本控制後，**就知道不同版本的笑話需配上哪一個版本的笑話說明**，因為會把笑話和他的笑話說明放在同一個資料夾裡。

  - 第一版：
![Imgur](https://i.imgur.com/oXUK3fh.png)

 - 第二版：複製第一版的資料夾，並且只更新笑話 v1 成笑話 v2 
![Imgur](https://i.imgur.com/SDhGGTz.png)

 - 第三版：複製第二版的資料夾，並且只更新笑話說明 v1 成笑話說明 v2
![Imgur](https://i.imgur.com/SGvWRbe.png)

然而在多人一起協作的情況下，若使用流水號，可能會不小心同時建立了一樣名稱的版本，例如，現在最新版為第三版，我跟同事同時在更新笑話，更新完後又同時建立的第四版這個資料夾。故我們會先使用亂數當作版本名稱，這樣就不會有資料夾檔名相同的問題。
![Imgur](https://i.imgur.com/t8FnNtA.png)

#### 蔡哥發題
- 那這樣要怎麼知道哪一個才是最新的版本？
    - 因為資料夾名稱為亂數，無法判斷出哪一個資料夾裡面的檔案才是最新版本，所以我們需要再建立一個文字檔：**最新的版本**來紀錄。
    ![Imgur](https://i.imgur.com/vpJu9mM.png)
    ![Imgur](https://i.imgur.com/Wc3IL6F.png)
- 如果有那不想被加入版本控制的檔案怎麼辦？
       - 前面要提到，每要更新一次版本時，就會複製一次最新版本的資料夾，並且修改裡面的檔案，所以可以把不想被複製的檔案丟在資料夾外，就不會被複製到，也就不會被控制。

- 那要怎麼知道版本的先後順序？
    - 同前面所述，可以在版本控制外，建立檔案：**歷史紀錄**
 ![Imgur](https://i.imgur.com/S687xGZ.png)
 ![Imgur](https://i.imgur.com/11znTWF.png)

以上，就是用資料夾來說明版本控制的基本概念。

### 如何安裝 Git
* Mac

打開 terminal，輸入 git-version，系統即會指引安裝

* Windows

點[此](https://git-scm.com/)安裝，安裝完輸入 `git--version`即可知是否成功

### Git 指令說明

#### `git init`
* 代表 initialize 的意思，即開始使用在這個資料夾使用 Git
* `ls -al` 可以找到隱藏資料夾 <.git>
* `rm -r .git`可以刪除版本控制功能

#### `git status`
版本控制狀態

#### `git add`
* 加入版本控制
* untracked files ，代表沒有被加入版本控制
* staged，已被加入版本控制（有被修改過但還沒正式建立新版本）
* 若要從staged移回untracked flies：用`git rm --cached <file>`
* 若要將所有檔案都加入版本控制：`git add .` 

#### `git commit -m"enter commit name"`
* 新建一個版本

>概念：新增commit，就像是新增一個資料夾，資料夾名稱為commit編號，add為新增檔案進去。

* `git commit -am "enter commit name“`將所有 (am 代表 all) **修改過**的檔案加入 staged 區，再加入 commit 中。如果是新增的檔案則不適用。

#### `git log`
* 查看歷史紀錄
* `git log --online` 可以顯示較短的歷史紀錄

#### `git checkout`
* 回到某一個版本的狀態
* `git checkout <commit name>`查看該版本狀態
* `git checkout master`回到 master 這個 branch 的最新版本

#### `.gitignore`
* 不想被加入版本控制的檔案
* `touch .gitignore`建立檔案後，`vim .gitignore`將不想要被版本控制的檔案（通常為使用者個人資料或作業系統的紀錄檔案）數入到到 <.gitignore> 裡面

#### 概念複習
* `git init` 讓資料夾有 Git 的功能
* `touch .gitignore`將不想被加入版本控制的檔案寫進 .gitignore 裡面
* `git add` 將檔案加入版本控制 
> 把檔案加入暫時的資料夾

* 新建版本 `git commit -m"enter commit name"` 
>正式給予暫時的資料夾版本名稱

* 切換版本 `git checkout <commit name> ` 
>去到某個資料夾底下

### Branch 介紹

#### 為什麼需要 branch?
有別於一條線式的開發模式，用分支可以讓開發者在平行時空裡各做各的事情，最後再將結果合併在一起。這樣的優點是，若分支出問題時，不會互相影響。

- 一條線式開發：
![Imgur](https://i.imgur.com/2qgAZga.png)

* 分支式開發

可以同時開發新功能、作 bug fix
![Imgur](https://i.imgur.com/Cz2NaXL.png)

#### 怎麼實作 branch?
#####用資料夾來舉例：

1. 建一個 main 資料夾，然後裡面新增**子資料夾** commit 1 & commit
2. 再複製 main 並建一個資料夾叫做 new ，這時new 資料夾裡面也會有子資料夾 commit 1 & commit 2
3. 繼續在 new 裡面新增 new commit 3 & new commit 4
4. 最後將 new commit 3 & new commit 4 移過去到 main 資料夾裡面，即可合併 main 和 new。
5. 若 main 也有新增 commit 並且不小心和 new 改到同個檔案，那會產生 conflicts。

***
### 和 branch 相關的指令介紹
#### `git branch -v`
* 可以看目前有哪一些 branch，`git init`後的所預設的 branch 名稱為 main (master)。

#### `git branch` 
* 新增一個新的 branch
* `git branch <new branch name>`

#### `git branch -d` 
* 刪除 branch

#### `git checkout` 
* 切換到不同的 branch
* `git checkout <branch name>`

#### `git merge` 
* 合併 branch 
* `git merge <branch to be merged into>`
* 若現在在 branch master，然後要將 master 和 yay 這個 branch 合併在一起，使用 `git merge yay` 則表表將 yay 這個 branch 合併到 master 裡面

### conflict 
若在不同的 branch 改到同一個檔案的話，在合併檔案時 Git 會無法分辨哪一個才是正確的版本，這時 Git 會跳出 conflict 的訊息
#### 如何解決 conflict?
* `git status`查看哪個檔案有 conflict
* `vim <file with conflict>`修改內容，Head 下方顯示的內容為現在所在的 branch 的內容
* 改完後 `ｇit commit -am ""`

## Git & Github
### Github
* 如剛剛所述，Git 可以讓多人同時做各自的事情，而大家共用的 git project 就是 repository (資料庫、倉庫），而 Github 即是放 git repository 的地方。
* 簡單來說 Github 能夠讓 repository 具現化地呈現在網頁上。

#### 怎麼將 new repository 放到 Github 上？
1. 點右上角 + new repositoy
2. 輸入 repository 名稱
3. 去 terminal 輸入 `git remote add origin http://github.com/blahblahblah`
   * origin 代表 github 遠端repository的代號
   * 網址為 github 提供
4. 去終端機輸入 `git push -u origin master `
   * -u = set upstream 要將檔案推到哪
   * master 是 branch 名稱，通常會 push branch 的預設值 master，這樣和遠端 branch 預設值的名稱相符
   * origin 指 Github

### 指令介紹
#### `git push origin <branch name>`
* 將資料同步到 Github 上

#### `git pull origin <branch name>`
* 當其他人更動 repository 的資料時，須將最新版本 pull 到 local 端
* 當 pull 下來的 master 和原本的版本有 conflict 時，要手動 resolve conflict，解決完衝突再 push 回到 Github 上
* 也可以直接在 Github 上改資料

#### `git clone`
* 想要下載別人的 repository 時可用
1. 點 clone or download 
2. 複製 clone with SSH 的網址 git clone，到 terminal 輸入 `git clone <網址>`
* 下載後不能 push 回到遠端上，因為是別人的 repository，可以先用 fork 將 repository 下載到自己的帳號，再 clone 一次，即可和遠端同步。
