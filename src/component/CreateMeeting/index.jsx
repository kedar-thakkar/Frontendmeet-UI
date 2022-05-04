import React, { useEffect, useState } from "react";
import { randomString } from "../../utils/RoomName";
import "./CreateMeeting.css";
import $ from "jquery";
import DatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";
import {useNavigate } from 'react-router-dom';
import calender from "../../assets/img/calender_icon.svg";
import {
  MeetingHandler,
  viewMeetingID,
  editMeetingId,
  DashboardMeetingHandler,
  ParticipantEmailHandler
} from "../../service/auth.services";
import { errorToast, successToast } from "../../utils/helper";
import { TITLE_REGEX, EMAIL_REGEX } from "../../utils/validation";

function CreateMeeting(props) {
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const [item, setItem] = useState([]);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editMeetingData, setEditMeetingData] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState();
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const roomName = randomString(15);
  const [meetingtitle, setMeetingTitle] = useState("");
  const [meetingdes, setMeetingDes] = useState("");
  const [meetingstartdate, setMeetingStartdate] = useState("");
  const [meetingenddate, setMeetingEnddate] = useState("");
  const [meetingparticipants, setMeetingParticipants] = useState("");

  function meetingValidation() {
    let formIsValid = true;
    if (!TITLE_REGEX.test(title) === true) {
      formIsValid = false;
      setMeetingTitle("Enter Meeting Title");
    } else {
      setMeetingTitle("");
    }
    if (starttime === "") {
      formIsValid = false;
      setMeetingStartdate("Enter Start Date");
    } else {
      setMeetingStartdate("");
    }
    if (endtime === "") {
      formIsValid = false;
      setMeetingEnddate("Enter End Date");
    } else {
      setMeetingEnddate("");
    }
    
    return formIsValid;
  }

  const CreatemeetingHandler = async () => {

    if (meetingValidation()) {

      setMeetingTitle("");
      isValid();
      isInList();
      setMeetingParticipants("");
      setMeetingDes("");
      setMeetingStartdate("");
      setMeetingEnddate("");
      let invitedParticipant = item;

      if (!props.editmeeting) {
        invitedParticipant.push(props.HostEmailId);
      }

      var userId = localStorage.getItem("userId");
      // console.log("main",endtime);
      // console.log("main-start",starttime);
      var data = {
        meetingEntity: {
          meetingId: props.editMeetingId,
          roomName: roomName,
          meetingTitle: title,
          meetingDesc: description,
          invites: invitedParticipant,
          startDate: starttime,
          endDate: endtime,
          user: {
            id: userId,
          },
        },
      };

      if (props.editmeeting) {

        const response = await editMeetingId(data);
        setItem("");
        ClearState();
        props.parentMethod();

        if (response.data.Status === "200") {
          $("#closeModal").click();
          successToast(response.data.message);
        } else {
          errorToast(response.data.message);
        }

      }
      if (!props.editmeeting) {
        const response = await MeetingHandler(data);
        if (response.data.Status === "200") {
          $("#closeModal").click();
          successToast(response.data.message);
          ClearState();
          props.parentMethod();
        } else {
          errorToast(response.data.message);
        }
      }
    }
  };

  const ClearState = () => {
    setEditMeetingData("");
    setTitle("");
    setDescription("");
    setParticipants("");
    setStartDate("");
    setEndDate("");
    setMeetingTitle("");
    setMeetingParticipants("");
    setMeetingDes("");
    setMeetingStartdate("");
    setMeetingEnddate("");
    setItem([]);
  };

  // const participantsHandler=async(e)=>{
  //   setMeetingParticipants('');
  //   setParticipants(e.target.value);
  //   const SearchText=e.target.value;
  //   if(SearchText && SearchText.length>=3){
  //     const response=await ParticipantEmailHandler(SearchText);
  //     console.log(response.data.data);
  //     setParticipants(SearchText);
  //     // setlistitem(response.data.data);
  //   }
  //   if(SearchText.length==0){
  //     const response=await ParticipantEmailHandler('');;
  //     // console.log("1");
  //     // console.log("nulldata",response);
  //     // set message of api when email not found
  //   }
  // }


  useEffect(async () => {
    if (props.editmeeting) {
      setTitle(props.response.meetingTitle);
      setDescription(props.response.meetingDesc);
      setItem(props.response.invites);
      setStartDate(new Date(props.response.startDate).getTime());
      dateHandler(new Date(props.response.startDate), "startdate");
      setEndDate(new Date(props.response.endDate).getTime());
      dateHandler(new Date(props.response.endDate), "enddate");
    }
    if (!props.editmeeting) {
      ClearState();
    }
  }, [props.response]);

  const handleDelete = (participants1) => {
    // console.log("called", item1);
    // console.log("delete");
    setItem(item.filter((i) => i !== participants1));
  };
  
  const HandlerKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      var value = participants.trim();
      if (value && isValid(value)) {
        setItem([...item, participants]);
        setParticipants("");
        setMeetingParticipants("");
      }
    }
  };

  function isInList(value) {
    return item.includes(value);
  }

  function isValid() {
    if (!EMAIL_REGEX.test(participants)) {
      setMeetingParticipants("Enter Valid Email-Id");
      return false;
    } else {
      setMeetingParticipants("");
    }
    if (isInList(participants)) {
      setMeetingParticipants("Has Already Been Added");
      return false;
    } else {
      setMeetingParticipants("");
    }
    return true;
  }

  const changeHandler = (e) => {
    setParticipants(e.target.value);
  };

  const dateHandler = async (e, date_type) => {
    if (date_type == "startdate") {
      setStartDate(e.getTime());
    }
    if (date_type == "enddate") {
      setEndDate(e.getTime());
    }

    // Get Timing data from selected by user
    let year = e.getFullYear();
    let month = e.getMonth() + 1;
    let date = e.getDate();
    let hour = e.getHours();
    let minutes = e.getMinutes();
    let seconds = e.getSeconds();
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
      seconds = "00.000";
    }

    if (date_type == "startdate") {
      let selected_time =
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
      setStarttime(selected_time);
      var minutesToAdd=30;
      var currentDate = new Date(selected_time);
      // console.log("currentDate",currentDate);
      var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);
      // console.log("futureDate",futureDate);
      setEndDate(futureDate);
      setEndtime(futureDate);
      // T
      dateHandler(futureDate,"enddate");
    }

    if (date_type == "enddate") {
      // console.log("endate",e);
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
      setEndtime(selected_end_time);
    }
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterPassedTime1 = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return startDate < selectedDate.getTime();
  };

  return (
    <>
      <div
        className="modal fade"
        id="createmeeting"
        tabIndex="-1"
        aria-labelledby="createmeetingLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {props.editmeeting ? (
                <h3> Edit Meeting</h3>
              ) : (
                <h3>Create Meeting</h3>
              )}
              <a
                className="close_icon"
                data-bs-dismiss="modal"
                onClick={ClearState}
              >
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.54106 0.111794C2.01687 0.48222 0.701014 1.8005 0.349725 3.30888C0.0974442 4.3924 0.286655 5.65273 0.84144 6.58342C0.961651 6.78503 4.59969 10.487 8.92603 14.8101L16.7921 22.6703L8.81346 30.6676C0.223225 39.2779 0.4623 39.0131 0.130776 40.2858C-0.136239 41.3111 0.00715129 42.3827 0.547022 43.3956C1.39703 44.9904 3.38393 45.7641 5.48546 45.3187C6.73771 45.0532 6.41157 45.3462 14.9529 36.8147C19.3017 32.4708 22.8994 28.9168 22.9479 28.9168C22.9962 28.9168 26.5942 32.4699 30.9432 36.8127C38.276 44.1349 38.893 44.7285 39.4346 44.9809C41.2921 45.8472 43.5416 45.4942 44.8272 44.1348C46.0358 42.8569 46.3155 40.9027 45.5258 39.2547C45.2644 38.7092 44.6379 38.0623 37.1954 30.6533L29.1475 22.6417L36.9758 14.7959C41.852 9.90872 44.89 6.79752 45.0322 6.54569C45.4299 5.84095 45.5686 5.18356 45.5232 4.2199C45.4743 3.18625 45.2583 2.55833 44.6926 1.8058C43.5882 0.336583 41.5835 -0.281452 39.8389 0.309361C38.8447 0.646005 38.3903 1.06674 30.5899 8.87219L22.958 16.5091L15.0916 8.6748C6.64606 0.2639 6.8519 0.449517 5.60469 0.124642C4.98503 -0.0367174 4.17303 -0.0418385 3.54106 0.111794Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <div className="modal-body">
              <div className="form_2_column">
                <div className="participants_box ">
                  <label className="form-label" htmlFor="form4">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Meeting Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <p className="show-error">{meetingtitle}</p>
                </div>
                <div className=" participants_box input_column_2">
                  <label>Start Date & Time</label>
                  {/* <DatePicker  showTimeSelect selected={startDate} onChange={(date) => setStartDate(date)} onClick={dateHandler} dateFormat="MMMM d, yyyy h:mm aa"  /> */}
                  <DatePicker
                    showTimeSelect
                    selected={startDate}
                    onChange={(date) => dateHandler(date, "startdate")}
                    dateFormat="MMMM dd, yyyy HH:mm"
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    filterTime={filterPassedTime}
                    minDate={new Date()}
                    maxDate={endDate != null ? endDate : null}
                  />
                  <p className="show-error">{meetingstartdate}</p>
                </div>
                <div className=" participants_box input_column_2">
                  <label>End Date & Time</label>
                  {/* <DatePicker  showTimeSelect selected={endDate} className="time_piker"  onChange={(date) =>setEndDate(date)} onClick={dateHandler} dateFormat="MMMM d, yyyy h:mm aa"/> */}
                  <DatePicker
                    showTimeSelect
                    selected={endDate}
                    timeIntervals={1}
                    className="time_piker"
                    onChange={(date) => dateHandler(date, "enddate")}
                    dateFormat="MMMM dd, yyyy HH:mm"
                    filterTime={filterPassedTime1}
                    timeFormat="HH:mm"
                    minDate={startDate != null ? startDate : new Date()}
                  />
                  <p className="show-error">{meetingenddate}</p>
                </div>

                {/* onClick={handleDelete(dataitem)} */}
                {/* <div className="participants_box">
                  <label>Participants</label>
                  <div className="email-id-row">
                    <div className="email_box">
                      <div className="all-mail">
                        {item &&
                          item.map((dataitem, i) => (
                            <>
                              <div className="email-ids" key={`email-ids-${i}`}>
                                <p>{dataitem}</p>
                                <div
                                  className="cancel-email"
                                  onClick={() => handleDelete(dataitem)}
                                >
                                  x
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="enter-mail-id"
                      value={participants}
                      placeholder="Enter the email id .."
                      required
                      onChange={changeHandler}
                      onKeyPress={HandlerKeyDown}
                    /> */}
                    {/* add when validation is false */}
                    {/* <p className="show-error">{meetingparticipants}</p>
                  </div>
                </div> */}
            <div className="participants_box">
            <label>Participants</label>
             <div className="tags-input">
          {item && item.map((dataitem,i)=>(
            <li key={i} className="tag">
            <span className='tag-title'>{dataitem}</span>
            <span className='tag-close-icon' onClick={()=>handleDelete(dataitem)}>x</span>
            </li>
          ))}
          <input type="text" onKeyPress={HandlerKeyDown} value={participants} onChange={(e)=> [setParticipants(e.target.value), setMeetingParticipants('')] }/>
          {/* (e)=> [setParticipants(e.target.value), setMeetingParticipants('')] */}
          {/* value={participants}  */}
        </div>
        {/* </div>`  */}
      </div>
      <p className="show-error">{meetingparticipants}</p>
                <div className="participants_box">
                  <label className="form-label" htmlFor="form4">
                    Description
                  </label>
                  <textarea
                    name="Enter Description"
                    placeholder="Enter Description"
                    id=""
                    cols="30"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <p className="show-error">{meetingdes}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="closeModal"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={ClearState}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={CreatemeetingHandler}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMeeting;
