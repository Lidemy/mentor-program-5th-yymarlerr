import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch, // 用 switch 的話只有第一個判斷到的會被配對 (輸入 /about/123，/about 和 /about/123，都會被配對到)
  Route,
} from "react-router-dom"

import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI"

import HomePage from "../../pages/HomePage"
import LoginPage from "../../pages/LoginPage"
import Header from "../Header"
import BlogPost from "../../pages/BlogPost"
import AddBlogPage from "../../pages/AddBlogPage"
import AboutPage from "../../pages/AboutPage";
import RegisterPage from "../../pages/RegisterPage"
import ArticlesPage from "../../pages/ArticlesPage"
import { getAuthToken } from "../../utils";

const Root = styled.div`
  padding-top: 64px;  
`

function App() {
  const [user, setUser] = useState("") // user 有東西代表有登入 沒東西代表沒登入，要把這個東西傳下去，才能判斷是否有無登入

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data)
        }
      })
    }
  })

  return (
    <AuthContext.Provider value={{user, setUser}} >
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/about"> 
              <AboutPage />
            </Route>
            <Route exact path="/articles"> 
              <ArticlesPage />
            </Route>
            <Route exact path="/"> 
              <HomePage />
            </Route>
            <Route exact path="/login"> 
              <LoginPage />
            </Route>
            <Route exact path="/register"> 
              <RegisterPage />
            </Route>
            <Route exact path="/new-post"> 
            {user && <AddBlogPage />}
            </Route>
            <Route path="/posts/:id">
              <BlogPost />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  )
}

export default App