import  { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addManinShowToTrue, addPreviousDataToMain, handleSideBar } from '../../Redux/chatbotSlice';
import { AppDispatch, RootState } from '../../Redux/store';
import Buttons from '../Buttons/Buttons';




type sideBarTy = {
  
    
    handileDeleteHistory:(params:string|number)=>void
  
}
const SideBar  = React.memo(({  handileDeleteHistory }: sideBarTy) =>{
    const [clickValue,setClickValue] =useState<number>(0)

    const { chatHistory,sideBar } = useSelector((state: RootState) => state.chatRes);
    console.log(sideBar);
    

    const toggleSideBar =()=>{
        dispatch(handleSideBar())
    }
 
    
    const dispatch = useDispatch<AppDispatch>();
  


    const handilMain = () => {
        dispatch(addManinShowToTrue())


    }

    const handilPreviousToMail = (id: number) => {
        dispatch(addPreviousDataToMain(id));
        setClickValue(id)
      };
    
console.log("rerendering");

   
    return (
        <div className={`h-[100vh] w-[200px] sidebarBg py-6 px-3.5 flex-col overflow-y-auto justify-center transform transition-transform duration-300 ease-in-out ${sideBar ? '-translate-x-full  absolute z-10' : ' translate-x-0 absolute z-10'} md:block`}>
            <div className=''>
                <button onClick={toggleSideBar} className='text-white'>
                 
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                </button>
              
            </div>

            <div className="mt-4 mb-4 cursor-pointer text-white">




                <div onClick={handilMain} className="flex gap-1 items-center  justify-center bgc text-white rounded-lg p-4">
                    <h3>New</h3>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </span>
                </div>


            </div>

            <div>
                <ul>
                    {
                       chatHistory  && chatHistory.map((item) => (
                            
                            <li key={item?._id} className={clickValue==item._id? 'bg-zinc-900 rounded-md mb-3 mt-2 text-white hover:bg-zinc-900 p-3 hover:rounded-md cursor-pointer flex justify-between':' text-white hover:bg-zinc-900 p-3 hover:rounded-md cursor-pointer flex justify-between'}>
                                <span onClick={()=>handilPreviousToMail(item._id)}>  {item?.userMessage}</span>
                                
                              
                                <Buttons onClick={()=>handileDeleteHistory(item?._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </Buttons>

                            </li>

                        ))
                    }
                </ul>


            </div>
        </div>

    
    );
})

export default SideBar;
