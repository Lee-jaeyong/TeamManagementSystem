import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SockJsClient from "react-stomp";
import {
  sendMessage,
  initChatRoom,
} from "@store/actions/SocketAction";

const SocketSection = ({ pjtCodeArr }) => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state["Sockcet"]["socket"]);
  const [conn, setConn] = useState();

  async function socketBloker(value){
    if (
      value["type"] === "message" &&
      value["message"]["user"] !== localStorage.getItem("ID")
    ) {
      const _message = {
        code: value["message"]["code"],
        user: value["message"]["user"],
        userImg: value["message"]["userImg"],
        message: value["message"]["message"],
        socket : true
      };
      await dispatch(sendMessage(_message));
    }
  };

  const createChatRoom = (pjtList) => {
    let result = [];
    pjtList.map((pjt) => {
      result.push({ code: pjt.substring(8), message: [] });
    });
    return result;
  };

  useEffect(() => {
    try{
      if (socket["type"] || socket["type"] === "message") {
        conn.sendMessage("/topics/" + socket["code"], JSON.stringify(socket));
      }
    }catch{}
  }, [socket]);

  useEffect(() => {
    if (pjtCodeArr.length !== 0) {
      dispatch(initChatRoom(createChatRoom(pjtCodeArr)));
    }
  }, [pjtCodeArr]);

  return pjtCodeArr.length !== 0 ? (
    <SockJsClient
      headers={{
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
      }}
      ref={(client) => setConn(client)}
      url="http://localhost:8090/chat"
      topics={pjtCodeArr}
      onMessage={socketBloker}
    />
  ) : (
    <div />
  );
};

export default SocketSection;
