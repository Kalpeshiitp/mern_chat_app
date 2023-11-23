import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';

const MyChat = () => {
    const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log('fetchcat data>>', data)
      setChats(data);
    } catch (error) {
        console.error("Error fetching chats:", error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <div>
      My Chat
    </div>
  )
}

export default MyChat
