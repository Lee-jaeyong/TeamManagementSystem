import axios from 'axios';

export async function deleteNotContainsData(URL,func){
    axios.delete(URL,{
        headers: {
            Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
        }
    }).then(res=>func(res.data));
}