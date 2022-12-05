const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const Clients = require('./models/Clients');
const addClient = require('./routes/client/addClient');
const getClients = require('./routes/client/getClient');
const updateClient = require('./routes/client/updateClient');
const deleteClient = require('./routes/client/deleteClient');
const addStylish = require('./routes/stylish/addStylish');
const getStylish = require('./routes/stylish/getStylish');
const updateStylish = require('./routes/stylish/updateStylish');
const deleteStylish = require('./routes/stylish/deleteStylish');
const addReservation = require('./routes/reservation/addReservation');
const getReservations = require('./routes/reservation/getReservation');
const updateReservation = require('./routes/reservation/updateReservation');
const deleteReservation = require('./routes/reservation/deleteReservation');
const sendAdminEmail = require("./routes/email/sendAdminEmail");
const signup = require('./routes/auth/signup');
const getAdmin = require('./routes/auth/getAdmin');
const deleteAdmin = require('./routes/auth/deleteAdmin');
require('dotenv').config();
const userName = process.env.USER;
const password = process.env.PASS;

///////////////////////////////////
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
const Role = require('./models/Role');
const signin = require('./routes/auth/signin');
db.ROLES = ["superAdmin", "admin"];


///////////////////////////////////

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

//DB CONNECTION
const DB = `mongodb+srv://${userName}:${password}@cluster0.jdquh04.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected");
    initial();
}).catch((e) => {
    console.log("Erros", e);
    process.exit(1);
})


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "superAdmin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("Added super admin to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("Added admin to roles collection");
            })
        }
    })
}

///////////////// CLIENTS ///////////////////////
//Add Client
app.post('/add-client', async (req, res) => {
    addClient(req, res);
})

//Get Client
app.get('/get-client', async (req, res) => {
    getClients(req, res);
})

//Update Client
app.patch('/update-client/:id', async (req, res) => {
    updateClient(req, res);
})

//Delete Client
app.delete('/delete-client/:id', async (req, res) => {
    deleteClient(req, res);
})
//////////////////////////////////////////////////


///////////////// STYLISH ////////////////////////
//Add Stylish
app.post('/add-stylish', async (req, res) => {
    addStylish(req, res);
})

//Get Stylish
app.get('/get-stylish', async (req, res) => {
    getStylish(req, res);
})

//Update Stylish
app.patch('/update-stylish/:id', async (req, res) => {
    updateStylish(req, res);
})

//Delete Stylish
app.delete('/delete-stylish/:id', async (req, res) => {
    deleteStylish(req, res);
})

//////////////////////////////////////////////////

///////////////// RESERVATIONS ////////////////////////
//Add Reservation
app.post('/add-reservation', async (req, res) => {
    addReservation(req, res);
})

//Get Reservation
app.get('/get-reservation', async (req, res) => {
    getReservations(req, res);
})

//Update Reservation
app.patch('/update-reservation/:id', async (req, res) => {
    updateReservation(req, res);
})

//Delete Reservation
app.delete('/delete-reservation/:id', async (req, res) => {
    deleteReservation(req, res);
})

//////////////////////////////////////////////////

///////////////// REGISTRATION ////////////////////////
//Signup
app.post('/signup', async (req, res) => {
    signup(req, res);
})

//login
app.post('/signin', async (req, res) => {
    console.log(req.body);
    signin(req, res);
})

//Get Admin
app.get('/get-admin', async (req, res) => {
    getAdmin(req, res);
})

//Update Admin
// app.patch('/update-admin/:id', async (req, res) => {
//     updateReservation(req, res);
// })

//Delete Admin
app.delete('/delete-admin/:id', async (req, res) => {
    deleteAdmin(req, res);
})
//////////////////////////////////////////////////


//Email
app.post('/adminEmail', async (req, res) => {

    const values = req.body;
    try {
        await sendAdminEmail(values);
        res.status(200).json(
            {
                success: true,
                message: "Email sent"
            }
        );
    } catch (error) {
        res.status(500).json(error.message)
    }
})