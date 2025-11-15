import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));


app.get("/api-docs", (req, res) => {
    const docPath = path.join(process.cwd(), "src", "routes.md");
    const doc = fs.readFileSync(docPath, "utf-8");
    res.type("text/plain").send(doc);
})

app.use("/api", routes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("Failed to connect to DB, server not started", err);
    });
