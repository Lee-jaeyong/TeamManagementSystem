import React, { useRef,useEffect,useState } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LanguageIcon from '@material-ui/icons/Language';
import Tooltip from '@material-ui/core/Tooltip';

import JoinTeamDialog from './component/JoinTeamDialog';
import CreateTeamDialog from './component/CreateTeamDialog';
import MessageBox from 'components/MessageBox/MessageBox';

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import * as Oauth from '@oauth/oauth';

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const inputRef = useRef();
  const classes = useStyles();
  const [openNotification, setOpenNotification] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
  const [joinTeamDialogState,setJoinTeamDialog] = useState(false);
  const [createTeamDialogState,setCreateTeamDialogState] = useState(false);
  const [showMessageState,setShowMessageState] = useState(false);
  const [MessageBoxState,setMessageBoxState] = useState(
    {
      content : "",
      level : "success",
      time : 2000
    }
  );

  const messageBoxHandle = (show,content,time,level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content : content,
      time : time,
      level : level
    })
  }

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  
  const showSearchResult = () => {
    if(inputRef.current.value.trim() === ''){
      messageBoxHandle(true,"검색어를 입력해주세요",2000,'error');
      return;
    }
    const search = encodeURI('/admin/search/'+inputRef.current.value)
    props["history"].push(search);
  };
  
  const logout = () => {
    localStorage.clear();
    Oauth.revokeToken();
    props["history"].push("/login");
  }

  return (
    <div>
      <div className={classes.searchWrapper}>
        <CustomInput
          enterClick={showSearchResult}
          inputRef={inputRef}
          formControlProps={{
            className: classes.margin + " " + classes.search,
          }}
          inputProps={{
            placeholder: "내 모든 일정 검색",
            inputProps: {
              "aria-label": "Search",
            },
          }}
          id="searchFilled"
        />
        <Button
          color="white"
          aria-label="edit"
          justIcon
          round
          onClick={showSearchResult}
        >
          <Search />
        </Button>
      </div>
      <div className={classes.manager}>
        <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotification ? "notification-menu-list-grow" : null}
            aria-haspopup="true"
            className={classes.buttonLink}
            onClick={()=>setCreateTeamDialogState(true)}
          >
            <Tooltip title="팀 생성">
              <AddCircleIcon className={classes.icons} />
            </Tooltip>
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>
                팀 생성
              </p>
            </Hidden>
          </Button>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotification ? "notification-menu-list-grow" : null}
            aria-haspopup="true"
            className={classes.buttonLink}
            onClick={()=>setJoinTeamDialog(true)}
          >
              <Tooltip title="팀 신청">
                <LanguageIcon className={classes.icons} />
              </Tooltip>
              <Hidden mdUp implementation="css">
                <p className={classes.linkText}>
                  팀 신청
                </p>
              </Hidden>
          </Button>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              알 림
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      C언어 프로젝트 공지사항이 등록되었습니다.
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      C언어 프로젝트 공지사항이 등록되었습니다.
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      시스템 프로젝트 공지사항이 등록되었습니다.
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      스프링 프로젝트 참고자료가 등록되었습니다.
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      운영체제 프로젝트 참고자료가 등록되었습니다.
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      내 정보
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      나의 모든 일정 보기
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={logout}
                      className={classes.dropdownItem}
                    >
                      로그아웃
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <JoinTeamDialog messageBoxHandle={messageBoxHandle} open={joinTeamDialogState} handleClose={()=>setJoinTeamDialog(false)}/>
      <CreateTeamDialog messageBoxHandle={messageBoxHandle} menuUpdate={props['menuUpdate']} open={createTeamDialogState} handleClose={()=>setCreateTeamDialogState(false)}/>
      <MessageBox
          open={showMessageState}
          content={MessageBoxState['content']}
          level={MessageBoxState['level']}
          time={MessageBoxState['time']}
          handleClose={()=>setShowMessageState(false)}
        />
    </div>
  );
}
