let express = require('express');
let userRouter = express.Router();
let userDao = require('../dao/user-dao.js');

userRouter.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//connection, return null if there is no match
userRouter.post('/login', function (req, res) {
    userDao.findUserByUsernameAndPassword(req.body.username, req.body.password, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
});

module.exports = userRouter;