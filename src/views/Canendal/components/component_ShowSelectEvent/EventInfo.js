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

const EventInfo = React.memo(({ event }) => {
  const classes = style();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem component="div" alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="" src={"data:image/png;base64,"+event['user']['myImg']} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <strong>
              {event ? (event["tag"] ? "##" + event["tag"] : event["title"]) : null}
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
                {event ? event["start"] : null} ~ {event ? event["end"] : null}
                <br />
              </Typography>
              <span>{event ? event["content"] : null}</span>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
});

export default EventInfo;
