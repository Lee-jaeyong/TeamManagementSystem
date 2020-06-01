import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const style = makeStyles({
  root: {
    minWidth: 275,
  },
});

const PlanInfo = React.memo(({ plan }) => {
  const classes = style();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem component="div" alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="" src={"data:image/png;base64,"+plan['user']['myImg']} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <strong>
              {plan ? (plan["tag"] ? "##" + plan["tag"] : plan["title"]) : null}
            </strong>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ borderBottom: "1px solid gray" }}
              >
                <br />
                {plan ? plan["start"] : null} ~ {plan ? plan["end"] : null}
                <br />
              </Typography>
              <span>{plan ? plan["content"] : null}</span>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
});

export default PlanInfo;
