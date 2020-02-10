// implement your API here
const express = require('express');
const Users = require('./data/db.js');

const server = express();

//Using middleware
server.use(express.json());

//Get request
server.get('/api/users', (req, res) => {
    Users.find().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        console.log("An error occurred", err)
        res.status(500).json({errorMessage: 'This users information could not be retrieved'})
    })
})

//GET by ID
server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id).then(user => {
        res.status(200).json(user)
    }).catch( err => {
        console.log("unable to find a user with that id number", err)
        res.status(500).json({errorMessage: 'The get request failed'})
    })
})

//Post request
server.post('/api/users', (req, res) => {
    const userInfo = req.body
    console.log("this is the request body", req.body);
    Users.insert(userInfo).then(user => {
        res.status(201).json(user);
    }).catch(err => {
        console.log("The post request was unsuccessful", err)
        res.status(500).json({ errorMessage: 'The post request was unsuccessful'})
    })
})

//Delete request
server.delete('/api/users/:id', (req,res) => {
    Users.remove(req.params.id).then(removed => {
        res.status(200).json(removed)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'Deletion unsuccessful'})
    })
})

//Put request
server.put('/api/users/:id', (req, res) => {
    Users.update(req.params.id, req.body).then(count => {
        res.status(200).json(count)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'Update failed due to an error'})
    })
})

const port = 5000;
server.listen(port, () => console.log(`\n** API Listening on post ${port} \n`));

