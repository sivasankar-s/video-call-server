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




// Store room codes and connections



const app = express()

app.use(bodyParser.json())
app.use(cors({
    origin: 'https://video-call-psi.vercel.app', // frontend URL
    credentials: true,
}))

// const server = http.createServer(app);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'https://video-call-psi.vercel.app',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const users = {};

const socketToRoom = {};

app.use('/auth', authRoutes);

const PORT = 5000

mongoose.connect("mongodb+srv://supersiva004:siva2004@cluster0.5pmbvfs.mongodb.net/")
// .then(() => app.listen(PORT, () => console.log('server running on localhost:5000'))).catch((err) => console.log(err));

console.log('helllooo')
// io.on('connection', (socket) => {
//     console.log("in io")
//     socket.on("join room", roomID => {

//         console.log("in server join room on", roomID)
//         console.log(users)
//         if (users[roomID]) {
//             const length = users[roomID].length;
//             if (length === 4) {
//                 socket.emit("room full");
//                 return;
//             }
//             users[roomID].push(socket.id);
//         } else {
//             users[roomID] = [socket.id];
//         }
//         socketToRoom[socket.id] = roomID;
//         const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
//         console.log(usersInThisRoom)

//         socket.emit("all users", usersInThisRoom);
//     });

//     socket.on("candidate", ({ targetUser, candidate }) => {
//         // Find the target peer and send the ICE candidate
//         const targetPeer = users[targetUser];
//         if (targetPeer) {
//             targetPeer.socket.emit("candidate", {
//                 callerID: socket.id,
//                 candidate: candidate,
//             });
//         }
//     });

//     socket.on("sending signal", payload => {
//         io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
//     });

//     socket.on("returning signal", payload => {
//         io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
//     });

//     socket.on('disconnect', () => {
//         const roomID = socketToRoom[socket.id];
//         let room = users[roomID];
//         if (room) {
//             room = room.filter(id => id !== socket.id);
//             users[roomID] = room;
//         }
//     });

// });


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

// server.listen(PORT || 8000, () => console.log('server is running on port 8000'));
server.listen(PORT, () => console.log('server running on localhost:5000'))

