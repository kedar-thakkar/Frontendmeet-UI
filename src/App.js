import './App.css';
import Loader,{Oval} from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; 
import {BrowserRouter,Routes,Route} from "react-router-dom";
import PreLanuch from "./component/PreLaunch";
import Meeting from './component/Meeting';
import Login from './component/Login';
import ScheduleMeeting from './component/Schedule_Meeting';
import "./intercepter";
import Navbar from './component/Navbar';
import EditProfile from './component/EditProfile';
import MeetingDetail from './component/MeetingDetail';
import Dashboard from './component/Dashboard';
import Forgotpassword from './component/ForgotPassword';
import ResetPassword from './component/ResetPassword';
import Profile from './component/Profile';
import CreateMeeting from './component/CreateMeeting';
import VerfiyAccount from './component/VerfiyAccount';
import Protected from './utils/Protected';
import Information from './component/Information';
 
function App() {
  return (
    <>
    <div id="loader" className="hide">
      <Oval type="Oval" color="#00BFFF" height={50} width={50} radius={18} color="green" secondaryColor arialLabel='oval-loading' />
    </div>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/forgotpassword" element={<Forgotpassword/>}/>
      <Route path="/register/verifyAccount" element={<VerfiyAccount/>}/>
      <Route path="/information" element={<Information/>}/>
      <Route path="/resetpassword" element={<ResetPassword/>}/>
      <Route path="/meeting"  element={<Meeting/>}/>
      <Route element={<Protected/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/preLanuch" element={<PreLanuch/>} /> 
      <Route path="/schedulemeeting" element={<ScheduleMeeting/>}/>
      <Route path="/navbar" element={<Navbar/>}/>
      <Route path="/editprofile" element={<EditProfile/>}/>
      <Route path="/schedulemeeting" element={<ScheduleMeeting/>}/>
      <Route path="/meetingdetail" element={<MeetingDetail/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/createmeeting" element={<CreateMeeting/>}/>

      </Route>
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
