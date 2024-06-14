require('dotenv').config();
require('express-async-errors');

const connectDB = require('./db/connect');
const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./routes/user');
const { SocksProxyAgent } = require('socks-proxy-agent');
app.use(express.json());

app.use(cors());
app.use('/api/v1', mainRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  const uri = process.env.MONGO_URI;

  try {
    await connectDB(uri);
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
