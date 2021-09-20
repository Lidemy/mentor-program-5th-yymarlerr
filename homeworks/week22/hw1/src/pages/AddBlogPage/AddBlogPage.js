import styled from "styled-components";
import React, { useState, useContext } from "react";
import { getMe, addPost } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts";

const ErrorMessage = styled.div`
  color: red;
  margin: 10px;
`
const Root = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 80%;
  margin: 0 auto;
`

const BlogTitle = styled.input`
  border: 1px lightgrey solid;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  box-shadow: 0 0 2px #666;
`

const BlogBody = styled.textarea`
  margin-top: 10px;
  border: 1px lightgrey solid;
  padding: 10px;
  border-radius: 5px;
  resize: none;
  box-shadow: 0 0 2px #666;
`
const Button = styled.button`
  width: 100px;
  border: 1px lightgrey solid;
  padding: 5px;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  box-shadow: 0 0 2px #666;
  margin: 10px auto 0 auto;

  &:hover {
    background: black;
    color: white;
  }
`

export default function AddBlogPage() {
  const { user, setUser } = useContext(AuthContext) 
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  const handleSubmit = (e) => {
    if (!title || !body) {
      return setErrorMessage("Title or Conent are missing")
    }
    getMe().then((res) => {
      if (res.ok !== 1) {
        setAuthToken(null)
        return setErrorMessage(res.toString())
      }
    })
    
    addPost(title, body).then((data) => {
      if (data.code === 2) {
        return setErrorMessage(data.message)
      }
      history.push("/")
    })
  }
  
  return (
    <Root onSubmit={handleSubmit}>
      標題：
      <BlogTitle value={title} onChange={(e) => setTitle(e.target.value)} />
      內容：
      <BlogBody rows="20" type="password" value={body} onChange={(e) => setBody(e.target.value)} />
      <Button>送出</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Root> 
  )
}