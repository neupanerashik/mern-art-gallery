import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from 'cookie-parser'
import {connectDatabase} from './configuration/database.js'
import { configCloudinary } from './configuration/cloudinary.js'

// import error middleware
import ErrorMiddleware from './middleware/errorMiddleware.js'

// import routes
import userRoutes from './routes/userRoutes.js'
import produtRoutes from './routes/productRoutes.js'


// port
const PORT = process.env.PORT || 8000;

// express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// dot env
dotenv.config({path: './config.env'});

// configutation of database, cloudinary
connectDatabase();
configCloudinary();

// server
app.listen(PORT, () => console.log(`Listening in port ${PORT}`));

// routes
app.use("/api/v1", userRoutes)
app.use("/api/v1", produtRoutes)

// error middleware
app.use(ErrorMiddleware);