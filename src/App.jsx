import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignInPage from './pages/SignIn';
import VideoIdeaGenerator from './components/VideoIdeaGenerator';
import Header from './components/Header';
import SocialMediaUploadForm from './pages/SocialMediaUploadForm';
import UploadTabs from './components/UploadTabs';

function App() {
  return (
    <>
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
      <Route path="*" element={<SignInPage />} />
    </Routes>
    </>
  );
}

export default App;
