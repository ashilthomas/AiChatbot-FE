import React, { useCallback, useEffect, useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import Main from '../../Components/Main/Main'
import axios from 'axios';
import { addInput, addManinShow, fetchMenusFailure, fetchMenusStart, fetchMenusSuccess, getChatHistory } from '../../Redux/chatbotSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from '../../Redux/store';
import { useAuth } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';




function Home() {
  const [chatOrimg,setCharOrImg] = useState("chat")

  const { getToken } = useAuth();

  
  
  const {  input} = useSelector((state: RootState) => state.chatRes);
  //3005//aichatbot-be.onrender.com/api/v1/chat/apireq

  const dispatch = useDispatch<AppDispatch>();


  const handilFetchApi = async () => {
  //  const endPoint = chatOrimg === "chat" ? "http://localhost:8000/api/v1/chat/apireq": "http://localhost:8000/api/v1/chat/image"
    try {

      dispatch(fetchMenusStart());
      dispatch(addInput(input))
      const res = await axios.post("http://localhost:5000/api/v1/chat/apireq", { message: input },{
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      //       const res = await axios.post(endPoint, { message: input },{
      //   headers: {
      //     Authorization: `Bearer ${await getToken()}`,
      //   },
      // });

      dispatch(fetchMenusSuccess(res.data));
      dispatch(addManinShow())
      fetchChatHistory();
    } catch (error: any) {

      dispatch(fetchMenusFailure(error.message));
    }

  }
 

  const fetchChatHistory = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/chat/history",{
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
 
  const handileDeleteHistory = useCallback(async (id: string | number) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/chat/delete/${id}`,{
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
      handilFetchApi();
    }
  }, [handilFetchApi]);

const ChatHistoryById = useCallback(async (id: number) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/v1/chat/singleChat/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    const chat = res.data.item;

    // Transform data for Redux
    dispatch(fetchMenusSuccess({ response: chat.aiResponse }));
    dispatch(addInput(chat.userMessage));
    dispatch(addManinShow());
  } catch (error) {
    console.log(error);
  }
}, [dispatch]);


  return (
  <div className="flex h-screen themeBG">
  <SideBar handileDeleteHistory={handileDeleteHistory} ChatHistoryById={ChatHistoryById} />
  <div className="flex-1 transition-all duration-300">
    <Main handleKeyDown={handleKeyDown} handilFetchApi={handilFetchApi} setCharOrImg={setCharOrImg} charOrImg={chatOrimg} />
    <Toaster position="bottom-right" reverseOrder={false} />
  </div>
</div>
  )
}

export default Home