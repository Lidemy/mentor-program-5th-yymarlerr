## 請列出 React 內建的所有 hook，並大概講解功能是什麼
####useState
- 讓我們可以新增 React state 到 function component
- 利用 useState 來宣告一個 state 變數，state 的值會被 React 保留起來
- `const [count, setCount] = useState(2)`，代表 count 的初始值是 2，`setCount` 是一個函式，可以用來改變 count 的值

####useEffect
- 用來告訴 React，component 在 render 完要做什麼事情
- 在 `useEffect()` 裡面放 callback function (稱為 effect)，在下一次 render 完，會清除之前的 effect，並應用新的 effect
- 可以在 callback function 再回傳一個 clean up function，可以放在 effect 被清掉之前做的一些事情
- `useEffect(() => {....}, [])` 裡面傳的第二個參數叫做 dependency array，當放在 dependecy array 裡面的東西改變時，才會執行這個 effect
- 如果 dependency array 裡面傳 `[]` 代表這個 effect 只會被執行一次

####useContext
- 在 React 中，可以透過 context，將上層的東西傳到下層。在要傳資料的地方用 <XXX.Provider> 包起來；在要用資料的地方，用 useContext() 來接收一個 context object（React.createContext 的回傳值）
- Context 的值是取決於距離上層的 component 最近的 provider 的 value prop
- 呼叫 useContext 的 component 會在 context 的值更新時，重新 render

####useReducer
- useState 的替代方案
- `const [state, dispatch] = useReducer(reducer, initialArg, init);`
	- reducer 列出有哪些動作指令 ，並且根據不同的動作回傳操作過後的state
	- initialArg 定義初始值
	- init 為 useReducter 初次執行的 action
	- dispatch 為用來和 Reducer 溝通的函式，透過它來修改值

####useCallback
接收兩個參數，第一個參數放 callback function，會回傳一個 memorized 的 callback function (用來記住 function)，第二個參數放 dependecy array，當 dependecy array 裡面放的東西沒有改變時，不會指向新的 function

####useMemo
接收兩個參數，第一個參數為 callback funciton，會把想要的值，回傳回來，第二個參數為 dependency array，當 dependecy array 裡面放的東西改變時，才會重新計算 memorized 的值

####useRef
回傳一個 mutable 的 ref object，`.current` 屬性被初始為傳入的函數

####useImperativeHandle
- 在子元件使用 ref 時，向父元件暴露自定義的 instance 值，讓父元件可以取得該子元件的 ref
- useImperativeHandle 應與 forwardRef 一同使用

####useLayoutEffect
將瀏覽器執行繪製以前、React update DOM 後，想做的事情放在這個 hook 裡面

####useDebugValue
用來在 React DevTools 中顯示自訂義 hook 的標籤

參考資料

[Hook 概觀
](https://zh-hant.reactjs.org/docs/hooks-overview.html)

[[Day 22]React hook(中)-useContext&useReducer](https://ithelp.ithome.com.tw/articles/10241780)

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
#### Mounting：當元件被加入到 DOM 中時被觸發
- constructor：在元件還沒被掛載到 DOM 之前被執行作初始化
- static getDerivedStateFromProps：會在每一次跑 `render()` 之前被執行
- componentWillMount：在元件被掛載到實際的 HTML DOM 之前被呼叫執行
- render：在每次 props 或 state 被改變時，都會被觸發
- componentDidMount：在元件被掛載到實際的 HTML DOM 之後被呼叫執行

#### Update：當元件的 props 或 state 更新，重新渲染 DOM 時會觸發
- componentWillReceiveProps：每次元件接收到 props 更新時或父元件刷新子元件會被執行
- shouldComponentUpdate：當 state 或 props 被更新時，可以在重新渲染畫面前呼叫此方法，來決定是否真的需要重新 render
- componentWillUpdate：在元件準備更新、執行 render 前被觸發
- getSnapshotBeforeUpdate：在 React 進行修改 (通常是更新 DOM) 前被執行
- componentDidUpdate：當元件有被更新完成、執行完 render 後被執行

#### Unmount：當元件要從 DOM 中被移除時會觸發
- componentWillUnmount：當元件被 unmount 前觸發

參考資料：
[React 元件生命週期 (Component Lifecycle)
](https://www.fooish.com/reactjs/component-lifecycle.html)

## 請問 class component 與 function component 的差別是什麼？
#### class component：
- 具有生命週期，可以針對某些情況決定是否需重新渲染
- 繼承 React.Component，有 render 方法
- 有 this，this 為 mutable、隨時都在變動。每次都可以拿到最新的 this.props

#### function component
- 無生命週期
- 無 this
- 編譯更快
- props 會是原本傳進來的那個（利用閉包的概念），而不會隨著 this 改變而變動

參考資料：

[How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)

[Understanding Functional Components vs. Class Components in React](https://www.twilio.com/blog/react-choose-functional-components)

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

#### uncontrolled component
資料由 DOM 控制，可以用 `useRef` 取得元件的資料，範例如下：

```
const { useRef } from 'react';

function Example () {
  const inputRef = useRef(null);
  return <input type="text" defaultValue="bar" ref={inputRef} />
}
```

#### controlled component
資料由 React component 控制，資料儲存在元件的 state 裡面，通常藉由 callback funciton 來改變資料。將 form element 像是 `<input>`、`<textarea`、`select` 和 state 作連結來新增一個 controlled component，範例如下：

```
const { useState } from 'react';

function Controlled () {
  const [email, setEmail] = useState();

  const handleInput = (e) => setEmail(e.target.value);


  return <input type="text" value={email} onChange={handleInput} />;
}
```

參考資料：

[What are React controlled components and uncontrolled components?](https://stackoverflow.com/questions/42522515/what-are-react-controlled-components-and-uncontrolled-components)