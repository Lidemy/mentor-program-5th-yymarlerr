## Webpack 是做什麼用的？可以不用它嗎？

又稱 module bundler，簡單來說，Webpack 為將各種模組包在一起，並轉換成一個檔案，讓瀏覽器可以使用的工具。不只可以打包模組，也可以打包各種類型的檔案。
需要這個工具的原因之一是，先前瀏覽器沒有模組化的規範，所以在引入 JavaScript 時，變數為全域，若有兩個相同名稱的變數，瀏覽器會沒辦法判斷該使用哪一個（jQuery 有提供 `noConflict()` 的函式）而到 ES6 時，開始有了模組化的規範—— ES Modules，支援 import 和 export 來引入模組，只需要在 `<script>` 的標籤中加上 `type = module` 就可以了。
即便如此，因 ES Modules 還在相對早期的階段，所以有些舊瀏覽器不支援，像是 IE，為避免此情況發生，建議還是使用 Webpack。
Webpack 除了可以打包 module 外，也可以打包 sass、圖片等。

## gulp 跟 webpack 有什麼不一樣？

#### Gulp：
* 為task manager。在開發時，可能會使用 Sass、Babel 等工具去執行任務，Gulp負責整合並處理各項任務。2.	占用的記憶體和使用的 pluging 較少，程式凍結的機會比較低#### Webpack：* 為 module bundler。負責將 module、圖片或 css 打包bundle）成一個檔案。2.	較容易除掉 dead code3.	較容易重新跑任務，因為全部的檔案都有 loaded，可以找到哪一部分 failed4.	程式碼比較複雜
[參考資料](https://www.toptal.com/front-end/webpack-browserify-gulp-which-is-better)

[參考資料]( https://www.educba.com/gulp-vs-webpack/ )
## CSS Selector 權重的計算方式為何？

#### 共分為三個權級且權重值的表達方式如下：1.	ID 選擇器 (1, 0, 0)2.	類別選擇器、屬性選擇器、偽類選擇器 (0, 1, 0)3.	元素選擇器、偽元素選擇器 (0, 0, 1)

* 權級大小：1 > 2 > 3
* 數值只會在同個權級作比較，所以 (1, 0, 0) > (0, 2, 0)
* 權重如果相同，後來聲明的樣式會蓋過前面的樣式
* 另外，直接在 html 裡面宣告樣式 > 選擇器的權重值
* 最後，`!important` > html 裡面宣告樣式 > 選擇器的權重值，會強迫瀏覽器渲染他指定的樣式[參考資料](https://ithelp.ithome.com.tw/articles/10221486)