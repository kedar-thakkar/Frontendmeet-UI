import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
function LogMessage (message){
}

export function successToast(message){
    toast.success (message,{            
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme:'colored',
    });
}

export function errorToast(message){
    toast.error(message,{            
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme:'colored',
    });
}


export function getUserData(){
    return JSON.parse(localStorage.getItem('UserData'));
}

export const EventEmitter = {
    events: {},
    // 
    dispatch: function (event, data) {
        if(!this.events[event]) return
        this.events[event].forEach((callback) => callback(data))
    },

    subscribe: function (event,callback) {
        if (!this.events[event]) this.events[event] = []
        this.events[event].push(callback)
    }
}

export const closeOneModal=(modalId)=>{

    // get modal
    const modal = document.getElementById(modalId);
    $('#'+modalId).remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');

     // get modal backdrop
     const modalBackdrops = document.getElementsByClassName('modal-backdrop');

     // remove opened modal backdrop
      document.body.removeChild(modalBackdrops[0]);
  }