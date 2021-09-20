import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getPosts } from "../../WebAPI"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Wrapper = styled.div`
  background-image: url(${props => props.img});
  background-size: 100%;
  background: center cover;
  background-repeat: no-repeat;
  display: flex;
  min-height: 600px;
`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto 600px auto;
  border: lightgrey solid 1px;
  padding: 20px;
  max-width: 640px;
  border-radius: 10px;
  max-height: 200px;
  box-shadow: 0 0 4px #777;
  background: rgb(255,255,255, 0.6);
`
const Title = styled.h2`
  justify-content: center;
`

const Content = styled.div`
  overflow: hiddern;
`

export default function AboutPage() {
  
  return (
    <Wrapper img={process.env.PUBLIC_URL + '/about.jpeg'} >
      <Profile>
        <Title>關於</Title>
        <Content>不知道該打一些什麼好，人生願望是可以和狗狗住在方圓一公里沒有人煙、走十分鐘就到岩場的地方；興趣是走在比較陡的斜坡上面。
          <p>喜歡聽老歌，最近都在聽伍佰的歌，是說演唱會又延期到明年了，哭哭</p>
        </Content>
      </Profile>
    </Wrapper>
)}
