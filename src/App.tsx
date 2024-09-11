import { useEffect } from 'react'
import Main from './Components/Main/Main'
import SideBar from './Components/SideBar/SideBar'
import './App.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './Redux/store'
import { addInput, addManinShow, fetchMenusFailure, fetchMenusStart, fetchMenusSuccess, getChatHistory } from './Redux/chatbotSlice'

function App() {
  const {  input} = useSelector((state: RootState) => state.chatRes);
  const dispatch = useDispatch<AppDispatch>();
  const handilFetchApi = async () => {
    try {
      dispatch(fetchMenusStart());
      dispatch(addInput(input))
      const res = await axios.post("http://localhost:3001/api/v1/chat/apireq", { message: input });
      dispatch(fetchMenusSuccess(res.data));
      dispatch(addManinShow())
      fetchChatHistory();
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
  const handileDeleteHistory = async (id: string | number) => {

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handilFetchApi();
    }
  };


  return (
    <div className='flex relative w-full'>
      <SideBar handileDeleteHistory={handileDeleteHistory} />
      <Main   handleKeyDown={handleKeyDown} handilFetchApi={handilFetchApi} />
    </div>
  )
}

export default App
