require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');


// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Setup a protected route
// 5. Get a new accesstoken with a refresh token

const server = express();

// Use express middleware for easier cookie handling
server.use(cookieParser());

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);


// Needed to be able to read body data
server.use(express.json()); // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// 1. Register a user
server.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Check if the user exist
      const user = fakeDB.find(user => user.email === email);
      if (user) throw new Error('User already exist');
      // 2. If not user exist already, hash the password
      const hashedPassword = await hash(password, 10);
      // 3. Insert the user in "database"
      fakeDB.push({
        id: fakeDB.length,
        email,
        password: hashedPassword,
      });
      res.send({ message: 'User Created' });
      console.log(fakeDB);
    } catch (err) {
      res.send({
        error: `${err.message}`,
      });
    }
  });

  // 2. Login a user
server.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Find user in array. If not exist send error
      const user = fakeDB.find(user => user.email === email);
      if (!user) throw new Error('User does not exist');
      // 2. Compare crypted password and see if it checks out. Send error if not
      const valid = await compare(password, user.password);
      if (!valid) throw new Error('Password not correct');