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
import Slider from '@material-ui/core/Slider';

import * as axiosGet from '@axios/get';

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

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
  const [page,setPage] = useState(1);
  const [tabIndex,setTabIndex] = useState(0);
  const [totalPage,setTotalPage] = useState(0);
  const [todoList,setTodoList] = useState([]);
  const [finishedTodoList,setFinishedTodoList] = useState([]);
  const [pagingTheme, setPagingTheme] = useState(
    createMuiTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiPaginationItem: {
          // Name of the rule
          page: {
            "&:hover": {
              backgroundColor: "#FFBB00",
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
    let color = ["#FFBB00", "#e63d39"];
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
    if(tabIndex === 0)
      getPlanListUnFinished(number);
    else if(tabIndex === 1)
      getPlenListFinished(number);  
  }

  const tabChangeHandle = (value) => {
    setTabIndex(value);
    pagingAreaChange(value);
    setPage(0);
    if(value === 0){
      getPlanListUnFinished(0);
    }else if(value === 1){
      getPlenListFinished(0);
    }
  }

  const getPlenListFinished = (number) => {
    let data = {
      page:number - 1,
      size:10
    }
    axiosGet.getContainsData("http://localhost:8090/api/teamManage/plan/"+props.match.params.idx+"/search/finished",getPlanListFinishedSuccess,data,true);
    axiosGet.getNotContainsData("http://localhost:8090/api/teamManage/plan/"+props.match.params.idx+"/search/finished/count",getPlanCountFinishedSuccess,true);
  }

  const getPlanCountFinishedSuccess = (res) => {
    setTotalPage(Math.ceil(res['content'] / 10));
  }

  const getPlanListFinishedSuccess = (res) => {
    if(!res['_embedded'])
      return;
    const content = res['_embedded']['planByUserList'];
    let resultArr = [];
    for(let i =0;i<content.length;i++){
      resultArr.push([content[i]['seq'],content[i]['user']['name'],content[i]['content'],<PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={content[i]['progress']} />,content[i]['end']]);
    }
    setFinishedTodoList(resultArr);
  }

  const getPlanListUnFinished = (number) => {
    let data = {
      year:new Date().getFullYear(),
      month:dateMonthCheck(new Date().getMonth()+1),
      day:dateMonthCheck(new Date().getDate()),
      page:number - 1,
      size:10
    }
    axiosGet.getContainsData("http://localhost:8090/api/teamManage/plan/"+props.match.params.idx+"/search",getPlanListUnFinishedSuccess,data,true);
    axiosGet.getContainsData("http://localhost:8090/api/teamManage/plan/"+props.match.params.idx+"/search/count",getPlanCountUnFinishedSuccess,data,true);
  }

  const dateMonthCheck = (value) => {
    const check = value + '';
    if(check.length === 1)
      return "0"+check;
    return check;
  }

  const getPlanCountUnFinishedSuccess = (res) => {
    setTotalPage(Math.ceil(res['content'] / 10));
  }

  const getPlanListUnFinishedSuccess = (res) => {
    if(!res['_embedded'])
      return;
    const content = res['_embedded']['planByUserList'];
    let resultArr = [];
    for(let i =0;i<content.length;i++){
      resultArr.push([content[i]['seq'],content[i]['user']['name'],content[i]['content'],<PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={content[i]['progress']} />,content[i]['end']]);
    }
    setTodoList(resultArr);
  }

  function topScroll(){
    document.getElementsByClassName("makeStyles-mainPanel-2 ps ps--active-y")[0].scrollTo(0,0)
  }

  useEffect(()=>{
    getPlanListUnFinished(page);
    topScroll();
  },[]);

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
            color
            title=""
            containsPaging
            handleChange={(value) => {tabChangeHandle(value)}}
            tabs={[
              {
                tabName: "진행중인 일정",
                tabIcon: NotificationsActiveIcon,
                tabContent: (
                  <Table //테이블 간격 조절하는방법 모르겠음ㅎ..
                    sellClick={viewBoard}
                    pointer
                    tableHeaderColor="warning"
                    tableHead={["No.", "이름", "제목", "진척도","날짜"]}
                    tableData={todoList}
                  />
                ),
              },
              {
                tabName: "마감된 일정",
                tabIcon: PermDataSettingIcon,
                tabContent: (
                  <Table
                    sellClick={viewBoard}
                    pointer
                    tableHeaderColor="danger"
                    tableHead={["No.", "이름", "제목","진척도", "날짜"]}
                    tableData={finishedTodoList}
                  />
                ),
              }
            ]}
          />
        </GridItem>
      </GridContainer>
      <GridContainer direction="column" alignItems="center" justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <ThemeProvider theme={pagingTheme}>
            <Pagination onChange={(event,number)=>pageMove(number)} count={totalPage} page={page} defaultPage={0} boundaryCount={2} />
          </ThemeProvider>
        </GridItem>
      </GridContainer>
    </div>
  );
}
