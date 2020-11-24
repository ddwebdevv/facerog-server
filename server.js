import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
// const knex = require('knex');
import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'user',
      password : '',
      database : 'facerecog'
    }
  });

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'banana',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}



app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {   
    if (req.body.email === database.users[0].email
        && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in')
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('unable to register'));  
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users')
        .where({
            id: id
        })
        .then(user => {
            if (user.length){
                res.json(user[0]);
            } else {
                res.status(400).json('not found');
            }
        })
        .catch(err => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    
});







app.listen(3000, () => {
    console.log('app is running on port 3000');
});



/* Plan
/ --> res = this is working
/signin --> POST = sucess/fail 
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/