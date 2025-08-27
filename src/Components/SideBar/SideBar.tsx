import { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addManinShowToTrue, addPreviousDataToMain, handleSideBar } from '../../Redux/chatbotSlice';
import { AppDispatch, RootState } from '../../Redux/store';
import Buttons from '../Buttons/Buttons';
import { Gem, Moon, SunMoon, Trash, User } from 'lucide-react';
import ThemeProvider from '../ThemeProvider/ThemeProvider';
import { Link } from 'react-router-dom';




type sideBarTy = {

    handileDeleteHistory: (params: string | number) => void

}

const SideBar = React.memo(({ handileDeleteHistory }: sideBarTy) => {
    const [clickValue, setClickValue] = useState<number>(0)

    const { chatHistory, sideBar } = useSelector((state: RootState) => state.chatRes);




    const toggleSideBar = () => {
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




    return (
        <div
            className={`h-screen   border-r themeBorder flex flex-col transition-all duration-300 ease-in-out
  ${sideBar ? 'w-[300px] px-4 py-6' : 'hidden'} md:w-[300px] md:px-4 md:py-6`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold themeText tracking-tight">AiChat Bot</h2>
                <button
                    onClick={toggleSideBar}
                    className="p-2 rounded-lg hover:bg-dark-muted/20 themeText transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </div>

            {/* New Chat Button */}
            <div className="mb-6">
                <div
                    onClick={handilMain}
                    className="bg-gradient-to-r from-gradient-cyanblue to-gradient-cyanblue2 flex gap-2 items-center justify-center rounded-md py-3 px-4 text-white font-medium cursor-pointer shadow-md hover:shadow-lg transition-all"
                >
                    <h3>New Chat</h3>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>

            </div>
            <div>
                <form onSubmit={(e) => e.preventDefault()} className="w-full">
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full rounded-md bg-dark-muted/20 border border-dark-muted/40 px-3 py-2 text-sm text-dark-text placeholder-dark-muted focus:outline-none focus:ring-2 focus:ring-gradient-cyanblue focus:border-transparent transition"
                    />
                </form>
            </div>

            {/* Chat History */}

            <div className="flex-1 mt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-muted/40 scrollbar-track-transparent">
                <h2 className='text-sm font-semibold themeText tracking-tight'>Recent chats</h2>

                <ul className="space-y-2">
                    {chatHistory &&
                        chatHistory.map((item) => (
                            <li
                                key={item?._id}
                                className={`flex items-center justify-between p-3 mt-3 themeBG border themeBorder rounded-md text-sm font-medium cursor-pointer transition-colors
            ${clickValue === item._id
                                        ? 'bg-dark-muted/30 themeText'
                                        : 'themeText hover:bg-dark-muted/20'
                                    }`}
                            >
                                <span  onClick={() => handilPreviousToMail(item._id)} className="truncate ">
                                    {item?.userMessage}
                                </span>

                                <Buttons onClick={() => handileDeleteHistory(item?._id)} className="ml-2">
                               
                                     <div className=" rounded-lg iconBg">
                            <Trash className="w-5 h-5"  />
                        </div>
                                </Buttons>
                            </li>
                        ))}
                </ul>
            </div>
            <div className="space-y-3">
                {/* Credits Card */}
              
                <div className="flex items-center gap-2 border themeBorder p-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      
                    <div className="p-2 rounded-lg iconBg">
                        <Link to="/credit">
                        <Gem className="w-5 h-5" />
                           </Link>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-sm font-medium themeText mb-1">
                            Credits: <span className="font-semibold">10</span>
                        </h2>
                        <p className="text-xs text-[var(--color-dark-muted)]">
                            Purchase credits for unlimited chat
                        </p>
                    </div>   
                 
                </div>
             

                {/* Theme Mode Card */}
                <div className="flex items-center justify-between border themeBorder  p-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg iconBg">
                            <SunMoon className="w-5 h-5" />
                        </div>
                        <h2 className="text-sm font-medium themeText">
                            Dark Mode
                        </h2>
                    </div>

                    <button className="p-2 rounded-lg bg-[var(--color-dark-accent-bg)] text-[var(--color-dark-accent)] cursor-pointer hover:scale-105 transition-transform">
                       <ThemeProvider/>
                    </button>
                </div>

                {/* Profile Card */}
                <div className="flex items-center gap-3 border themeBorder p-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-2 rounded-lg iconBg">
                        <User className="w-5 h-5" />
                    </div>
                    <h2 className="text-sm font-medium themeText">
                        Ashil Thomas
                    </h2>
                </div>
            </div>

        </div>



    );
})

export default SideBar;
