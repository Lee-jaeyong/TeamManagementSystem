import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tasks from "components/Tasks/Tasks.js";
import { bugs, website, server } from "variables/general.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BoardView from "components/BoardView/BoardView.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiPaginationItem: {
      // Name of the rule
      page: {
        "&:hover": {
          backgroundColor: "#9c27b0",
          color: "white",
        },
      },
    },
  },
});

export default function TableList() {
  const [pagingTheme, setPagingTheme] = useState(
    createMuiTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiPaginationItem: {
          // Name of the rule
          page: {
            "&:hover": {
              backgroundColor: "#9c27b0",
              color: "white",
            },
          },
        },
      },
    })
  );

  const [dialogHandle, setDialogHandle] = useState(false);
  const [contentsSeq, setContentsSeq] = useState();
  const viewBoard = (seq) => {
    setContentsSeq(seq);
    setDialogHandle(true);
  };

  const pagingAreaChange = (value) => {
    let color = ["#9c27b0", "#57af5b", "#e63d39"];
    setPagingTheme(
      createMuiTheme({
        overrides: {
          // Style sheet name ⚛️
          MuiPaginationItem: {
            // Name of the rule
            page: {
              "&:hover": {
                backgroundColor: color[value],
                color: "white",
              },
            },
          },
        },
      })
    );
  };

  return (
    <div>
      <BoardView
        seq={contentsSeq}
        open={dialogHandle}
        handleClose={() => setDialogHandle(false)}
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title=""
            containsPaging
            handleChange={(value) => pagingAreaChange(value)}
            tabs={[
              {
                tabName: "공지사항",
                tabIcon: NotificationsActiveIcon,
                tabContent: (
                  <Table //테이블 간격 조절하는방법 모르겠음ㅎ..
                    sellClick={viewBoard}
                    pointer
                    tableHeaderColor="primary"
                    tableHead={["No.", "이름", "제목", "날짜"]}
                    tableData={[
                      ["1", "이재용", "튜터링 공지사항입니다.", "2020.04.16"],
                      ["2", "윤지원", "모임관련 공지사항입니다.", "2020.04.16"],
                      ["3", "윤재원", "일정관리 공지입니다.", "2020.04.16"],
                      ["4", "장유나", "튜터링 공지사항입니다", "2020.04.16"],
                      [
                        "5",
                        "이재용",
                        "4월18일 생일관련공지입니다.",
                        "2020.04.16",
                      ],
                      [
                        "6",
                        "이재용",
                        "2020년04년16일 모임에관하여",
                        "2020.04.16",
                      ],
                      ["7", "윤지원", "으아아아아아", "2020.04.16"],
                      [
                        "8",
                        "윤재원",
                        "뭘 사용해야 할지 모르겠어요",
                        "2020.04.16",
                      ],
                      ["9", "장유나", "악동뮤지션 노래 좋음", "2020.04.16"],
                      [
                        "10",
                        "이재용",
                        "볼빨간사춘기 노래도 좋음",
                        "2020.04.16",
                      ],
                    ]}
                  />
                ),
              },
              {
                tabName: "참고자료",
                tabIcon: PermDataSettingIcon,
                tabContent: (
                  <Table
                    tableHeaderColor="success"
                    tableHead={["No.", "이름", "제목", "날짜"]}
                    tableData={[
                      ["1", "이재용", "튜터링 2차 참고자료.", "2020.04.16"],
                      ["2", "윤지원", "모임관련 공지사항입니다.", "2020.04.16"],
                      ["3", "윤재원", "일정관리 공지입니다.", "2020.04.16"],
                      ["4", "장유나", "튜터링 공지사항입니다", "2020.04.16"],
                      [
                        "5",
                        "이재용",
                        "4월18일 생일관련공지입니다.",
                        "2020.04.16",
                      ],
                      [
                        "6",
                        "이재용",
                        "2020년04년16일 모임에관하여",
                        "2020.04.16",
                      ],
                      ["7", "윤지원", "으아아아아아", "2020.04.16"],
                      [
                        "8",
                        "윤재원",
                        "뭘 사용해야 할지 모르겠어요",
                        "2020.04.16",
                      ],
                      ["9", "장유나", "악동뮤지션 노래 좋음", "2020.04.16"],
                      [
                        "10",
                        "이재용",
                        "볼빨간사춘기 노래도 좋음",
                        "2020.04.16",
                      ],
                    ]}
                  />
                ),
              },
              {
                tabName: "일반게시글",
                tabIcon: FormatListBulletedIcon,
                tabContent: (
                  <Table
                    tableHeaderColor="danger"
                    tableHead={["No.", "이름", "제목", "날짜"]}
                    tableData={[
                      [
                        "1",
                        "이재용",
                        "2020년04년16일 모임에관한 게시글",
                        "2020.04.16",
                      ],
                      ["2", "윤지원", "으아아아아아", "2020.04.16"],
                      [
                        "3",
                        "윤재원",
                        "뭘 사용해야 할지 모르겠어요",
                        "2020.04.16",
                      ],
                      ["4", "장유나", "악동뮤지션 노래 좋음", "2020.04.16"],
                      ["5", "이재용", "볼빨간사춘기 노래도 좋음", "2020.04.16"],
                      [
                        "6",
                        "이재용",
                        "2020년04년16일 모임에관하여",
                        "2020.04.16",
                      ],
                      ["7", "윤지원", "으아아아아아", "2020.04.16"],
                      [
                        "8",
                        "윤재원",
                        "뭘 사용해야 할지 모르겠어요",
                        "2020.04.16",
                      ],
                      ["9", "장유나", "악동뮤지션 노래 좋음", "2020.04.16"],
                      [
                        "10",
                        "이재용",
                        "볼빨간사춘기 노래도 좋음",
                        "2020.04.16",
                      ],
                    ]}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
      <GridContainer direction="column" alignItems="center" justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <ThemeProvider theme={pagingTheme}>
            <Pagination count={11} defaultPage={1} boundaryCount={2} />
          </ThemeProvider>
        </GridItem>
      </GridContainer>
    </div>
  );
}
