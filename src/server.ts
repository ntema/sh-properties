import express, { Request, Response, NextFunction } from "express";
import {
  analyticsRoutes,
  authRouter,
  loansRoutes,
  messagesRoutes,
  packagesRoutes,
  propertiesRoutes,
  usersRoutes,
  blogRoutes,
} from "./routes";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { constants } from "./config";
import { DateTime } from "luxon";
import slugify from "slugify";
import { Server } from "socket.io";
import { createServer } from "http";

const date = DateTime.now();
const date1 = DateTime.now().plus({ days: 2 }).plus({ days: -2 });

console.log(date1.diff(date, ["months", "days"]).toObject());

import cors from "cors";
import { Property } from "./models";
dotenv.config();

const app: express.Application = express();
const server = createServer(app);
const io = new Server(server, {
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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db: string = constants.mongoURI;
connect(db, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.send("We're up and running");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/properties", propertiesRoutes);
app.use("/api/v1/loans", loansRoutes);
app.use("/api/v1/packages", packagesRoutes);
app.use("/api/v1/messages", messagesRoutes);
app.use("/api/v1/statistics", analyticsRoutes);
app.use("/api/v1/blogs", blogRoutes);



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
  const error: any = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
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
