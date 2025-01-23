import path from "path";
import express, { Request, Response } from "express";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"

import dotenv from "dotenv"
import { app, server } from "./socket/socket.js";
import { run } from "node:test";

dotenv.config();


const PORT = process.env.PORT || 5000;

const __dirname =path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})



