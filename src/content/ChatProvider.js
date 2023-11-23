import React, { createContext } from "react";

const ChatContest = createContext();

const ChatProvider = ({children})=>{
    return <ChatContest.Provider>{children}</ChatContest.Provider>
}




export default ChatProvider;