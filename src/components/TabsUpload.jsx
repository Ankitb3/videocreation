
import { Tabs } from "../components/ui/tabs";
import InstagramUpload from "./InstagramUpload";
import YoutubeUpload from "./YouTubeUpload";

export function TabsDemo() {
  const tabs = [
    {
      title: "YouTube Shorts",
      value: "YouTube",
      content: (
        <div
          className="w-full overflow-hidden relative bottom-20 h-full rounded-2xl p-10 text-xl md:text-2xl font-bold text-white border border-2 bg-blue-300">
          <p>YouTube Shorts</p>
          <YoutubeUpload/>
        </div>
      ),
    },
    {
      title: "Instagram Shorts",
      value: "Instagram",
      content: (
        <div
          className="w-full overflow-hidden relative bottom-20 h-full rounded-2xl p-10 text-xl md:text-2xl font-bold text-white border bg-blue-300">
          <p>Instagram Shorts</p>
          <InstagramUpload/>
        </div>
      ),
    },
   
   
    
  ];

  return (
    <div
      className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}


