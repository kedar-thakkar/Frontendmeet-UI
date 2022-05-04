import React, { useEffect, useState }  from "react";
import './Meeting.css';
import Navbar from "../Navbar";
import {useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import $ from 'jquery';
function Meeting(props){
    const location =useLocation()
    const params = new URLSearchParams(window.location.search);
    params.get('username');
    const username =params.get('username');
    const UserEmail=params.get('email');
    const RoomName=params.get('roomname');
    let connection;
    const [domain,setdomain]=useState('connect.frontendarmy.com')

    /* global $, JitsiMeetJS */
    const navigate = useNavigate();
    
    const startMeetingHandler=(props)=>{  

        var options = {
            roomName: RoomName,
            width: '100%',
            height: ($(window).height()-9) +'px',
            parentNode: undefined,
            configOverwrite: {
                hideAddRoomButton: true
            },
            userInfo: {
                email: UserEmail,
                displayName: username
            },
            interfaceConfigOverwrite: {
                // SHOW_JITSI_WATERMARK: false,
                TOOLBAR_BUTTONS: 
                    [ 
                    'camera',
                    'chat',
                    'closedcaptions',  
                    'desktop',     
                    'fullscreen',
                    'microphone',
                    'participants-pane',
                    'hangup',
                    'security',
                    'select-background',
                    'tileview',
                    'security',
                    'select-background',
                    'mute-everyone',
                ]
            }
        }
        connection = new window.JitsiMeetExternalAPI(domain, options);
        connection.addListener("videoConferenceLeft", (event) => {
            $( "iframe[id^='jitsiConferenceFrame']" ).remove();
            window.close();
        });     
    }
    useEffect(()=>{
        if(window.JitsiMeetExternalAPI){
            startMeetingHandler();
        }
        else{
            alert("something went wrong")
        }
    })


    const readyClosehandler=()=>{
        // console.log("readyClosehandler")
    }
    
    const participantLeftHandler=()=>{
        // console.log("participantLeftHandler")
    }

    const joinHandler=()=>{
        // console.log("joinHandler");
    }

    const conferenceJoinHandler=()=>{
        // console.log("conferenceJoinHandler");
    }

    const conferenceLefHandler=()=>{
        // console.log("conferenceLefHandler");
    }

    const audioMuteStatusChanged=()=>{
        // console.log("audioMuteStatusChanged");
    }

    const videoMuteStatusChangedHandler=()=>{
        // console.log("videoMuteStatusChangedHandler")
    }
    return(
        <>
         
        </> 
    )
}


export default Meeting