import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js"
import 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(cors());

// server static assests in images folder so multer can save img to it
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/posts", postRoutes);
app.use("/users", authRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to the database");
    app.listen(process.env.PORT || 3000, () => console.log(`Server is running on port: ${process.env.PORT || 3000}`));
  })
  .catch((err) => {
    console.error(`Error connecting to the database. ${err}`);
  });
