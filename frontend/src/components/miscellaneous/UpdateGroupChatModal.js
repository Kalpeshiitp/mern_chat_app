import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    IconButton,
    Text,
    Image,
    useDisclosure,
    FormControl,
    Input
  } from "@chakra-ui/react";
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../context/ChatProvider';
import { useToast } from "@chakra-ui/toast";
import UserBadgeItem from "../UserAvatar/UserBadegeItem"
import {Box} from '@chakra-ui/layout'
import axios from "axios";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameloading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {selectedChat, setSelectedChat, user}= ChatState()
  const toast = useToast();

  const handleRemove = () =>{}

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      console.log("Axios response:", data);
      console.log(data._id);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameloading(false);
    } catch (error) {
        console.log(error)
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameloading(false);
    }
    setGroupChatName("");
  };
  const handleSearch = ()=>{}
    return (
        <>
          <IconButton  display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen}/>
          <Modal isOpen={isOpen} onClose={onClose} isCenterd>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader 
               fontSize="35px"
               fontFamily="Work sans"
               display="flex"
               justifyContent="center">{selectedChat.chatName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
              </ModalBody>
    
              <ModalFooter>
              <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default UpdateGroupChatModal
