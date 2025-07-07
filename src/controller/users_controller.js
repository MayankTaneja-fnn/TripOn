import bcrypt from "bcrypt";
import { getDB } from "../../config/mongodb.js";
import jwt from "jsonwebtoken";

export default class UserController{
    constructor(name,email,password){
        this.name=name;
        this.password=password;
        this.email=email;
    }

    
    getSignUp(req,res){
            res.render("signUp");
    } 

    getLogIn(req,res){
        res.render("login");
    }

    async postSignUp(req,res){
        let{username,email,password}=req.body;
        let hashpass=await bcrypt.hash(password,10);
        try{
            let newUser=new UserController(username,email,hashpass);
            let collection=getDB().collection("users");
            await collection.insertOne(newUser);
        res.redirect("/logIn");
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong");
        }
    }

    async postLogIn(req,res){
        try{
        let collection=getDB().collection("users");
        let email=req.body.email;
        const user=await collection.findOne({email:email});
        if(!user){
            return res.status(400).send("Incorrect Credentials");
        }
        else{
            const result= await bcrypt.compare(req.body.password,user.password);
            if(result){
                const token=jwt.sign({username:user.name,email:user.email},"VOp2tCqr1f",{expiresIn:'8h'});
                res.cookie('auth_token',token,{httpOnly:true}); 
                req.session.email=email;
                res.status(200).redirect("/");
            }
            else{
                res.status(400).send("Incorrect Credentials");
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
    }

    logOut(req,res){
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/');
            }
            res.clearCookie('auth_token');
            res.redirect('/');
        });
    }

    async listItem(req,res){
        res.render("list_item");
    }
}