import { useState } from 'react';
import { motion } from 'framer-motion';
import { chats, orders } from '@/data';
import {
  Search,
  Phone,
  MoreHorizontal,
  ArrowLeft,
  Send,
  Paperclip,
  Image,
  Package,
  Clock,
  Check,
  CheckCheck,
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: 'm1', text: 'Hi! I ordered the Luxury Watch yesterday.', sender: 'me', timestamp: '10:30 AM', status: 'read' },
    { id: 'm2', text: 'Hello! Yes, we received your order. It will be shipped today.', sender: 'them', timestamp: '10:35 AM', status: 'read' },
    { id: 'm3', text: 'Great! Can I get the tracking number?', sender: 'me', timestamp: '10:36 AM', status: 'read' },
    { id: 'm4', text: 'Your order has been shipped! Tracking: TR123456', sender: 'them', timestamp: '2:00 PM', status: 'read' },
  ],
  c2: [
    { id: 'm1', text: 'Hello! I would like to book a bridal makeup session for June 15th.', sender: 'me', timestamp: '9:00 AM', status: 'read' },
    { id: 'm2', text: 'Hi! Congratulations on your upcoming wedding! We have availability on June 15th. What time works for you?', sender: 'them', timestamp: '9:15 AM', status: 'read' },
    { id: 'm3', text: 'Around 10 AM would be perfect.', sender: 'me', timestamp: '9:20 AM', status: 'read' },
    { id: 'm4', text: 'Perfect! You are booked for June 15th at 10 AM. See you then!', sender: 'them', timestamp: '9:25 AM', status: 'read' },
  ],
};

export default function MessagesScreen() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>(mockMessages);

  const activeChatData = activeChat ? chats.find(c => c.id === activeChat) : null;
  const currentMessages = activeChat ? (chatMessages[activeChat] || []) : [];

  const sendMessage = () => {
    if (!messageText.trim() || !activeChat) return;
    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageText.trim(),
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }));
    setMessageText('');
  };

  if (activeChat && activeChatData) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Chat Header */}
        <header className="sticky top-0 z-40 glass px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setActiveChat(null)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{activeChatData.name.charAt(0)}</span>
            </div>
            {activeChatData.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold truncate">{activeChatData.name}</h3>
            <p className="text-[11px] text-muted-foreground">
              {activeChatData.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
          <button className="w-8 h-8 flex items-center justify-center">
            <Phone className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
          {currentMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                  <span className="text-[10px] opacity-70">{msg.timestamp}</span>
                  {msg.sender === 'me' && (
                    <CheckCheck className="w-3 h-3 opacity-70" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="glass border-t border-border/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center text-muted-foreground">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-muted-foreground">
              <Image className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              disabled={!messageText.trim()}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-primary-foreground ml-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Messages</h1>
          <button className="w-10 h-10 flex items-center justify-center">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Order Status Cards */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">Your Orders</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[200px] bg-card rounded-xl p-3 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <img src={order.image} alt={order.product} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium line-clamp-1">{order.product}</p>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-medium mt-1 px-2 py-0.5 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status === 'delivered' && <Check className="w-3 h-3" />}
                    {order.status === 'shipped' && <Package className="w-3 h-3" />}
                    {order.status === 'pending' && <Clock className="w-3 h-3" />}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-muted-foreground px-4 mb-3">Conversations</h2>
        <div className="divide-y divide-border/50">
          {chats.map((chat, i) => (
            <motion.button
              key={chat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveChat(chat.id)}
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{chat.name.charAt(0)}</span>
                </div>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold truncate">{chat.name}</h3>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-muted-foreground line-clamp-1">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold flex-shrink-0 ml-2">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
