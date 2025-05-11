
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';
import { mockCompanions } from '@/mocks/companions';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

const MessagePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSelectedId = searchParams.get('companionId');
  
  const { user } = useUserStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(initialSelectedId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Get details of the selected companion/user
  const selectedParticipant = selectedConversation 
    ? mockCompanions.find(c => c.id === selectedConversation)
    : null;

  // Generate mock conversations on first load
  useEffect(() => {
    // In a real app, this would be an API call to get conversations
    const mockConversations: Conversation[] = mockCompanions.slice(0, 5).map(companion => ({
      id: companion.id,
      participantId: companion.id,
      participantName: companion.name,
      participantAvatar: companion.avatar,
      lastMessage: `Hello, I'm interested in your companionship services.`,
      lastMessageTime: new Date(Date.now() - Math.random() * 86400000 * 5),
      unreadCount: Math.floor(Math.random() * 3),
    }));
    
    setConversations(mockConversations);
    
    if (initialSelectedId) {
      loadMessages(initialSelectedId);
    }
  }, [initialSelectedId]);
  
  const loadMessages = (conversationId: string) => {
    // In a real app, this would be an API call to get messages for the selected conversation
    const mockMessages: Message[] = [];
    
    // Generate some mock messages
    const now = new Date();
    const conversationParticipant = mockCompanions.find(c => c.id === conversationId);
    
    if (conversationParticipant && user) {
      // Initial message from the user
      mockMessages.push({
        id: '1',
        senderId: user.id,
        receiverId: conversationId,
        content: `Hello ${conversationParticipant.name}, I'm interested in booking you for an upcoming event.`,
        timestamp: new Date(now.getTime() - 3600000),
      });
      
      // Response from the companion
      mockMessages.push({
        id: '2',
        senderId: conversationId,
        receiverId: user.id,
        content: `Hi there! Thanks for reaching out. I'd be happy to join you. What kind of event is it?`,
        timestamp: new Date(now.getTime() - 3400000),
      });
      
      // Follow-up from the user
      mockMessages.push({
        id: '3',
        senderId: user.id,
        receiverId: conversationId,
        content: `It's a company party next Friday evening. Would you be available from 7-10pm?`,
        timestamp: new Date(now.getTime() - 3200000),
      });
      
      // Response from the companion
      mockMessages.push({
        id: '4',
        senderId: conversationId,
        receiverId: user.id,
        content: `Let me check my schedule. Yes, I'm available that evening! Would you like to book through the platform?`,
        timestamp: new Date(now.getTime() - 3000000),
      });
    }
    
    setMessages(mockMessages);
  };

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    loadMessages(conversationId);
    
    // Mark conversation as read
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation || !user) return;
    
    const newMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      senderId: user.id,
      receiverId: selectedConversation,
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, newMsg]);
    setNewMessage('');
    
    // In a real app, this would be an API call to send the message
    
    // Update the conversation list
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: newMessage,
              lastMessageTime: new Date(),
            }
          : conv
      )
    );
    
    // Mock a reply after a delay
    setTimeout(() => {
      if (!selectedParticipant) return;
      
      const replyMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        senderId: selectedConversation,
        receiverId: user.id,
        content: `Thanks for your message! I'll get back to you soon.`,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, replyMsg]);
      
      // Update the conversation list
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === selectedConversation
            ? {
                ...conv,
                lastMessage: replyMsg.content,
                lastMessageTime: new Date(),
              }
            : conv
        )
      );
    }, 2000);
  };

  const formatTimeOrDate = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Conversations list */}
        <div className="md:col-span-1">
          <Card className="h-[calc(80vh-6rem)]">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="p-4 border-b">
                <Input
                  placeholder="Search conversations..."
                  className="w-full"
                />
              </div>
              <div className="flex-grow overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No conversations yet
                  </div>
                ) : (
                  <div>
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => handleSelectConversation(conversation.id)}
                        className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedConversation === conversation.id ? 'bg-accent' : ''}`}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                            <AvatarFallback>
                              {conversation.participantName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                              {conversation.unreadCount}
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{conversation.participantName}</h3>
                            <span className="text-xs text-gray-500">
                              {formatTimeOrDate(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages */}
        <div className="md:col-span-2 lg:col-span-3">
          <Card className="h-[calc(80vh-6rem)] flex flex-col">
            {!selectedConversation ? (
              <div className="flex-grow flex items-center justify-center text-center p-6 text-gray-500">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-lg font-medium">Select a conversation</p>
                  <p className="mt-1">Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat header */}
                {selectedParticipant && (
                  <div className="p-4 border-b flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedParticipant.avatar} alt={selectedParticipant.name} />
                      <AvatarFallback>
                        {selectedParticipant.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="font-medium">{selectedParticipant.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedParticipant.location}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Chat messages */}
                <div className="flex-grow overflow-y-auto p-4">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-center text-gray-500">
                      <div>
                        <p>No messages yet</p>
                        <p className="mt-1">Start the conversation!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isSender = message.senderId === user?.id;
                        
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className="flex items-end">
                              {!isSender && (
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage 
                                    src={selectedParticipant?.avatar} 
                                    alt={selectedParticipant?.name} 
                                  />
                                  <AvatarFallback>
                                    {selectedParticipant?.name.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div
                                className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                                  isSender
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}
                              >
                                <p>{message.content}</p>
                                <p className={`text-xs mt-1 ${isSender ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
