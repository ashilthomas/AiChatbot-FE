import React, { useCallback, useEffect, useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import Main from '../../Components/Main/Main'

import { addCredit, addInput, addManinShow, fetchMenusFailure, fetchMenusStart, fetchMenusSuccess, getChatHistory } from '../../Redux/chatbotSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from '../../Redux/store';
import { useAuth } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';
import instance from '../../../axios';





function Home() {
const [chatOrImg, setChatOrImg] = useState("chat");

 

  const { getToken ,isSignedIn} = useAuth();

  
  
  const {  input} = useSelector((state: RootState) => state.chatRes);
  //3005//aichatbot-be.onrender.com/api/v1/chat/apireq

  const dispatch = useDispatch<AppDispatch>();


 const fetchCredits = async () => {
    if (!isSignedIn) return;

    try {
      const token = await getToken();
      const res = await instance.post(
        "user/createUser",
        {}, // empty body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

     console.log(res.data);

     

    
      dispatch(addCredit(res.data.creditLeft));

    } catch (err) {
      console.error("Error fetching credits:", err);
    }
  };

  useEffect(() => {
 

  fetchCredits();
}, [isSignedIn, getToken]);



const handleFetchApi = async () => {
  const endPoint =
    chatOrImg === "chat"
      ? "/chat/apireq"
      : "/image/createImage";

  const body =
    chatOrImg === "chat"
      ? { message: input }
      : { prompt: input };

  try {
    dispatch(fetchMenusStart());
    dispatch(addInput(input));

    const res = await instance.post(endPoint, body, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    const chat = res.data;
    console.log(chat);
    
    if(chat.error){
      toast.error(chat.error);
      dispatch(fetchMenusFailure(chat.error));
    
     
      return;
    }
   

    // ✅ FIXED: single dispatch
    dispatch(fetchMenusSuccess({
      response: chat.type === "chat" ? chat.response : undefined,
      image: chat.type === "image" ? chat.image : undefined,
      type: chat.type,
    }));
    
    dispatch(addInput(chat.userMessage));
    dispatch(addManinShow());
    fetchChatHistory();
    fetchCredits();
   
  } catch (error: any) {
    dispatch(fetchMenusFailure(error.message));
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};


 

  const fetchChatHistory = useCallback(async () => {
    try {
      const res = await instance.get("chat/history",{
           headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      dispatch(getChatHistory(res.data.history));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);


  useEffect(() => {
    fetchChatHistory();
 
  }, []);
 
  const handleDeleteHistory = useCallback(async (id: string | number) => {
    try {
      const res = await instance.delete(`/chat/delete/${id}`,{
            headers: {  
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (res.data.success) {
        fetchChatHistory();
        toast.success('Chat deleted successfully');
      } else {
        console.log('Failed to delete chat');
      }
    } catch (error) {
      console.log(error);
    }
  }, [fetchChatHistory]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFetchApi();
    }
  }, [handleFetchApi]);

const ChatHistoryById = useCallback(async (id: number) => {
 try {
    const res = await instance.get(
      `/chat/singleChat/${id}`,

      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }          
    );

    const chat = res.data.item;

    // ✅ FIX: map backend fields -> Redux format
    dispatch(fetchMenusSuccess({
      response: chat.type === "chat" ? chat.aiResponse : undefined,
      image: chat.type === "image" ? chat.aiResponse : undefined,
      type: chat.type,
    }));

    dispatch(addInput(chat.userMessage));
    dispatch(addManinShow());
  } catch (error) {
    console.log(error);
  }
}, [dispatch]);


  return (
  <div className="flex h-screen themeBG">
  <SideBar handleDeleteHistory={handleDeleteHistory} ChatHistoryById={ChatHistoryById} />
  <div className="flex-1 transition-all duration-300">
    <Main handleKeyDown={handleKeyDown} handleFetchApi={handleFetchApi} setChatOrImg={setChatOrImg} chatOrImg={chatOrImg} />
    <Toaster position="bottom-right" reverseOrder={false} />
  </div>
</div>
  )
}

export default Home
