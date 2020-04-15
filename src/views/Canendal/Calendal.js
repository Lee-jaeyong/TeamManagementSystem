import React,{useState,useEffect} from "react";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

export default function App() {

  useEffect(()=>{

  },[]);

  return(
  <div>
    <FullCalendar
      events={[
        { title: 'event 1', date: '2020-04-01' },
        { title: 'event 1', date: '2020-04-01' },
        { title: '이재용의 스케쥴러',start:'2020-04-01', end: '2020-04-06' ,color:'red'}
      ]}
      dateClick={(date)=>alert(date['dateStr'])}
     defaultView="dayGridMonth" plugins={[ dayGridPlugin,interactionPlugin ]} />
  </div>
)};