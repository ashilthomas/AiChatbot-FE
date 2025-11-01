import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../Redux/store";
import { marked } from 'marked';
import Loading from '../Loading/Loading';
import { handleInputs } from '../../Redux/chatbotSlice';

type mainProps = {
  handleFetchApi: () => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setChatOrImg: React.Dispatch<React.SetStateAction<string>>;
  chatOrImg: string;
};

function Main({ handleKeyDown, handleFetchApi,setChatOrImg, chatOrImg }: mainProps) {
  const { data, loading, chatInput, mainShow, input } = useSelector((state: RootState) => state.chatRes);
    // local image loading state (so spinner shows until image finishes downloading)
  const [imgLoaded, setImgLoaded] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [, setResolvedHTML] = useState<string>('');
  const [animatedHTML, setAnimatedHTML] = useState<string>('');

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

  const splitHTML = (html: string) => {
    const regex = /(<[^>]+>|[^<]+)/g;
    return html.match(regex) || [];
  };

  const typeHTML = (htmlString: string, speed: number = 50) => {
    const splitContent = splitHTML(htmlString);
    let currentIndex = 0;
    let currentHTML = '';

    const interval = setInterval(() => {
      if (currentIndex < splitContent.length) {
        const currentPart = splitContent[currentIndex];
        currentHTML += currentPart;
        setAnimatedHTML(currentHTML);
        currentIndex++;
      } else {
        clearInterval(interval);
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
    // Reset image loading state when new data arrives
    if (data?.type === "image") {
      setImgLoaded(false);
    }
  }, [data?.response, data?.type]);

return (
  <div className="p-6 h-screen relative w-full flex flex-col">
    {/* Header */}

    {/* Chat Section */}
    <div className="flex-1 w-full max-w-[900px] mx-auto mt-6">

      { loading? <Loading/>:

      mainShow ? (
        <div className="flex mt-10 justify-center h-full text-center">
          <h1 className="font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-tight">
            <span className="block text-[var(--color-dark-text)]">
              Your Personal
            </span>
            <span className="block bg-gradient-to-r from-[var(--color-dark-accent)] to-[var(--color-dark-accent2)] bg-clip-text text-transparent">
              AI ChatBot
            </span>
          </h1>
        </div>
      ) : (
        <div className="w-full">
          {/* User Query Bubble */}
          <span className="flex items-center gap-3 mb-6 bg-[var(--color-dark-accent2)] p-3 rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 text-[var(--color-dark-accent)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <h1 className="text-[var(--color-dark-text)]">{chatInput}</h1>
          </span>

          {/* Bot Response */}
          <div className="h-[470px] overflow-y-auto no-scrollbar px-1">
          {
            loading &&  <Loading/>
}

            {data?.type === "chat" && (
              <p
                className="themeText leading-relaxed"
                dangerouslySetInnerHTML={{ __html: animatedHTML }}
              ></p>
            )}

            {data?.type === "image" && (
              <div className="flex justify-center relative">
                {loading || !imgLoaded ? (
                  <Loading />
                ) : null}
                {data.image && (
                  <img
                    src={data.image}
                    alt="AI generated"
                    className={`max-h-[400px] rounded-lg shadow-md transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                    onError={() => setImgLoaded(true)} // Show image even if error occurs
                  />
                )}
              </div>
            )}


          </div>
        </div>
      )}
    </div>

    {/* Input Box */}
    <div className="absolute bottom-8 left-0 right-0 mx-auto w-full max-w-[600px] flex items-center border themeInput rounded-full shadow-sm focus-within:ring-2 focus-within:ring-[var(--input-dark-border-focus)] transition">
      <div>
        <select
          value={chatOrImg}
          onChange={(e) => setChatOrImg(e.target.value)}
          className="ml-3 bg-transparent outline-none text-sm themeText"
        >
          <option value="chat">Chat</option>
          <option value="image">Image</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Enter your prompt..."
        value={input}
        onChange={(e) => dispatch(handleInputs(e.target.value))}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent rounded-full px-4 py-3 themeInputText placeholder-[var(--input-dark-placeholder)] focus:outline-none text-sm"
      />
      <button
        onClick={handleFetchApi}
        className="text-white rounded-full p-2 m-2 bg-[var(--color-dark-accent2)] cursor-pointer hover:opacity-90 transition"
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
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  </div>
);

}

export default React.memo(Main);