import { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { UserContext } from './UserContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    // Connect to WebSocket server
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      query: { userId: user._id }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
