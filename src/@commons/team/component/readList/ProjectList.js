import React, { memo } from "react";
//프로젝트의 리스트를 불러옴(프로젝트명, 시작일~종료일, 해당프로젝트로링크, 삭제기능)
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LinkIcon from "@material-ui/icons/Link";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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

const ProjectList = memo(({ teamList, isSetting,redirect }) => {
  return (
    <List>
      {teamList
        ? teamList.map((data, idx) => (
            <ListItem button={!isSetting} onClick={()=>redirect(data['code'])}>
              <Grid
                container
                justify="space-between"
                style={{ position: "relative", top: 5 }}
              >
                <Grid item>
                  <div style={{ float: "left", marginRight: 10 }}>
                    <LinkIcon />
                  </div>
                  <div style={{ float: "left" }}>{data["name"]}</div>
                </Grid>
                <Grid item>
                  <div style={{ float: "left", marginRight: 10 }}>
                    {parseToDate(data["startDate"])} ~{" "}
                    {parseToDate(data["endDate"])}
                  </div>
                  {isSetting ? (
                    <div style={{ float: "left" }}>
                      <IconButton
                        color="secondary"
                        style={{ position: "relative", top: -12 }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </ListItem>
          ))
        : null}
    </List>
  );
});

export default ProjectList;
