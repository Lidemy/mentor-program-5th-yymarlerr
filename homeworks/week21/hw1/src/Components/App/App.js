import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  border: 1px solid lightgrey;
  width: 600px;
  margin: 50px auto;
  padding-bottom: 30px;
  border-radius: 5px;
`

const Title = styled.h1`
  text-align: center;
`;

const TodoContainer = styled.div`
  display: flex;
  padding: 10px;
  max-width: 500px;
  background: lightblue;
  margin: 5px auto;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
`;
const Buttons = styled.div``;

const TodoItem = styled.div`
  &:hover {
    color: #666;
  }

  ${(props) => props.isDone &&`
    color: #666;
    text-decoration: line-through;
  `} 

`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  margin-left: 1px;
  background: #F5F9FE;
  border: 1px lightgrey solid;

  & + & {
    margin-left: 5px;
  }
`;

const TextInput = styled.input`
  display: flex;
  width: 300px;
  height: 30px;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`

const Status = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const All = styled.button`
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;

  ${(props) => props.active &&`
    background-color: #666;
    color: white;
  `}
`
const Unfinished = styled.button`
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`
const Completed = styled.button`
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  text-align: center;
`

const ClearAll = styled.button`
  background: white;
  border: 1px #666 solid;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
`

const EditTodo = styled.input`
  border: 1px solid #666;
  border-radius: 5px;
  height: 20px;
`

function Todo({ className, todo, handleDeleteTodo, handleIsDone, handleUpdateTodo, setErrormessage }) {
  const [edit, setEdit] = useState(false)

  return (
    <TodoContainer className={className}>
      {(!edit) &&
      <TodoItem isDone={todo.isDone} >{
        todo.content}
      </TodoItem>
      }
      {(edit) && 
        <EditTodo 
          value={edit} 
          placeholder={todo.content} 
          onKeyPress={(e) => { 
            if (e.key === "Enter") {
              if (!e.target.value) return setErrormessage("請輸入內容")
              handleUpdateTodo(todo.id, edit, () => { setEdit("")}) 
              setErrormessage("")
            }} 
          } 
          onChange={(e) => { setEdit(e.target.value) }}
        >
        </EditTodo>
      }
      <Buttons>
        <Button onClick={() => { handleIsDone(todo.id) }}>
          {(todo.isDone) ? "未完成" : "完成"}
        </Button>
        <Button onClick={() => { handleDeleteTodo(todo.id) }}>
          刪除
        </Button>
        <Button onClick={() => { setEdit([]) }}>
          編輯
        </Button>
      </Buttons>
    </TodoContainer>
  );
}

function saveItemsToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos))
}

function App() {
  const id = useRef(1)
  const [todos, setTodos] = useState(() => {
    let todoData = localStorage.getItem("todos") || ""
    if (todoData) {
      todoData = JSON.parse(todoData)
      if (todoData.length) {
        id.current = todoData[0].id + 1
      }
    } else {
      todoData = []
    }
    return todoData
  })
  const [value, setValue] = useState()
  const [errorMessage, setErrormessage] = useState("")
  const [todoStatus, setTodoStatus] = useState(todos)
  
  useEffect(() => { 
    saveItemsToLocalStorage(todos)
    setTodoStatus(todos)
  }, [todos])

  // 新增 todo
  const handleAddTodo = () => {
    if (!value) {
      return setErrormessage("請輸入資料")
    }
    if (todos) {
      setTodos([{
        id: id.current,
        content: value,
        isDone: false
      },
      ...todos])
        saveItemsToLocalStorage(todos)
    } else {
      id.current = 1
      setTodos([{
        id: id.current,
        content: value,
        isDone: false
      }])
      saveItemsToLocalStorage(todos)
    }
    setValue("")
    id.current++
  }
  
  // 刪除 todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id
    ))
  }

  // 刪除全部
  const handleDeleteAll = () => {
    localStorage.removeItem("todos")
    setTodos([])
  }

  // 標示完成、未完成
  const handleIsDone = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return (
          {
            ...todo,
            isDone: !todo.isDone
          }
        )
      }
      return todo
    }))
  }
  
  // 更改狀態
  const handleStatusToAll = () => {
    setTodoStatus(todos)
  }
  
  const handleStatusToUnfinished = () => {
    setTodoStatus(todos.filter(todo => todo.isDone === false))
  }

  const handleStatusToCompleted = () => {
    setTodoStatus(todos.filter(todo => todo.isDone === true))
  }

  // 編輯 todo
  const handleUpdateTodo = (id, content, cb) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return (
          {
            ...todo,
            content
          }
        )
      }
      return todo
    }))
    cb()
  }


  return (
    <Wrapper>
      <Title>TodoList</Title>
      <InputContainer>
        <ClearAll onClick={handleDeleteAll}>Clear All</ClearAll>
        <TextInput
          type="text"
          placeholder="write something..."
          value={value}
          onChange={(e) => { 
            setValue(e.target.value)
            setErrormessage("")
          }} 
        />
        <Button onClick={handleAddTodo} >Add Todo</Button>
      </InputContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage> }
        {(todos && !todoStatus) &&
          todos.map(todo => (
            <Todo 
            todo={todo}
            key={todo.id}
            handleDeleteTodo={handleDeleteTodo}
            handleIsDone={handleIsDone}
            handleUpdateTodo={handleUpdateTodo}
            setErrormessage={setErrormessage}
            />
          ))
        }
        {(todoStatus) &&
          todoStatus.map(todo => (
            <Todo 
            todo={todo}
            key={todo.id}
            handleDeleteTodo={handleDeleteTodo}
            handleIsDone={handleIsDone}
            handleUpdateTodo={handleUpdateTodo}
            setErrormessage={setErrormessage}
            />
          ))
        }
      <Status>
        <All onClick={handleStatusToAll} >全部</All>
        <Unfinished onClick={handleStatusToUnfinished} >未完成</Unfinished>
        <Completed onClick={handleStatusToCompleted} >完成</Completed>
      </Status>
    </Wrapper>
  );
}

export default App;

Todo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  todo: PropTypes.object,
  handleDeleteTodo: PropTypes.func,
  handleToggleIsDone: PropTypes.func
}
