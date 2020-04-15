import React,{useState,useEffect} from "react";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

export default function App() {

  useEffect(()=>{

  },[]);

  return(
  <div>
    <Fade in timeout={200}>
      <Paper style={{padding:30}} elevation={3}>
      <FullCalendar
        events={[
          { title: 'event 1', date: '2020-04-01' },
          { title: 'event 1', date: '2020-04-01' },
          { title: '이재용의 스케쥴러',start:'2020-04-01', end: '2020-04-06' ,color:'red'}
        ]}
        buttonText={
          {
            today:    'today',
          }
        }
        titleFormat={
          { year: 'numeric', month: 'long' }
        }
        dateClick={(date)=>alert(date['dateStr'])}
        selectable={true}
        droppable={true}
        select={(e)=>console.log(e)}
        defaultView="dayGridMonth" plugins={[ dayGridPlugin,interactionPlugin ]}
        titleFormat={{ year: 'numeric', month: 'short', day: 'numeric' }}
        customButtons={{
          addSchedule: {
              text: '선택 일정 등록',
              click: function() {
                  alert('clicked the custom button!');
              },
          },
          showMyTodoList : {
            text: '나의 TODO 리스트',
              click: function() {
                  alert('clicked the custom button!');
              },
          }
        }}
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'addSchedule showMyTodoList'
        }}
        />
      </Paper>
    </Fade>
  </div>
)};
