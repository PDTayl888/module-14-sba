require('dotenv').config();
const express = require('express');
const passport = require('passport');
const connectDB = require('./config/db');



const app = express();

app.use(express.json());
app.use(passport.initialize());

require('./config/passport');

connectDB();

const userRoutes = require('./routes/userRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

app.use('/api/users', userRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`SERVER RUNNING PORT:${PORT}`);
});