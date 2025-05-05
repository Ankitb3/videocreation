import React, { useState } from 'react';
import { Tabs, Input,Button, Spin, notification, Alert } from 'antd';
import InstagramUpload from '../components/InstagramUpload';
import { FileUpload } from './ui/file-upload';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import YoutubeUpload from './YouTubeUpload';
import { TabsDemo } from './TabsUpload';

const { TabPane } = Tabs;

const UploadTabs = () => {
 

 

  return (
    <>
    <TabsDemo/>
    {/* <Tabs defaultActiveKey="1" centered>
       <TabPane tab="YouTube Shorts" key="1">
        <YoutubeUpload/>
       

      </TabPane>
      <TabPane tab="Instagram Reels" key="2"> <div className='flex justify-center'><div className='w-[50%]'>      <Alert message="Currently instagram upload not works" type="error" />
</div></div>
       <InstagramUpload/>
      </TabPane>
     
    </Tabs> */}
    </>

  );
};

export default UploadTabs;
