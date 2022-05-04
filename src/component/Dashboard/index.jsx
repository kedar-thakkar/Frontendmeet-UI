import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import Navbar from '../Navbar';
import './Dashboard.css';
import search from "../../assets/img/search_icon.svg";
import CreateMeeting from '../CreateMeeting';
import { Link ,} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import ViewMeeting from '../ViewMeeting';
import DeleteMeeting from '../DeleteMeeting';
import { MeetingView } from "../../service/auth.services";
import { DashboardMeetingHandler,viewMeetingID } from '../../service/auth.services';
import DatePicker from "react-datepicker";
import { color } from '../../utils/data';
import { event } from 'jquery';
import moment from 'moment';
const handlechange=()=>color[Math.floor(Math.random() * color.length)]; 
function Dashboard() {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedTitle,setSelectedTitle]=useState(null);
    const [selectViewId,setSelectViewId]=useState(null);
    const [roomName,setviewRoomName]=useState(null);
    // date for numeric date 
    const [currentdate, setCurrentdate] = useState('');
    // day  for "days"
    const [currentDay,setCurrentDay]=useState('');
    const [editMeeting,setEditMeeting]=useState(false);
    const [selectEditId,setSelectEditId]=useState('');
    const [meetingList, setMeetingList] = useState([]);
    const [selectDate,setSelectDate]=useState(new Date());
    const [serchText,setSerchText]=useState(null);
    const [dataNotFound,setDataNotFound]=useState('');
    const [userName,setUserName]=useState('');
    const [userEmail,setUserEmail]=useState('');
    const [viewData,setViewData]=useState('');
    const [todayText,setTodayText]=useState(false);
    const [editData,setEditData]=useState('');
    const [TomorrowText,setTomorrowText]=useState(false);
    const [hostemail,sethostemail]=useState('');

    useEffect(() => {
        const currentdateHandler = selectDate.toLocaleDateString('en-US', {day:"numeric"});
        const currentDayHandler=selectDate.toLocaleDateString('en-US',{weekday:"short"});
        const TodayDate= new Date().toLocaleDateString('en-US',{
            day:"numeric"
        });

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes()
        let currentTime = new Date().getHours() + ':' + new Date().getMinutes();

        if(TodayDate===currentdateHandler){
            setTodayText(true);
        }

        setCurrentdate(currentdateHandler);
        setCurrentDay(currentDayHandler);
        DashboardMeeting(new Date());

       

    },[])

    const compareTime=(enddate)=>{
        const Minutes= `${new Date().getMinutes() < 10 ? '0': ''}${new Date().getMinutes()}`;
        const hours = new Date().getHours();
        const timing= hours+':'+Minutes
        const datetime=new Date();
        let year = datetime.getFullYear();
        let month = datetime.getMonth() + 1;
        let date = datetime.getDate();
        let hour = datetime.getHours();
        let minutes = datetime.getMinutes();
        let seconds = datetime.getSeconds();
        if (month < 10) {
            month = "0" + month;
          }
          if (date < 10) {
            date = "0" + date;
          }
          if (hour < 10) {
            hour = "0" + hour;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          } else {
            seconds = parseInt(seconds);
            seconds = seconds.toFixed(3);
          }
          if (seconds === "0.000") {
            seconds = "00.00";
          }


        let selected_end_time =
        year +
        "-" +
        month +
        "-" +
        date +
        "T" +
        hour +
        ":" +
        minutes +
        ":" +
        seconds;

        if(enddate >selected_end_time){
            return true 
        }else{
            return false
        }
    }


    const deleteHandler=(id,title)=>{
        setSelectedId(id);
        setSelectedTitle(title);
    }

    const viewHandler=async(id,hostemail,roomname)=>{
        setSelectViewId(id);
        const response = await MeetingView(id);
        setViewData(response.data.data);
        setviewRoomName(roomname);
        sethostemail(hostemail);
    }
    
    
    const editHandler=async(id)=>{
        setEditMeeting(true);
        const response = await viewMeetingID(id);
        setEditData(response.data);
        setSelectEditId(id)
    }

    const SearchData=(e)=>{
        const SerchData= e.target.value;
        if(SerchData && SerchData.length >=3){
            DashboardMeeting(selectDate,SerchData);
        }
        if(SerchData.length ==0){
            DashboardMeeting(selectDate,null);
        }
    }

    const DashboardMeeting = async (date,serchData) => {
        setMeetingList("");
        var userId = localStorage.getItem('userId');
        var data = {
            "userId": userId,
            "search": serchData,
            "meetingDate": new Date(date).toLocaleDateString('en-CA')
        }
        setDataNotFound('')
        const response = await DashboardMeetingHandler(data);
        if(response.data && response.data.data.length > 0){
            setMeetingList(response.data.data);
        }else {
            setDataNotFound('No Meeting Found');
        }
    }
    const selectedDateHandler=(date)=>{
        DashboardMeeting(date);
        setSelectDate(date);
        const currentdateHandler = date.toLocaleDateString('en-US', {day:"numeric"});
        const currentDayHandler=date.toLocaleDateString('en-US',{weekday:"short"});
        const TodayDate= new Date().toLocaleDateString('en-US',{
            day:"numeric"
        });
        const TomorrowDate=new Date().getDate()+1;
       

        if(TodayDate===currentdateHandler){
            setTodayText(true);
            setTomorrowText(false);
        }
       else if(TomorrowDate==currentdateHandler){
            setTomorrowText(true);
            setTodayText(false);
        }else{
            setTodayText(false);
            setTomorrowText(false);
        }

        setCurrentdate(currentdateHandler);
        setCurrentDay(currentDayHandler);
    }

    

    const childToParent=()=>{
        DashboardMeeting(selectDate)
    }


    // get user name form the navbar as child to parent
    const dataUsername=(data)=>{
        setUserName(data);
    }
    // gwt user email id from child (navbar);
    const dataUserEmail=(data)=>{
        setUserEmail(data);
    }

    const editmeeting=()=>{
        setEditMeeting(false);
    }


    const UpdateIdView=(Id)=>{
        viewHandler(Id);
    }

    

    return (
        <>
            <Navbar username={dataUsername} userEmailId={dataUserEmail}/>
            <CreateMeeting  editmeeting={editMeeting} editMeetingId={selectEditId}  HostEmailId={userEmail} parentMethod={childToParent} EditMeetingFalse={editmeeting} response={editData}/>
            <div className="meeting_section">
                <div className="wrapper">
                    <div className="metting_head">
                        <div className="headding">
                            <h2>Meeting</h2>
                        </div>
                        <div className="right_meet_section">
                            <div className="meet_calender">
                                 <DatePicker selected={selectDate}  dateFormat="dd-MM-yyyy" onSelect={(date) => selectedDateHandler(date)} />
                            </div>
                            <div className="search_box">
                                <input type="text" placeholder="Search Meeting" onChange={SearchData} 
                                />
                                <button className="search_icon">
                                    <img src={search} alt="" />
                                </button>
                            </div>
                            <a className="arrow_btn" data-bs-toggle="modal" onClick={()=>setEditMeeting(false)} data-bs-target="#createmeeting">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                                    <g fill="none" fillRule="evenodd">
                                        <g fill="#FFF" fillRule="nonzero">
                                            <g>
                                                <g>
                                                    <g>
                                                        <g>
                                                            <path d="M36 24.714L31.714 24.714 31.714 29 30.286 29 30.286 24.714 26 24.714 26 23.286 30.286 23.286 30.286 19 31.714 19 31.714 23.286 36 23.286z" transform="translate(-1045 -139) translate(282 120) translate(1) translate(736)" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                Add
                            </a>
                        </div>
                    </div>
                    {/*  */}
                    <div className="meeting_list_otr">
                        <div className="date_info_main">
                            <div className="date_info_suport_bar orange">
                                <h5>{currentDay}</h5>
                                <strong>{currentdate}</strong>
                                {todayText && <h3>Today</h3>}
                                {TomorrowText && <h3>Tomorrow</h3>}
                            </div>
                                <div className="date_info_box">
                                {meetingList &&  meetingList.length > 0 && meetingList.map((meeting, i) => (
                                    
                                    <div className="date_info_box_left" key={`daily_standup-${i}`}>
                                        <div className={`daily_standup  ${color[i%color.length]}`}>
                                            <h6>{meeting?.meetingTitle}</h6>
                                        </div>
                                        <div className="mail_box_main">
                                            <div className="mail_box_info">
                                                {meeting?.user && meeting?.user &&
                                                    <p> <strong>Host:</strong> {meeting?.user?.name} </p>
                                                }
                                            </div>
                                        </div>
                                        <div className="time_hour_info">
                                            <div className="time_info">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.27985 0.0189325C5.73431 0.170303 4.30587 0.739883 3.05344 1.70416C2.44353 2.17374 1.65148 3.05623 1.19376 3.77612C0.996085 4.08703 0.611282 4.87487 0.473434 5.25085C0.319307 5.67128 0.155036 6.31376 0.0741992 6.81229C-0.0247331 7.42247 -0.0247331 8.58097 0.0741992 9.19115C0.214082 10.0537 0.435364 10.7511 0.814125 11.5231C1.22795 12.3665 1.65824 12.9643 2.34729 13.6532C3.03637 14.3421 3.63435 14.7723 4.47794 15.1861C5.25011 15.5647 5.94758 15.786 6.81036 15.9258C7.42067 16.0247 8.57943 16.0247 9.18974 15.9258C10.0525 15.786 10.75 15.5647 11.5222 15.1861C12.3657 14.7723 12.9637 14.3421 13.6528 13.6532C14.3419 12.9643 14.7721 12.3665 15.186 11.5231C15.5693 10.7418 15.7935 10.0312 15.9267 9.1755C16.0244 8.54795 16.0244 7.45549 15.9267 6.82794C15.7935 5.97224 15.5693 5.26168 15.186 4.48038C14.7721 3.63699 14.3419 3.03914 13.6528 2.35021C12.9637 1.66131 12.3657 1.23112 11.5222 0.817383C10.7507 0.439051 10.0395 0.213341 9.20539 0.08216C8.7452 0.00979267 7.71762 -0.0239495 7.27985 0.0189325ZM8.6262 1.11734C11.356 1.36652 13.7038 3.23152 14.5624 5.83273C15.6572 9.14955 14.1074 12.7561 10.943 14.2556C7.76862 15.7598 3.97172 14.6197 2.09902 11.6001C0.434863 8.91667 0.859458 5.3739 3.11555 3.1183C4.57227 1.66191 6.58516 0.931005 8.6262 1.11734ZM7.6087 3.21471C7.49471 3.24826 7.3624 3.36733 7.28808 3.50324C7.23686 3.59695 7.23301 3.77515 7.23301 6.06107C7.23301 7.41248 7.24356 8.55584 7.25649 8.60185C7.28764 8.7129 7.42061 8.86759 7.54198 8.93404C7.6314 8.98297 7.83117 8.98854 9.81589 8.99733C11.0126 9.00266 12.065 8.99821 12.1546 8.98747C12.6917 8.92303 12.8633 8.30875 12.4337 7.98801C12.349 7.92478 12.306 7.92315 10.338 7.90782L8.32878 7.89217L8.31312 5.71676C8.30185 4.15091 8.2873 3.52383 8.26122 3.47876C8.20348 3.3791 8.08683 3.28219 7.96148 3.22986C7.83384 3.17652 7.75053 3.17295 7.6087 3.21471Z" fill="black" />
                                                </svg>

                                                <span>{meeting.startMeetingTime} - {meeting.endMeetingTime}</span>
                                            </div>
                                            <div className="hour_info">
                                                <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.5" d="M4.29877 0.9375C4.17445 0.9375 4.05522 0.986886 3.96731 1.07479C3.8794 1.1627 3.83002 1.28193 3.83002 1.40625C3.83002 1.53057 3.8794 1.6498 3.96731 1.73771C4.05522 1.82561 4.17445 1.875 4.29877 1.875H7.11127C7.23559 1.875 7.35482 1.82561 7.44272 1.73771C7.53063 1.6498 7.58002 1.53057 7.58002 1.40625C7.58002 1.28193 7.53063 1.1627 7.44272 1.07479C7.35482 0.986886 7.23559 0.9375 7.11127 0.9375H4.29877ZM5.70502 5.15625C5.82934 5.15625 5.94857 5.20564 6.03647 5.29354C6.12438 5.38145 6.17377 5.50068 6.17377 5.625V8.4375C6.17377 8.56182 6.12438 8.68105 6.03647 8.76896C5.94857 8.85686 5.82934 8.90625 5.70502 8.90625C5.5807 8.90625 5.46147 8.85686 5.37356 8.76896C5.28565 8.68105 5.23627 8.56182 5.23627 8.4375V5.625C5.23627 5.50068 5.28565 5.38145 5.37356 5.29354C5.46147 5.20564 5.5807 5.15625 5.70502 5.15625ZM11.33 8.4375C11.33 11.5439 8.81142 14.0625 5.70502 14.0625C2.59861 14.0625 0.0800171 11.5439 0.0800171 8.4375C0.0800171 5.33109 2.59861 2.8125 5.70502 2.8125C8.81142 2.8125 11.33 5.33109 11.33 8.4375ZM10.3925 8.4375C10.3925 5.84859 8.29392 3.75 5.70502 3.75C3.11611 3.75 1.01752 5.84859 1.01752 8.4375C1.01752 11.0264 3.11611 13.125 5.70502 13.125C8.29392 13.125 10.3925 11.0264 10.3925 8.4375ZM10.7244 2.94984C10.6812 2.90507 10.6294 2.86936 10.5722 2.8448C10.515 2.82023 10.4535 2.8073 10.3913 2.80676C10.3291 2.80622 10.2673 2.81808 10.2097 2.84165C10.1521 2.86522 10.0998 2.90002 10.0558 2.94403C10.0118 2.98805 9.97695 3.04038 9.95338 3.09799C9.92981 3.1556 9.91795 3.21732 9.91849 3.27956C9.91903 3.3418 9.93196 3.40331 9.95653 3.4605C9.9811 3.51769 10.0168 3.56942 10.0616 3.61266L10.9991 4.55016C11.0426 4.59368 11.0943 4.62819 11.1512 4.65174C11.2081 4.67528 11.2691 4.68738 11.3307 4.68736C11.3922 4.68734 11.4532 4.67519 11.5101 4.65161C11.5669 4.62803 11.6186 4.59347 11.6621 4.54992C11.7056 4.50637 11.7402 4.45467 11.7637 4.39778C11.7872 4.34089 11.7994 4.27992 11.7993 4.21835C11.7993 4.15678 11.7872 4.09582 11.7636 4.03894C11.74 3.98207 11.7054 3.9304 11.6619 3.88687L10.7244 2.94937V2.94984Z" fill="black" />
                                                </svg>
                                                <span>{meeting.totalMeetingTime}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="popup_edit_info">
                                            <div className="meeting_btn_view_box">
                                                <div className="view_all" data-bs-toggle="modal" data-bs-target="#view_all_popup" onClick={(id)=>viewHandler(meeting.meetingId,meeting.user.email,meeting.roomName)}>
                                                    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.5 3.20957C8.21743 3.20957 8.80271 3.79484 8.80271 4.51227C8.80271 5.2297 8.21743 5.7961 7.5 5.7961C6.78257 5.7961 6.21617 5.2297 6.21617 4.51227C6.21617 3.79484 6.78257 3.20957 7.5 3.20957ZM7.5 0C11.7668 0 14.8442 4.00252 14.8442 4.00252C15.0519 4.26684 15.0519 4.73883 14.8442 5.00315C14.8442 5.00315 11.7668 9.00567 7.5 9.00567C3.23317 9.00567 0.155758 5.00315 0.155758 5.00315C-0.0519194 4.73883 -0.0519194 4.26684 0.155758 4.00252C0.155758 4.00252 3.23317 0 7.5 0ZM7.5 7.74072C9.2747 7.74072 10.7284 6.28697 10.7284 4.51227C10.7284 2.73757 9.2747 1.28383 7.5 1.28383C5.7253 1.28383 4.27155 2.73757 4.27155 4.51227C4.27155 6.28697 5.7253 7.74072 7.5 7.74072Z" fill="#F16A54" />
                                                    </svg>
                                                </div>
                                                <ViewMeeting meetingId={selectViewId} Hostemail={hostemail} join={todayText} Data={viewData} viewMeetingID={UpdateIdView}  name={userName} email={userEmail} roomName={roomName}/>
                                                {meeting.user.email&& userEmail && meeting.user.email===userEmail  &&
                                                <> 
                                                <div className="edit_box disabled" data-bs-toggle="modal" data-bs-target="#createmeeting" onClick={(id)=>editHandler(meeting.meetingId)} >
                                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" >
                                                        <path d="M10.4647 3.11762C10.8072 2.77513 10.9996 2.31062 10.9996 1.82626C10.9996 1.34191 10.8072 0.87739 10.4647 0.534899C10.1222 0.192409 9.65765 0 9.1733 0C8.68895 0 8.22443 0.192409 7.88194 0.534899L7.24139 1.1759L9.82366 3.75817L10.4647 3.11762Z" fill="#1A2730" />
                                                        <path d="M9.17808 4.40373L3.71998 9.86274C3.4274 10.1553 3.06081 10.3628 2.65941 10.4631L0.56748 10.9863C0.490969 11.0055 0.410798 11.0045 0.334781 10.9835C0.258764 10.9624 0.189494 10.9221 0.133721 10.8663C0.0779488 10.8105 0.0375766 10.7412 0.0165392 10.6652C-0.00449821 10.5892 -0.00548316 10.509 0.0136805 10.4325L0.536891 8.34059C0.637203 7.93919 0.844721 7.5726 1.13726 7.28002L6.59535 1.82147L9.17808 4.40419V4.40373Z" fill="#1A2730" />
                                                    </svg>
                                                </div>
                                                <div onClick={() => deleteHandler(meeting.meetingId,meeting.meetingTitle)}>
                                                <div className="delete_box disabled" data-bs-toggle="modal"                          data-bs-target="#delete_popup">
                                                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.75078 1.41744C4.44311 1.72511 4.26064 2.13457 4.23616 2.56667H1.33333C1.21841 2.56667 1.10819 2.61232 1.02692 2.69359C0.945655 2.77485 0.9 2.88507 0.9 3H0.899606L0.900393 3.00885L0.905726 3.06885L0.9053 3.06889L0.906967 3.078C0.925223 3.17777 0.977895 3.26797 1.05581 3.3329C1.13371 3.39782 1.23192 3.43336 1.33333 3.43333C1.33334 3.43333 1.33336 3.43333 1.33337 3.43333H1.61288L2.46733 10.8315L2.46733 10.8315C2.50777 11.1808 2.6752 11.5031 2.93776 11.7369C3.20033 11.9708 3.53971 12.1 3.89133 12.1H8.10865C8.46029 12.1 8.79967 11.9708 9.06224 11.7369C9.3248 11.5031 9.49223 11.1808 9.53267 10.8315L9.53267 10.8315L10.3865 3.43333H10.6667C10.7816 3.43333 10.8918 3.38768 10.9731 3.30641C11.0543 3.22515 11.1 3.11493 11.1 3C11.1 2.88507 11.0543 2.77485 10.9731 2.69359C10.8918 2.61232 10.7816 2.56667 10.6667 2.56667H7.76384C7.73936 2.13457 7.55689 1.72511 7.24922 1.41744C6.91791 1.08613 6.46855 0.9 6 0.9C5.53145 0.9 5.08209 1.08613 4.75078 1.41744ZM5.10557 2.56667C5.12814 2.36476 5.21856 2.17531 5.3636 2.03027C5.53239 1.86149 5.76131 1.76667 6 1.76667C6.2387 1.76667 6.46761 1.86149 6.6364 2.03027C6.78144 2.17531 6.87186 2.36476 6.89443 2.56667H5.10557ZM3.89133 11.2333H3.89127C3.7522 11.2334 3.61796 11.1824 3.51409 11.0899C3.41023 10.9974 3.344 10.87 3.328 10.7318L2.4862 3.43333H9.51314L8.67133 10.7318C8.65535 10.8699 8.5892 10.9972 8.48545 11.0897C8.38171 11.1822 8.24762 11.2333 8.10867 11.2333C8.10865 11.2333 8.10864 11.2333 8.10863 11.2333H3.89133ZM5 4.9H4.9V4.91138C4.71617 4.95119 4.56667 5.09837 4.56667 5.29267V9.37467H4.56616L4.56718 9.38474L4.57251 9.43741L4.57199 9.43746L4.57405 9.4475C4.61325 9.6379 4.79779 9.76667 5 9.76667C5.22619 9.76667 5.43333 9.60342 5.43333 9.37533V5.292H5.43385L5.43282 5.28193L5.42749 5.22926L5.42801 5.22921L5.42595 5.21917C5.38675 5.02877 5.20221 4.9 5 4.9ZM7 4.9H6.9V4.91138C6.71617 4.95119 6.56667 5.09837 6.56667 5.29267V9.37467H6.56616L6.56718 9.38474L6.57251 9.43741L6.57199 9.43746L6.57405 9.4475C6.61325 9.6379 6.79779 9.76667 7 9.76667C7.22619 9.76667 7.43333 9.60342 7.43333 9.37533V5.292H7.43385L7.43282 5.28193L7.42749 5.22926L7.42801 5.22921L7.42595 5.21917C7.38675 5.02877 7.20221 4.9 7 4.9Z" fill="#D11A2A" stroke="#D11A2A" strokeWidth="0.2" />
                                                    </svg>
                                                </div>
                                                    <DeleteMeeting  meetingId={selectedId} meetingTitle={selectedTitle} parentMethod={childToParent} />
                                                </div>
                                                </>
                                                    }  
                                            </div>             
                                        </div>
                                        <div className="date_info_box_right">
                                        {todayText && meeting.endMeetingTime && compareTime(meeting.endDate) && 
                                         <Link to={{pathname:`/meeting?username=${userName}&email=${userEmail}&roomname=${meeting.roomName}`}}  className="arrow_btn join_now" target="_blank">Join</Link>
                                         } 
                                        </div>
                                    </div>
                            ))} 
                                    {/* when  meeting not found for the user  */}
                                        <div className="time_hour_info meeting_not_found">
                                            <h2>{dataNotFound}</h2>
                                        </div>
                                </div>            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
