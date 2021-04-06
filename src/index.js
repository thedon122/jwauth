require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { 
  createAccessToken, 
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken 
} = require('./tokens.js');
const { shortDB } = require('./shortDB.js');
const { isAuth } = require('./isAuth');

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
      const user = shortDB.find(user => user.email === email);
      if (user) throw new Error('User already exist');
      // 2. If not user exist already, hash the password
      const hashedPassword = await hash(password, 10);
      // 3. Insert the user in "database"
      shortDB.push({
        id: shortDB.length,
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
      const user = shortDB.find(user => user.email === email);
      if (!user) throw new Error('User does not exist');
      // 2. Compare crypted password and see if it checks out. Send error if not
      const valid = await compare(password, user.password);
      if (!valid) throw new Error('Password not correct');
      // 3. Create Refresh- and Accesstoken
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    // 4. Store Refreshtoken with user in "db"
    // Could also use different version numbers instead.
    // Then just increase the version number on the revoke endpoint
    user.refreshtoken = refreshtoken;
    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 3. Logout a user
server.post('/logout', (_req, res)=> {
  res.clearCookie('refreshtoken');
  return res.send({
    message: 'Logged out',
  })
});

// 4. Protected route
server.post('/protected', async (req, res)=> {
  try {
    const userID = isAuth(req)
    if (userId !== null){
      res.send({
        data: 'This is protected data.',
      })
    }
  } catch (err) {
    res.send({
      error: `{err.message}`,
    });
  }
});

server.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`),
);