import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
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
import CircularProgress from "@material-ui/core/CircularProgress";

import BoardView from "./NoticeView/BoardView";
import ReferenceView from "./ReferenceDataView/BoardView";
import FreeBoardView from "./FreeBoard/BoardView";

import CreateNotice from "./component/CreateNotice";
import MessageBox from "components/MessageBox/MessageBox";

import * as axiosGet from "@axios/get";
import { number } from "prop-types";

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

export default function TableList(props) {
  const [noticeList, setNoticeList] = useState([]);
  const [referenceDataList, setReferenceDataList] = useState([]);
  const [freeBoardList, setFreeBoardList] = useState([]);

  const [referenceDialog, setReferenceDialog] = useState(false);
  const [freeBoardReadDialog, setFreeBoardReadDialog] = useState(false);

  const [selectBoard, setSelectBoard] = useState();
  const [selectReferenceData, setSelectReferenceData] = useState();
  const [selectFreeBoard, setSelectFreeBoard] = useState();

  const [createNoticeState, setCreateNoticeState] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [selectType, setSelectType] = useState("notice");
  const [createDialogState, setCreateDialogState] = useState({
    title: "",
    content: "",
    type: "",
    text: "",
  });

  const [leaderImage, setLeaderImage] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [teamLeader, setTeamLeader] = useState();
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

  const viewFreeboard = (seq) => {
    selectNoticeInfo("freeBoard", seq);
    setFreeBoardReadDialog(true);
  };

  const viewReferenceData = (seq) => {
    selectNoticeInfo("referenceData", seq);
    setReferenceDialog(true);
  };

  const viewBoard = (seq) => {
    selectNoticeInfo("notice", seq);
    setContentsSeq(seq);
    setDialogHandle(true);
  };

  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });

  const selectNoticeInfo = (type, seq) => {
    if (type === "notice")
      axiosGet.getNotContainsData(
        "http://172.30.1.37:8090/api/teamManage/" + type + "/" + seq,
        selectNoticeInfoSuccess
      );
    else if (type === "referenceData") {
      axiosGet.getNotContainsData(
        "http://172.30.1.37:8090/api/teamManage/" + type + "/" + seq,
        selectReferenceDataInfoSuccess
      );
    } else if (type === "freeBoard") {
      axiosGet.getNotContainsData(
        "http://172.30.1.37:8090/api/teamManage/" + type + "/" + seq,
        selectFreeBoardSuccess
      );
    }
  };

  const selectFreeBoardSuccess = (res) => {
    setSelectFreeBoard(res);
  };

  const selectReferenceDataInfoSuccess = (res) => {
    setSelectReferenceData(res);
  };

  const selectNoticeInfoSuccess = (res) => {
    setSelectBoard(res);
  };

  const messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  const pagingAreaChange = (value) => {
    setTotalPage(null);
    setPage(1);
    setTabIndex(value);
    if (value === 0) {
      setSelectType("notice");
      getList(0, "notice");
    } else if (value === 1) {
      setSelectType("referenceData");
      getList(0, "referenceData");
    } else if (value === 2) {
      setSelectType("freeBoard");
      getList(0, "freeBoard");
    }
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

  const pageMove = (number) => {
    setPage(number);
    getList(number, selectType);
  };

  const getList = (number, type) => {
    if (!type) type = "notice";
    setPage(number + 1);
    const data = {
      page: number - 1,
      size: 10,
    };
    axiosGet.getContainsData(
      "http://172.30.1.37:8090/api/teamManage/" +
        type +
        "/" +
        props.match.params.idx +
        "/all",
      getNoticeListSuccess,
      data,
      true,
      type
    );
  };

  const getNoticeListSuccess = (res, type) => {
    if (!res["content"] || res["content"].length === 0) {
      setTotalPage(1);
      return;
    }
    setTotalPage(Math.ceil(res["page"]["totalElements"] / 10));
    let resultArr = [];
    const _noticeList = res["content"];
    for (let i = 0; i < _noticeList.length; i++) {
      resultArr.push([
        _noticeList[i]["seq"],
        _noticeList[i]["user"]["name"],
        _noticeList[i]["title"],
        _noticeList[i]["date"],
      ]);
    }
    if (type === "notice") {
      setNoticeList(resultArr);
    } else if (type === "referenceData") {
      setReferenceDataList(resultArr);
    } else if (type === "freeBoard") {
      setFreeBoardList(resultArr);
    }
  };

  const createBoard = () => {
    setCreateNoticeState(true);
    setCreateDialogState({
      title: "자유게시판 등록",
      content: "자유게시판의 기본 정보를 입력합니다.",
      type: "freeBoard",
      text: "자유게시판",
    });
  };

  const createReferenceData = () => {
    setCreateNoticeState(true);
    setCreateDialogState({
      title: "참고자료 등록",
      content: "참고자료의 기본 정보를 입력합니다.",
      type: "referenceData",
      text: "참고자료",
    });
  };

  const createNotice = () => {
    setCreateNoticeState(true);
    setCreateDialogState({
      title: "공지사항 등록",
      content: "공지사항의 기본 정보를 입력합니다.",
      type: "notice",
      text: "공지사항",
    });
  };

  function getTeamInfo(code) {
    axiosGet.getNotContainsData(
      "http://172.30.1.37:8090/api/teamManage/" + code,
      getTeamSuccess
    );
  }

  function getTeamSuccess(res) {
    setTeamLeader(res["data"]["teamLeader"]["id"]);
    setLeaderImage(res["images"][res["images"].length - 1]);
  }

  useEffect(() => {
    getTeamInfo(props.match.params.idx);
    getList(1, "notice");
  }, []);

  return (
    <Fade in timeout={1000}>
      <div>
        <BoardView
          leaderImage={leaderImage}
          data={selectBoard}
          open={dialogHandle}
          updateList={() => pageMove(0)}
          messageBoxHandle={messageBoxHandle}
          handleClose={() => setDialogHandle(false)}
        />
        <ReferenceView
          data={selectReferenceData}
          open={referenceDialog}
          updateList={() => pageMove(0)}
          messageBoxHandle={messageBoxHandle}
          handleClose={() => setReferenceDialog(false)}
        />
        <FreeBoardView
          data={selectFreeBoard}
          open={freeBoardReadDialog}
          updateList={() => pageMove(0)}
          messageBoxHandle={messageBoxHandle}
          handleClose={() => setFreeBoardReadDialog(false)}
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
                  tabContent:
                    localStorage.getItem("ID") === teamLeader ? (
                      <Table //테이블 간격 조절하는방법 모르겠음ㅎ..
                        sellClick={viewBoard}
                        pointer
                        customButton={
                          <div style={{ marginTop: 10, textAlign: "right" }}>
                            <Button
                              variant="contained"
                              onClick={createNotice}
                              color="secondary"
                            >
                              글쓰기
                            </Button>
                          </div>
                        }
                        tableHeaderColor="primary"
                        tableHead={["No.", "이름", "제목", "날짜"]}
                        tableData={noticeList}
                      />
                    ) : (
                      <Table //테이블 간격 조절하는방법 모르겠음ㅎ..
                        sellClick={viewBoard}
                        pointer
                        tableHeaderColor="primary"
                        tableHead={["No.", "이름", "제목", "날짜"]}
                        tableData={noticeList}
                      />
                    ),
                },
                {
                  tabName: "참고자료",
                  tabIcon: PermDataSettingIcon,
                  tabContent: (
                    <Table
                      customButton={
                        <div style={{ marginTop: 10, textAlign: "right" }}>
                          <Button
                            onClick={createReferenceData}
                            variant="contained"
                            color="secondary"
                          >
                            글쓰기
                          </Button>
                        </div>
                      }
                      sellClick={viewReferenceData}
                      pointer
                      tableHeaderColor="success"
                      tableHead={["No.", "이름", "제목", "날짜"]}
                      tableData={referenceDataList}
                    />
                  ),
                },
                {
                  tabName: "일반게시글",
                  tabIcon: FormatListBulletedIcon,
                  tabContent: (
                    <Table
                      customButton={
                        <div style={{ marginTop: 10, textAlign: "right" }}>
                          <Button
                            onClick={createBoard}
                            variant="contained"
                            color="secondary"
                          >
                            글쓰기
                          </Button>
                        </div>
                      }
                      sellClick={viewFreeboard}
                      pointer
                      tableHeaderColor="danger"
                      tableHead={["No.", "이름", "제목", "날짜"]}
                      tableData={freeBoardList}
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
              {totalPage ? (
                <Pagination
                  onChange={(event, number) => pageMove(number)}
                  count={totalPage}
                  boundaryCount={2}
                />
              ) : (
                <CircularProgress color="secondary" />
              )}
            </ThemeProvider>
          </GridItem>
        </GridContainer>
        <CreateNotice
          createState={createDialogState}
          updateList={() => getList(0, selectType)}
          messageBoxHandle={messageBoxHandle}
          idx={props.match.params.idx}
          open={createNoticeState}
          handleClose={() => setCreateNoticeState(false)}
        />
        <MessageBox
          open={showMessageState}
          content={MessageBoxState["content"]}
          level={MessageBoxState["level"]}
          time={MessageBoxState["time"]}
          handleClose={() => setShowMessageState(false)}
        />
      </div>
    </Fade>
  );
}
