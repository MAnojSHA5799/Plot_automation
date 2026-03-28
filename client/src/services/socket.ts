import { io } from 'socket.io-client';

const socket = io( 'https://plot-automation.onrender.com', {
  autoConnect: true,
});

export default socket;
