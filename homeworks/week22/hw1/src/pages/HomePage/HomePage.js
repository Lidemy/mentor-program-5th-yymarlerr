import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getPosts } from "../../WebAPI"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Root = styled.div`
  background: #eeeeee;
  display: flex;
  flex-direction: column;
`

const PostContainer = styled.div`
  margin: 30px auto 0 auto;
  border-bottom: 1px solid skyblue;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 800px;
  flex-direction: column;
  align-items: self-start;
  background: rgb(255,255,255, 0.5);

  &:nth-child(6) {
    margin-bottom: 100px;
  }

  @media screen and (max-width: 800px) {
    width: 500px;
  }
`

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #666;
  text-decoration: none;
  min-width: 500px;
`

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
  min-width: 200px;
  margin-top: 10px;
`

const PostBody = styled.div`
  font-size: 24px;
  color: #666;
  margin-top: 20px;
  min-width: 500px;
  max-height: 100px;
  overflow: hidden; 
  text-overflow: ellipsis;
`

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background-image: url(${props => props.img});
  background-size: 100%;
  background: center cover;
  background-repeat: no-repeat;
  color: white;
  border-radius: 5px;
  font-size: 50px;
`

function Post({ post }) {
  return (
      <PostContainer>
        <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        <PostBody>{post.body}</PostBody>
      </PostContainer>
  )
}

Post.propTypes = {
  post: PropTypes.object
}

export default function HomePage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then(posts => setPosts(
      [
        posts[0],
        posts[1],
        posts[2],
        posts[3],
        posts[4]
      ]
    ))
  }, [])

  return (
    <Root>
      <Banner img={process.env.PUBLIC_URL + '/homepage.jpeg'} >Welcome to my blog</Banner>
      {posts.map((post) =>
        <Post key={post.id} post={post}/>
      )}
    </Root>
  )
}
