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

// server.get('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     if (id) {
//         const arr = users.filter(user => user.id === id);

//     }
//     res.status(200).json(users);
// });

//POST request for adding users JSON
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    //validate that the newUser is correct before saving
    newUser.id = shortid.generate();

    if (!newUser.name || !newUser.bio ) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else if (newUser.name || newUser.bio ){
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        const isThere = users.find(newUser);
        if (!isThere) {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
        
    }

});


//port for computer to liste to
const PORT = 5005;
server.listen(PORT, () => console.log(`\n *** Running on http://localhost:${PORT} *** \n`));