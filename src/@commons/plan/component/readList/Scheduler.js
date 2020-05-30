import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const colors = [
  "#D9418C",
  "#D941C5",
  "#8041D9",
  "#6B66FF",
  "#99004C",
  "#747474",
];

export default function Scheduler({ plan }) {
  const [planList, setPlanList] = useState([]);
  const parsePlan = (planValue, name, isMyPlan, users) => {
    let color = "";
    for(let i =0;i<users.length;i++){
      if(users[i]['id'] === planValue["user"]['id']){
        color = users[i]['color'];
        break;
      }
    }
    return {
      groupId: planValue["seq"],
      title: planValue["tag"] + " < " + name + " > ",
      start: planValue["start"],
      end: planValue["end"],
      user: planValue["user"],
      progress: planValue["progress"],
      content: planValue["content"],
      color: isMyPlan ? "red" : color,
    };
  };

  const parsePlanList = (planValue) => {
    let plans = [];
    if (!planValue) return plans;
    let users = [];
    planValue.map((plan,idx) => {
      let check = true;
      for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] === plan["user"]["id"]) {
          check = false;
          break;
        }
      }
      if (check) users.push({id:plan["user"]["id"],color:colors[idx]});
    });
    planValue.map((plan) => {
      plans.push(
        parsePlan(
          plan,
          plan["user"]["name"],
          plan["user"]["id"] === localStorage.getItem("ID"),
          users
        )
      );
    });
    return plans;
  };

  useEffect(() => {
    setPlanList(parsePlanList(plan));
  }, [plan]);

  return (
    <div>
      <FullCalendar
        events={planList}
        buttonText={{
          today: "today",
        }}
        titleFormat={{ year: "numeric", month: "long" }}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, interactionPlugin]}
        titleFormat={{
          year: "numeric",
          month: "short",
          day: "numeric",
        }}
        header={{
          left: "",
          center: "",
          right: "",
        }}
      />
    </div>
  );
}
