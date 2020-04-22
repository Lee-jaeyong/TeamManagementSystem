import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Chip from "@material-ui/core/Chip";
import DateRange from "@material-ui/icons/DateRange";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    marginBottom: 18,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        backgroundColor: "#9c27b0",
        color: "white",
      },
    },
  },
});
//여러개 단어 응용
// let index = markTestStr.indexOf("contents");
// while (index != -1) {
//   contentsIndex.push(index);
//   index = markTestStr.indexOf("contents", index + 1);
// }

export default function SimpleCard(props) {
  const contents = props["list"];
  const markTestStr =
    "메인1contents메인2contents메인3contents메인4contents메인5contents메인6contents메인7메인contents메인contents메인contents메인contents";
  const delMarkArr = markTestStr.split(props["search"]);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <div style={{ float: "left", marginRight: 10, marginLeft: 15 }}>
            <ThemeProvider theme={theme}>
              <Chip label={props["team"]} color="red" />
            </ThemeProvider>
          </div>
          <Typography variant="button" component="p">
            <DateRange
              style={{
                color: "red",
                position: "relative",
                top: 5,
              }}
            />
            {props["date"]}
          </Typography>
          <Typography variant="button" component="p">
            <ul>
              {contents
                ? contents.map((list, idx) => {
                    const delSearchStr = list.split(props["search"]);
                    return (
                      <li>
                        {" "}
                        {delSearchStr
                          ? delSearchStr.map((str, idx) => {
                              // return <p key={idx}>{str}</p>;
                              if (idx === delSearchStr.length - 1) {
                                return <span key={idx}>{str}</span>;
                              }
                              return (
                                <span key={idx}>
                                  {str}
                                  <mark>{props["search"]}</mark>
                                </span>
                              );
                            })
                          : null}
                      </li>
                    );
                  })
                : null}
            </ul>
            {/* <ul>
              <li>
                {delMarkArr
                  ? delMarkArr.map((str, idx) => {
                      // return <p key={idx}>{str}</p>;
                      if (idx === delMarkArr.length - 1) {
                        return <span key={idx}>{str}</span>;
                      }
                      return (
                        <span key={idx}>
                          {str}
                          <mark>{props["search"]}</mark>
                        </span>
                      );
                    })
                  : null}
              </li>
            </ul> */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
