const express = require("express")
const app = express()
const UserRouter = require("./routes/users")
const Linktree_Router = require("./routes/linktree")
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
app.use('/users',UserRouter)
app.use('/linktree',Linktree_Router)
app.listen({port:process.env.PORT})