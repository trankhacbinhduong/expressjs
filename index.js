import express from 'express'
import mongoose from 'mongoose'
import todoModel from './models/todoModel.js'

mongoose.connect('mongodb://127.0.0.1:27017/todo-db')
  .then(() => {
    console.log('Connected to MongoDB')
  }).catch((error) => {
    console.error('Error connecting to MongoDB: ', error)
  })

const app = express()

// Setup middleware to parse JSON body
app.use(express.json())

// Routes for todos
app.get('/api/v1/todos', async (req, res) => {
  const query = {}
  if (req.query.completed) {
    query.completed = req.query.completed
  }

  const todos = await todoModel.find(query)

  res.json({ data: todos })
})

app.get('/api/v1/todos/:id', async (req, res) => {
  try {
    const { id } = req.params

    const todo = await todoModel.findById(id)
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      })
    }

    res.json({ data: todo })
  } catch (error) {
    return res.status(404).json({
      message: "Todo not found"
    })
  }
})

app.post('/api/v1/todos', async (req, res) => {
  const { title } = req.body

  const newTodo = await todoModel.create({ title })

  res.status(201).json({
    data: newTodo,
  })
})

app.put('/api/v1/todos/:id', async (req, res) => {
  const { id } = req.params

  const todo = await todoModel.findByIdAndUpdate(id, req.body, { new: true })

  res.json({
    data: todo
  })
})

app.delete('/api/v1/todos/:id', async (req, res) => {
  const { id } = req.params
  const todo = await todoModel.findByIdAndDelete(id)

  res.status(204).json({
    data: todo
  })
})

// Start server
const port = 3000
app.listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`)
})
