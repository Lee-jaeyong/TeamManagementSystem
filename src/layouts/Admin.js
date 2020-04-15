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
import logo from "assets/img/reactlogo.png";

import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";

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
    <Route
      path={'/login'}
    />
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [pjtList,setPjtList] = useState([
    {
      path: "/dashboard/"+1,
      name: "C언어 프로젝트",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    ,{
      path: "/dashboard/"+2,
      name: "자바 프로젝트",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    ,{
      path: "/dashboard/"+3,
      name: "시스템 프로젝트",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    ,{
      path: "/dashboard/"+4,
      name: "JPA 프로젝트",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    ,{
      path: "/dashboard/"+5,
      name: "스프링 프로젝트",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    ,{
      path: "/dashboard/"+6,
      name: "REACT 프로젝트",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    ,{
      path: "/dashboard/"+7,
      name: "운영체제 프로젝트",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
  ]);

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
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  useEffect(()=>{
  },[]);

  return (
    <div className={classes.wrapper}>
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
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
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
