import React from "react";
import Navbar from "../Navbar";
import "./EditProfile.css";
import Userprofile from "../../assets/img/Userprofile.png";
import camera from "../../assets/img/Profile_Camera.svg";
function EditProfile() {
    return (
        <>
            <Navbar/>
            <div className="login_section sign_up_section edit_profile">
                <div className="login_otr edit_box_otr">
                    <div className="login_box edit_box">
                        <div className="title">
                            <h2>Edit Profile</h2>
                        </div>
                        <div className="form_box">
                            <div className="profile_image input_col_12">
                                <div className="profile_image_icon">
                                    <img src={Userprofile} alt="" />
                                    <div className="profile_camera_image_icon">
                                        <img src={camera} alt="" />
                                    </div>
                                </div>
                                <div className="profile_text">
                                    <a>Upload Photo</a>
                                </div>
                            </div>
                            <div className="input_box input_col_2">
                                <label>Name</label>
                                <input type="text" value="Kedar Fullstack" />
                            </div>
                            <div className="input_box input_col_2 disabled_input_box">
                                <label>Email</label>
                                <input type="text" value="Kedarfullstack@gmail.com" disabled />
                            </div>
                            <div className="input_box save_btn">
                                <div className="save_tab_btn">
                                    <a>Save</a>
                                </div>
                                <div className="save_tab_btn cancel_btn">
                                    <a>cancel</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile;