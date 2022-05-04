import axios from "axios"
 
export const get=async(url)=>{
    let header;
    var token=localStorage.getItem('token');
    if(token) {
        header = {
            'Authorization': 'Bearer '+token
        }
    }
    try {
        const response = await axios.get(url,{
            headers: header
        });
        if(response && response.data.Status == "200") {
            return response;
        } else {
            return response
        }
    }catch(error){
        console.error(error);
    }
}

export const post= async(url,data)=>{
    let header;
    var token=localStorage.getItem('token');
    if(token) {
        header = {
            'Authorization': 'Bearer '+token
        }
    }
    try {
        const response = await axios.post(url,data, {
            headers: header
        });

        if(response && response.data.Status == "200") {
            return response;
        } else {
            return response;
        }

    }catch(err) {
        console.error(err);
        return err;
    }
}

export const put=()=>{
}


export const remove =async()=>{
}