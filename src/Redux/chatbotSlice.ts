
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { aiChatHistoryts } from '../Types/utils';



type ChatApiResponse = {
  response: string;
};

type ChatApiState = {
  loading: boolean;
  data: ChatApiResponse | null;
  error: string | null;
  chatInput:string,
  mainShow:boolean
  chatHistory:aiChatHistoryts[]
  sideBar:boolean
  input:string
};

const initialState: ChatApiState = {
  loading: false,
  data: null, 
  error: null,
  chatInput:"",
  mainShow:true,
  chatHistory:[],
  sideBar:true,
  input:""

};

const chatbotSlice = createSlice({
  name: 'chatRes',
  initialState,
  reducers: {
    fetchMenusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMenusSuccess: (state, action: PayloadAction<ChatApiResponse>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      state.mainShow=false
      state.input =""

    },
    fetchMenusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addInput:(state, action: PayloadAction<string>)=>{
        state.chatInput = action.payload
    },
    addManinShow:(state)=>{
        state.mainShow = false
       
        
    },
    addManinShowToTrue:(state)=>{
        state.mainShow = true
        state.data = null;
    },


    getChatHistory: (state, action: PayloadAction<aiChatHistoryts[]>) => {
        state.chatHistory = action.payload; 
      },
      addPreviousDataToMain: (state, action: PayloadAction<number>) => {
        const selectedChat = state.chatHistory.find((val) => val._id === action.payload); 
        if (selectedChat) {
          state.chatInput = selectedChat.userMessage;
          state.data = { response: selectedChat.aiResponse }; 
          state.mainShow = false
        }
      },
      handleSideBar:(state)=>{
        state.sideBar =  !state.sideBar
      },
      handleInputs:(state,action: PayloadAction<string>)=>{
        state.input = action.payload

      }
 

  },
});

export const { fetchMenusStart, fetchMenusSuccess, fetchMenusFailure,addInput,addManinShow,addManinShowToTrue,getChatHistory,addPreviousDataToMain,handleSideBar,handleInputs} = chatbotSlice.actions;
export default chatbotSlice.reducer;
