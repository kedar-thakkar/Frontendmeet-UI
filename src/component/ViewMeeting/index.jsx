import React, { useEffect, useState } from 'react';
import "./ViewMeeting.css";
import * as moment from 'moment';
import { Link} from 'react-router-dom';
import {ViewEmailHandler} from "../../service/auth.services";
import { errorToast, getUserData } from '../../utils/helper';
import { EMAIL_REGEX } from '../../utils/validation';

function ViewMeeting(props) {
    const hosterId=props.Hostemail;
    const [meetingData, setMeetingData] = useState('');
    const [userEmail,setUserEmail]=useState('');
    const [animation,setanimation]=useState(false);
    const [hostId,setHostId] =useState(false);

    useEffect(()=>{
        if(props.Data){}
        setMeetingData(props.Data);
        // console.log(props.Data);
        if(hosterId==getUserData().email){
            setHostId(true);
        }
    },[props.Data,hosterId])


    const animationHandler=()=>{
        setanimation(!animation);
    }

    const clearData=()=>{
        setMeetingData('');
        setanimation(false);
    }

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

    const EmailHandler=async()=>{
        // console.log(userEmail);
        const GetData = getUserData();
        // console.log(GetData.id)
        // console.log(meetingData.meetingId);
        var data={
            "meetingEntity":{
                "meetingId":meetingData.meetingId,
                "invites":[userEmail],
                "user":{
                    id:GetData.id
                }
            }
        }
        if(!userEmail==""){
            if(EMAIL_REGEX.test(userEmail)){
                const response = await ViewEmailHandler(data);

                if(response.data.Status==="200"){
                    setUserEmail('');
                    props.viewMeetingID(meetingData.meetingId);
                }
            }else{
                errorToast("Invalid Email Address !")
            }
            
        }else{
            errorToast("Please Enter Email !")
        }
    }
    

    return (
        <>
            <div className="modal fade" id="view_all_popup" tabIndex="-1" aria-labelledby="view_all_popupLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered view_all_info_popup">
                    <div className="modal-content">
                        <div className="modal-header view_all_title">
                            <h3>{meetingData.meetingTitle}</h3>
                            {/* onClick={clearData} */}
                            <a className="close_icon"  onClick={clearData} id="closeicon" data-bs-dismiss="modal" >
                                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.54106 0.111794C2.01687 0.48222 0.701014 1.8005 0.349725 3.30888C0.0974442 4.3924 0.286655 5.65273 0.84144 6.58342C0.961651 6.78503 4.59969 10.487 8.92603 14.8101L16.7921 22.6703L8.81346 30.6676C0.223225 39.2779 0.4623 39.0131 0.130776 40.2858C-0.136239 41.3111 0.00715129 42.3827 0.547022 43.3956C1.39703 44.9904 3.38393 45.7641 5.48546 45.3187C6.73771 45.0532 6.41157 45.3462 14.9529 36.8147C19.3017 32.4708 22.8994 28.9168 22.9479 28.9168C22.9962 28.9168 26.5942 32.4699 30.9432 36.8127C38.276 44.1349 38.893 44.7285 39.4346 44.9809C41.2921 45.8472 43.5416 45.4942 44.8272 44.1348C46.0358 42.8569 46.3155 40.9027 45.5258 39.2547C45.2644 38.7092 44.6379 38.0623 37.1954 30.6533L29.1475 22.6417L36.9758 14.7959C41.852 9.90872 44.89 6.79752 45.0322 6.54569C45.4299 5.84095 45.5686 5.18356 45.5232 4.2199C45.4743 3.18625 45.2583 2.55833 44.6926 1.8058C43.5882 0.336583 41.5835 -0.281452 39.8389 0.309361C38.8447 0.646005 38.3903 1.06674 30.5899 8.87219L22.958 16.5091L15.0916 8.6748C6.64606 0.2639 6.8519 0.449517 5.60469 0.124642C4.98503 -0.0367174 4.17303 -0.0418385 3.54106 0.111794Z" fill="white" />
                                </svg>
                            </a>
                            {/* for the join button condtion */}
                            {/* {console.log(meetingData.endDate)} */}
                            {props.join && compareTime(meetingData.endDate) && 
                            <div className="date_info_box_right">
                                {/* <a >Join</a> */}
                                <Link className="arrow_btn join_now" to={{pathname:`/meeting?username=${props.name}&email=${props.email}&roomname=${props.roomName}`}}  className="arrow_btn join_now">Join</Link>
                            </div>
                            }
                        </div>
                        <div className="main_top_bar">
                            <div className="modal-body view__all_main">
                                <div className="view_all_left">
                                    <div className="date_view_all">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.10166 0.976988V1.95398H3.21492C1.977 1.95398 0.878536 2.56049 0.393173 3.51208C0.0156254 4.25263 0 4.64831 0 13.4824C0 22.3165 0.0156254 22.7122 0.393173 23.4528C0.646304 23.9493 1.06116 24.3643 1.55746 24.6175C2.29068 24.9917 2.68287 25.0103 9.61155 24.9972L16.8949 24.9837L20.9472 20.7473L24.9996 16.5111L25 10.3971C25.0006 4.65456 24.9767 4.23641 24.6074 3.51208C24.122 2.56049 23.0236 1.95398 21.7857 1.95398H20.8989V0.976988V0H19.9223H18.9457V0.976988V1.95398H12.5003H6.05483V0.976988V0H5.07824H4.10166V0.976988ZM4.10166 4.88494V5.86193H5.07824H6.05483V4.88494V3.90795H12.5003H18.9457V4.88494V5.86193H19.9223H20.8989V4.88494V3.90795H21.6159C22.7474 3.90795 23.0474 4.32376 23.0474 5.89221V7.22971H12.5003H1.95317V5.92621C1.95317 4.33724 2.25044 3.90795 3.35066 3.90795H4.10166V4.88494ZM23.0474 12.0926V15.0013L20.361 15.0751C17.4197 15.1558 16.7701 15.3616 15.9388 16.4757C15.5701 16.9699 15.5213 17.338 15.4652 20.0417L15.4025 23.0569H9.03497C3.38406 23.0569 2.6274 23.0206 2.3104 22.7335C1.97778 22.4324 1.95317 21.9556 1.95317 15.7969V9.18368H12.5003H23.0474V12.0926ZM20.5431 18.3185C20.0038 18.9364 19.0723 19.9227 18.4729 20.5101L17.3832 21.5781V19.621C17.3832 18.3594 17.4664 17.5807 17.6176 17.4295C17.7666 17.2804 18.5203 17.195 19.6878 17.195H21.5235L20.5431 18.3185Z" fill="#642BF0" />
                                        </svg>
                                        <div className="date_view_all_text">
                                            <span>Date</span>
                                            {meetingData.startDate && <p>{moment(meetingData.startDate).format('DD MMMM,yyyy')}</p>}
                                        </div>
                                    </div>
                                    <div className="date_view_all">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.714 0.343486C17.8634 0.906706 19.5738 1.92167 21.3253 3.67332C23.899 6.24711 25 8.89163 25 12.4992C25 16.1068 23.899 18.7513 21.3253 21.3251C18.7517 23.8989 16.1074 25 12.5 25C8.89264 25 6.24829 23.8989 3.67466 21.3251C1.10103 18.7513 -3.57628e-07 16.1068 -3.57628e-07 12.4992C-3.57628e-07 8.89163 1.10103 6.24711 3.67466 3.67332C5.44914 1.89872 7.14983 0.899172 9.35325 0.335437C11.1144 -0.114933 13.9783 -0.111337 15.714 0.343486ZM9.2113 2.71675C8.5798 2.92207 7.47945 3.48016 6.76627 3.95724C3.05548 6.43942 1.37637 11.0678 2.62397 15.3758C3.12808 17.1163 3.91455 18.4342 5.2399 19.7598C6.56541 21.0852 7.88322 21.8717 9.62363 22.3759C14.9418 23.9164 20.5615 20.9619 22.2774 15.7234C22.8656 13.9277 22.8656 11.0707 22.2774 9.27504C21.242 6.11423 18.6526 3.59575 15.437 2.62188C13.7204 2.10216 10.9741 2.14394 9.2113 2.71675ZM12.8082 2.60133C13.0214 2.81453 13.092 4.38997 12.9098 4.86483C12.8526 5.01381 12.6682 5.13574 12.5 5.13574C12.1055 5.13574 11.9863 4.80267 11.9863 3.70037C11.9863 2.91077 12.189 2.39584 12.5 2.39584C12.5565 2.39584 12.6952 2.48831 12.8082 2.60133ZM9.22397 8.38235C12.4351 11.7499 12.2601 11.7 14.3175 9.83227C15.8118 8.47533 16.2846 8.32001 16.5334 9.10397C16.6236 9.38823 16.3704 9.73586 15.2579 10.8541C14.3372 11.7798 13.8699 12.3805 13.8699 12.639C13.8699 12.8532 13.6807 13.2176 13.4495 13.4488C12.5565 14.342 11.1301 13.6942 11.1301 12.3954C11.1301 11.8082 10.9368 11.5666 8.4613 9.05945C5.78784 6.35174 5.43031 5.80427 6.2577 5.68526C6.51301 5.64844 7.29486 6.35928 9.22397 8.38235ZM22.4315 12.2423C22.8058 12.6934 22.3416 13.0129 21.3115 13.0129C20.1961 13.0129 19.863 12.8948 19.863 12.4992C19.863 12.1036 20.1961 11.9855 21.3115 11.9855C21.9087 11.9855 22.2911 12.0732 22.4315 12.2423ZM4.92294 12.0988C5.22774 12.2218 5.18818 12.7854 4.8661 12.909C4.31558 13.1203 2.7863 13.0184 2.56849 12.7561C2.18168 12.29 2.65788 11.9838 3.7452 11.999C4.27534 12.0064 4.80514 12.0514 4.92294 12.0988ZM12.9098 20.1336C13.1211 20.6841 13.0192 22.2135 12.7568 22.4313C12.3058 22.8057 11.9863 22.3414 11.9863 21.3112C11.9863 20.1958 12.1045 19.8627 12.5 19.8627C12.6682 19.8627 12.8526 19.9846 12.9098 20.1336Z" fill="#F1B824" />
                                        </svg>
                                        <div className="date_view_all_text">
                                            <span>TIME</span>
                                            <p>{meetingData.startMeetingTime} - {meetingData.endMeetingTime}</p>
                                        </div>
                                    </div>
                                    <div className="date_view_all">
                                        <svg width="19" height="28" viewBox="0 0 19 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18.5904 0.110904C18.711 0.176916 18.829 0.302706 18.8939 0.434457C18.9939 0.63758 19 0.754673 19 2.45923C19 4.1645 18.9939 4.28078 18.8938 4.48423C18.7082 4.8611 18.5186 4.92033 17.4979 4.92033H16.625V6.07552C16.625 7.43203 16.5421 8.12578 16.2793 8.96748C15.9417 10.0491 15.4235 10.955 14.6722 11.7768C13.7063 12.8334 12.6026 13.5049 11.2156 13.8797L10.653 14.0318L11.0661 14.132C12.458 14.4695 13.531 15.0933 14.5408 16.1518C15.3778 17.0293 15.8997 17.8963 16.2537 18.9976C16.5338 19.8688 16.5782 20.2058 16.6091 21.6968L16.6377 23.0778H17.5043C18.5179 23.0778 18.7085 23.1376 18.8938 23.5139C18.9939 23.7174 19 23.8336 19 25.5389C19 27.2442 18.9939 27.3604 18.8938 27.5639C18.8254 27.7029 18.7133 27.819 18.5792 27.8899C18.3728 27.999 18.2865 28 9.5 28C0.713502 28 0.627158 27.999 0.42085 27.8899C0.286741 27.819 0.174641 27.7029 0.106241 27.5639C0.00612204 27.3604 -2.08616e-07 27.2442 -2.08616e-07 25.5389C-2.08616e-07 23.8336 0.00612204 23.7174 0.106241 23.5139C0.291491 23.1376 0.482072 23.0778 1.49572 23.0778H2.36233L2.39094 21.6968C2.4216 20.2172 2.45913 19.9292 2.73838 19.0307C3.05552 18.01 3.591 17.0811 4.3215 16.2844C5.33114 15.1831 6.3964 14.5354 7.80689 14.1651L8.35683 14.0206L8.04439 13.9515C7.18765 13.7621 6.25564 13.3509 5.48889 12.8241C4.97969 12.4743 3.952 11.4093 3.61438 10.8817C3.0875 10.0581 2.69943 9.09808 2.49813 8.11977C2.44572 7.86534 2.40978 7.26456 2.39089 6.32863L2.36249 4.92033H1.49583C0.48202 4.92033 0.291544 4.86056 0.106241 4.48423C0.00612204 4.28078 -2.08616e-07 4.1645 -2.08616e-07 2.45923C-2.08616e-07 0.753962 0.00612204 0.637689 0.106241 0.434238C0.174641 0.295268 0.286741 0.179104 0.42085 0.108224C0.627211 -0.000830257 0.711181 -0.00186939 9.51108 0.000537018C18.25 0.00294343 18.3962 0.00469355 18.5904 0.110904ZM1.58333 2.45923V3.2796H9.5H17.4167V2.45923V1.63887H9.5H1.58333V2.45923ZM3.9719 6.27394C3.99966 7.70132 4.03739 7.96608 4.32667 8.76239L4.44093 9.07686H9.49768H14.5544L14.6658 8.78973C14.9517 8.05293 15.0019 7.70504 15.0284 6.27394L15.0535 4.92033H9.49947H3.94551L3.9719 6.27394ZM5.82994 11.015C6.48977 11.6297 7.4394 12.1292 8.36285 12.3473C8.94367 12.4846 10.1937 12.4673 10.7598 12.3142C11.6903 12.0626 12.5842 11.5752 13.2208 10.9723L13.4847 10.7225L9.5 10.7222L5.51528 10.7219L5.82994 11.015ZM8.65556 15.6647C7.25109 15.8857 6.03989 16.6082 5.18061 17.7375C4.95905 18.0288 4.53889 18.7162 4.53889 18.7875C4.53889 18.8009 5.33721 18.8119 6.31296 18.8119C8.0531 18.8119 8.09104 18.8095 8.29756 18.6893C8.52609 18.5562 8.70833 18.2552 8.70833 18.011C8.70833 17.929 8.75831 17.7549 8.81943 17.6241C8.94525 17.3549 9.22714 17.1706 9.51108 17.172C9.90401 17.1741 10.2917 17.577 10.2917 17.9832C10.2917 18.2487 10.4929 18.5856 10.7245 18.7081C10.9057 18.8039 11.0571 18.8119 12.6909 18.8119C13.6645 18.8119 14.4611 18.7966 14.4611 18.778C14.4611 18.7594 14.3741 18.5933 14.2679 18.4089C13.0944 16.3727 10.9182 15.3086 8.65556 15.6647ZM9.22313 20.0359C8.63481 20.4259 8.65946 20.4225 6.22139 20.4412L4.02473 20.4581L3.99153 20.7091C3.97327 20.8472 3.95833 21.4366 3.95833 22.019V23.0778H9.5H15.0417V22.019C15.0417 21.4366 15.0267 20.8472 15.0085 20.7091L14.9753 20.4581L12.7786 20.4417C10.6788 20.426 10.5687 20.4201 10.2817 20.3075C10.1166 20.2428 9.87905 20.1147 9.75391 20.0229C9.62878 19.931 9.5209 19.8548 9.5142 19.8535C9.50755 19.8521 9.37655 19.9342 9.22313 20.0359ZM1.58333 25.5389V26.3593H9.5H17.4167V25.5389V24.7185H9.5H1.58333V25.5389Z" fill="#FF6610" />
                                        </svg>
                                        <div className="date_view_all_text">
                                            <span>DURATION</span>
                                            <p>{meetingData.totalMeetingTime}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="description_box_view_all">
                                    <div className="description_see_more">
                                        <label className="form-label" htmlFor="form4">Description</label>
                                    </div>
                                    <p>{meetingData.meetingDesc}
                                    </p>
                                </div>
                                <div className="all_grups">
                                    <div className="participants_view_title participants_info_next">
                                        <h5>Host</h5>
                                        {meetingData.profiledata && meetingData.profiledata.map((responseData,i) => (
                                            <>
                                                {responseData.ishost == true &&
                                                    <div key={`participants_view_left-${i}`}className="participants_view_left">
                                                        {responseData.profilePic == null && <span className="participants_5" data-bs-toggle="tooltip" data-bs-placement="bottom" title={responseData && responseData.name}>{responseData.name && responseData.name.substring(0, 1).toUpperCase()}</span>}
                                                        {responseData.profilePic && <img src={responseData.profilePic} alt="" data-bs-toggle="tooltip" data-bs-placement="bottom" title={responseData.name} />}
                                                    </div>
                                                }
                                                {/* </div> */}
                                                {/* </div> */}
                                            </>
                                        ))}
                                       
                                    </div>
                                    <div className="participants_view_title">
                                        <h5>Participants/Guest</h5>
                                        <div className="participants_view_main">
                                            { meetingData && meetingData.profiledata && meetingData.profiledata.map((ResData) => (
                                                <>
                                                    {ResData && ResData.ishost == false &&
                                                        <div className="participants_view_left">
                                                            {ResData.profilePic == null && <span className="participants_3" data-bs-toggle="tooltip" data-bs-placement="bottom" title={ResData && ResData.name}>{ResData.name && ResData.name.substring(0, 1).toUpperCase()}</span>}
                                                            {ResData && ResData.profilePic && <img src={ResData.profilePic} alt="" title={ResData.name} />}
                                                        </div>
                                                    }
                                                </>
                                            ))}

                                        </div>
                                    </div>

                                    {hostId && compareTime(meetingData.endDate)&&
                                    <div className="view_all_right">
                                        <div className="border_animation" onClick={animationHandler}>
                                            <span className="border_css"></span>
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5435 0.0647146C9.55402 0.342498 7.83776 1.48898 6.7634 3.25783C6.00993 4.49836 5.69098 6.09289 5.90627 7.54279C6.15402 9.21135 6.97678 10.6872 8.24757 11.7426C8.46496 11.9231 8.48102 11.9491 8.39406 11.9797C7.52531 12.2852 6.45324 12.7981 5.71916 13.2595C4.9902 13.7177 4.38415 14.1962 3.69016 14.8615C1.96901 16.5114 0.771553 18.5599 0.155928 20.9075C0.0274616 21.3972 0.000703798 21.5909 2.02042e-05 22.0358C-0.000712217 22.4985 0.017989 22.6268 0.134835 22.9617C0.454073 23.8769 1.13044 24.5455 2.04641 24.8514L2.3882 24.9655H8.83708H15.2859L15.4839 24.8345C15.7887 24.6328 15.9136 24.3941 15.9136 24.0134C15.9136 23.6326 15.7887 23.3939 15.4839 23.1922L15.286 23.0612L8.95915 23.0368C3.126 23.0143 2.62053 23.0059 2.48088 22.9294C2.16437 22.756 1.92546 22.3656 1.92463 22.0202C1.92419 21.8493 2.15441 20.9751 2.34484 20.4245C2.68547 19.4395 3.38913 18.1737 4.06843 17.3239C4.7154 16.5145 5.67707 15.6414 6.56301 15.0591C8.29963 13.9177 10.0763 13.3566 12.1782 13.2857C13.8043 13.2308 15.2425 13.5144 16.934 14.2232C17.2789 14.3677 17.4116 14.4004 17.5781 14.3817C18.2009 14.3115 18.6137 13.6939 18.4215 13.1198C18.2853 12.7131 18.0048 12.5226 16.9878 12.146C16.7461 12.0565 16.5309 11.9689 16.5096 11.9513C16.4884 11.9338 16.5983 11.8147 16.7538 11.6868C16.9093 11.559 17.1974 11.2767 17.3939 11.0595C19.7565 8.44895 19.6524 4.44006 17.157 1.9447C15.6782 0.465887 13.6162 -0.224641 11.5435 0.0647146ZM13.3669 2.04357C14.3067 2.23405 15.0934 2.65598 15.7696 3.33215C16.4488 4.01135 16.8655 4.79094 17.063 5.75163C17.4231 7.5028 16.6306 9.45754 15.1473 10.4776C13.7755 11.4209 11.985 11.5668 10.4871 10.8572C9.9423 10.5992 9.68317 10.4249 9.27179 10.0401C8.10817 8.95163 7.56525 7.27951 7.87936 5.75163C8.07687 4.79094 8.49362 4.01135 9.17282 3.33215C10.2922 2.21281 11.8463 1.73532 13.3669 2.04357ZM20.001 15.7649C19.7816 15.832 19.471 16.1547 19.4083 16.3808C19.3774 16.4919 19.3564 17.1324 19.3563 17.9683L19.356 19.3695L17.8508 19.3843L16.3457 19.3991L16.1479 19.5301C15.8431 19.7319 15.7183 19.9705 15.7183 20.3512C15.7183 20.732 15.8431 20.9706 16.1479 21.1724L16.3457 21.3034L17.8482 21.3182L19.3508 21.333L19.3656 22.8319C19.3802 24.312 19.3818 24.3331 19.4963 24.5171C19.56 24.6197 19.7012 24.7625 19.8101 24.8345C19.975 24.9436 20.0622 24.9655 20.3325 24.9655C20.6028 24.9655 20.6901 24.9436 20.855 24.8345C20.9638 24.7625 21.1051 24.6197 21.1688 24.5171C21.2832 24.3331 21.2849 24.312 21.2995 22.8319L21.3143 21.333L22.8131 21.3182C24.2933 21.3036 24.3144 21.3019 24.4984 21.1875C24.6009 21.1238 24.7438 20.9825 24.8158 20.8737C24.9249 20.7088 24.9468 20.6216 24.9468 20.3512C24.9468 20.0809 24.9249 19.9937 24.8158 19.8288C24.7438 19.7199 24.6009 19.5787 24.4984 19.515C24.3144 19.4006 24.2933 19.3989 22.8131 19.3843L21.3143 19.3695L21.2995 17.8706C21.2849 16.3905 21.2832 16.3694 21.1688 16.1854C20.9385 15.815 20.4326 15.6328 20.001 15.7649Z" fill="#FF6610" />
                                            </svg>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                            {animation && 
                            <div className="add_pepale_new">
                                <div className="add_pepale_text participants_box">
                                    <label>Add New Participants</label>
                                    <div className="profile_input_edit add_pepale_input">
                                        <input type="email" name="email" className="enter-mail-id" placeholder="Enter the email id .." required value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                                        <div className="add_pepale_new_btn" onClick={EmailHandler}>
                                            {/*  */}    
                                            <a href="javascript:void(0)">Add</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}

export default ViewMeeting;
