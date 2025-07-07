import PlacesModel from "../models/places_model.js";
import { getDB } from "../../config/mongodb.js";

export default class PlacesController{
    async getPlaces(req,res){
        try{
        // let places= PlacesModel.getPlaces();
        // res.render('places',{places});
        const db=getDB();
        const collection=db.collection("places") ;
        const places1=await collection.find().toArray();
        // console.log(places1);
         res.status(201).render('places',{places1});
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong");
        }
    }

    async getPlace(req,res){
        try{
         const name=req.params.name;
        // console.log(name);
        // let place=PlacesModel.getPlace(name);
        // res.render("specific_place",{place});
        const db=getDB();
        const collection=db.collection("places") ;
        const place=await collection.findOne({name:name});
        // console.log(places1);
         res.status(201).render('specific_place',{place});
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong");
        }
    }

    async display_places(req,res){
        try{
        const db=getDB();
        const collection=db.collection("places") ;
        const places=await collection.find().toArray();
        res.status(201).render("display_places",{places:places});
    }catch(err){
        console.log(err);
        res.status(501).send("Something went wrong");
    }
    }

    async getFilterPlace(req,res){
        try{
        const db=getDB();
        let name=req.params.name;
        const collection=db.collection("places") ;
        const place=await collection.find({"name":{"$regex":`^.*${name}.*$`,"$options":'i'}}).toArray();
        // console.log(place);
        if(!place){
            res.status(400).send("data not found");
        }
        res.status(201).render("display_places",{places:place});
        }catch(err){
            console.log(err);
            res.status(501).send("Something went wrong");
        }
    }
}