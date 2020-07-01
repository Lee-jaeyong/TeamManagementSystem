import axios from 'axios';

export async function patchContainsData(URL,func,error,data){
    axios.patch(URL,data,{
        headers: {
            Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
        }
    }).then(res=>func(res.data)).catch(res=>error(res));
}

export async function patchNotContainsData(URL,func){
    axios.patch(URL,{},{
        headers: {
            Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
        }
    }).then(res=>func(res.data)).catch(res=>alert(res));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

export async function patchAccess(URL, data) {
    let res = await axios.patch(URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
      },
    });
    return res.data;
  }
  