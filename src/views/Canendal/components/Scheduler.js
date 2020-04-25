import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";

import AddPlanSelectedDateDlo from './AddPlanSelectedDateDlg';
import ShowSelectEvent from './ShowSelectEvent';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

export default function Scheduler(props) {
    const [selectedDateBtnOpen, setSelectedDateBtnOpen] = useState(false);
    const [showSelectEventState,setShowSelectEventState] = useState(false);
    const [selectEvent,setSelectEvent] = useState();

    function selectEventFilter(groupId){
      let planLength = props['plan'].length;
      for(let i =0;i<planLength;i++){
        if(props['plan'][i]['groupId'] === parseInt(groupId)){
          setSelectEvent(props['plan'][i]);
          break;
        }
      }
    }

    function selectEventHandle(eventTarget){
      selectEventFilter(eventTarget);
      setShowSelectEventState(true);
    }

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
            eventClick={(event)=>selectEventHandle(event['event']['_def']['groupId'])}
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
                  props['history'].push("/admin/todoList/" + props['location']);
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
        idx={props['location']}
        open={selectedDateBtnOpen}
        handleClose={() => setSelectedDateBtnOpen(false)}
      />
      <ShowSelectEvent event={selectEvent} open={showSelectEventState} handleClose={()=>setShowSelectEventState(false)}/>
    </div>
  );
}
