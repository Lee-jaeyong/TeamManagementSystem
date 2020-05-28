import React, { memo } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Typography from "@material-ui/core/Typography";
import GroupIcon from "@material-ui/icons/Group";

const useStyles = makeStyles((theme) => ({
  cardSize: {
    width: "100%",
    height: "100%",
  },
}));

const PjtList = memo(({ data, type }) => {
  return (
    <List>
      {data.map((pjt, idx) => (
        <ListItem key={idx} button>
          <ListItemAvatar>
            <GroupIcon />
          </ListItemAvatar>
          <ListItemText
            secondary={
              <React.Fragment>{pjt["date"] + "일 신청"}</React.Fragment>
            }
            {...(type
              ? { primary: pjt["team_Code"] }
              : { primary: pjt["team_Code"] + " [ " + pjt["reson"] + " ] " })}
          />
        </ListItem>
      ))}
    </List>
  );
});

const MySignUpList = memo(({ mySignUpList, open, handleClose, type }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Dialog PaperComponent="div" open={open} onClose={handleClose}>
        <Card className={classes.cardSize}>
          <CardHeader color={type ? "info" : "warning"}>
            <Typography variant="h6" component="h6">
              {type ? "신청 현황" : "반려 현황"}
            </Typography>
          </CardHeader>
          <CardBody>
            <PjtList data={mySignUpList} type={type} />
          </CardBody>
        </Card>
      </Dialog>
    </React.Fragment>
  );
});

export default MySignUpList;
