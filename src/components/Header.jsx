// import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
// import { Link, useLocation } from "react-router-dom";

// const Header = () => {
//   const { isSignedIn } = useUser();
//   const location = useLocation()

//   return (
//     <header className="bg-white shadow-md p-4 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-indigo-600">🎬 VideoGen</h1>
//       <div className="space-x-4">
//         {isSignedIn ? (
//           <div className="flex gap-4">
//             <Link to={'/'} className={`${location.pathname === "/" && "font-semibold underline"}`}>Generate Idea</Link>

//             <Link to={'/dashboard'} className={`${location.pathname === "/dashboard" && "font-semibold underline"}`}>Dashboard</Link>
//             <Link to={'/publish'} className={`${location.pathname === "/publish" && "font-semibold underline"}`}>Social Media Publishing</Link>
//             <UserButton afterSignOutUrl="/" />
//           </div>

//         ) : (
//           <>
//             <SignInButton mode="modal">
//               <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-md">
//                 Sign In
//               </button>
//             </SignInButton>
//             <SignUpButton mode="modal">
//               <button className="border border-indigo-500 text-indigo-500 px-4 py-1 rounded-md hover:bg-indigo-50">
//                 Sign Up
//               </button>
//             </SignUpButton>


//           </>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;


import { useState } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Or use any icon library you prefer

const Header = () => {
  const { isSignedIn } = useUser();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-500">🎬 VideoGen</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isSignedIn ? (
            <>
              <Link
                to="/"
                className={location.pathname === "/" ? "font-semibold underline" : ""}
              >
                Generate Idea
              </Link>
              <Link
                to="/dashboard"
                className={location.pathname === "/dashboard" ? "font-semibold underline" : ""}
              >
                Dashboard
              </Link>
              <Link
                to="/publish"
                className={location.pathname === "/publish" ? "font-semibold underline" : ""}
              >
                Social Media Publishing
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
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
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 space-y-3 px-2 pb-4">
          {isSignedIn ? (
            <>
              <Link to="/" onClick={closeMenu} className="block">
                Generate Idea
              </Link>
              <Link to="/dashboard" onClick={closeMenu} className="block">
                Dashboard
              </Link>
              <Link to="/publish" onClick={closeMenu} className="block">
                Social Media Publishing
              </Link>
              <div className="mt-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full border border-indigo-500 text-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-50">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

