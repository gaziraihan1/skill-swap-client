'use client';

import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { FaPaperPlane } from 'react-icons/fa';

export default function MessagesPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [startingChat, setStartingChat] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/connected/${user.email}`)
        .then(res => setConnectedUsers(res.data))
        .catch(console.error);
    }
  }, [user, axiosSecure]);

  useEffect(() => {
  if (!user?.email) return;

  const fetchConversations = () => {
    axiosSecure.get(`/messages/inbox/${user.email}`)
      .then(res => setConversations(res.data))
      .catch(console.error);
  };

  fetchConversations(); 

  const intervalId = setInterval(fetchConversations, 3000); 

  return () => clearInterval(intervalId); 
}, [user, axiosSecure]);


  useEffect(() => {
  if (!selectedChat || !user?.email) {
    setMessages([]);
    return;
  }

  const otherUser = selectedChat.senderEmail === user.email
    ? selectedChat.receiverEmail
    : selectedChat.senderEmail;

  const fetchMessages = () => {
    axiosSecure.get(`/messages/conversation?user1=${user.email}&user2=${otherUser}`)
      .then(res => {
        setMessages(res.data);
        setLoadingMessages(false);
      })
      .catch(console.error);
  };

  setLoadingMessages(true);
  fetchMessages(); 

  const intervalId = setInterval(fetchMessages, 3000); 

  return () => clearInterval(intervalId); 
}, [selectedChat, user, axiosSecure]);

  const handleStartChat = async (receiverEmail) => {
    if (startingChat) return;
    setStartingChat(true);

    try {
      const existingConvo = conversations.find(c =>
        (c.senderEmail === user.email && c.receiverEmail === receiverEmail) ||
        (c.senderEmail === receiverEmail && c.receiverEmail === user.email)
      );

      if (existingConvo) {
        setSelectedChat(existingConvo);
      } else {
        setSelectedChat({
          senderEmail: user.email,
          receiverEmail,
        });
      }

      const inboxRes = await axiosSecure.get(`/messages/inbox/${user.email}`);
      setConversations(inboxRes.data);

    } catch (err) {
      console.error(err);
    } finally {
      setStartingChat(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      senderEmail: user.email,
      receiverEmail: selectedChat.senderEmail === user.email ? selectedChat.receiverEmail : selectedChat.senderEmail,
      message: messageInput.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      await axiosSecure.post('/messages', newMessage);

      setMessages(prev => [...prev, newMessage]);
      setMessageInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[80vh] p-4">
      <div className="border rounded p-4 overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-bold mb-3">Users You Can Message</h2>
        {connectedUsers.length === 0 && <p>No connected users found.</p>}
        {connectedUsers.map(u => (
          <div key={u.email} className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={u.photo || '/default-avatar.png'}
                alt={u.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{u.name || u.email}</span>
            </div>
            <button
              disabled={startingChat}
              onClick={() => handleStartChat(u.email)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Message
            </button>
          </div>
        ))}
      </div>

      {/* Conversations */}
      <div className="border rounded p-4 overflow-y-auto max-h-[80vh] md:col-span-1">
        <h2 className="text-xl font-bold mb-3">Your Conversations</h2>
        {conversations.length === 0 && <p>No conversations yet.</p>}
        {conversations.map(convo => {
          const otherUser = convo.senderEmail === user.email
            ? convo.receiverEmail
            : convo.senderEmail;
          return (
            <div
              key={convo._id}
              onClick={() => setSelectedChat(convo)}
              className={`cursor-pointer p-3 rounded mb-2 ${
                selectedChat?._id === convo._id ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              {otherUser}
            </div>
          );
        })}
      </div>

      {/* Chat Window */}
      <div className="md:col-span-2 flex flex-col border rounded p-4 max-h-[80vh]">
        {selectedChat ? (
          <>
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
              {loadingMessages ? (
                <p>Loading messages...</p>
              ) : messages.length === 0 ? (
                <p>No messages yet. Say hi!</p>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded max-w-sm ${
                      msg.senderEmail === user.email ? 'bg-blue-200 self-end' : 'bg-gray-100 self-start'
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                className="flex-grow border rounded px-4 py-2"
                placeholder="Type your message..."
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-10">Select or start a conversation</p>
        )}
      </div>
    </div>
  );
}
