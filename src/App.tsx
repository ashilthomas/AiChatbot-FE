import Home from './Pages/Home/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Credit from './Pages/Home/Credit';
import { useAuth } from '@clerk/clerk-react';
// Import your Publishable Key


function App(): JSX.Element {

    const { getToken } = useAuth();
    console.log(getToken);
    


  return (
    //creat a router
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credit" element={<Credit />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;