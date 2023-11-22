import React, { useEffect, useState } from "react";
import axios from 'axios';

const ChatPage = () => {
  const [chats, setChat] = useState([]);
  const fetchChat = async () => {
    const { data } = await axios.get("/api/chat");
    setChat(data);
  };

  useEffect(() => {
    fetchChat();
  }, []);
  return <div>ChatPage</div>;
};

export default ChatPage;
