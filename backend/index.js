const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose')
const dockerRouter = require('./routes/dockerRoutes')
const authRouter = require('./routes/authRoutes')
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const DB = "mongodb://127.0.0.1:27017/klms"
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(async (con) => {
    console.log('DB Connection Successfull!!!');
  })
  .catch((e) => {
    console.log(e)
  });


const morgan = require('morgan');


app.use(express.json());
app.use(cookieParser())
app.use('/api/docker',dockerRouter)
app.use('/api/auth', authRouter)


app.listen(3000, () => {
  console.log('Server running on port 3000....');
});