import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Alert</h3>
        <p className="text-sm text-gray-700">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();

  // Automatically show alert if not signed in


  if (!isSignedIn) {
    return (
      <>
       

        {/* Placeholder content or a button for login */}
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-700">You must be signed in to access this page.</p><br/>
          <div className="text-gray-700"> Click to Sign In <SignInButton mode="modal">
              <button className="underline cursor-pointer text-gray-700">
                Sign In
              </button>
            </SignInButton></div>
        </div>
       
      </>
    );
  }

  return children; // Render children if signed in
};

export default ProtectedRoute;
