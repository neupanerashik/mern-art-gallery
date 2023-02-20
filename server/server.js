import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from 'cookie-parser'
import { connectDatabase } from './configuration/database.js'
import { configCloudinary } from './configuration/cloudinary.js'

// import error middleware
import ErrorMiddleware from './middleware/errorMiddleware.js'

// import routes
import userRoutes from './routes/userRoutes.js'
import artRoutes from './routes/artRoutes.js'

// dot env
dotenv.config({path: './config.env'});


// express app
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(cors());

// configutation of database, cloudinary
connectDatabase();
configCloudinary();

// port
const PORT = process.env.PORT;

// server
app.listen(PORT, () => console.log(`Listening in port ${PORT}`));

// routes
app.use("/api/v1", userRoutes)
app.use("/api/v1", artRoutes)

// error middleware
app.use(ErrorMiddleware);