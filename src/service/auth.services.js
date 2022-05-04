import { get, post } from "../webreq";
import {ENDPOINTURL} from "../utils/EndPoint";


//  for login 
export const loginHandler=(body)=>{
    return post(`${ENDPOINTURL}/authenticate`, body);
}

//  for register 
export const RegisterHandler=(body)=>{
    return post(`${ENDPOINTURL}/register/registerUser`,body);
}

//  for forgotPassword
export const ForgotHandler=(body)=>{
    return get(`${ENDPOINTURL}/register/forgetPassword?email=${body}`);
}

//  for RestPassword 
export const ResetPasswordHandler=(email,token,password)=>{
    return get(`${ENDPOINTURL}/register/resetPassword?email=${email}&password=${password}&oldPassword=${token}`)
}

//  for VerfiyPassword 
export const VerfiyHandler=(email,password)=>{
    return get (`${ENDPOINTURL}/register/verifyAccount?email=${email}&password=${password}`)
}

// export const Dashboard
export const DashboardMeetingHandler=(body)=>{
    return post(`${ENDPOINTURL}/meeting/getMeetingListByDateAPI`,body);
}
// for CreateMeeting

export const MeetingHandler=(body)=>{
    return post(`${ENDPOINTURL}/meeting/saveMeeting`,body);
}


export const DeletemeetingHandler=(id)=>{
    return post (`${ENDPOINTURL}/meeting/deleteMeeting?meetingId=${id}`);
}

//  profile rest Handler
export const profileRestPasswordHandler=(userId,oldPassword,newPassword)=>{
    return post(`${ENDPOINTURL}/user/resetPasswordfromOldPassword?userId=${userId}&oldpassword=${oldPassword}&newpassword=${newPassword}`)
}

//  edit username
export const edituserNameHandler=(userId,name)=>{
    return post(`${ENDPOINTURL}/user/editUserName?userId=${userId}&name=${name}`);
}

// upload profile
export const uploadProfileHandler=(body)=>{
    return post(`${ENDPOINTURL}/user/uploadProfilePicture`,body);
}

//  get profile 
export const getProfileHandler=(id)=>{
    return get (`${ENDPOINTURL}/user/getProfilePicture?userId=${id}`);
}

//  getmeetingbyid using in edit meeting 
export const viewMeetingID=(id)=>{
    return get(`${ENDPOINTURL}/meeting/getMeetingById?meetingId=${id}`);
}

// editMeeting 
export const editMeetingId=(body)=>{
    return post(`${ENDPOINTURL}/meeting/editMeeting`,body)
}

export const GetRefershToken=(token)=>{
    return post(`${ENDPOINTURL}/refreshToken`,token)
}

// for only view Meeting Data 
export const MeetingView=(id)=>{
    return get(`${ENDPOINTURL}/meeting/viewMeetingDetail?meetingId=${id}`)
}


export const ViewEmailHandler=(data)=>{
    return post(`${ENDPOINTURL}/meeting/addParticipant`,data);
}


export const ParticipantEmailHandler=(serchText)=>{
    return get(`${ENDPOINTURL}/meeting/getEmailList?searchText=${serchText}`)
}