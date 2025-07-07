import { getDB } from "../../config/mongodb.js";

export default class RestaurantController{
    constructor(name,place,state,desc,address,image,user_review,user_email){
        this.name=name;
        this.state=state;
        this.place=place;
        this.desc=desc;
        this.address=address;
        this.image=image;
        this.user_review=user_review;
        this.user_email=user_email;
    }
    async getRestaurants(req,res){
        try{
        let collection=getDB().collection("restaurants");
        let restaurants=await collection.find().toArray();
      //  console.log(hotels);
        res.status(201).render("restaurants",{restaurants:restaurants});
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong with DB");
        }
    }

    async getRestaurant(req,res){
        try{
        let name=req.params.name;
        let collection=getDB().collection("restaurants");
        let restaurant=await collection.find({"name":{"$regex":`^.*${name}.*$`,"$options":'i'}}).toArray();
        // console.log(hotel);
        if(!restaurant){
            res.status(400).send("Could not find data");
        }
        res.status(201).render("restaurants",{restaurants:restaurant});
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong with DB");
        }
    }

    async getSpecificRestaurants(req,res){
        let name=req.params.name;
        let collection=getDB().collection("restaurants");
        let restaurant=await collection.findOne({name:name});
        res.render("specific_restaurant",{restaurant});
    }
}