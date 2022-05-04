import axios from "axios";
import { getUserData } from "./utils/helper";
import {GetRefershToken} from "./service/auth.services";

axios.interceptors.request.use((req) => {
    document.getElementById('loader').classList.remove('hide');
    document.getElementById('loader').classList.add('show');
    return req;
}, (error) => {
    console.error('Intercepter Request Error: ', error);
});

axios.interceptors.response.use((res) => {

    document.getElementById('loader').classList.add('hide');
    document.getElementById('loader').classList.remove('show');

    return res;
}, async (err) => {
    console.error('Intercepter Response Error: ', err);
    if (err.response !== undefined) {

        // refersh token
        if(err.response.data.Status==="ATE400" || err.response.status==="ATE400"){
            const Token = getUserData();
            // pass refersh token to api 
            const res = await GetRefershToken({refreshToken:Token.refreshToken});
            if(res.data.Status=="200"){
                localStorage.setItem('token',res.data.data.token);
                window.location.reload();
            }else{
                localStorage.clear();
                window.location.replace('/');
            }
        }
        if (err.response.data.Status === '401' || err.response.status === 401) {
            localStorage.clear();
            window.location.replace('/');

        }
        if(err.response.data.Status === '500' || err.response.status === 500) {
        }
    }
})