// implement your API here
const express = require('express');

const Lambda = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.json({ message: 'Welcome to Lambda' });
})

// Add a user
server.post('/api/users', (req, res) => {
    const user = req.body;

    if (!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else (
        Lambda.insert(user).then(item => {
            res.status(201).json(user);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        })
    )
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

// Delete a user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Lambda.findById(id).then(item => {
        if (item) {
            Lambda.remove(id).then(removed => {
                res.status(200).json(item);
            }).catch(err => {
                console.log(err);
                res.status(500).json({ errorMessage: "The user could not be removed" });
            })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
})

// Update a user
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const userUpdate = req.body;

    Lambda.findById(id).then(item => {
        if (!item) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            if (!userUpdate.name || !userUpdate.bio) {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
            } else {
                Lambda.update(id, userUpdate).then(item => {
                    res.status(201).json(userUpdate);
                }).catch(err => {
                    res.status(500).json({ errorMessage: "The user information could not be modified." });
                })
            }
        }
    }).catch(err => {
        console.log(err)
    })
})

const port = 5000;
server.listen(port, () => console.log(`Server listening on port ${port}!`));