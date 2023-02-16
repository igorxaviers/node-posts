import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// user-routes
app.use("/", userRoutes);



export default app;