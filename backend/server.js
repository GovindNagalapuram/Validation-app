const express = require("express");
const app = express();

const connectDB = require('./config/db');

// connect to DB
connectDB()

app.use(express.json({ extended: true}))

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/students', require('./routes/students'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at ${PORT}`))