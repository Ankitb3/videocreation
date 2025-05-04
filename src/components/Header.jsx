import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { isSignedIn } = useUser();
  const location = useLocation()

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">🎬 VideoGen</h1>
      <div className="space-x-4">
        {isSignedIn ? (
          <div className="flex gap-4">
             <Link to={'/publish'} className={`${location.pathname === "/publish" && "font-semibold underline"}`}>Social Media Publishing</Link>
                    <UserButton afterSignOutUrl="/" />

          
          </div>
          
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="border border-indigo-500 text-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-50">
                Sign Up
              </button>
            </SignUpButton>

           
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
