import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignInPage from './pages/SignIn';
import VideoIdeaGenerator from './components/VideoIdeaGenerator';
import Header from './components/Header';
import SocialMediaUploadForm from './pages/SocialMediaUploadForm';
import UploadTabs from './components/UploadTabs';
import ContentDashboard from './pages/Dashboard';
import { AnimatedGridPattern } from './components/magicui/animated-grid-pattern';
import { cn } from './lib/utils';

function App() {
  return (
    <>
     <div className="absolute top-0 left-0 w-full min-h-screen overflow-hidden -z-10">
  <AnimatedGridPattern
    numSquares={30}
    maxOpacity={0.1}
    duration={3}
    repeatDelay={1}
    className={cn(
      "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
      "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
    )}
  />
</div>

    <Header/>
    
    <Routes>
      
      <Route
      path="/"
      element={
    <ProtectedRoute>
      <VideoIdeaGenerator />
    </ProtectedRoute>
  }
/> <Route
      path="/publish"
      element={
    <ProtectedRoute>
      <UploadTabs />
    </ProtectedRoute>
  }
/>
<Route
      path="/dashboard"
      element={
    <ProtectedRoute>
      <ContentDashboard />
    </ProtectedRoute>
  }
/>

      <Route path="*" element={<SignInPage />} />
    </Routes>
    </>
  );
}

export default App;
