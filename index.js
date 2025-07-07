import express from 'express';
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import {Server} from "socket.io";
import cors from "cors";
import http from "http";
import dotenv from 'dotenv';
dotenv.config();
// const MongoStore= connectMongo(session);
import MongoStore from "connect-mongo";


import PlacesController from './src/controller/places_controller.js';
import HotelController from './src/controller/hotels_controller.js';
import ReviewController from './src/controller/reviews_controller.js';
import UserController from './src/controller/users_controller.js';
import { connectToMongoDb } from './config/mongodb.js';
import { uploadFile } from './src/middlewares/file_upload-middleware.js';
import jwtAuth from './src/middlewares/jwt-middleware.js';
import RestaurantController from './src/controller/restaurants_controller.js';
import ListItemsController from './src/controller/list_items_controller.js';
import MessagesController from './src/controller/messages_controller.js';
import { getDB } from './config/mongodb.js';

const server=express();
const app=http.createServer(server);
const io= new Server(app,{
    path: '/messages',
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A user connected to /messages');

    socket.on("join", async (data) => {
        socket.username = data;
        let collection=getDB().collection("chats");
        // send old messages to the clients.
        let messages=await collection.find().sort({ timestamp: 1 }).limit(50).toArray();
        console.log(messages);
        if(messages)  {
                socket.emit('load_messages', messages);
        }
    });
    
    socket.on('new_message', async (message) => {
        let userMessage = {
            username: socket.username,
            message: message
        }

        const newChat = {
            username: socket.username,
            message: message,
            timestamp: new Date()
        };
        let collection=getDB().collection("chats");
        await collection.insertOne(newChat);

        // broadcast this message to all the clients.
        socket.broadcast.emit('broadcast_message', userMessage);

    })
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
});

// console.log(server);
// server.use(bodyParser.json());
server.use(cookieParser());
server.use(session({
    // store: new RedisStore({ client }),
    secret:'SecretKey',
    resave:true,
    saveUninitialized:true,
    cookie:{secure:false,
        resave:true,
        maxAge: 8 * 60 * 60 *1000
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    })
}))

server.use((req, res, next) => {
    res.locals.email = req.session.email;
    next();
});

const placesController =new PlacesController;
const hotelsController=new HotelController;
const reviewsController=new ReviewController;
const usersController=new UserController;
const restaurantsController=new RestaurantController;
const listItemsController=new ListItemsController;
const messagesController=new MessagesController;


server.set('view engine','ejs');
server.set("views",path.join(path.resolve(),"src","views"));

server.use(ejsLayouts);
server.use(express.static("public"));
server.use(express.urlencoded({extended:true}));


server.get("/signUp",usersController.getSignUp);
server.get("/logIn",usersController.getLogIn);
server.post("/signUp",usersController.postSignUp);
server.post("/",usersController.postLogIn);
server.get("/logOut",usersController.logOut);

server.get("/list",usersController.listItem);

server.get("/",placesController.getPlaces);
server.get("/add_review/:type/:name",jwtAuth,reviewsController.addReview);
server.get("/update_review/:type/:name",jwtAuth,reviewsController.updateReview);
server.post("/update_review/:type/:name",uploadFile.array('imageUrl'),reviewsController.postUpdateReview);
server.post("/delete_review/:type/:name",reviewsController.deletereview);
server.get("/places",placesController.display_places);
server.get("/places/:name",placesController.getPlace);
server.get("/places/filter/:name",placesController.getFilterPlace);
server.get("/hotels",hotelsController.getHotels);
server.get("/hotels/filter/:name",hotelsController.getHotel);

server.post("/add_review/:type/:name",uploadFile.array('imageUrl'),reviewsController.addNewReview);

server.get("/hotels/:name",hotelsController.getSpecificHotel);

server.get("/restaurants",restaurantsController.getRestaurants);
server.get("/restaurants/:name",restaurantsController.getSpecificRestaurants);
server.get("/restaurants/filter/:name",restaurantsController.getRestaurant);

server.get("/list_items/:type",listItemsController.listItem);
server.post("/add_hotel",jwtAuth,uploadFile.array('imageUrl'),listItemsController.addHotel);
server.post("/add_restaurant",jwtAuth,uploadFile.array('imageUrl'),listItemsController.addRestaurant);

server.get("/edit_hotel/:name",jwtAuth,listItemsController.editHotel);
server.post("/edit_hotel/:name",jwtAuth,uploadFile.array('imageUrl'),listItemsController.postEditHotel);
server.post("/delete_hotel/:name",jwtAuth,listItemsController.deleteHotel);

server.get("/edit_restaurant/:name",jwtAuth,listItemsController.editRestaurant);
server.post("/edit_restaurant/:name",jwtAuth,uploadFile.array('imageUrl'),listItemsController.postEditRestaurant);
server.post("/delete_restaurant/:name",jwtAuth,listItemsController.deleteRestaurant);

server.get("/messages",jwtAuth,messagesController.getMessage);

connectToMongoDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to MongoDB Atlas:", err);
});

// app.listen(8080);

// export default server;
