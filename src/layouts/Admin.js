import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";
import SockJsClient from "react-stomp";

import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";

import * as axiosGet from "@axios/get";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route path={"/login"} />
    <Redirect from="/admin" to="/admin/main" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const [pjtCodeArr, setPjtCodeArr] = useState([]);
  const [alarm, setAlarm] = useState([]);
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [pjtList, setPjtList] = useState([]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const getTeams = () => {
    axiosGet.getNotContainsData(
      "http://localhost:8090/api/teamManage",
      getTeamSuccess
    );
  };

  const getTeamSuccess = (res) => {
    const content = res["content"];
    let contentArr = [];
    let codeArr = [];
    for (let i = 0; i < content.length; i++) {
      contentArr.push({
        path: "/dashboard/" + content[i]["code"],
        name: content[i]["name"],
        code: content[i]["code"],
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin",
      });
      codeArr.push("/topics/" + content[i]["code"]);
    }
    setPjtCodeArr(codeArr);
    setPjtList(contentArr);
  };

  const planBloker = (value) => {
    for (let i = 0; i < pjtList.length; i++) {
      if (pjtList[i]["code"] === value["code"]) {
        for(let j = 0;j<alarm.length;j++){
          if(alarm[j]['code'] === value['code']){
            return;
          }
        }
        let result = pjtList[i];
        setAlarm([...alarm, result]);
        return;
      }
    }
  };

  const showAlarm = (value) => {
    setAlarm([...alarm.filter((alarmInfo)=>alarmInfo['code'] !== value['code'])]);
  }

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className={classes.wrapper}>
      {pjtCodeArr.length !== 0 ? (
        <SockJsClient
          headers={{
            Authorization:
              localStorage.getItem("token_type") +
              " " +
              localStorage.getItem("access_token"),
          }}
          url="http://localhost:8090/chat"
          topics={pjtCodeArr}
          onMessage={planBloker}
        />
      ) : null}
      <Sidebar
        routes={pjtList}
        logoText={"Planner System"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          showAlarm={showAlarm}
          alarm={alarm}
          menuUpdate={getTeams}
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
