import { getDB } from "../../config/mongodb.js";

export default class HotelController{
    constructor(name,place,state,rating,desc,address,price,image,user_review,user_email){
        this.name=name;
        this.state=state;
        this.place=place;
        this.rating=rating;
        this.desc=desc;
        this.address=address;
        this.image=image;
        this.user_review=user_review;
        this.user_email=user_email;
        this.price=price;
    }
    async getHotels(req,res){
        try{
        let collection=getDB().collection("hotels");
        let hotels=await collection.find().toArray();
      //  console.log(hotels);
        res.status(201).render("hotels",{hotels:hotels});
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong with DB");
        }
    }

    async getHotel(req,res){
        try{
        let name=req.params.name;
        let collection=getDB().collection("hotels");
        let hotel=await collection.find({"name":{"$regex":`^.*${name}.*$`,"$options":'i'}}).toArray();
        // console.log(hotel);
        if(!hotel){
            res.status(400).send("Could not find data");
        }
        res.status(201).render("hotels",{hotels:hotel});
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong with DB");
        }
    }

    async getSpecificHotel(req,res){
        let name=req.params.name;
        let collection=getDB().collection("hotels");
        let hotel=await collection.findOne({name:name});
        res.render("specific_hotel",{hotel});
    }
}