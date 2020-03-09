const express = require("express");
const shortid = require("shortid");
const server = express();


let users = [
    {
        id: "a_unique_id", 
        name: "Jane Doe", 
        bio: "Not Tarzan's Wife, another Jane",
    }
];

server.use(express.json()); //<<<<<<<<<<<<< ass this line ?

//GET request for array of users
server.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

//POST request for adding users JSON
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    //validate that the newUser is correct before saving

    newUser.id = shortid.generate();
    users.push(newUser);
    res.status(201).json(newUser);
});


//port for computer to liste to
const PORT = 5000;
server.listen(PORT, () => console.log(`\n *** Running on http://localhost:${PORT} *** \n`));