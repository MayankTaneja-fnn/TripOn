import server from "./index.js";
import {Server} from "socket.io";
import http from "http";

const app=http.createServer(server);
console.log(app);
const io=new Server(app);
console.log("io" + io);

app.listen("3000");
