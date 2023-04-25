import { Server } from "socket.io"; 

// variables
let onlineUsers = [];


export const configSocket = () => {
    // socket configuration
    const io = new Server(8800, {cors: {origin: "http://localhost:3000", credentials: true}});

    io.on("connection", (socket) => {   

        // online users
		socket.on('addOnlineUser', newUserId => {
			if(!onlineUsers.some(user => user.userId === newUserId)){
				onlineUsers.push({userId: newUserId, socketId: socket.id});
                io.emit('getOnlineUsers', onlineUsers);
			}
		})

        // send message
        socket.on('sendMessage', (message) => {
			const user = onlineUsers.find(user => user.userId === message.receiver);

            if(user){
                io.to(user.socketId).emit('getMessage', message);
            }
		})

        // socket disconnect
        socket.on('disconnect', () => {
			onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
			io.emit('getOnlineUsers', onlineUsers);
		})
    })
};