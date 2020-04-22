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

  const colors = ["#FFFF24", "#53FF4C", "#48FFFF", "#FF36FF", "#DD7EFF"];

  function markText(searchText, originText) {
    let searchTextArr = searchText.split(" ");
    let result = "";
    for (let i = 0; i < originText.length; i++) {
      let chk = false;
      for (let j = 0; j < searchTextArr.length; j++) {
        if (originText[i] === searchTextArr[j][0]) {
          if (
            checkText(
              originText.substring(i, i + searchTextArr[j].length),
              searchTextArr[j]
            )
          ) {
            result +=
              "<span style='background:" +
              colors[j % 5] +
              "'><strong>" +
              searchTextArr[j] +
              "</strong></span>";
            i += searchTextArr[j].length - 1;
            chk = true;
            break;
          }
        }
      }
      if (!chk) {
        result += originText[i];
      }
    }

    return result;

    function checkText(originText, text) {
      if (text !== originText) {
        return false;
      }
      return true;
    }
  }

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
                        <div
                          dangerouslySetInnerHTML={{
                            __html: markText(props["search"], list),
                          }}
                        ></div>
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
