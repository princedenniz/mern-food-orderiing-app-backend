import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "./routes/MyUserRoutes";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit on database connection error
  });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"], // Restrict CORS to frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("health", async (req: Request, res: Response) =>{
    res.send({message: "health OK!" })
})

// Routes
app.use("/api/my/user", myUserRoutes);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error("Unexpected Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(7000, () => {
  console.log("Server started on localhost:7000");
});


