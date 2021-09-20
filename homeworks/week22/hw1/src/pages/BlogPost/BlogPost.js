import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getSinglePosts } from "../../WebAPI"
import { useParams } from "react-router-dom"

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 80%;
  margin: 0 auto;
`

const BlogTitle = styled.div`
  border: 1px lightgrey solid;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  box-shadow: 0 0 2px #666;
  background: rgb(255,255,255, 0.6);
`

const BlogBody = styled.div`
  margin-top: 10px;
  border: 1px lightgrey solid;
  padding: 10px;
  border-radius: 5px;
  min-height: 640px;
  box-shadow: 0 0 2px #666;
`

function Blog({ blog }) {
  return (
    <Root img={process.env.PUBLIC_URL + '/article.jpeg'}>
      標題：
      <BlogTitle>{blog.title}</BlogTitle>
      內容：
      <BlogBody>{blog.body}</BlogBody>
    </Root> 
  )
}

export default function BlogPost() {
  const { id } = useParams()
  const [blog, setBlog] = useState([])

  useEffect(() => {
    getSinglePosts(id).then((post) => {
      setBlog(post[0])
    }).catch((err) => {
      console.log(err)
    })
  }, [id])

  return (
    <Blog blog={blog} />
  )
}
