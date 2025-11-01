import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/store.ts'
 import { ClerkProvider } from '@clerk/clerk-react'

  const PUBLISHABLE_KEY :string = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YnJpZWYtbWFzdG9kb24tNTEuY2xlcmsuYWNjb3VudHMuZGV2JA"

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


console.log(PUBLISHABLE_KEY);

createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
 <App />
     </ClerkProvider>
   
  </StrictMode>,
  </Provider>
)
