import { getDB } from "../../config/mongodb.js";

export default class MessagesController{
    async getMessage(req,res){
        let useremail=req.session.email;
        let collection=getDB().collection("users");
        let user=await collection.findOne({email:useremail});
        // console.log(user);
        let name=user.name;
        // console.log(name);
        res.render("messages",{name});
    }
}