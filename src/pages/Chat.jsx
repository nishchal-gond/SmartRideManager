import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Send, MessageSquare } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Chat() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
        setLoading(false);
        setError('');
      },
      (err) => {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please refresh the page.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || sending) return;

    try {
      setError('');
      setSending(true);
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: new Date(),
      });
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#EAF6FF]">Chat</h1>
        <p className="mt-2 text-gray-400">Chat with your riding group</p>
      </div>

      {error && (
        <div className="bg-[#FF2E2E]/20 border border-[#FF2E2E] rounded-lg p-4 text-[#FF2E2E]">
          {error}
        </div>
      )}

      <div className="bg-[#121A22] rounded-lg border border-[#1a2332] flex flex-col" style={{ height: '600px' }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner size="lg" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageSquare className="w-16 h-16 mb-4" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.userId === currentUser?.uid ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.userId === currentUser?.uid
                      ? 'bg-[#00F0FF] text-[#0B0F14]'
                      : 'bg-[#0B0F14] text-[#EAF6FF]'
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">{message.userEmail}</p>
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-[#1a2332] p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-[#0B0F14] border border-[#1a2332] rounded-md text-[#EAF6FF] focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="px-4 py-2 bg-[#00F0FF] text-[#0B0F14] rounded-md hover:bg-[#00d9e6] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
