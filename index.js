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

// View one user by id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Lambda.findById(id).then(item => {
        // res.json({ item: id,  })
        if (item) {
            res.status(200).json(item); 
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    })
})

const port = 5000;
server.listen(port, () => console.log(`Server listening on port ${port}!`));