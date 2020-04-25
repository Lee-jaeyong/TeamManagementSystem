import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import AddPlanSelectedDateDlo from "./components/AddPlanSelectedDateDlg";

import SelectDateDialog from './components/SelectDateDialog';
import SchedulerSection from './components/Scheduler';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";


const mockData = [
  {"seq" : 1,
  "tag" : "4주차 wiringPi( ) 함수-디지털 입력",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-01",
  "end" : "2020-04-10",
  "teamPlan" : null,
  "progress" : 10},
  {"seq" : 2,
  "tag" : "4주차 강의자료 입니다 참고하세요",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-05",
  "end" : "2020-04-10",
  "teamPlan" : null,
  "progress" : 20},
  {"seq" : 4,
  "tag" : "오늘 수업은 1시부터 실시간 수업으로 진행할 예정입니다",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-11",
  "end" : "2020-04-13",
  "teamPlan" : null,
  "progress" : 30},
  {"seq" : 5,
  "tag" : "자세한 사항은 수업에서 다시 설명하겠습니다",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-20",
  "end" : "2020-04-25",
  "teamPlan" : null,
  "progress" : 40},
  {"seq" : 6,
  "tag" : "여기 게시판이 아닌 수업 게시판에 링크를 공지하겠습니다",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-17",
  "end" : "2020-04-25",
  "teamPlan" : null,
  "progress" : 0},
  {"seq" : 7,
  "tag" : "안녕하세요 학생 여러분 코로나 사태가 지속되면서 온라인 비대면 수업도 이어지고 있네요",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-30",
  "end" : "2020-05-10",
  "teamPlan" : null,
  "progress" : 0},
  {"seq" : 9,
  "tag" : "오늘도 열공 하길 바랍니다",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-03",
  "end" : "2020-04-10",
  "teamPlan" : null,
  "progress" : 0},
]

export default function App(props) {
  const [selectedDateBtnOpen, setSelectedDateBtnOpen] = useState(false);
  const [selectDateDialog,setSelectDateDialog] = useState(false);
  const [selectDate,setSelectDate] = useState();
  const [fileterEventList,setFilterEventList] = useState([]);

  const [plan,setPlan] = useState([]);
  
  const parsePlan = (plan) => {
    let colors = ['#D9418C','#D941C5','#8041D9','#6B66FF','#99004C','#747474'];
    return {
      groupId:plan['seq'],
      title:plan['tag'],
      start:plan['start'],
      end:plan['end'],
      color : colors[plan['seq'] % colors.length]
    }
  }
  
  function handleDateClick(date){
    setSelectDate(date);
    fileterEvent(date);
    setSelectDateDialog(true);
  }

  function fileterEvent(date){
    let eventArr = [];
    for(let i =0;i<mockData.length;i++){
      let start = getTime(mockData[i]['start']);
      let end = getTime(mockData[i]['end']);
      let checkDate = getTime(date);
      if(start <= checkDate && end > checkDate){
        eventArr.push(mockData[i]);
      }
    }
    setFilterEventList(eventArr);
  }

  function getTime(value){
    return new Date(value).getTime();
  }

  useEffect(()=>{
    let planArr = [];
    for(let i =0;i<mockData.length;i++){
      planArr.push(parsePlan(mockData[i]));
    }
    setPlan(planArr);
  },[]);

  return (
    <div>
      <SelectDateDialog open={selectDateDialog} handleClose={()=>setSelectDateDialog(false)} selectDate={selectDate} eventList={fileterEventList}/>
      <SchedulerSection location={props.match.params.idx} history={props['history']} plan={plan} dateClick={handleDateClick}/>
    </div>
  );
}
