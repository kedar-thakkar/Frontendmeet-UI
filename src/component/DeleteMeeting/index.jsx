import React from 'react';
import "./DeleteMeeting.css";
import { DeletemeetingHandler } from "../../service/auth.services";
import { errorToast, successToast } from '../../utils/helper';
function DeleteMeeting(props) {
  const DeleteMeetingHandler = async (id) => {
    const response = await DeletemeetingHandler(id);
    if(response){
      if(response.data.Status==="200"){
        props.parentMethod()
        successToast(response.data.message);
      }else{
        errorToast(response.data.message);
      }
    }
  }
  return (
    <>
      <div className="modal fade" id="delete_popup" tabIndex="-1" aria-labelledby="delete_popupLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered delete_popup">
          <div className="modal-content">
            <div className="modal-header center_mood">
              <a  className="close_icon" data-bs-dismiss="modal">
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.54106 0.111794C2.01687 0.48222 0.701014 1.8005 0.349725 3.30888C0.0974442 4.3924 0.286655 5.65273 0.84144 6.58342C0.961651 6.78503 4.59969 10.487 8.92603 14.8101L16.7921 22.6703L8.81346 30.6676C0.223225 39.2779 0.4623 39.0131 0.130776 40.2858C-0.136239 41.3111 0.00715129 42.3827 0.547022 43.3956C1.39703 44.9904 3.38393 45.7641 5.48546 45.3187C6.73771 45.0532 6.41157 45.3462 14.9529 36.8147C19.3017 32.4708 22.8994 28.9168 22.9479 28.9168C22.9962 28.9168 26.5942 32.4699 30.9432 36.8127C38.276 44.1349 38.893 44.7285 39.4346 44.9809C41.2921 45.8472 43.5416 45.4942 44.8272 44.1348C46.0358 42.8569 46.3155 40.9027 45.5258 39.2547C45.2644 38.7092 44.6379 38.0623 37.1954 30.6533L29.1475 22.6417L36.9758 14.7959C41.852 9.90872 44.89 6.79752 45.0322 6.54569C45.4299 5.84095 45.5686 5.18356 45.5232 4.2199C45.4743 3.18625 45.2583 2.55833 44.6926 1.8058C43.5882 0.336583 41.5835 -0.281452 39.8389 0.309361C38.8447 0.646005 38.3903 1.06674 30.5899 8.87219L22.958 16.5091L15.0916 8.6748C6.64606 0.2639 6.8519 0.449517 5.60469 0.124642C4.98503 -0.0367174 4.17303 -0.0418385 3.54106 0.111794Z" fill="white" />
                </svg>
              </a>
            </div>
            <div className="modal-body delete_text center_mood">
              <p>Do you really want to delete <strong>{props.meetingTitle}</strong>  meeting ?</p>
            </div>
            <div className="modal-footer delete_btn_center">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(id) => DeleteMeetingHandler(props.meetingId)}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteMeeting;
