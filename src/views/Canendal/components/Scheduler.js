import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";

import AddPlanSelectedDateDlo from 'components/AddPlanSelectedDateDlg/AddPlanSelectedDateDlg';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

export default function Scheduler(props) {
    const [selectedDateBtnOpen, setSelectedDateBtnOpen] = useState(false);
    useEffect(() => {
        let a = document.getElementsByClassName("fc-day fc-widget-content");
        for(let i =0;i<a.length;i++){
            a[i].addEventListener('mouseover', function(event){
                a[i].style.background = '#EAEAEA';
            }); 
            a[i].addEventListener('mouseleave', function(event){
                a[i].style.background = 'white';
            }); 
        }
    });
  return (
    <div id="planList">
      <Fade in timeout={200}>
        <Paper style={{ padding: 30 }} elevation={3}>
          <FullCalendar
            events={props['plan']}
            buttonText={{
              today: "today",
            }}
            editable={true}
            dateClick={(date) => props['dateClick'](date['dateStr'])}
            eventClick={(event)=>alert(event)}
            droppable={true}
            rerenderEvent={props['plan']}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            titleFormat={{ year: "numeric", month: "short", day: "numeric" }}
            customButtons={{
              addSchedule: {
                text: "선택 일정 등록",
                click: function() {
                  setSelectedDateBtnOpen(true);
                },
              },
              showMyTodoList: {
                text: "나의 TODO 리스트",
                click: function() {
                  alert("clicked the custom button!");
                },
              },
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
              right: "print addSchedule showMyTodoList",
            }}
          />
        </Paper>
      </Fade>
      <AddPlanSelectedDateDlo
        open={selectedDateBtnOpen}
        handleClose={() => setSelectedDateBtnOpen(false)}
      />
    </div>
  );
}
