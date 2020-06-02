import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PlanOneCard from "../readOne/PlanOneCard";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import TodoList from "./TodoList";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
function TabPanel(props) {
  const { planSeq, children, value, index, ...other } = props;

  return (
    <Hidden only="xs">
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
            <IconButton
              onClick={() => {
                alert(props["planSeq"] + "번 일정 일정수정");
              }}
              style={{ position: "absolute", right: 20, bottom: 20 }}
            >
              <CreateIcon />
            </IconButton>
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

export default function PlanListTab({ data, open }) {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
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
        <TabPanel value={value} index={idx} key={idx} planSeq={plan["seq"]}>
          <TodoList
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
