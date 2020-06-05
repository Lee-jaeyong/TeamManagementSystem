import { getAccess } from "@axios/get";

export function getUserInfo(){
    return getAccess("http://172.30.1.37:8090/api/users").then(res=>res);
}