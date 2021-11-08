import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";

// Router
import userRoutes from "./routes/User";
import adminRoutes from "./routes/Admin";
import messageRoutes from "./routes/Message";

const app = express();

app.set("port", config.PORT);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/message", messageRoutes);

export default app;
