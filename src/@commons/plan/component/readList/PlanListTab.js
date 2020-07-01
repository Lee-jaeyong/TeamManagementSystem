import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PlanOneCard from "../readOne/PlanOneCard";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import TodoList from "./TodoList";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Chip from '@material-ui/core/Chip';

import UpdatePlanDialog from "@commons/plan/component/update/UpdatePlanDialog";
import { getPlan } from "@commons/plan/methods/PlanAccess";
import { readPlanHandle, updatePlan } from "@store/actions/Plan/PlanAction";

function TabPanel(props) {
  const dispatch = useDispatch();
  const { planSeq, children, value, index,user, ...other } = props;
  const [updatePlanDialogState, setUpdatePlanDialogState] = useState(false);
  const _updatePlan = useSelector((state) => state["Plan"]["plan"]);

  async function showUpdatePlanDialog(seq) {
    const res = await getPlan(seq);
    dispatch(readPlanHandle(res));
    setUpdatePlanDialogState(true);
  }

  return (
    <Hidden only="xs">
      <UpdatePlanDialog
        plan={_updatePlan}
        open={updatePlanDialogState}
        handleClose={() => setUpdatePlanDialogState(false)}
      />
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <React.Fragment>
            <Grid container style={{ position: "relative", top: 20 }}>
              <Grid item>
                <Container maxWidth="sm">{children}</Container>
              </Grid>
            </Grid>
            {user['id'] && user['id'] === localStorage.getItem("ID") ? (
              <Tooltip title="일정 수정" placement={"top"}>
                <IconButton
                  onClick={() => {
                    showUpdatePlanDialog(props["planSeq"]);
                  }}
                  style={{ position: "absolute", right: 20, bottom: 20 }}
                >
                  <CreateIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </React.Fragment>
        )}
      </div>
    </Hidden>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 400,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 300,
  },
}));

export default function PlanListTab({ data }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const _updateTodoList = (_data) => {
    dispatch(updatePlan(_data));
  };

  return (
    <div className={classes.root} >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {data.map((plan, idx) => (
          <Fade in={true} timeout={(idx + 1) * 200}>
            <Tooltip
              title={plan["user"]["name"] + "의 일정 보기"}
              placement={"right"}
            >
              <Tab
                key={idx}
                label={<PlanOneCard customStyle={classes.tabs} {...{ plan }} />}
                {...a11yProps(idx)}
              />
            </Tooltip>
          </Fade>
        ))}
      </Tabs>
      {data.map((plan, idx) => (
        <TabPanel value={value} index={idx} key={idx} user={plan['user']} planSeq={plan["seq"]}>
          <Chip style={{marginLeft:20}} label={<strong>단건 일정 리스트</strong>} />
          <TodoList
            {...{ _updateTodoList, plan }}
            isMy={
              plan["user"] && localStorage.getItem("ID") === plan["user"]["id"]
                ? true
                : false
            }
            todoList={plan["todoList"]}
          />
        </TabPanel>
      ))}
    </div>
  );
}
