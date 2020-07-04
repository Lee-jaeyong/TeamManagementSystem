import React, { useRef, useState } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import JoinDialog from "./component/Join";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-5.jpg";

import MessageBox from "components/MessageBox/MessageBox";
import * as Oauth from "@oauth/oauth";

let ps;

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const id = useRef();
  const pass = useRef();
  const classes = useStyles();
  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  const loginHandle = () => {
    if (id.current.value.trim() === "") {
      messageBoxHandle(true, "아이디를 입력해주세요.", 2000, "error");
      id.current.focus();
      return;
    } else if (pass.current.value.trim() === "") {
      messageBoxHandle(true, "비밀번호를 입력해주세요.", 2000, "error");
      pass.current.focus();
      return;
    }
    const user = {
      id: id.current.value,
      pass: pass.current.value,
    };
    if(state['checkedB']){
    }else if(state['checkedA']){
    }
    Oauth.getAccessToken(user, loginSuccess, loginError);
  };

  const messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  const loginError = () => {
    messageBoxHandle(
      true,
      "아이디 혹은 비밀번호가 일치하지 않습니다.",
      2000,
      "error"
    );
  };

  const loginSuccess = () => {
    rest["history"].push("/admin/main");
  };

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
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
    <div
      ref={mainPanel}
      style={{
        backgroundImage: "url(" + bgImage + ")",
        backgroundSize: "cover",
        backgroundRepeat: "noReat",
      }}
    >
      <div className={classes.content} style={{ marginTop: 170 }}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4} />
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardBody profile>
                <h4><strong>K튜터링 시스템</strong></h4>
                경민대학교 튜터링 관리 시스템{" "}
                <span style={{ fontSize: 15 }}>Since 2020-04-14</span>
                <br />
                <br />
                <TextField
                  inputRef={id}
                  id="outlined-password-input"
                  label="아이디"
                  autoComplete="current-password"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: 10 }}
                  onKeyUp={() => {
                    if (window.event.keyCode === 13) loginHandle();
                  }}
                />
                <TextField
                  inputRef={pass}
                  id="outlined-password-input"
                  label="비밀번호"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  fullWidth
                  onKeyUp={() => {
                    if (window.event.keyCode === 13) loginHandle();
                  }}
                />
                <Button
                  color="primary"
                  round
                  fullWidth
                  onClick={loginHandle}
                  style={{ marginTop: 20 }}
                >
                  로그인
                </Button>
                <Button onClick={() => setJoinDialogOpen(true)} round fullWidth>
                  회원가입
                </Button>
                <br />
                <br />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <JoinDialog
        messageBoxHandle={messageBoxHandle}
        open={joinDialogOpen}
        handleClose={() => setJoinDialogOpen(false)}
      />
      <MessageBox
        open={showMessageState}
        content={MessageBoxState["content"]}
        level={MessageBoxState["level"]}
        time={MessageBoxState["time"]}
        handleClose={() => setShowMessageState(false)}
      />
    </div>
  );
}
