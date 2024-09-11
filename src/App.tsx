import { useEffect, useState } from 'react'
import Main from './Components/Main/Main'
import SideBar from './Components/SideBar/SideBar'
import './App.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './Redux/store'
import { addInput, addManinShow, fetchMenusFailure, fetchMenusStart, fetchMenusSuccess, getChatHistory } from './Redux/chatbotSlice'



function App() {
  const [sideBar, setsideBar] = useState<boolean>(true)
  const [input, setInput] = useState<string>("")
  

  const dispatch = useDispatch<AppDispatch>();


  
  const handileSideBarShow = () => {
    setsideBar(prev => !prev)

  }

  const handilFetchApi =async()=>{

    try {
   
    
      dispatch(fetchMenusStart());
      dispatch(addInput(input))

     
      const res = await axios.post("http://localhost:3001/api/v1/chat/apireq", { message: input });

      
      dispatch(fetchMenusSuccess(res.data));
      dispatch(addManinShow())
      fetchChatHistory();
      setInput('')
     
      
      
    } catch (error: any) {
      
      dispatch(fetchMenusFailure(error.message));
    }
  
  }

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/chat/history");
      dispatch(getChatHistory(res.data.history));
    
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchChatHistory();
  }, []);
  const handileDeleteHistory=async(id:string|number)=>{
        
    try {
        const res = await axios.delete(`http://localhost:3001/api/v1/chat/delete/${id}`)
        fetchChatHistory();
     
        if (res.data.success) {
          console.log(res.data.message);
      
          fetchChatHistory();
          
        
          
          } else {
            console.log('Failed to delete chat');
             
          }
    } catch (error) {
        console.log(error);
        
        
    }
}

 

  return (
    <div className='flex relative'>
      <SideBar sideBar={sideBar} handileSideBarShow={handileSideBarShow} handileDeleteHistory={handileDeleteHistory}  />
      <Main handileSideBarShow={handileSideBarShow} sideBar={sideBar} setShowSideBar={setsideBar} setInput={setInput} input={input} handilFetchApi={handilFetchApi} />
    </div>
  )
}

export default App
