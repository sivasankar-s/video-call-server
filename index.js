import express from 'express';

import { createServer } from 'node:http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http'
import cors from 'cors';
import {Server} from 'socket.io';
// import socket from 'socket.io';

import authRoutes from './routes/auth.js'

// const { Server } = require('socket.io');




const app = express()

app.use(bodyParser.json())
app.use(cors())

// const server = http.createServer(app);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        // credentials: true
    }
});



app.use('/auth', authRoutes);

const PORT = 5000

mongoose.connect("mongodb+srv://supersiva004:siva2004@cluster0.5pmbvfs.mongodb.net/")
// .then(() => app.listen(PORT, () => console.log('server running on localhost:5000'))).catch((err) => console.log(err));

// console.log('helllooo')



io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT || 8000, () => console.log('server is running '));

