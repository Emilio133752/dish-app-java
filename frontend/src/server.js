const express = require('express');
const app = express();
app.use(express.json());

// Dados mockados em memória
let users = [];
let orders = [];
let dishes = [
    { id: 1, name: 'Pizza Margherita', price: 45.90 },
    { id: 2, name: 'Hamburguer', price: 35.90 },
    { id: 3, name: 'Salada Caesar', price: 28.90 },
    { id: 4, name: 'Sushi Combo', price: 89.90 }
];

// Rotas de Usuários
app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        ...req.body
    };
    users.push(user);
    res.status(201).json(user);
});

app.get('/users', (req, res) => {
    res.json(users);
});

// Rotas de Pedidos
app.post('/orders', (req, res) => {
    const order = {
        id: orders.length + 1,
        date: new Date(),
        status: 'pending',
        ...req.body
    };
    orders.push(order);
    res.status(201).json(order);
});

app.get('/orders', (req, res) => {
    res.json(orders);
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(order);
});

app.patch('/orders/:id/status', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado' });
    
    order.status = req.body.status;
    res.json(order);
});

// Rotas de Pratos
app.get('/dishes', (req, res) => {
    res.json(dishes);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});