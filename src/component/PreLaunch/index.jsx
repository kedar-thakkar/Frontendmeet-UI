import React, { useState }  from "react";
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import "./PreLaunch.css"
function PreLaunch(props){
   const navigate = useNavigate();
   const [audioId,setAudioId]=useState('');
   const [videoId,setVideoId]=useState('');

   const joinPreLaunchHandler=()=>{
      // condtion for the if user not select audio or video 
      if(audioId===""||videoId===""){
         alert("please select devices");     
      }else{
         navigate('/');
      }
   }
    return(
        <>  
            <div className="main_prelaunch">
               <div className="webcam_prelaunch"> 
                  <Webcam style={{width:"30%"}}/>
               </div>

               <div className="audio_video_selection_box">
                  <div className="video_box">
                  <label> video </label>
                  <select onChange={(e)=>setVideoId(e.target.value)}> 
                     <option> 1</option>
                     <option>2</option>
                  </select>
                  </div>
                  <div className="audio_box">
                  <label> audio </label>
                  <select onChange={(e)=>setAudioId(e.target.value)}> 
                     <option>1</option>
                     <option>2</option>
                  </select>
                  </div>
               </div>

               <div className="submit_box">
                  <div className="prelaunch-submit">
                     <button className="btn" onClick={joinPreLaunchHandler}>Join</button>
                  </div>
               </div>

            </div>
        </>
    )
}

export default PreLaunch;