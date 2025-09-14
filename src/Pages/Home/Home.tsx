import React, { useCallback, useEffect, useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import Main from '../../Components/Main/Main'
import axios from 'axios';
import { addCredit, addInput, addManinShow, fetchMenusFailure, fetchMenusStart, fetchMenusSuccess, getChatHistory } from '../../Redux/chatbotSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from '../../Redux/store';
import { useAuth } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




function Home() {
const [chatOrimg, setCharOrImg] = useState("chat");

 

  const { getToken ,isSignedIn} = useAuth();

  
  
  const {  input} = useSelector((state: RootState) => state.chatRes);
  //3005//aichatbot-be.onrender.com/api/v1/chat/apireq

  const dispatch = useDispatch<AppDispatch>();


 const fetchCredits = async () => {
    if (!isSignedIn) return;

    try {
      const token = await getToken();
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/createUser",
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

// useEffect(() => {
//   const fetchCredit = async () => {
//     try {
     
      

//       const response = await axios.get("http://localhost:8000/api/v1/chat/credits", {
//         headers: {
//         Authorization: `Bearer ${await getToken()}`,
//       },
//       });

//       console.log(response.data); // safer than logging entire response
//     } catch (error) {
//       console.error("Error fetching credits:", error);
//     }
//   };

//   fetchCredit();
// }, []);



const handilFetchApi = async () => {
  const endPoint =
    chatOrimg === "chat"
      ? "http://localhost:8000/api/v1/chat/apireq"
      : "http://localhost:8000/api/v1/image/createImage";

  const body =
    chatOrimg === "chat"
      ? { message: input }
      : { prompt: input };

  try {
    dispatch(fetchMenusStart());
    dispatch(addInput(input));

    const res = await axios.post(endPoint, body, {
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
      const res = await axios.get("http://localhost:8000/api/v1/chat/history",{
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
      const res = await axios.delete(`http://localhost:8000/api/v1/chat/delete/${id}`,{
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
      `http://localhost:8000/api/v1/chat/singleChat/${id}`,

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
  <SideBar handileDeleteHistory={handileDeleteHistory} ChatHistoryById={ChatHistoryById} />
  <div className="flex-1 transition-all duration-300">
    <Main handleKeyDown={handleKeyDown} handilFetchApi={handilFetchApi} setCharOrImg={setCharOrImg} charOrImg={chatOrimg} />
    <Toaster position="bottom-right" reverseOrder={false} />
  </div>
</div>
  )
}

export default Home