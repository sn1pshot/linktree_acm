const express = require("express")
const Auth = require('../middleware/auth.js')
const user_Router = express.Router()
const{create_user, getUser, updateUser, deleteUser, user_login} = require("../controllers/controllers")

user_Router.post('/create',create_user)
user_Router.get('/get',Auth.verifyToken,getUser)
user_Router.put('/put',Auth.verifyToken,updateUser)
user_Router.delete('/delete',Auth.verifyToken, deleteUser)
user_Router.post('/login',user_login)

module.exports= user_Router