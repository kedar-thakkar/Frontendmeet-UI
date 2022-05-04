import React, { useEffect,useState} from 'react';
import './Profile.css';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import Profile_Camera from "../../assets/img/Profile_Camera.png";
import profilepicture from "../../assets/img/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg";
import { Link } from "react-router-dom";
import {profileRestPasswordHandler,edituserNameHandler,uploadProfileHandler} from "../../service/auth.services";
import { errorToast, getUserData, successToast, EventEmitter ,closeOneModal} from '../../utils/helper';
import {PASSWORD_REGEX} from "../../utils/validation";
function Profile(props) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userName,setUserName]=useState('');
    const [userEmail,setUserEmail]=useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [userPicture,setUserPicture]=useState('');
    const [isoldPass,setIsOldPass] = useState('');
    const [isnewPass,setIsNewPass] = useState('');
    const [isconfrimPass,setIsConfrimPass] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        $(document).ready(function () {
            $('.js-edit, .js-save').on('click', function () {
                var $form = $(this).closest('.profile_input_edit');
                $form.toggleClass('is-readonly is-editing');
                var isReadonly = $form.hasClass('is-readonly');
                $form.find('input,textarea').prop('disabled', isReadonly);
            });
        });



        $(".profile_input_edit a").click(function () {
            $(".Password_reset_box:first").addClass("intro");
        });
        $(".remove_password_box").click(function () {
            $(".Password_reset_box:first").removeClass("intro");
        });
    }, [])

    useEffect(()=>{
        if(props.userName){
            setUserName(props.userName);
        }
    },[props.userName])


    useEffect(()=>{
        if(props.userEmail){
            setUserEmail(props.userEmail);
        }
    },[props.userEmail])

    useEffect(()=>{
        setUserPicture(props.UserPicture)
    },[props.UserPicture])

    
    function profileValidation(){
        let formIsValid = true;
     if(oldPassword===''){
         formIsValid = false;
         setIsOldPass("Enter Your Old Password");
     }else{
         setIsOldPass('');
     }
     if(!PASSWORD_REGEX.test(newPassword)===true){
         formIsValid = false; 
         setIsNewPass("Password does not Match With Password Policy");
     }else{
         setIsNewPass('');
     }
     
     return formIsValid;
     }

    //  chnage password from  profile
    const restPasswordHandler =async() => {
        if(newPassword==""){
            setIsNewPass("please enter password");
            if (oldPassword==""){
                setIsOldPass('please enter old password');
            }else{
                setIsOldPass('')
            }
        }else{
        if(profileValidation()){
            setIsOldPass('');
            setIsNewPass('');
            setIsConfrimPass('');
        if (newPassword === confirmNewPassword) {
            var userId = localStorage.getItem('userId');
            const response = await profileRestPasswordHandler(userId,oldPassword,newPassword);
            if(response.data.Status==="200"){
                successToast(response.data.message);
                closeOneModal('profile_popup');
                $('#close').click();
                localStorage.clear();
                navigate('/');
            }else{
                errorToast(response.data.message);
            }
        }else{
            setIsConfrimPass("New Password and Confirm Password does not match !");
        }
    }
      }
    }



    //  when user want change name 
    const UserMeetingHandler=async()=>{
        var userId = localStorage.getItem('userId');
        EventEmitter.dispatch('username',userName);
        const response = await edituserNameHandler(userId,userName);
        if(response.data.Status==="200"){
            successToast(response.data.message);
        }else{
            errorToast(response.data.message);
        }
    }

    //  onclick camera 
    const profileHandler=()=>{
        $('#profile_upload').click();
    }

    // for image upload
    const uploadHandler=(e)=>{
        if(e.target.files[0].size<1e6){
            setUserPicture(URL.createObjectURL(e.target.files[0]));
            upoladprofilepicture(e.target.files[0]);
        }else{
            errorToast("File size must under 1 MB !")
        }
    }

    const ClearState=()=>{
       setOldPassword('');
       setNewPassword('');
       setConfirmNewPassword('');
       setIsOldPass('');
       setIsNewPass('');
       setIsConfrimPass('');
    }


    //  get picture and call api for upload picture 
    const upoladprofilepicture=async(profilepicture)=>{
        let body = new FormData();
        var userId = localStorage.getItem('userId');
        body.append('userId', userId);
        body.append('file',profilepicture);

        if(body){
            const  response = await uploadProfileHandler(body);
            if(response.data.Status==="200"){
                if(response.data.data){
                    EventEmitter.dispatch('updateProfilePic', response.data.data)
                    const userDetail = getUserData();
                    userDetail['profilePic'] = response.data.data;
                    localStorage.setItem('UserData',JSON.stringify(userDetail));
                }
                successToast(response.data.message);
            }else{
                errorToast(response.data.message);
            }
        }
    }

    return (
        <>
            <div className="modal fade" id="profile_popup" tabIndex="-1" aria-labelledby="profile_popupLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered profile_popup_main_box">
                    <div className="modal-content">
                        <div className="modal-header title">
                            <h3>Profile</h3>
                            <a className="close_icon" id="close" data-bs-dismiss="modal" onClick={ClearState}>
                                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.54106 0.111794C2.01687 0.48222 0.701014 1.8005 0.349725 3.30888C0.0974442 4.3924 0.286655 5.65273 0.84144 6.58342C0.961651 6.78503 4.59969 10.487 8.92603 14.8101L16.7921 22.6703L8.81346 30.6676C0.223225 39.2779 0.4623 39.0131 0.130776 40.2858C-0.136239 41.3111 0.00715129 42.3827 0.547022 43.3956C1.39703 44.9904 3.38393 45.7641 5.48546 45.3187C6.73771 45.0532 6.41157 45.3462 14.9529 36.8147C19.3017 32.4708 22.8994 28.9168 22.9479 28.9168C22.9962 28.9168 26.5942 32.4699 30.9432 36.8127C38.276 44.1349 38.893 44.7285 39.4346 44.9809C41.2921 45.8472 43.5416 45.4942 44.8272 44.1348C46.0358 42.8569 46.3155 40.9027 45.5258 39.2547C45.2644 38.7092 44.6379 38.0623 37.1954 30.6533L29.1475 22.6417L36.9758 14.7959C41.852 9.90872 44.89 6.79752 45.0322 6.54569C45.4299 5.84095 45.5686 5.18356 45.5232 4.2199C45.4743 3.18625 45.2583 2.55833 44.6926 1.8058C43.5882 0.336583 41.5835 -0.281452 39.8389 0.309361C38.8447 0.646005 38.3903 1.06674 30.5899 8.87219L22.958 16.5091L15.0916 8.6748C6.64606 0.2639 6.8519 0.449517 5.60469 0.124642C4.98503 -0.0367174 4.17303 -0.0418385 3.54106 0.111794Z" fill="white" />
                                </svg>
                            </a>
                        </div>
                        <div className="modal-body">
                            <div className="form_box foot_main">
                                <div className="profile_image input_col_12">
                                    <div className="profile_image_icon profile_image_icon_one">
                                        <img src={userPicture ? userPicture : profilepicture} alt="" />
                                        <div className="profile_camera_image_icon">
                                            <img src={Profile_Camera} alt="" onClick={profileHandler}/>
                                            <input type="file" name="img" className="profile_uploder_img" id="profile_upload" accept=".jpeg,.jpg,.png" onChange={uploadHandler}/>
                                        </div>
                                    </div>

                                </div>
                                <div className="profile_info_side">
                                    <div className="input_box profile_input">
                                        <label>User Name</label>
                                        <div className="profile_input_edit is-readonly">
                                            <div className="input_box_mane_info">
                                                <input type="text" className="form-control is-disabled" id="exampleInputPassword1" placeholder="Name" value={userName} onChange={(e)=>setUserName(e.target.value)}  disabled />
                                            </div>
                                            <div className="profile_edit_btn">
                                                <button type="button" className="name_edit_btn_box name_edit_btn js-edit">
                                                    <svg className="" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.07 0.216484C9.58122 0.524594 0.422703 9.7624 0.354016 10.0167C0.321531 10.137 0.213141 10.8944 0.113172 11.6999C-0.0852342 13.2999 -0.0502342 13.5304 0.440313 13.8518C0.700953 14.0226 0.820391 14.022 2.27738 13.8436C3.13444 13.7386 3.95869 13.5886 4.10908 13.5102C4.60695 13.2509 13.8238 3.9162 13.9032 3.59092C13.9435 3.42555 13.9487 3.17902 13.9145 3.04317C13.8804 2.90733 13.2187 2.16905 12.4441 1.40255C10.9101 -0.11525 10.7351 -0.202641 10.07 0.216484ZM11.6009 2.41481L12.4706 3.28959L11.7652 4.00119L11.0599 4.71289L10.155 3.81273L9.25025 2.91269L9.93045 2.22636C10.3045 1.84902 10.6378 1.54014 10.671 1.54014C10.7042 1.54014 11.1228 1.93378 11.6009 2.41481ZM6.78122 8.98519L3.43599 12.3317L2.43269 12.448C1.88089 12.512 1.42152 12.5572 1.412 12.5483C1.40238 12.5395 1.44547 12.0894 1.5077 11.548L1.62091 10.5636L4.96899 7.20106L8.31706 3.83866L9.22181 4.73859L10.1265 5.63864L6.78122 8.98519Z" fill="#F16A54" />
                                                    </svg>
                                                </button>
                                                <button type="button" className="btn name_edit_btn btn-default btn-save js-save btn_hide" onClick={UserMeetingHandler}><svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.1832 0.326103C11.6855 0.694587 10.8565 1.54957 9.73247 2.85409C9.29191 3.36542 8.04132 4.74518 6.95347 5.9202C5.86552 7.09532 4.85216 8.21937 4.70155 8.41821L4.42768 8.77981L3.1668 7.5396C1.52585 5.92545 0.727739 5.51584 0.217614 6.02596C-0.449355 6.69293 0.467317 8.87125 2.27714 10.9199C3.49208 12.2952 4.36708 12.587 5.36414 11.9494C6.01766 11.5315 6.50788 10.9849 8.76406 8.15878C9.82052 6.83534 11.3091 4.98963 12.0721 4.05721C14.0107 1.68793 14.2981 1.03901 13.7157 0.346884C13.3328 -0.108335 12.7802 -0.115772 12.1832 0.326103Z" fill="black" />
                                                </svg>                                        </button>
                                                <button type="button" className="btn name_edit_btn btn-default btn-cancel js-save btn_hide"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.744778 0.0935056C0.195528 0.31542 -0.0830583 1.17708 0.208325 1.75263C0.270075 1.87461 1.30947 2.96854 2.51806 4.18343L4.71536 6.39241L2.46728 8.65218C1.23075 9.8951 0.168512 11.0118 0.106762 11.1338C-0.0484255 11.4404 -0.0336989 11.8325 0.146168 12.1804C0.372856 12.6186 0.685973 12.7909 1.25625 12.7909H1.76182L4.10457 10.4558L6.44731 8.12091L8.62908 10.3103C9.82904 11.5145 10.9342 12.5653 11.0851 12.6453C11.4415 12.8345 12.0133 12.8308 12.3884 12.6368C12.9039 12.3702 13.1417 11.6464 12.8821 11.1338C12.8204 11.0118 11.7463 9.88322 10.4954 8.62598L8.221 6.34001L10.5062 4.05648C12.2721 2.29183 12.805 1.69982 12.8517 1.45089C13.0155 0.578467 12.1797 -0.178073 11.294 0.0407947C11.1151 0.0849744 10.197 0.923271 8.75319 2.36048L6.4924 4.61111L4.53834 2.67665C1.92219 0.0868024 1.80946 -0.00754908 1.33983 0.000372801C1.13051 0.00392749 0.862793 0.0458728 0.744778 0.0935056Z" fill="black" />
                                                </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input_box input_col_2 disabled_input_box profile_input">
                                        <label>Email</label>
                                        <div className="profile_input_edit">
                                            <input type="text"  value={userEmail} disabled />
                                            {/* <!-- <p>Manojdavidrfullstack@gmail.com</p> --> */}
                                        </div>
                                    </div>
                                    <div className="Password_reset_box">
                                        <div className="input_box profile_input open_remove_password" >
                                            <label>Password</label>
                                            <div className="profile_input_edit">
                                                {/* <!-- <p>*************</p> --> */}
                                                <input type="Password" placeholder="*************" disabled />
                                                <a href="javascript:void(0)"><svg className="js-edit pass_hide" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.07 0.216484C9.58122 0.524594 0.422703 9.7624 0.354016 10.0167C0.321531 10.137 0.213141 10.8944 0.113172 11.6999C-0.0852342 13.2999 -0.0502342 13.5304 0.440313 13.8518C0.700953 14.0226 0.820391 14.022 2.27738 13.8436C3.13444 13.7386 3.95869 13.5886 4.10908 13.5102C4.60695 13.2509 13.8238 3.9162 13.9032 3.59092C13.9435 3.42555 13.9487 3.17902 13.9145 3.04317C13.8804 2.90733 13.2187 2.16905 12.4441 1.40255C10.9101 -0.11525 10.7351 -0.202641 10.07 0.216484ZM11.6009 2.41481L12.4706 3.28959L11.7652 4.00119L11.0599 4.71289L10.155 3.81273L9.25025 2.91269L9.93045 2.22636C10.3045 1.84902 10.6378 1.54014 10.671 1.54014C10.7042 1.54014 11.1228 1.93378 11.6009 2.41481ZM6.78122 8.98519L3.43599 12.3317L2.43269 12.448C1.88089 12.512 1.42152 12.5572 1.412 12.5483C1.40238 12.5395 1.44547 12.0894 1.5077 11.548L1.62091 10.5636L4.96899 7.20106L8.31706 3.83866L9.22181 4.73859L10.1265 5.63864L6.78122 8.98519Z" fill="#F16A54" />
                                                </svg></a>
                                            </div>
                                        </div>
                                        <div className="add_new_password">
                                            <div className="info_add_new_info">
                                                <div className="info_new_password input_box profile_input">
                                                    <label>Old Password</label>
                                                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                                </div>
                                                <p className="show-error">{isoldPass}</p><br/>
                                                <div className="info_new_password input_box profile_input">
                                                    <label>Create New Password</label>
                                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                                </div>
                                                <p className="show-error">{isnewPass}</p><br/>
                                                <div className="info_new_password input_box profile_input">
                                                    <label>Confirm New Password</label>
                                                    <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                                </div>
                                                <p className="show-error">{isconfrimPass}</p>
                                            </div>
                                            <div className="new_password_btn">
                                                <button type="button" className="btn btn-primary" onClick={restPasswordHandler}>Submit</button>
                                                <button type="button" className="btn btn-secondary remove_password_box" id="close" onClick={ClearState}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
