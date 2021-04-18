## 交作業流程

### 步驟如下：
#### 前置作業
1. 點選連結去 Github classroom 中自己的repository
2. 點擊綠色框框的 clone or download
3. 複製他給的 URL 網址
4. 去 terminal 輸入 `git clone <github 提供的 URL>`
5. 去資料夾確認作業是否有下載成功
6.  去資料夾編輯檔案

***

#### 繳交作業
1. 用`git checkout -b <branch name>` 新開一個 branch，並且 switch 到 <branch name>
2. 用`git commit -am "commit 的名稱"` 更新版本
3. 若有新增檔案，須先將它加入版本控制 `git add <file>`，再用 `git commit -m <commit message>` 更新版本
3. 用`git push origin <branch name>` 將作業推到遠端上
4.  打開 Github repository 頁面
5.  點擊 compare & pull request 或 pull request 後選 new pull request
6. 用意為，讓協作者知道有更新版本，並請他們查看及是否同意更新
7. 編輯頁面內容，有問題時可在這個階段詢問助教
8.  點 create pull request
9. 繳交作業後記得至 flies changed 檢查是否有錯誤並修正
10. 發完 PR 之後，複製該頁面連結，到學習系統的課程總覽點選繳交作業
11. 若發現作業有需更動的地方，可直接在 local 端編輯
12. 重新用 `git commit -am "commit 的名稱"`
13. 將作業重新推到遠端，`git push origin <branch name>`
14. 不需要重新發 PR

*** 

#### 作業批改後
1. 助教看完作業後會自己或請同學按 merge
2. 助教把遠端的 branch 刪掉
3. 用`git checkout master`在 local 端切換 branch 到 master
4. 用`git pull origin master`把遠端已合併的 master 拉下來 
5. 刪掉 branch `git branch -d <branch name>`