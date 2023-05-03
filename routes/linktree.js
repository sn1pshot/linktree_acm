const express = require("express")
const Auth = require('../middleware/auth.js')
const LinkTreeRouter = express.Router()
const{create_linktree_link,create_category,create_link, getlinktreelink, getcategory, getalllinks, getlinksbycategory, updatelinktree, updateCat, updateLink, deletelinktree, deleteCat, deleteLink} = require("../controllers/controllers")

LinkTreeRouter.post('/post',Auth.verifyToken,create_linktree_link)
LinkTreeRouter.post('/category/post',Auth.verifyToken,create_category)
LinkTreeRouter.post('/links/post',Auth.verifyToken,create_link)

LinkTreeRouter.get('/get/:userId',getlinktreelink)
LinkTreeRouter.get('/category/get/:linktreelinkLinktreeid',getcategory)
LinkTreeRouter.get('/links/get/:linktreelinkLinktreeid',getalllinks)
LinkTreeRouter.get('/linksbycat/get/:categoryname',getlinksbycategory)

LinkTreeRouter.put('/put',Auth.verifyToken,updatelinktree)
LinkTreeRouter.put('/category/put/:catid',Auth.verifyToken,updateCat)
LinkTreeRouter.put('/link/put/:link_id',Auth.verifyToken,updateLink)

LinkTreeRouter.delete('/delete/:linktreeid',Auth.verifyToken,deletelinktree)
LinkTreeRouter.delete('/category/delete/:catid',Auth.verifyToken,deleteCat)
LinkTreeRouter.delete('/link/delete/:link_id',Auth.verifyToken,deleteLink)

module.exports=LinkTreeRouter;
