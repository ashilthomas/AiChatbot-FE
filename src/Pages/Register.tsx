import React, { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react';
import { LogIn, LogOut } from 'lucide-react';

function Register() {
  const [hover, setHover] = useState(false);
   const { user } = useUser();
  return (
    <div>
      <header className='flex items-center gap-3'>

        {/* Show Sign In when user is signed out */}
        <SignedOut>
          <SignInButton>
            <button className='cursor-pointer flex items-center' >
              <LogIn />
              <span className="ml-2">Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>





        <SignedIn>
          <SignOutButton>
            <button className='cursor-pointer flex items-center gap-2 justify-between w-full ' onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
                <div className='flex items-center gap-2'>
                  <img className='w-8 h-8 rounded-full' src={user?.imageUrl} alt="" />
                     <h2 className="text-sm font-medium themeText">{user?.fullName}</h2>
                </div>
           



              {hover &&
                <LogOut className="w-5 h-5" />

              }



            </button>

          </SignOutButton>



        </SignedIn>

      </header>
    </div>
  )
}

export default Register
