import React, { useState } from "react";
import { Launcher } from "react-chat-window";

export default function ChatDialog() {
  const [messageList, setMessageList] = useState([
    {
      author: "them",
      type: "text",
      data: { text: "답장" }
    },
    {
      author: "them",
      type: "text",
      data: { text: "답장" }
    },
    {
      author: "them",
      type: "text",
      data: { text: "답장" }
    }
  ]);

  const _onMessageWasSent = e => {
    setMessageList(messageList.concat(e));
  };

  // const _sendMessage = (text) => {
  //   if (text.length > 0) {
  //     setMessageList(
  //       messageList.concat({
  //         author: "them",
  //         type: "text",
  //         data: text,
  //       })
  //     );
  //   }
  // };

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "react-chat-window",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
        }}
        onMessageWasSent={_onMessageWasSent}
        messageList={messageList}
        showEmoji
      />
    </div>
  );
}
