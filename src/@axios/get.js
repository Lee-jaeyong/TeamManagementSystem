import axios from 'axios';

export async function getFileDownload(URL,fileName){
    axios({
        url: URL,
        method: 'get',
        headers : {
            Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
        },
        responseType: 'blob'
    }).then((res)=>{
        console.log(res);
        const url = window.URL.createObjectURL(
            new Blob([res.data], {
             type: res.headers['content-type']
        }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    });
}

export async function getNotContainsData(URL,func){
    axios({
        url: URL,
        method: 'get',
        headers : {
            Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
        }
    }).then(
        res=>func(res.data)
    );
}

export async function getContainsData(URL,func,data,auth){
    let _dataArr = [];
    for(let key in data){
        _dataArr.push(key);
    }
    let addURL = "?";
    for(let i =0;i<_dataArr.length;i++){
        addURL += _dataArr[i]+"="+data[_dataArr[i]];
        if(i !== _dataArr.length-1)
        addURL += '&';
    }
    if(auth){
        axios({
            url: URL+addURL,
            method: 'get',
            data: data,
            headers : {
                Authorization:localStorage.getItem('token_type')+' '+localStorage.getItem('access_token')
            }
        }).then(
            res=>func(res.data)
        );
    }else
    {
        axios({
            url: URL+addURL,
            method: 'get',
            data: data,
        }).then(
            res=>func(res.data)
        );
    }
}