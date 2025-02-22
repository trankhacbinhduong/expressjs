import express from 'express'

const app = express()

// Setup middleware to parse JSON body
app.use(express.json())

// Dummy todo list
const todoList = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
]

// Routes for todos
app.get('/api/v1/todos', (req, res) => {
  const { completed } = req.query

  const filteredTodos = completed
    ? todoList.filter((todo) => todo.completed === (completed === 'true'))
    : todoList

  res.send(filteredTodos)
})

app.get('/api/v1/todos/:id', (req, res) => {
  const { id } = req.params

  const todo = todoList.find((todo) => todo.id === Number(id))
  if (!todo) {
    return res.status(404).send('Todo not found')
  }

  res.send(todo)
})

app.post('/api/v1/todos', (req, res) => {
  const { title } = req.body

  const newTodo = { id: todoList.length + 1, title, completed: false }
  todoList.push(newTodo)

  res.status(201).send(newTodo)
})

app.put('/api/v1/todos/:id', (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body

  const todo = todoList.find((todo) => todo.id === Number(id))
  if (!todo) {
    return res.status(404).send('Todo not found')
  }

  const updatedTodo = {
    ...todo,
    title: title || todo.title,
    completed: completed || todo.completed,
  }
  todoList.splice(todoList.indexOf(todo), 1, updatedTodo)

  res.send(updatedTodo)
})

app.delete('/api/v1/todos/:id', (req, res) => {
  const { id } = req.params

  const index = todoList.findIndex((todo) => todo.id === Number(id))
  if (index === -1) {
    return res.status(404).send('Todo not found')
  }

  todoList.splice(index, 1)
  res.status(204).send('Todo deleted')
})

// Start server
const port = 3000
app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`)
})
