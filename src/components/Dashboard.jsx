import { useUser, SignOutButton } from '@clerk/clerk-react';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName }</h1>
      <SignOutButton>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
      </SignOutButton>
    </div>
  );
};

export default Dashboard;
