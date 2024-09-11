// import React, { useEffect, useState } from 'react'
// import Options from '../options/Options'
// import Buttons from '../Buttons/Buttons';
// import { useSelector } from 'react-redux';
// import { RootState } from "../../Redux/store"
// import { marked } from 'marked';
// import Loading from '../Loading/Loading';
// import SideBar from '../SideBar/SideBar';



// type mainPropes = {
//     sideBar: boolean,
//     handileSideBarShow: () => void;
//     setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>
//     setInput: React.Dispatch<React.SetStateAction<string>>
//     input: string
//     handilFetchApi: () => void
    




// };

// function Main({ handileSideBarShow, setInput, input, handilFetchApi,sideBar }: mainPropes) {

//     const { data, error, loading, chatInput, mainShow } = useSelector((state: RootState) => state.chatRes);




//     const [resolvedHTML, setResolvedHTML] = useState<string>('');







   
//     const keyword: string = ';'; 

//     const convertMarkdownToHTML = async (markdownContent: string | Promise<string>) => {

//         let resolvedContent: string;

//         if (typeof markdownContent === 'string') {
//             resolvedContent = markdownContent;
//         } else {
//             resolvedContent = await markdownContent;
//         }


//         const styledContent = resolvedContent.replace(
//             keyword,
//             `<span style="color: blue; font-weight: bold;">${keyword}</span>`
//         );

  
//         const contentWithMargin = styledContent.replace(/\n/g, `<br/><span style="display: block; margin-left: 20px;"></span>`);

//         return marked(contentWithMargin);
//     };


//     useEffect(() => {
//         if (data?.response) {

//             convertMarkdownToHTML(data.response).then((resolvedHTML) => {
//                 setResolvedHTML(resolvedHTML);
//             });
//         }
//     }, [data?.response]);

  
//     return (
//         <div className='p-6 h-[100vh] relative w-full mainBackground'>

//             <div className='flex justify-between '>
//                 <div className='flex items-center gap-3'>
//                     {
//                        sideBar?"":   <Buttons onClick={handileSideBarShow} className='md:hidden text-white'  >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                         </svg></Buttons>
//                     }

                 
//                     <h2 className='main-text font-semibold text-xl'>Ai ChatBot</h2>
//                 </div>
//                 <button>
//                     <Options />
//                 </button>
//             </div>
//             <div className='w-full max-w-[900px] m-auto  mt-4' >
//                 {




//                     loading ? <Loading /> :

//                         <>
//                             {
//                                 mainShow ? <p className="relative font-sans uppercase text-6xl tracking-widest overflow-hidden bg-gradient-to-r from-black via-white to-black bg-no-repeat bg-80 animate-shine bg-clip-text text-transparent">
//                                     A chatbot awaits, your new trusted friend
//                                 </p>
//                                     :<>

                                     
// <div>
//                                         <span className='flex items-center gap-3 mb-6 bg-slate-100 p-3 rounded-sm'>
//                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                                             </svg>
//                                             <h1>
//                                                 {chatInput}
//                                             </h1>
//                                         </span>
//                                         <div className='h-[500px] overflow-y-auto' >

                                            


//                                             <p className='text-white' dangerouslySetInnerHTML={{ __html: resolvedHTML }}></p>



//                                         </div>

//                                     </div>
//                                     </>
                                    
                          
                                
                                  
//                             }
//                         </>
//                 }



//             </div>
//             <div className=' flex items-center absolute bottom-0 mb-10 left-0 right-0  w-full max-w-[900px]  bg-white m-auto rounded-md'>
//                 <input className='w-[95%] rounded-md p-3 outline-none' type="text" placeholder='Enter your promt.......' value={input} onChange={(e) => setInput(e.target.value)} />
//                 <button onClick={handilFetchApi}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
//                 </svg>
//                 </button>

//             </div>
//         </div>
//     )
// }

// export default Main

import { useEffect, useState } from 'react';
import Options from '../options/Options';
import Buttons from '../Buttons/Buttons';
import { useSelector } from 'react-redux';
import { RootState } from "../../Redux/store";
import { marked } from 'marked';
import Loading from '../Loading/Loading';


type mainPropes = {
  sideBar: boolean;
  handileSideBarShow: () => void;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  handilFetchApi: () => void;
};

function Main({ handileSideBarShow, setInput, input, handilFetchApi, sideBar }: mainPropes) {
  const { data, loading, chatInput, mainShow } = useSelector((state: RootState) => state.chatRes);
//   resolvedHTML
  const [, setResolvedHTML] = useState<string>('');
  const [animatedHTML, setAnimatedHTML] = useState<string>(''); // Store progressively animated HTML content

  const keyword: string = ';';

  const convertMarkdownToHTML = async (markdownContent: string | Promise<string>) => {
    let resolvedContent: string;

    if (typeof markdownContent === 'string') {
      resolvedContent = markdownContent;
    } else {
      resolvedContent = await markdownContent;
    }

    const styledContent = resolvedContent.replace(
      keyword,
      `<span style="color: blue; font-weight: bold;">${keyword}</span>`
    );

    const contentWithMargin = styledContent.replace(/\n/g, `<br/><span style="display: block; margin-left: 20px;"></span>`);

    return marked(contentWithMargin);
  };

  // Split HTML into text and tags
  const splitHTML = (html: string) => {
    const regex = /(<[^>]+>|[^<]+)/g; // Match HTML tags or text
    return html.match(regex) || [];
  };

  // Custom typing effect to reveal HTML content progressively
  const typeHTML = (htmlString: string, speed: number = 50) => {
    const splitContent = splitHTML(htmlString); // Split into tags and text
    let currentIndex = 0;
    let currentHTML = '';

    const interval = setInterval(() => {
      if (currentIndex < splitContent.length) {
        const currentPart = splitContent[currentIndex];
        currentHTML += currentPart; // Add the next chunk of text or HTML tag
        setAnimatedHTML(currentHTML); // Update the displayed content
        currentIndex++;
      } else {
        clearInterval(interval); // Stop the typing effect once complete
      }
    }, speed);
  };

  useEffect(() => {
    if (data?.response) {
      convertMarkdownToHTML(data.response).then((resolvedHTML) => {
        setResolvedHTML(resolvedHTML);
        setAnimatedHTML(''); // Reset animated HTML before typing starts
        typeHTML(resolvedHTML); // Start typing effect
      });
    }
  }, [data?.response]);

  return (
    <div className='p-6 h-[100vh] relative w-full mainBackground'>
      <div className='flex justify-between '>
        <div className='flex items-center gap-3'>
            {
                sideBar?   <Buttons onClick={handileSideBarShow} className=' text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </Buttons>:
          ""
            }
      
       
          <h2 className='main-text font-semibold text-xl'>Ai ChatBot</h2>
        </div>
        <button>
          <Options />
        </button>
      </div>
      <div className='w-full max-w-[900px] m-auto mt-4'>
        {loading ? (
          <Loading />
        ) : (
          <>
            {mainShow ? (
              <p className="relative font-sans uppercase text-6xl tracking-widest overflow-hidden bg-gradient-to-r from-black via-white to-black bg-no-repeat bg-80 animate-shine bg-clip-text text-transparent">
                A chatbot awaits, your new trusted friend
              </p>
            ) : (
              <div>
                <span className='flex items-center gap-3 mb-6 bg-slate-100 p-3 rounded-sm'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <h1>{chatInput}</h1>
                </span>
                <div className='h-[500px] overflow-y-auto'>
                  {/* Render animated HTML content */}
                  <p className='text-white' dangerouslySetInnerHTML={{ __html: animatedHTML }}></p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className='flex items-center absolute bottom-0 mb-10 left-0 right-0 w-full max-w-[900px] bg-white m-auto rounded-md'>
        <input className='w-[95%] rounded-md p-3 outline-none' type="text" placeholder='Enter your prompt.......' value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handilFetchApi}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Main;
