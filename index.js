const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { authenticationToken } = require('./src/utilities');
const app = express();
const secrectKey = '1234Secreto';

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization','auth'); 
    next();
  });
app.post('/login', (req, res) => {
    console.log('Inicio', req.body);
    const { username, password } = req.body;
    console.log('Inicio');
    if (username === 'richie' && password === '1234') {
        console.log('Entré');
        const token = jwt.sign({ username }, secrectKey, { expiresIn: '1h' });
        return res.json({ token });
    }
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
});

app.get('/protected', authenticationToken, (req, res) => {
    res.json({ mensaje: 'Zona protegida', user: req.user });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
