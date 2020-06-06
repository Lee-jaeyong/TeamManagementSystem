import React,{useEffect} from "react";

import { getUser } from '@commons/users/methods/UserAccess';

export default function TableList(props) {

  async function _getUser(){
    const res = await getUser();
    // console.log(res);
  }

  useEffect(()=>{
    _getUser();
  },[])

  return (
    <React.Fragment>
    </React.Fragment>
  );
}
