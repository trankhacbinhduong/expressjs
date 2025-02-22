import express from 'express'

const app = express()

// Setup middleware to parse JSON body
app.use(express.json())

// Dummy todo list
const todoList = [
]

// Routes for todos
app.get('/api/v1/todos', (req, res) => {
  const { completed } = req.query

  const filteredTodos = completed
    ? todoList.filter((todo) => todo.completed === (completed === 'true'))
    : todoList

  res.json({ data: filteredTodos })
})

app.get('/api/v1/statistic/', (req, res) => {
  const { startDate, endDate } = req.query;

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  
  if ((startDate && isNaN(start)) || (endDate && isNaN(end))) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  const filteredTodos = todoList.filter((todo) => {
    const createdAt = new Date(todo.createdAt);
    return (!start || createdAt >= start) && (!end || createdAt <= end);
  });

  const completedCount = filteredTodos.filter(todo => todo.completed).length;
  const notCompletedCount = filteredTodos.length - completedCount;

  res.json({
    total: filteredTodos.length,
    completed: completedCount,
    notCompleted: notCompletedCount
  });
});

app.get('/api/v1/todos/:id', (req, res) => {
  const { id } = req.params

  const todo = todoList.find((todo) => todo.id === Number(id))
  if (!todo) {
    return res.status(404).json({
      message: "Todo not found"
    })
  }

  res.json({ data: todo })
})

app.post('/api/v1/todos', (req, res) => {
  const { title } = req.body

  const newTodo = { id: todoList.length + 1, title, completed: false, createdAt: new Date(), updatedAt: new Date() }
  todoList.push(newTodo)
  
  res.status(201).json({
    data: newTodo,
  })
})

app.put('/api/v1/todos/:id', (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body

  const todo = todoList.find((todo) => todo.id === Number(id))
  if (!todo) {
    return res.status(404).json('Todo not found')
  }

  const updatedTodo = {
    ...todo,
    title: title || todo.title,
    completed: completed || todo.completed,
    updatedAt: new Date()
  }
  todoList.splice(todoList.indexOf(todo), 1, updatedTodo)

  res.json({
    data: updatedTodo,
  })
})

app.delete('/api/v1/todos/:id', (req, res) => {
  const { id } = req.params

  const index = todoList.findIndex((todo) => todo.id === Number(id))
  if (index === -1) {
    return res.status(404).json({
      message: "Todo not found"
    })
  }

  todoList.splice(index, 1)
  res.status(204).json({
    message: "Todo deleted"
  })
})

// Start server
const port = 3000
app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`)
})
