// implement your API here
const express = require('express');

const Lambda = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.json({ message: 'Welcome to Lambda' });
})

// View users
server.get('/api/users', (req, res) => {
    Lambda.find().then(item => {
        res.status(200).json(item);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    })
})

const port = 5000;
server.listen(port, () => console.log(`Server listening on port ${port}!`));