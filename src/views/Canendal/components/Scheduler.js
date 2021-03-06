import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";

import AddPlanSelectedDateDlo from "./AddPlanSelectedDateDlg";
import ShowSelectEvent from "./ShowSelectEvent";
import MessageBox from "components/MessageBox/MessageBox";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const dateMonthCheck = (value) => {
  const check = value + "";
  if (check.length === 1) return "0" + check;
  return check;
};

const parseDate = (date) => {
  const year = date.getFullYear();
  const month = dateMonthCheck(date.getMonth() + 1);
  const day = dateMonthCheck(date.getDate());
  return year + "-" + month + "-" + day;
};

export default function Scheduler(props) {
  const [date, setDate] = useState(parseDate(new Date()));
  const [selectedDateBtnOpen, setSelectedDateBtnOpen] = useState(false);
  const [showSelectEventState, setShowSelectEventState] = useState(false);
  const [selectEvent, setSelectEvent] = useState();
  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });

  const messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  function selectEventFilter(groupId) {
    let planLength = props["plan"].length;
    for (let i = 0; i < planLength; i++) {
      if (props["plan"][i]["groupId"] === parseInt(groupId)) {
        setSelectEvent(props["plan"][i]);
        break;
      }
    }
  }

  function selectEventHandle(eventTarget) {
    selectEventFilter(eventTarget);
    setShowSelectEventState(true);
  }

  useEffect(() => {
    let a = document.getElementsByClassName("fc-day fc-widget-content");
    for (let i = 0; i < a.length; i++) {
      a[i].addEventListener("mouseover", function(event) {
        a[i].style.background = "#EAEAEA";
      });
      a[i].addEventListener("mouseleave", function(event) {
        a[i].style.background = "white";
      });
    }
  });
  return (
    <div id="planList">
      <Fade in timeout={1000}>
        <Paper style={{ padding: 30 }} elevation={3}>
          <FullCalendar
            events={props["plan"]}
            buttonText={{
              today: "today",
            }}
            editable={true}
            dateClick={(date) => props["dateClick"](date["dateStr"])}
            eventClick={(event) =>
              selectEventHandle(event["event"]["_def"]["groupId"])
            }
            droppable={true}
            rerenderEvent={props["plan"]}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            titleFormat={{ year: "numeric", month: "short", day: "numeric" }}
            customButtons={{
       
              print: {
                text: "일정 인쇄",
                click: function() {
                  window.print();
                },
              },
            }}
            header={{
              left: "prev,next today",
              center: "title",
              right: "print addSchedule",
            }}
          />
        </Paper>
      </Fade>
      <AddPlanSelectedDateDlo
        updatePlanList={props.updatePlanList}
        messageBoxHandle={messageBoxHandle}
        idx={props["location"]}
        open={selectedDateBtnOpen}
        handleClose={() => setSelectedDateBtnOpen(false)}
      />
      <ShowSelectEvent
        updatePlanList={props.updatePlanList}
        messageBoxHandle={messageBoxHandle}
        event={selectEvent}
        open={showSelectEventState}
        handleClose={() => setShowSelectEventState(false)}
      />
      <MessageBox
        open={showMessageState}
        content={MessageBoxState["content"]}
        level={MessageBoxState["level"]}
        time={MessageBoxState["time"]}
        handleClose={() => setShowMessageState(false)}
      />
    </div>
  );
}
