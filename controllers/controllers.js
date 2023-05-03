require("dotenv").config();
const {PrismaClient} = require("@prisma/client");
const express = require("express");
// const { get } = require("../routes/users");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Login Signup

//Create functions
//User Signup
async function create_user(req,res){
    const{username,email,password} = req.body;
    const salt = await bcrypt.genSalt()
    hashpwd = await bcrypt.hash(password, salt);
    try {
        const newUser = await prisma.user.create({
            data:{
                username: username,
                email:email,
                password: hashpwd
            }
        })
        return res.status(200).json("user created");
    } 
    catch (error) {
        return res.status(401).json("user not created")
    }
    
}
//User Login
async function user_login(req,res,next){
    try {
        const{username,password} = req.body
        const data = await prisma.user.findUnique({
            where: {
                username:username
            }
        });
        if(!data) return res.status(400).json("User not found");
        const match = await bcrypt.compare(password, data.password);
        if (!match) return res.status(400).json("Wrong Password");
        const user_id = data.user_id;
        const email = data.email;
        const accessToken = jwt.sign({ user_id, email }, process.env.ACCESS_TOKEN_SECRET);

        res.cookie("access_token",accessToken,{
            httpOnly:true
        }).status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json("user not found");
    }
}
//create linktree link
async function create_linktree_link(req,res){
    const{linktreelink} = req.body;
    const user_id = req.user_id;
    try{
        const newLinktreeLink = await prisma.linktreelink.create({
            data:{
                linktreelink:linktreelink,
                User:{
                    connect:{
                        user_id:user_id,
                    },
                },
            }
        });
    return res.status(200).json("linktree link created");
    }
    catch(error){
        return res.status(401).json("forbidden")
    }
}
//create categories
async function create_category(req,res){
    const{linktreeid,catname} = req.body;
    const newcat = await prisma.category.create({
        data:{
            catname:catname,
            Linktreelink:{
                connect:{
                    linktreeid:linktreeid,
                },
            },
        }
    });
    return res.status(200).json("category created");
}
//create links
async function create_link(req,res){
    const{linktreeid,catname,linkname} = req.body;
    const newLink = await prisma.link.create({
        data:{
            linkname:linkname,
            Linktreelink:{
                connect:{
                    linktreeid:linktreeid,
                },
            },
            Category:{
                connect:{
                    catname:catname,
                },
            },
        }
    });
    return res.status(200).json("link created");
}
//read functions
//read user data
async function getUser(req,res){
    const user_id = req.user_id
    const data = await prisma.user.findUnique({where:{user_id:user_id}})
    if(!data){return res.status(500).json({err:"no such user"})}
    return res.status(200).json(data)
}

//get linktree link
async function getlinktreelink(req,res){
    const userId = parseInt(req.params.userId)
    const data = await prisma.linktreelink.findUnique({where:{userId:userId}})
    if(!data){return res.status(500).json({err:"no linktree for that user"})}
    return res.status(200).json(data)
}
//get categories
async function getcategory(req,res){
    const linktreelinkLinktreeid = parseInt(req.params.linktreelinkLinktreeid)
    const data = await prisma.category.findMany({where:{linktreelinkLinktreeid:linktreelinkLinktreeid}})
    if(!data){return res.status(500).json({err:"no categories in this linktree"})}
    return res.status(200).json(data)
}
//get all links
async function getalllinks(req,res){
    const linktreelinkLinktreeid = parseInt(req.params.linktreelinkLinktreeid)
    const data = await prisma.link.findMany({where:{linktreelinkLinktreeid:linktreelinkLinktreeid}})
    if(!data){return res.status(500).json({err:"no links under that linktree"})}
    return res.status(200).json(data)
}
//get links category wise
async function getlinksbycategory(req,res){
    const categoryname = req.params.categoryname
    const data = await prisma.link.findMany({where:{categoryname:categoryname}})
    if(!data){return res.status(500).json({err:"no links under that category"})}
    return res.status(200).json(data)
}
//update user
async function updateUser(req,res){
    const user_id = req.user_id
    const{username,email,password} = req.body;
    const data = await prisma.user.findUnique({where:{user_id:user_id}})
    if(!data){ return res.status(500).json({err: "User not found"})}
    const updatedUser = await prisma.user.update({where:{user_id:user_id},
        data:{
            username:username,
            email:email,
            password:password
        }})
        return res.status(200).json(updatedUser)
}
//update linktree
async function updatelinktree(req,res){
    const userId = req.user_id
    const{linktreelink} = req.body;
    const data = await prisma.linktreelink.findUnique({where:{userId:userId}})
    if(!data){ return res.status(500).json({err: "Linktree not found"})}
    const updatedlinktree = await prisma.linktreelink.update({where:{userId:userId},
        data:{
            linktreelink:linktreelink
        }})
        return res.status(200).json(updatedlinktree)
}
//update category
async function updateCat(req,res){
    const catid = parseInt(req.params.catid)
    const{catname} = req.body;
    const data = await prisma.category.findUnique({where:{catid:catid}})
    if(!data){ return res.status(500).json({err: "category not found"})}
    const updatedcat = await prisma.category.update({where:{catid:catid},
        data:{
            catname:catname
        }})
        return res.status(200).json(updatedcat)
}
//update link
async function updateLink(req,res){
    const link_id = parseInt(req.params.link_id)
    const{linkname} = req.body;
    const data = await prisma.link.findUnique({where:{link_id:link_id}})
    if(!data){ return res.status(500).json({err: "Link not found"})}
    const updatedlink = await prisma.link.update({where:{link_id:link_id},
        data:{
            linkname:linkname
        }})
        return res.status(200).json(updatedlink)
}
//delete User
async function deleteUser(req,res){
    const user_id = req.user_id
    const data = await prisma.user.findUnique({where:{user_id:user_id}})
    const data2 = await prisma.linktreelink.findUnique({where:{userId:user_id}})
    console.log(data);
    if(data){
        if(data2){
            linktreeid = data2.linktreeid
            await prisma.link.deleteMany({where:{linktreelinkLinktreeid:linktreeid}})
            await prisma.category.deleteMany({where:{linktreelinkLinktreeid:linktreeid}})
            await prisma.linktreelink.delete({where:{linktreeid:linktreeid}})
        }
        else{  
        await prisma.user.delete({where:{user_id:user_id}})
        }
    return res.status(200).json("user, linktree,categories and all links deleted")
    }
    else{
        return res.status(500).json("no user found")
    }
}
//delete linktree
async function deletelinktree(req,res){
    const linktreeid = parseInt(req.params.linktreeid)
    const data = await prisma.linktreelink.findUnique({where:{linktreeid:linktreeid}})
    const data1 = await prisma.category.findMany({where:{linktreelinkLinktreeid:linktreeid}})
    if(data){
        if(data1){
            await prisma.link.deleteMany({where:{linktreelinkLinktreeid:linktreeid}})
            await prisma.category.deleteMany({where:{linktreelinkLinktreeid:linktreeid}})
        }
        await prisma.linktreelink.delete({where:{linktreeid:linktreeid}})
        return res.status(200).json("linktree,links and all categories related are deleted")
    }
    else{
        return res.status(500).json("no linktree found")
    }
}
//delete category
async function deleteCat(req,res){
    const catid = parseInt(req.params.catid)
    const data = await prisma.category.findUnique({where:{catid:catid}})
    catname = data.catname
    if(data){
        await prisma.link.deleteMany({where:{categoryname:catname}})
        await prisma.category.delete({where:{catid:catid}})
        return res.status(200).json("category and all links related are deleted")
    }
    else{
        return res.status(500).json("no such category found")
    }
}
//delete link
async function deleteLink(req,res){
    const link_id = parseInt(req.params.link_id)
    const data = await prisma.link.findUnique({where:{link_id:link_id}})
    if(data){
        await prisma.link.delete({where:{link_id:link_id}})
        return res.status(200).json("link deleted")
    }
    else{
        return res.status(500).json("no such link")
    }
}

module.exports = {
    create_user,
    create_linktree_link,
    create_category,
    create_link,
    user_login,
    getUser,
    getlinktreelink,
    getcategory,
    getalllinks,
    getlinksbycategory,
    updateUser,
    updatelinktree,
    updateCat,
    updateLink,
    deleteUser,
    deletelinktree,
    deleteCat,
    deleteLink
};