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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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
    height: 404,
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
        <TabPanel value={value} index={idx} key={idx}>
          <TodoList todoList={plan["todoList"]} />
        </TabPanel>
      ))}
    </div>
  );
}
