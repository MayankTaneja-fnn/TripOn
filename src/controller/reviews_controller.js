import session from "express-session";
import { getDB } from "../../config/mongodb.js";

export default class ReviewController{
    constructor(user_email,user_name,user_rating,user_img,user_comment,review_type,review_for){
        this.user_email=user_email;
        this.user_name=user_name;
        this.user_img=user_img;
        this.user_rating=user_rating;
        this.user_comment=user_comment;
        this.review_for=review_for;
        this.review_type=review_type;
    }

    async addReview(req,res){
        let name=req.params.name;
        let type=req.params.type;
        const email=req.session.email;
        const collection=getDB().collection(`${type}`);
        const found=await collection.findOne({
            name:name,
            'user_review.user_email':email
        });
        console.log(found);
        if(found){
            res.send("Review already added");
        }
        else{
        res.render("add-review",{name:name,type:type});
        }
    }

    async addNewReview(req,res){
        try{
        // console.log(req);
        let {user_name,user_rating,review_for,user_comment}=req.body;
        let user_img=[];
        for(let i=0;i<req.files.length;i++){
            user_img.push("/images/" + req.files[i].originalname);
        }
        // console.log(user_img);
        //  console.log(req);
        //  console.log(req.session.email);
        const user_email=req.session.email;
        // console.log(user_email);
        let review_type=req.params.type;
        let newreview=new ReviewController(user_email,user_name,user_rating,user_img,user_comment,review_type,review_for);
        let collection=getDB().collection(review_type);
        let result = await collection.updateOne(
            { name: review_for },
            { $push: { user_review: newreview } }
        );
        // let name=await collection.findOne({name:`${review_for}`});
        res.redirect(`/${review_type}/${review_for}`);
        // res.render("specific_place",{place:name});
    }catch(err){
        console.log(err);
        res.status(501).send("Something went wrong");
    }
    }

    async updateReview(req,res){
        const name=req.params.name;
        const type=req.params.type;
        const user_email=req.session.email;
        const collection=getDB().collection(`${type}`);
        const place=await collection.findOne(
                {name:name
        });
        const review_array=place.user_review;
        let review;
        for(let i=0;i<review_array.length;i++){
            if(review_array[i].user_email===user_email){
                review=review_array[i];
                break;
            }
        }
         console.log(review);
       res.render("update-review",{name:name,type:type,review:review});
    }

    async postUpdateReview(req,res){
        try{
        // const name=req.params.name;
        const user_email=req.session.email;
        let {user_name,user_rating,review_for,user_comment}=req.body;
        let user_img=[];
        if(req.files){
        for(let i=0;i<req.files.length;i++){
            user_img.push("/images/" + req.files[i].originalname);
        }
    }
        let review_type=req.params.type;
        let newreview=new ReviewController(user_email,user_name,user_rating,user_img,user_comment,review_type,review_for);
        const collection=getDB().collection(`${review_type}`);
        // console.log(req.body);
        // console.log(newreview);
        // const result=await collection.updateOne({$and:[{
        //     name:review_for},
        //     {user_review:{$elemMatch:{user_email:user_email}}}]
        // },newreview);
        const result=await collection.updateOne({
            name: review_for,
            'user_review.user_email': user_email
        },{
            $set :{'user_review.$.user_name':user_name,'user_review.$.user_rating':user_rating,'user_review.$.user_comment':user_comment}
        , $push: {
            'user_review.$.user_img': { $each: user_img }
        }});
        //  console.log(result);
        res.redirect(`/${review_type}/${review_for}`);
    }catch(err){
        console.log(err);
        res.status(501).send("Something went wrong");
    }
    }

    async deletereview(req,res){
        const review_for=req.params.name;
        const review_type=req.params.type;
        const email=req.session.email;
        const collection=getDB().collection(review_type);
        const result=await collection.updateOne({name:review_for},{
            $pull:{user_review:{user_email:email}}
        });
        console.log(result);
        res.redirect(`/${review_type}/${review_for}`);
    }
}