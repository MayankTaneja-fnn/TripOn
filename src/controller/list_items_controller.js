import { getDB } from "../../config/mongodb.js";
import HotelController from "./hotels_controller.js";
import RestaurantController from "./restaurants_controller.js";

export default class ListItemsController{
    listItem(req,res){
        let type=req.params.type;
        res.render("list_item",{type:type});
    }

    async addHotel(req,res){
        const collection=getDB().collection("hotels");
        let {name,place,state,desc,price,address,rating}=req.body;
        let image=[];
        for(let i=0;i<req.files.length;i++){
            image.push("/images/" + req.files[i].originalname);
        }
        let user_review=[];
        let user_email=req.session.email;
        let hotel=new HotelController(name,place,state,rating,desc,address,price,image,user_review,user_email);
        let result=await collection.insertOne(hotel);
        if(result){
            res.status(200).redirect("/hotels");
        }
        else{
            res.status(400).send("Something went wrong");
        }
    }
    async addRestaurant(req,res){
        const collection=getDB().collection("restaurants");
        let {name,place,state,desc,address}=req.body;
        let image=[];
        for(let i=0;i<req.files.length;i++){
            image.push("/images/" + req.files[i].originalname);
        }
        let user_review=[];
        let user_email=req.session.email;
        let restaurant=new RestaurantController(name,place,state,desc,address,image,user_review,user_email);
        let result=await collection.insertOne(restaurant);
        if(result){
            res.status(200).redirect("/restaurants");
        }
        else{
            res.status(400).send("Something went wrong");
        }
    }

    async editHotel(req,res){
        let name=req.params.name;
        let collection=getDB().collection("hotels");
        let hotel=await collection.findOne({name});
        res.render("edit_hotel",{hotel});
    }

    async postEditHotel(req,res){
        const collection=getDB().collection("hotels");
        let {name,place,state,desc,price,address,rating}=req.body;
        let image=[];
        for(let i=0;i<req.files.length;i++){
            image.push("/images/" + req.files[i].originalname);
        }
        // let user_review=[];
        // let user_email=req.session.email;
        // let hotel=new HotelController(name,place,state,rating,desc,address,price,image,user_review,user_email);
        let result=await collection.updateOne({name:name},
            {$set:{place:place,state:state,desc:desc,price:price,address:address,rating:rating},
        $push:{image:{ $each: image }}}
        );
        res.redirect("/hotels");
    }

    async deleteHotel(req,res){
        let name=req.params.name;
        let collection=getDB().collection("hotels");
        let result=await collection.deleteOne({name:name});
        if(result){
            res.status(200).redirect("/hotels");
        }
        else{
            res.send("Something went wrong with db");
        }
    }

    async editRestaurant(req,res){
        let name=req.params.name;
        let collection=getDB().collection("restaurants");
        let restaurant=await collection.findOne({name});
        res.render("edit-restaurant",{restaurant});
    }

    async postEditRestaurant(req,res){
        const collection=getDB().collection("restaurants");
        let {name,place,state,desc,address}=req.body;
        let image=[];
        for(let i=0;i<req.files.length;i++){
            image.push("/images/" + req.files[i].originalname);
        }
        let user_review=[];
        // let user_email=req.session.email;
        // let restaurant=new RestaurantController(name,place,state,desc,address,image,user_review,user_email);
        let result=await collection.updateOne({name:name},{
            $set:{place:place,state:state,desc:desc,address:address},
            $push:{image:image}
        });
        if(result){
            res.status(200).redirect("/restaurants");
        }
        else{
            res.status(400).send("Something went wrong");
        }
        
    }

    async deleteRestaurant(req,res){
        let name=req.params.name;
        let collection=getDB().collection("restaurants");
        let result=await collection.deleteOne({name:name});
        if(result){
            res.status(200).redirect("/restaurants");
        }
        else{
            res.send("Something went wrong with db");
        }
    }
}