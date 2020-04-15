import React,{useRef,useState} from "react";
import { Switch, Route, Redirect,Link } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import avatar from "assets/img/ProjectManagement.jpg";
import TextField from "@material-ui/core/TextField";

import JoinDialog from './component/Join';

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/login") {
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
    <Redirect from="/login" to="/login" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [joinDialogOpen,setJoinDialogOpen] = useState(false);
  
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const loginHandle = () => {
    rest['history'].push('/admin/dashboard/1');
  }

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
  return (
  <div ref={mainPanel}>
    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
      <div className={classes.content} style={{marginTop:170}}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}/>
          <GridItem xs={12} sm={12} md={6}>
            <Card profile>
              <CardAvatar profile>
                <img src={avatar} style={{height:130}}/>
              </CardAvatar>
              <CardBody profile>
                <h4>프로젝트 일정 관리 시스템</h4>
                Team Management System <span style={{fontSize:15}}>Since 2020-04-14</span>
                <br/>
                <br/>
                <TextField
                  id="outlined-password-input"
                  label="아이디"
                  autoComplete="current-password"
                  variant="outlined"
                  fullWidth
                  style={{marginBottom:10}}
                />
                <TextField
                  id="outlined-password-input"
                  label="비밀번호"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  fullWidth
                />
                <Button color="primary" round fullWidth onClick={loginHandle}>
                  로그인
                </Button>
                <Button round fullWidth>
                  아이디 및 비밀번호 찾기
                </Button>
                <Button onClick={()=>setJoinDialogOpen(true)} round fullWidth>
                  회원가입
                </Button>
                <br/>
                <br/>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <JoinDialog open={joinDialogOpen} handleClose={()=>setJoinDialogOpen(false)}/>
    </div>
  );
}
