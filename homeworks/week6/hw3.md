## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. `<strong>` 為語意式標籤，用來強調一段內容特別重要，瀏覽器預設的樣式為粗體。
2.  `<hr>` 代表轉移到不同的段落，瀏覽器上以水平標線表示。
3. `<em>` 用來強調某一段內容，瀏覽器預設的樣式為斜體。

## 請問什麼是盒模型（box model）
點進 Chrome 的 dev tool 時，會看到右下角有一個方型框框，那個就是盒模型，盒模型會顯示元素的 margin、padding、長、寬。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
* `inline`：元素可以在同一行，但是寬高會根據元素內容來調整，無法調整，不過左右 padding 和 margin 可以調整；上下 padding 和 margin 則無法調整。
* `block`：單一元素會佔版一整行。
* `inline-block`：結合 `inline` 和 `block` 的功能，元素可以併排、並調整屬性。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
###元素的位置：
* `static`：網頁預設定位方式，不跳脫排版流。
* `relative`：不跳脫排版流，根據原本的位置作位移。
* `absolute`：跳脫排版流，根據某一個參考點作定位，參考點為往上找第一個不是 static 的元素，並以左上角作對齊該元素。
* `fixed`： 跳多排版流，根據 viewport 的左上角做排列。會定位在固定位置。


