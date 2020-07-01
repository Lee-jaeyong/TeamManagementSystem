import React, { memo } from "react";
//마감된 프로젝트의 리스트를 불러옴(프로젝트명, 시작일~종료일, 삭제기능? )
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LinkIcon from "@material-ui/icons/Link";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';

function dateAddZero(number) {
  return number < 10 ? "0" + number : number;
}

function parseToDate(data) {
  const parseDate = new Date(data);
  return (
    parseDate.getFullYear() +
    "-" +
    dateAddZero(parseDate.getMonth() + 1) +
    "-" +
    dateAddZero(parseDate.getDate())
  );
}

const FinishedProjectList = memo(({ finishedTeamList }) => {
  return (
    <List>
      {finishedTeamList
        ? finishedTeamList['content'].map((data, idx) => (
            <ListItem>
              <Grid
                container
                justify="space-between"
                style={{ position: "relative", top: 5 }}
              >
                <Grid item>
                  <div style={{ float: "left", marginRight: 10 }}>
                    <CheckCircleSharpIcon />
                  </div>
                  <div style={{ float: "left" }}>{data["name"]}</div>
                </Grid>
                <Grid item>
                  <div style={{ float: "left", marginRight: 10 }}>
                    {parseToDate(data["startDate"])} ~{" "}
                    {parseToDate(data["endDate"])}
                  </div>
                </Grid>
              </Grid>
            </ListItem>
          ))
        : null}
    </List>
  );
});

export default FinishedProjectList;
