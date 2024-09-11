
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
};

const initialState: ChatApiState = {
  loading: false,
  data: null, 
  error: null,
  chatInput:"",
  mainShow:true,
  chatHistory:[]

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
        state.chatHistory = action.payload; // Replace history with new data
      },
      addPreviousDataToMain: (state, action: PayloadAction<number>) => {
        const selectedChat = state.chatHistory.find((val) => val._id === action.payload); // Find the chat item
        if (selectedChat) {
          state.chatInput = selectedChat.userMessage;
          state.data = { response: selectedChat.aiResponse }; 
          state.mainShow = false
        }
      }
 

  },
});

export const { fetchMenusStart, fetchMenusSuccess, fetchMenusFailure,addInput,addManinShow,addManinShowToTrue,getChatHistory,addPreviousDataToMain} = chatbotSlice.actions;
export default chatbotSlice.reducer;
