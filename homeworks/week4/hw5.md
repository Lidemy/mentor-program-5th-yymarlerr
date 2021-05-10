## 請以自己的話解釋 API 是什麼
API 的全名是 application programming interface 應用程式介面，是一個讓開發者和使用者互相交換資料的介面，使用者可以透過發出請求，獲得想要的資料。在 API 上的資料會以特定幾個固定的格式（像是 XML 或 JSON）來表示，端看開發者如何規範。使用 API 的好處是，開發者可以根據狀況提供不同程度的資訊給使用者。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
1. `418` I'm the teapot: 用戶端表示伺服器是個茶壺，所以拒絕煮咖啡
2.  `451` Unavailable for Legal Reasons: 用戶端請求違法的資源，例如受政府審查的網頁。
3.  `415` Unsupported Media Type: 被請求資源的多媒體類型不被伺服器支援，因此該請求被拒絕。


[參考資料](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### 介紹
這是一個提供使用者編輯與查詢台北地區各大餐廳的 API。

### Base URL: `https://restaurant-list.com`

| 說明 | Method | Path | 參數 | 範例 |
| :-----| ----: | :----: | :---: | :---: |
| 獲得所有餐廳資料 | Get | /information | _limit:限制回傳資料數量 | /information?_limit=10 |
| 獲得單一餐廳資料| Get | /information/:id | 無 | /information/10
| 刪除餐廳 | Delete | /information | 無 | 無
| 新增餐廳 | Post | /information/:id | name: 餐廳名稱 | 無
| 更改餐廳資訊 | Patch | /information/:id | name: 餐廳名稱 | 無 

### 使用 node.js 發 request 印出資料

```
const request = require('request')

request (
  'https://restaurant-list.com', function (error, response, body) {
    const json = JSON.parse(body)
    console.log(json)
  }
) 
```
### 資料範例
```
{ 
  "id": "1",
  "name": "阿國滷肉飯",
  "Phone": "88666890",
  "地址": "台北市士林區德行東路 84 號"
},
{
  "id": "2",
  "name": "好食在",
  "Phone": "88665388",
  "地址": "台北市士林區德行東路 244 號"
},
{
  "id": "3",
  "name": "天母 86 牛肉麵",
  "Phone": "28734649",
  "地址": "台北市士林區天母東路 86 號"
},
{
  "id": "4",
  "name": "方家小館",
  "Phone": "28728402",
  "地址": "台北市士林區天母東路 7 號"
},



