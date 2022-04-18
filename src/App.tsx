import React, { useState } from 'react'
import './App.css'

interface Todo {
  id: string
  text: string
  done?: boolean
}

interface AddTodoProps {
  onAddTodo: (text: string) => void
}

const AddTodo = ({ onAddTodo }: AddTodoProps) => {
  const [text, setText] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTodo(text)
    setText('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}

type TodoListItemProps = {
  onChange: () => void
} & Todo

const TodoListItem = ({ text, done, onChange }: TodoListItemProps) => (
  <li>
    <input type="checkbox" checked={done} onChange={(e) => onChange()} />
    <span>{text}</span>
  </li>
)

interface TodoListProps {}

const TodoList = ({}: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const onAddTodo = (text: string) => {
    setTodos([...todos, { text, id: uuid() }])
  }

  const onComplete = (id: string) => {
    setTodos((todos) => {
      const i = todos.findIndex((todo) => todo.id === id)
      todos[i] = {
        ...todos[i],
        done: !todos[i].done
      }
      return [...todos]
    })
  }

  return (
    <div className="container">
      <AddTodo onAddTodo={onAddTodo} />
      <ul>
        {todos
          .filter(({ done }) => !done)
          .map((todo) => (
            <TodoListItem
              key={todo.id}
              onChange={() => onComplete(todo.id)}
              {...todo}
            />
          ))}
      </ul>
    </div>
  )
}

const App = () => <TodoList />

export default App

const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
