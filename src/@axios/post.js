import axios from 'axios';

export async function postNotContainsData(URL,func){
    axios.post(URL,{
        headers: {
            Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
        }
    }).then(res=>func(res.data));
}

export async function postFileUpload(URL,func,formData){
    axios.post(URL,formData,{
        headers: {
            Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
        }
    }).then(res=>func(res.data));
}

export async function postContainsData(URL,func,data){
    axios.post(URL,data,{
        headers: {
            'Content-Type': 'application/json',
            Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
        }
    }).then(res=>func(res.data));
}