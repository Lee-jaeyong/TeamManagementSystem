import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MessageBox from "components/MessageBox/MessageBox";

import * as axiosPost from "@axios/post";
import * as axiosGet from "@axios/get";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#EAEAEA",
    color: "#4C4C4C",
    width: 30,
    height: 30,
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "white",
    },
  },
}))(Badge);

const useStyles = makeStyles(styles);

export default function FormDialog(props) {
  const id = useRef();
  const pass = useRef();
  const passCheck = useRef();
  const email = useRef();
  const name = useRef();
  const classes = useStyles();
  const imgUpload = useRef();
  const [dupCheck, setDupCheck] = useState(null);
  const [open, setOpen] = useState(props["open"]);
  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });

  const messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  const handleClose = () => {
    setOpen(false);
    props["handleClose"]();
  };

  const joinSuccess = () => {
    props.messageBoxHandle(true, "회원가입 완료", 2000, "success");
    handleClose();
  };

  const joinError = () => {
    messageBoxHandle(true, "이메일 형식이 잘못되었습니다.", 2000, "error");
    email.current.focus();
  };

  const checkDupId = (input) => {
    if (input.trim() === "") {
      setDupCheck(null);
      return;
    }
    axiosGet.getContainsData(
      "http://172.30.1.37:8090/api/users/dupId",
      getResponse,
      { id: input },
      false
    );
    function getResponse(data) {
      setDupCheck(data);
    }
  };

  const joinHandle = () => {
    if (id.current.value.trim() === "") {
      messageBoxHandle(true, "아이디를 입력해주세요.", 2000, "error");
      id.current.focus();
    } else if (pass.current.value.trim() === "") {
      messageBoxHandle(true, "비밀번호를 입력해주세요.", 2000, "error");
      pass.current.focus();
    } else if (passCheck.current.value.trim() === "") {
      messageBoxHandle(true, "비밀번호 체크를 입력해주세요.", 2000, "error");
      passCheck.current.focus();
    } else if (email.current.value.trim() === "") {
      messageBoxHandle(true, "이메일을 입력해주세요.", 2000, "error");
      email.current.focus();
    } else if (name.current.value.trim() === "") {
      messageBoxHandle(true, "이름을 입력해주세요.", 2000, "error");
      name.current.focus();
    } else if (dupCheck) {
      messageBoxHandle(true, "중복된 아이디가 존재합니다.", 2000, "error");
      id.current.focus();
    } else if (pass.current.value !== passCheck.current.value) {
      messageBoxHandle(
        true,
        "비밀번호와 비밀번호 체크란이 일치하지 않습니다.",
        2000,
        "error"
      );
      pass.current.focus();
    } else {
      const user = {
        id: id.current.value,
        pass: pass.current.value,
        email: email.current.value,
        name: name.current.value,
      };
      axiosPost.postContainsData(
        "http://172.30.1.37:8090/api/users",
        joinSuccess,
        joinError,
        user
      );
    }
  };

  const triggerImgUpload = () =>{
    imgUpload.current.click();
  }

  useEffect(() => {
    if (props["open"]) {
      setOpen(true);
      setDupCheck(null);
    }
  }, [props["open"]]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>회원 가입</h4>
                  <p className={classes.cardCategoryWhite}>
                    사용자의 기본 정보를 입력합니다.
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        inputRef={id}
                        labelText="아이디"
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        onKeyUp={(e) => checkDupId(e.target.value)}
                      />
                      {dupCheck ? (
                        <div style={{ color: "red" }}>
                          * 중복되는 아이디가 존재합니다.
                        </div>
                      ) : dupCheck === null ? null : (
                        <div style={{ color: "blue" }}>
                          * 사용 가능한 아이디입니다.
                        </div>
                      )}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        inputRef={email}
                        labelText="이메일"
                        id="email-address"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        inputRef={name}
                        labelText="이름"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        type="password"
                        inputRef={pass}
                        labelText="비밀번호"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        type="password"
                        inputRef={passCheck}
                        labelText="비밀번호 재입력"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={joinHandle} color="primary">
            회원가입
          </Button>
          <Button onClick={handleClose} color="primary">
            취 소
          </Button>
        </DialogActions>
        <MessageBox
          open={showMessageState}
          content={MessageBoxState["content"]}
          level={MessageBoxState["level"]}
          time={MessageBoxState["time"]}
          handleClose={() => setShowMessageState(false)}
        />
      </Dialog>
    </div>
  );
}
