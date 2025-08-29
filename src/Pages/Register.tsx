import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { LogIn, LogOut } from 'lucide-react';

function Register() {
  return (
    <div>
      <header className='flex items-center gap-3'>

        {/* Show Sign In when user is signed out */}
        <SignedOut>
          <SignInButton>
            <button className='cursor-pointer flex items-center'>
              <LogIn />
              <span className="ml-2">Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>

        {/* Show Sign Out when user is signed in */}
        <SignedIn>
          <SignOutButton>
               <button className='cursor-pointer flex items-center gap-2 justify-between w-full bg-amber-400'>
             <LogOut />
             <button>Sign out</button>

            </button>
           
          </SignOutButton>

          {/* Optional: Show user profile button */}
       
        </SignedIn>

      </header>
    </div>
  )
}

export default Register
