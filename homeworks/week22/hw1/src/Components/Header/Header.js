import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import { Link, useLocation, useHistory} from "react-router-dom"
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 32px;
  box-sizing: border-box;
`

const Brand = styled.div`
  font-size: 42px;
  font-weight: bold;

  @media screen and (max-width: 760px) {
    font-size: 24px;
  }
`

const NavbarList = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 760px) {
    font-size: 24px;
  }
`

const Nav = styled(Link)`
  display: flex;
  heigth: 100%;
  align-items: center;
  justify-content: center;
  height: 64px;
  border-box: box-box;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) => 
    props.$active &&
    `
      background: rgba(0, 0, 0, 0.2)
    `  
  }
`
const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 32px;
  }
`

export default function Header() {
  const location = useLocation()
  const { user, setUser } = useContext(AuthContext)
  const history = useHistory()

  const handleLogut = () => {
    setAuthToken("")
    setUser(null)
    if (location.pathname !== "/") {
      history.push("/")
    }
  }

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>My Blog</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === "/"} as={Link}>首頁</Nav>
          <Nav to="/articles" $active={location.pathname === "/articles"} as={Link}>文章列表</Nav>
          <Nav to="/about" $active={location.pathname === "/about"} as={Link}>關於</Nav>
          {user && <Nav to="/new-post" $active={location.pathname === "/new-post" }>發布文章</Nav>}
        </NavbarList>
      </LeftContainer>
        <NavbarList>
          {!user && <Nav to="/login" $active={location.pathname === "/login"} >登入</Nav>}
          {!user && <Nav to="/register" $active={location.pathname === "/register"} as={Link}>註冊</Nav>}
          {user && <Nav to="/" onClick={handleLogut}>登出</Nav>}
        </NavbarList> 
    </HeaderContainer>

  )
}
