import express, { response } from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
// const knex = require('knex');
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfileGet } from './controllers/profileget.js';
import { handleImage } from './controllers/image.js';

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


app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) });

app.put('/image', (req, res) => { handleImage(req, res, db) });







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