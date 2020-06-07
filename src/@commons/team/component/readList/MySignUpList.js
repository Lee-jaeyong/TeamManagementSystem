import React, { memo } from "react";
//나의 신청현황을 보여줌(신청상태, 팀명, 반려이유 - 승인이면 진행중인프로젝트에 / 반려사항 최근 5개)
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LinkIcon from "@material-ui/icons/Link";
import Grid from "@material-ui/core/Grid";
import { Typography, Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import BlockIcon from "@material-ui/icons/Block";
import HourglassEmptyOutlinedIcon from "@material-ui/icons/HourglassEmptyOutlined";
import Chip from "@material-ui/core/Chip";


// function dateAddZero(number) {
//   return number < 10 ? "0" + number : number;
// }

// function parseToDate(data) {
//   const parseDate = new Date(data);
//   return (
//     parseDate.getFullYear() +
//     "-" +
//     dateAddZero(parseDate.getMonth() + 1) +
//     "-" +
//     dateAddZero(parseDate.getDate())
//   );
// }

const MySignUpList = memo(({ mySignUpList }) => {
  return (
    <List>
      {mySignUpList
        ? mySignUpList["content"].map((data, idx) => (
            <React.Fragment>
            <ListItem>
              <Grid
                container
                justify="space-between"
                style={{ marginTop:5,marginBottom:5, position:"relative", top:2 }}
              >
                <Grid item>
                  <div
                    style={{
                      float: "left",
                      marginRight: 10,
                      position: "relative",
                      top: -3,
                    }}
                  >
                    {data["reson"] ? (
                      <Chip
                        icon={<BlockIcon />}
                        label="신청 반려"
                        color="secondary"
                      />
                    ) : (
                      <Chip
                        icon={<HourglassEmptyOutlinedIcon />}
                        label="신청 대기"
                        color="primary"
                      />
                    )}
                  </div>
                  <div style={{ float: "left" }}>
                    {"팀 코드 : " + data["team_Code"]}
                  </div>
                </Grid>
                <Grid item>
                {data["reson"] ? "반려사항 : " + data['reson'] : null}
                  {/* <div style={{ float: "left", marginRight: 10 }}>
                    {parseToDate(data["startDate"])} ~{" "}
                    {parseToDate(data["endDate"])}
                  </div> */}
                  {/* {isSetting ? (
                    <div style={{ float: "left" }}>
                      <IconButton
                        color="secondary"
                        style={{ position: "relative", top: -12 }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </div>
                  ) : null} */}
                </Grid>
              </Grid>
            </ListItem>
            <Divider/>
            </React.Fragment>
          ))
        : null}
    </List>
  );
});

export default MySignUpList;
