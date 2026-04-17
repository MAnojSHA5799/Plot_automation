import { io } from 'socket.io-client';

const socket = io( 'https://plot-automation-omr4.vercel.app', {
  autoConnect: true,
});

export default socket;
