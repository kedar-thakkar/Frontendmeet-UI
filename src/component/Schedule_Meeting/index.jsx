import React, { useState } from 'react'
import Navbar from '../Navbar';
import './ScheduleMeeting.css';

function ScheduleMeeting() {
	const [title,setTitle]= useState('');
	const [when,setWhen]= useState('');
	const [participant,setParticipant]= useState('');
	const [description,setDescription]= useState('');

	const scheduleMeetingHandler=()=>{
	}

	return (
		<>
			<Navbar />
			<div className="sign_up_section schedule_meeting ">
				<div className="login_otr">
					<div className="login_box">
						<a href="#." className="back_to_sessioin">
							<svg width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd" d="M5.69461 0.0915802C5.48298 0.205303 0.294997 6.09687 0.1198 6.42255C-0.0398436 6.71924 -0.0399415 7.28056 0.119555 7.57702C0.294312 7.9018 5.48356 13.7947 5.69486 13.9084C6.24642 14.205 6.9564 13.7448 7.01392 13.0533C7.06591 12.4278 7.13996 12.5399 5.15259 10.2364L3.33654 8.13145L13.8503 8.11681L24.3642 8.10217L24.5509 7.96804C24.6536 7.89428 24.7966 7.73076 24.8688 7.60477C24.9781 7.4139 25 7.31289 25 6.99998C25 6.68708 24.9781 6.58607 24.8688 6.39519C24.7966 6.2692 24.6536 6.10569 24.5509 6.03192L24.3642 5.8978L13.8503 5.88316L3.33654 5.86852L5.15259 3.76356C7.13996 1.4601 7.06591 1.57213 7.01392 0.946653C6.9564 0.2551 6.24666 -0.204937 5.69461 0.0915802Z" fill="black" />
							</svg>
							Back to Sessions
						</a>
						<div className="title">
							<h2>Schedule a Session</h2>
						</div>
						<div className="schedule_meeting_otr">
							<div className="schedule_meeting_col">
								<div className="form_box">
									<div className="input_box">
										<label>Title</label>
										<input type="text" placeholder="Session Title" onChange={(e)=>{setTitle(e.target.value)}}/>
									</div>
									<div className="input_box">
										<label>When</label>
										<input type="text" placeholder="12 December 2020, 02:00 AM" onChange={(e)=>{setWhen(e.target.value)}}/>
									</div>

									<div className="input_box">
										<label>Participants</label>
										<div className="email-id-row">
											<div className="email_box">
												<div className="all-mail">

												</div>
											</div>
											<input type="text" name="email" className="enter-mail-id" placeholder="Enter the email id .." onChange={(e)=>{setParticipant(e.target.value)}} />
										</div>
									</div>
								</div>
							</div>
							<div className="schedule_meeting_col">
								<div className="form_box">
									<div className="input_box">
										<label>Description</label>
										<textarea placeholder="Enter Description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
										{/* <!-- <span>Characters Left: 1024</span> --> */}
									</div>
								</div>
							</div>
							<div className="side_btn_box">
								<div className="side_btn cancel_btn">
									<a href="#." className="gray_btn">Cancel</a>
								</div>
								<div className="side_btn">
									<a href="#." className="blue_btn" onClick={scheduleMeetingHandler}>Save</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ScheduleMeeting;
