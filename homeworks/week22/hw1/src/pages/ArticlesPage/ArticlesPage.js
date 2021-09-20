import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getPosts } from "../../WebAPI"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import ReactPaginate from 'react-paginate'
import App from '../../App.css'

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`

const PostContainer = styled.div`
  margin-top: 30px;
  border-bottom: 1px solid skyblue;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #666;
  text-decoration: none;
`

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  )
}

Post.propTypes = {
  post: PropTypes.object
}

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    getPosts().then(posts => {
      setPageCount(Math.ceil(posts.length / perPage))
      const postsBeingSliced = posts.slice(offset, offset + perPage)
      setPosts(postsBeingSliced)
    })
  }, [offset])

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * 5)
  }

  return (
    <Root>
      <div className="App">
        {posts.map((post) =>
          <Post key={post.id} post={post}/>
        )}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}/>
      </div>
    </Root>
  )
}
