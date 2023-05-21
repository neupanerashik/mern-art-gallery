import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from 'cookie-parser'
import { configSocket } from './configuration/socket.js'
import { connectDatabase } from './configuration/database.js'
import { configCloudinary } from './configuration/cloudinary.js'

// import error middleware
import ErrorMiddleware from './middleware/errorMiddleware.js'

// import routes
import userRoutes from './routes/userRoutes.js'
import artRoutes from './routes/artRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

// dot env
dotenv.config({path: './config.env'});


// express app
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true})); // {origin: process.env.CLIENT_URL, credentials: true}

// configutation of database, cloudinary
connectDatabase();
configCloudinary();
configSocket();

// port
const PORT = process.env.PORT;

// server
app.listen(PORT, () => console.log(`Listening in port ${PORT}`));

// routes
app.use("/api/v1", userRoutes)
app.use("/api/v1", artRoutes)
app.use("/api/v1", chatRoutes)
app.use("/api/v1", paymentRoutes)
app.use("/api/v1", orderRoutes)
app.use("/api/v1", adminRoutes)


// error middleware
app.use(ErrorMiddleware);