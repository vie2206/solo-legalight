import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:8000';

export interface SocketEvents {
  // Connection events
  connect: () => void;
  disconnect: () => void;
  error: (error: any) => void;
  
  // Doubt-specific events
  joined_doubt: (data: { doubtId: string }) => void;
  doubt_update: (data: { doubt_id: string; type: string; message: string; timestamp: string }) => void;
  new_response: (data: {
    doubt_id: string;
    response_id: string;
    author_name: string;
    author_type: string;
    content: string;
    created_at: string;
  }) => void;
  user_typing: (data: { userId: string; userName: string; typing: boolean }) => void;
  
  // Notification events
  notification: (data: {
    id: string;
    doubt_id: string;
    type: string;
    title: string;
    message: string;
    metadata: any;
    created_at: string;
  }) => void;
  notifications_read: (data: { notification_ids: string[]; timestamp: string }) => void;
  
  // Educator-specific events
  new_doubt_available: (data: {
    doubt_id: string;
    title: string;
    subject: string;
    priority: string;
    student_name: string;
  }) => void;
  
  // Admin events
  doubt_statistics_update: (data: { type: string; doubt_id: string; timestamp: string }) => void;
}

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private eventListeners: Map<string, Function[]> = new Map();

  // Connect to socket server
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        reject(new Error('No authentication token found'));
        return;
      }

      this.socket = io(SOCKET_URL, {
        auth: {
          token
        },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        forceNew: true
      });

      // Handle connection success
      this.socket.on('connect', () => {
        console.log('✅ Connected to doubt resolution socket server');
        this.reconnectAttempts = 0;
        this.setupEventForwarding();
        resolve();
      });

      // Handle connection error
      this.socket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
        this.handleReconnect();
        reject(error);
      });

      // Handle disconnection
      this.socket.on('disconnect', (reason) => {
        console.log('🔌 Disconnected from socket server:', reason);
        
        if (reason === 'io server disconnect') {
          // Server initiated disconnect, try to reconnect
          this.handleReconnect();
        }
      });

      // Handle general errors
      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
        this.emitToListeners('error', error);
      });
    });
  }

  // Disconnect from socket server
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.eventListeners.clear();
    console.log('🔌 Socket disconnected');
  }

  // Check if connected
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  // Join a doubt room for real-time updates
  joinDoubtRoom(doubtId: string): void {
    if (this.socket) {
      this.socket.emit('join_doubt', doubtId);
      console.log(`👥 Joining doubt room: ${doubtId}`);
    }
  }

  // Leave a doubt room
  leaveDoubtRoom(doubtId: string): void {
    if (this.socket) {
      this.socket.emit('leave_doubt', doubtId);
      console.log(`👋 Leaving doubt room: ${doubtId}`);
    }
  }

  // Send typing indicator
  sendTypingIndicator(doubtId: string, typing: boolean): void {
    if (this.socket) {
      this.socket.emit('doubt_typing', { doubtId, typing });
    }
  }

  // Add event listener
  on<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  // Remove event listener
  off<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Remove all listeners for an event
  removeAllListeners<K extends keyof SocketEvents>(event: K): void {
    this.eventListeners.delete(event);
  }

  // Private methods
  private setupEventForwarding(): void {
    if (!this.socket) return;

    // Forward all relevant events to registered listeners
    const eventsToForward: (keyof SocketEvents)[] = [
      'joined_doubt',
      'doubt_update', 
      'new_response',
      'user_typing',
      'notification',
      'notifications_read',
      'new_doubt_available',
      'doubt_statistics_update'
    ];

    eventsToForward.forEach(event => {
      this.socket!.on(event, (data: any) => {
        this.emitToListeners(event, data);
      });
    });
  }

  private emitToListeners(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in socket event listener for ${event}:`, error);
        }
      });
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.connect().catch(error => {
          console.error('Reconnection failed:', error);
        });
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('❌ Max reconnection attempts reached');
      this.emitToListeners('error', new Error('Failed to reconnect to server'));
    }
  }
}

// Create and export singleton instance
const socketService = new SocketService();

export default socketService;

// React hook for using socket in components
import { useEffect, useCallback } from 'react';

export const useSocket = () => {
  const connect = useCallback(() => {
    return socketService.connect();
  }, []);

  const disconnect = useCallback(() => {
    socketService.disconnect();
  }, []);

  const joinDoubtRoom = useCallback((doubtId: string) => {
    socketService.joinDoubtRoom(doubtId);
  }, []);

  const leaveDoubtRoom = useCallback((doubtId: string) => {
    socketService.leaveDoubtRoom(doubtId);
  }, []);

  const sendTypingIndicator = useCallback((doubtId: string, typing: boolean) => {
    socketService.sendTypingIndicator(doubtId, typing);
  }, []);

  const addEventListener = useCallback(<K extends keyof SocketEvents>(
    event: K,
    callback: SocketEvents[K]
  ) => {
    socketService.on(event, callback);
    return () => socketService.off(event, callback);
  }, []);

  return {
    connect,
    disconnect,
    joinDoubtRoom,
    leaveDoubtRoom,
    sendTypingIndicator,
    addEventListener,
    isConnected: () => socketService.isConnected(),
  };
};