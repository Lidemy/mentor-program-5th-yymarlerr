## 為什麼我們需要 React？可以不用嗎？

React  可以將常用到的東西打包成元件，重複利用性高且可以用模組化的方式進行開發，專案規模大的時候，可以較有效率地進行開發。

另外，React 會先 render 出 virtual DOM，和上一版本比對哪邊有作修改，有修改的地方，才會 mount 新的 DOM，所以性能較好。

如果專案規模較小，其實用原生 JavaScript、CSS、HTML或 jQuery 也可以。

## React 的思考模式跟以前的思考模式有什麼不一樣？

在寫 React 時，會思考怎麼儲存、修改狀態/資料，然後再來才是畫面的呈現。另外就是，會想要怎麼把不同的區塊分成一個個 component，並思考重複利用這些 component 的可能性。


## state 跟 props 的差別在哪裡？

state 比較像是狀態或資料，component 會決定要用 state 做什麼事情，而 props 的功能是在 component 之間傳遞變數、函式等 data，輔助 component 做事情。



