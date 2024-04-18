const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload')
const app = express();
require('dotenv').config();

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});
app.use(helmet());
app.use(express.json());
app.use(require('morgan')(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.urlencoded({
  extended: true
}));
app.use(fileUpload());
app.use(cors());
app.use(require("./routes/index.js"));
app.use('/uploads/images', cors(), express.static('uploads/images'));

const PORT = process.env.PORT || 3000;

mongoose.
connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на localhost:${PORT}`);
    })
  })
  .catch(error => console.log('Ошибка при соединении с сервером:', error));

app.use((req, res, next) => {
  res.status(404).send('Страница не найдена');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то поломалось:(');
});