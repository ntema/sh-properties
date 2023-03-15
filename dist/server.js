"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const luxon_1 = require("luxon");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const date = luxon_1.DateTime.now();
const date1 = luxon_1.DateTime.now().plus({ days: 2 }).plus({ days: -2 });
console.log(date1.diff(date, ["months", "days"]).toObject());
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PATCH"]
    }
});
io.on("connection", (socket) => {
    console.log("User Connected");
    console.log(socket.id);
    socket.on("disconnect", (socket) => {
        console.log("User disconnected");
        //@ts-ignore
        console.log(socket.id);
    });
    socket.on("new_message", (data) => {
        console.log(data);
    });
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const db = config_1.constants.mongoURI;
(0, mongoose_1.connect)(db, {})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
app.get("/", (req, res, next) => {
    return res.send("We're up and running");
});
app.use("/api/v1/auth", routes_1.authRouter);
app.use("/api/v1/users", routes_1.usersRoutes);
app.use("/api/v1/properties", routes_1.propertiesRoutes);
app.use("/api/v1/loans", routes_1.loansRoutes);
app.use("/api/v1/packages", routes_1.packagesRoutes);
app.use("/api/v1/messages", routes_1.messagesRoutes);
app.use("/api/v1/statistics", routes_1.analyticsRoutes);
// async function nin() {
//   const data = await Property.find({});
//   for (let prop of data) {
//     if (!prop.nameSlug) {
//       const t = await Property.findOneAndUpdate(
//         { _id: prop._id },
//         { nameSlug: slugify(prop.name, { lower: true }) },
//         { new: true }
//       );
//       console.log(t);
//     }
//   }
// }
// nin();
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            status: error.status || 500,
            message: error.message
        }
    });
});
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log("App is running at port 5001");
});
