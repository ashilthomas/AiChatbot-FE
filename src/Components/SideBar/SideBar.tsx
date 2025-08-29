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
<>
  <div
    className={`h-screen fixed top-0 left-0 z-50 md:relative md:z-auto
      flex flex-col border-r themeBorder  transition-[width] duration-300 ease-in-out
      bg-[var(--color-light-bg)] dark:bg-[var(--color-dark-bg)]
      ${sideBar ? "w-72" : "w-16"}
       overflow-hidden
  
    `}
  >
    <div className="w-72 h-full flex flex-col">
      
      {/* Header (pinned top) */}
      <div className="flex items-center justify-between p-2 border-b themeBorder">
        <button
          onClick={toggleSideBar}
          aria-label="Toggle Sidebar"
          className="p-2 rounded-lg themeText hover:bg-dark-muted/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar content (fade in/out) */}
      <div
        className={`flex flex-col flex-1 pt-3 transition-opacity duration-200
                ${
        sideBar ? "opacity-100 delay-200" : "opacity-0"
         }`
            
       }
      >
        {/* New Chat */}
        <div className="mb-4 px-2">
          <button
            onClick={handilMain}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 
              rounded-md bg-gradient-to-r from-gradient-cyanblue to-gradient-cyanblue2
              text-white font-medium shadow-md hover:shadow-lg
              transition-all duration-300 ease-in-out"
          >
            <h3>New Chat</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-2">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full rounded-md px-3 py-2 text-sm 
                bg-dark-muted/20 border border-dark-muted/40
                text-dark-text placeholder-dark-muted
                focus:outline-none focus:ring-2 focus:ring-gradient-cyanblue
                focus:border-transparent transition"
            />
          </form>
        </div>

        {/* Chat History (scrollable) */}
        <div className="flex-1 mt-4 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-muted/40 scrollbar-track-transparent">
          <h2 className="text-sm font-semibold themeText tracking-tight">
            Recent Chats
          </h2>
          <ul className="space-y-2">
            {chatHistory?.map((item) => (
              <li
                key={item?._id}
                className={`flex items-center justify-between p-3 mt-3 rounded-md 
                  border themeBorder themeBG text-sm font-medium cursor-pointer transition-colors
                  ${
                    clickValue === item._id
                      ? "bg-dark-muted/30 themeText"
                      : "themeText hover:bg-dark-muted/20"
                  }`}
              >
                <span
                  onClick={() => handilPreviousToMail(item._id)}
                  className="truncate"
                >
                  {item?.userMessage}
                </span>
                <Buttons
                  onClick={() => handileDeleteHistory(item?._id)}
                  className="ml-2"
                >
                  <div className="rounded-lg iconBg">
                    <Trash className="w-5 h-5" />
                  </div>
                </Buttons>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section (pinned at bottom) */}
        <div className="mt-auto space-y-3 px-2 pb-4">
          {/* Credits */}
          <div className="flex items-center gap-2 p-2 border themeBorder rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Link to="/credit" className="p-2 rounded-lg iconBg">
              <Gem className="w-5 h-5" />
            </Link>
            <div className="flex flex-col">
              <h2 className="text-sm font-medium themeText mb-1">
                Credits: <span className="font-semibold">10</span>
              </h2>
              <p className="text-xs text-[var(--color-dark-muted)]">
                Purchase credits for unlimited chat
              </p>
            </div>
          </div>

          {/* Theme Mode */}
          <div className="flex items-center justify-between p-2 border themeBorder rounded-md shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg iconBg">
                <SunMoon className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-medium themeText">Dark Mode</h2>
            </div>
            <button
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg bg-[var(--color-dark-accent-bg)] text-[var(--color-dark-accent)] hover:scale-105 transition-transform"
            >
              <ThemeProvider />
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 p-2 border themeBorder rounded-md shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2 rounded-lg iconBg">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-medium themeText">Ashil Thomas</h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Main content wrapper */}
</>






    );
})

export default SideBar;

   