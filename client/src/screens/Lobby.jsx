import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';

function Lobby() {

    // state management
    const [email, setEmail] = useState('');
    const [roomId, setRoomId] = useState('');

    // navigation
    const navigation = useNavigate();

    // importing the socket 
    const socket = useSocket();

    // console.log(socket);

    // function for handling the submit form
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        socket.emit('room:join', { email, roomId })

    }, [email, roomId, socket])

    const handleJoinRoom = useCallback((data) => {
        const { email, roomId } = data;
        // console.log(email, roomId)
        // navigate to the room
        navigation(`/room/${roomId}`)
    }, [navigation])

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off('room:join', handleJoinRoom)
        }
    }, [socket, handleJoinRoom])

    return (
        <div><h1>Lobby</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email ID</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="room">Room Number</label>
                <input
                    type="text"
                    id="room"
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                />
                <br />
                <button>Join</button>
            </form>
        </div>
    )
}

export default Lobby