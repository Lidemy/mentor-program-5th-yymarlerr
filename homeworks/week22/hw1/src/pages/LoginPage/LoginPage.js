import styled from "styled-components";
import React, { useState, useContext } from "react";
import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts";

const ErrorMessage = styled.div`
  color: red;
  margin: 10px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const InfoInput = styled.input`
  margin: 10px;
  border-radius: 5px;
  border: lightgrey 1px solid;
`

const SubmitButton = styled.button`
  border: lightgrey solid 1px;
  background: rgb(255,255,255);
  padding: 10px;
  border-radius: 30px;
  margin: 30px;

  &:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto;
  border: lightgrey solid 1px;
  padding: 20px;
  box-shadow: 0 0 4px #777;
  background: rgb(255,255,255, 0.6);
  max-width: 360px;
  border-radius: 10px;
`
const Title = styled.h2`
  text-align: center;
`

export default function LoginPage() {
  const { setUser } = useContext(AuthContext) 
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState()
  const history = useHistory()

  const handleSubmit = (e) => {
    setErrorMessage(null)
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message)
      }

      setAuthToken(data.token)

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null) // 代表有拿到 token 但 getMe() 的時候，發現 token 錯誤
          return setErrorMessage(response.toString())
        }
        setUser(response.data)
        history.push("/") // 導回首頁
      })
      
    })
  }
  
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>登入</Title>
        <div>
          Username: <InfoInput value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          Password: <InfoInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <SubmitButton>Submit</SubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </Wrapper>
  )
}