import { VStack } from '@chakra-ui/react'
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from "react";


const Signup = () => {
const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast()

  const handleClick = () => setShow(!show);
  const postDetails = (pics) => {
    // Check if pics is undefined
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  // Log the image details
    console.log(pics);
  
    // Check if the image type is valid
    if (!(pics.type === "image/jpeg" || pics.type === "image/png")) {
      toast({
        title: "Invalid Image Type. Please Select a JPEG or PNG Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  
    // Set loading state to true
    setPicLoading(true);
  
    // Upload image to Cloudinary
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dej8jywte");
  
    fetch("https://api.cloudinary.com/v1_1/dej8jywte/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }
        return res.json();
      })
      .then((data) => {
        // Set the uploaded image URL to state variable
        setPic(data.url.toString());
        console.log("Image uploaded successfully:", data.url.toString());
      })
      .catch((err) => {
        console.error("Error uploading image:", err.message);
        // Display a user-friendly error message
        toast({
          title: "Error Uploading Image. Please Try Again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .finally(() => {
        // Set loading state to false after image upload (success or failure)
        setPicLoading(false);
      });
  };
  
  const submitHandler = async () => {}
  
  return (
    <VStack spacing="5px">
    <FormControl id="first-name" isRequired>
      <FormLabel>Name</FormLabel>
      <Input
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
      />
    </FormControl>
    <FormControl id="email" isRequired>
      <FormLabel>Email Address</FormLabel>
      <Input
        type="email"
        placeholder="Enter Your Email Address"
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          type={show ? "text" : "password"}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    <FormControl id="password" isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup size="md">
        <Input
          type={show ? "text" : "password"}
          placeholder="Confirm password"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
    <FormControl id="pic">
      <FormLabel>Upload your Picture</FormLabel>
      <Input
        type="file"
        p={1.5}
        accept="image/*"
        onChange={(e) => postDetails(e.target.files[0])}
      />
    </FormControl>
    <Button
      colorScheme="blue"
      width="100%"
      style={{ marginTop: 15 }}
      onClick={submitHandler}
      isLoading={picLoading}
    >
      Sign Up
    </Button>
  </VStack>
  )
}

export default Signup
