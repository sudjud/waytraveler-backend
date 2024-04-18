const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const app = express();
require('dotenv').config();

// Настройка заголовков безопасности
app.use(helmet());

// Разрешение кросс-доменных запросов
app.use(cors());

// Обработка JSON и urlencoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование
app.use(require('morgan')(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Загрузка файлов
app.use(fileUpload());

// Установка кросс-оригин ресурс политики для всех ответов
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// Статические файлы и CORS для изображений
app.use('/uploads/images', cors(), express.static('uploads/images'));

// Подключение маршрутов
app.use(require("./routes/index.js"));

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // Запуск сервера после успешного подключения к БД
    app.listen(process.env.PORT, () => {
        console.log(`Сервер запущен на localhost:${process.env.PORT}`);
    });
}).catch(error => console.log('Ошибка при соединении с сервером:', error));

// Обработка ошибки 404
app.use((req, res, next) => {
    res.status(404).send('Страница не найдена');
});

// Обработка остальных ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то поломалось:(');
});
