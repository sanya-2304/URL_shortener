const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const urlRoute = require('./routes/url');

const urlmodel = require('./model/url');
const { connectToDB } = require('./connection');
const ejs = require('ejs');
const staticRoute = require('./routes/staticRouter');
const { restrictToLoggedUserOnly,checkAuth } = require('./middlewares/auth');
const userRoute = require('./routes/user');
require('dotenv').config();
const PORT = process.env.PORT || 2201;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);
app.use('/url', restrictToLoggedUserOnly, urlRoute);

connectToDB('mongodb://127.0.0.1:27017/db-url-short');

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await urlmodel.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
    console.log(`Server is running fine on PORT ${PORT}`);
});
