import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { readTeamListHandle } from "@store/actions/Team/TeamAction";

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
import SocketSection from "@commons/component/SocketSection";

import PeopleIcon from "@material-ui/icons/People";
import ContactsIcon from "@material-ui/icons/Contacts";

import DashboardPage from "views/Dashboard/Dashboard.js";

import MessageBox from "@commons/component/MessageBox";
import ConfirmDialog from "@commons/component/ConfirmDialog";
import FormDialog from "@commons/component/FormDialog";
import Chat from "@commons/component/Chat";

import { getTeamList } from "@commons/team/methods/TeamAccess";
import { getUserInfo } from "@commons/users/methods/UserAccess";

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
  const dispatch = useDispatch();
  const myPjtList = useSelector((state) => state["Team"]["teamList"], []);

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

  const createMenu = (data) => {
    const content = data;
    let contentArr = [];
    for (let i = 0; i < content.length; i++) {
      contentArr.push({
        path: "/dashboard/" + content[i]["code"],
        name: content[i]["name"],
        code: content[i]["code"],
        icon:
          content[i]["teamLeader"]["id"] === localStorage.getItem("ID")
            ? ContactsIcon
            : PeopleIcon,
        component: DashboardPage,
        layout: "/admin",
      });
    }
    return contentArr;
  };

  const createCodeArr = (data) => {
    const content = data;
    let codeArr = [];
    for (let i = 0; i < content.length; i++) {
      codeArr.push("/topics/" + content[i]["code"]);
    }
    return codeArr;
  };

  async function getTeams() {
    let res = await getTeamList();
    dispatch(readTeamListHandle(res["content"]));
  }

  const showAlarm = (value) => {
    setAlarm([
      ...alarm.filter((alarmInfo) => alarmInfo["code"] !== value["code"]),
    ]);
  };

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    setPjtCodeArr(createCodeArr(myPjtList));
    setPjtList(createMenu(myPjtList));
  }, [myPjtList]);

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

  return (
    <div className={classes.wrapper}>
      <FormDialog />
      <MessageBox />
      <ConfirmDialog />
      <SocketSection {...{ pjtCodeArr }} />
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
      <Chat
        user={{
          id: localStorage.getItem("ID"),
        }}
        teamList={createMenu(myPjtList)}
      />
    </div>
  );
}
