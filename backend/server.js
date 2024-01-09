import express from "express";
import { Server } from "socket.io";
import { config } from "dotenv";
import cors from "cors";

import HttpError from "./models/HttpError.js";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares.js";

const allRooms = [{ id: "abcd", users: ["abhi", "abhi", "abhi"] }];

config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/room/:roomId", (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = allRooms.find((r) => r?.id === roomId);

    if (!room) {
      return next(new HttpError("Invalid room id, room does not exist.", 400));
    }

    if (room?.users.length > 3) {
      res.status(200).json({ roomExists: true, roomIsFull: true });
    } else {
      res.status(200).json({ roomExists: true, roomIsFull: false });
    }
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong.", 500));
  }
});

// app.post("/api/room", (req, res, next) => {
//   try {
//     const { userName } = req.body;

//   } catch (error) {
//     console.log(error);
//     return next(new HttpError("Something went wrong.", 500));
//   }
// });

app.use("/api", (req, res, next) => {
  res.status(200).json({ message: "API is running." });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(PORT || 8080, () => {
  console.log(`Server is running on port : ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 120000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

//delete room routes and controllers as well as this comment
