// Термены
// API (Application Programming Interface) - программа, которая содержит набор endpoint -ов
// HTTP Method (GET, POST)  - тип запроса, одно слово заглавными буквами 
// Node module = библиотека
// request - запрос
// response - ответ



const express = require('express'); // require - команда для подключения библиотеки, в скобках нужно писать название библиотеки
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendMail } = require('./mail-service');


// Back-end settings

const app = express(); // app - это имя переменной, может быть любое
const port = 4777; // номер порта, на котором запустится сервер, должен быть уникальным на компьютере


// API middlewares

app.use(cors()); // Позволяет принимать запросы от любого отправителя
app.use(bodyParser.json()); // Позволяет преобразовывать входные данные, которые ты передаешь, из строки
app.use(bodyParser.urlencoded()); // Позволяет преобразовывать входные данные, которые ты передаешь из query-string


// Starting application

app.listen(port, () => { // этой командой мы запускаем сервер
    console.log('Backend has started.');
    console.log('Mail API base url: http://localhost:4777');
});

// API endpoints

// Endpoint - это функция, которая используется в API и принимает HTTP запросы, и возвращает HTTP ответы
// GET - http метод, который обычно используется для получения данных, который может содержать из данных только query string
// POST - http метод, который выполнит какое либо действие, который может содержать тело запроса (в него записываются данные)

// Healt check endpoint
app.get('/', (req, res) => {
    res.status(200).send('API is working.');
});

app.get('/one', (req, res) => {
    res.status(200).send('One endpoint');
});

// Mail sender endpoint
app.post('/', (req, res) => {
    const data = req.body;
    const htmlBody = `<div>Пользователь оставил данные <br>
        Имя: ${data.contactUserName}<br>
        Номер телефона: ${data.contactUserPhone}<br>
        E-mail: ${data.contactUserEmail}</div>`;

    sendMail(
        'rilovam402@togito.com',
        'Pulse',
        htmlBody)
        .then(response => {
            console.log('Email has been successfully sent.');

            res.status(200).send('Email has been successfully sent.');
        })
        .catch(error => {
            console.log(error);

            res.send(500).send(error);
        });
});