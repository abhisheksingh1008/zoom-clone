import express from "express";
import { Server } from "socket.io";
import { config } from "dotenv";
import cors from "cors";

import roomRoutes from "./routes/roomRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares.js";

config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/room", roomRoutes);

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
