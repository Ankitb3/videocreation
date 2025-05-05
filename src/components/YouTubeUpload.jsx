// // import React, { useState } from "react";
// // import axios from "axios";
// // import { FileUpload } from "./ui/file-upload";
// // import { ToastContainer, toast } from "react-toastify";
// // import { Button, Input, Spin } from "antd";

// // function YoutubeUpload() {
// //   const [video, setVideo] = useState(null);
// //   const [title, setTitle] = useState("");
// //   const[loading,setLoading] = useState(false)
// //   const handleAuth = async () => {
// //     const res = await axios.get("http://localhost:4000/auth");
// //     window.open(res.data.url, "_blank");
// //   };

// //   const handleUpload = async () => {
// //     const formData = new FormData();
// //     formData.append("video", video);
// //     formData.append("title", title);

// //     try {
// //       setLoading(true)
// //       const res = await axios.post("http://localhost:4000/upload", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
      
// //       alert("Video uploaded: https://youtube.com/watch?v=" + res.data.videoId);
// //       setLoading(false)
// //     } catch (err) {
// //       setLoading(false)
// //       console.error(err);
// //       alert("Upload failed.");
// //     }
// //   };

// //   return (
// //     <div className="p-4 space-y-4">
// //       <button onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2">
// //         Before Upload Video Authenticate with Google
// //       </button>
      

// //       <div>
// //         <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />

// //       </div>

// //       <div>
       
// //          <Input
// //               placeholder="Title"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               className="m-4"
// //               required
// //             />
            
// //       </div>

// //       <Button
// //               onClick={handleUpload}
// //               loading={loading}
// //             >
// //               {loading ? <Spin /> : 'Upload to YouTube'}
// //             </Button>
// //     </div>
// //   );
// // }

// // export default YoutubeUpload;


// import React, { useRef, useState } from "react";
// import axios from "axios";
// import { Button, Input, Spin, notification } from "antd";

// function YoutubeUpload() {
//   const [video, setVideo] = useState(null);
//   const [title, setTitle] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fileInputRef = useRef(); 

//   const handleAuth = async () => {
//     const res = await axios.get("http://localhost:4000/auth");
//     window.open(res.data.url, "_blank");
//   };

//   const handleUpload = async () => {
    

//     const formData = new FormData();
//     formData.append("video", video);
//     formData.append("title", title);
    
//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:4000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Video uploaded: https://youtube.com/watch?v=" + res.data.videoId);
//       setTitle("");
//       setVideo(null);
//       fileInputRef.current.value = ""; 
//     } catch (err) {
//       alert(err.response.data.error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <button onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2">
//         Before Upload Video Authenticate with Google
//       </button>

//       <div>
//         <input
//           type="file"
//           accept="video/*"
//           onChange={(e) => setVideo(e.target.files[0])}
//           ref={fileInputRef} 
//         />
//       </div>

//       <div className="w-[]">
//         <Input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="m-4"
//           required
//         />
//       </div>

//       <Button onClick={handleUpload} loading={loading}>
//         {loading ? <Spin /> : "Upload to YouTube"}
//       </Button>
//     </div>
//   );
// }

// export default YoutubeUpload;

import React, { useRef, useState } from "react";
import axios from "axios";
import { Button, Input, Spin } from "antd";

function YoutubeUpload() {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(""); 
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleAuth = async () => {
    const res = await axios.get("https://videogenbackend.onrender.com/auth");
    window.open(res.data.url, "_blank");
  };

  const handleUpload = async () => {
    if (!video || !title || !description) {
      alert("Please fill in all fields and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags); 

    try {
      setLoading(true);
      const res = await axios.post("https://videogenbackend-1.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Video uploaded: https://youtube.com/watch?v=" + res.data.videoId);

      setTitle("");
      setDescription("");
      setTags(""); 
      setVideo(null);
      fileInputRef.current.value = "";
    } catch (err) {
      alert(err?.response?.data?.error || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto m-4">
      <button onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
       Once Authenticate with Google
      </button>

      <div >
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          ref={fileInputRef}
        />
      </div>

      <Input
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-2"
        required
      />

      <Input.TextArea
        placeholder="Video Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="mt-2"
        required
      />

      <Input
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="mt-4"
      />
 <div className="flex justify-center">
 <Button onClick={handleUpload} loading={loading}  className="mt-4">
        {loading ? <Spin /> : "Upload to YouTube"}
      </Button>
 </div>
     
    </div>
  );
}

export default YoutubeUpload;
