require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

// CORS Settings

const allowedCors = [
  'http://mesto-frontend.nomoredomains.rocks',
  'https://mesto-frontend.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middlewares
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleUnexpectedErrorsMiddleware = require('./middlewares/handleUnexpectedErrors');

const router = require('./routes/index');

const { PORT = 3000, DB_CONNECTION = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

// For code review delete later
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(express.json());
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(router);

// Подключение к БД
mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('База данных подключена');
}).catch((error) => {
  console.error('Ошибка при подключении к БД:', error);
});

app.use(errorLogger);
app.use(errors());
app.use(handleUnexpectedErrorsMiddleware);

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Сервер столкнулся с ошибкой ${error}`);
  } else {
    console.info(`Сервер был запущен на порту: ${PORT}`);
  }
});
