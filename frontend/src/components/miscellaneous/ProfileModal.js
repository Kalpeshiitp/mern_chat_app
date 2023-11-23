import React from 'react'
import { ViewIcon } from "@chakra-ui/icons";
import {useDisclosure, IconButton} from "@chakra-ui/react";

const ProfileModal = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
    </>
  )
}

export default ProfileModal
