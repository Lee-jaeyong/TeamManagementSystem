import React, { useRef, useState } from "react";
import {useDispatch} from 'react-redux';

import {showMessageHandle} from '@store/actions/MessageAction';

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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LanguageIcon from "@material-ui/icons/Language";
import Tooltip from "@material-ui/core/Tooltip";

import JoinTeamDialog from "@commons/team/component/insert/JoinTeamDialog";
import CreateTeamDialog from "@commons/team/component/insert/CreateTeamDialog";
import Timer from 'components/Timer/Timer';
import TextPanel from 'components/TextPanel/TextPanel';

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import * as Oauth from "@oauth/oauth";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const classes = useStyles();
  const [openNotification, setOpenNotification] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
  const [joinTeamDialogState, setJoinTeamDialog] = useState(false);
  const [createTeamDialogState, setCreateTeamDialogState] = useState(false);

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = (value) => {
    if (value) props.showAlarm(value);
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
  const showMyPage = () => {
    setOpenProfile(null);
    const mypage = encodeURI("/admin/myPage");
    props["history"].push(mypage);
  };

  const showSearchResult = () => {
    if (inputRef.current.value.trim() === "") {
      dispatch(showMessageHandle({open:true,content:"검색어를 입력해주세요",level:"error"}))
      return;
    }
    const search = encodeURI("/admin/search/" + inputRef.current.value);
    props["history"].push(search);
  };

  const logout = () => {
    localStorage.clear();
    Oauth.revokeToken();
    props["history"].push("/login");
  };

  return (
    <div>
      <div className={classes.manager}>
        <TextPanel/>
        <Timer/>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          className={classes.buttonLink}
          onClick={() => setCreateTeamDialogState(true)}
        >
          <Tooltip title="팀 생성">
            <AddCircleIcon className={classes.icons} />
          </Tooltip>
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>팀 생성</p>
          </Hidden>
        </Button>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          className={classes.buttonLink}
          onClick={() => setJoinTeamDialog(true)}
        >
          <Tooltip title="팀 신청">
            <LanguageIcon className={classes.icons} />
          </Tooltip>
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>팀 신청</p>
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
          {props["alarm"] ? (
            props["alarm"].length !== 0 ? (
              <span className={classes.notifications}>
                {props["alarm"].length}
              </span>
            ) : null
          ) : null}
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
                    {props["alarm"] ? (
                      props["alarm"].length === 0 ? (
                        <MenuItem
                          onClick={() => handleCloseNotification()}
                          className={classes.dropdownItem}
                        >
                          {"등록된 일정이 존재하지 않습니다."}
                        </MenuItem>
                      ) : (
                        props["alarm"].map((alarm, idx) => (
                          <MenuItem
                            onClick={() => handleCloseNotification(alarm)}
                            className={classes.dropdownItem}
                          >
                            {"< " +
                              alarm["name"] +
                              " > 팀의 일정이 등록되었습니다."}
                          </MenuItem>
                        ))
                      )
                    ) : null}
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
                      onClick={showMyPage}
                      className={classes.dropdownItem}
                    >
                      내 정보
                    </MenuItem>
                    <Divider light />
                    <MenuItem onClick={logout} className={classes.dropdownItem}>
                      로그아웃
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <JoinTeamDialog
        open={joinTeamDialogState}
        handleClose={() => setJoinTeamDialog(false)}
      />
      <CreateTeamDialog
        open={createTeamDialogState}
        handleClose={() => setCreateTeamDialogState(false)}
      />
    </div>
  );
}
