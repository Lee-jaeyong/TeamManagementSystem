import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import MessageBox from "components/MessageBox/MessageBox";

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
import Slider from '@material-ui/core/Slider';
import CircularProgress from '@material-ui/core/CircularProgress';

import ShowSelectEvent from './component/ShowSelectEvent';

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
  const [todoList,setTodoList] = useState();
  const [finishedTodoList,setFinishedTodoList] = useState([]);
  const [selectEvent,setSelectEvent] = useState();
  const [showSelectEventState,setShowSelectEventState] = useState(false);

  const [showMessageState,setShowMessageState] = useState(false);
  const [MessageBoxState,setMessageBoxState] = useState(
    {
      content : "",
      level : "success",
      time : 2000
    }
  );

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
    if(page === number)
      return;
    setPage(number);
    if(tabIndex === 0)
      getPlanListUnFinished(number);
    else if(tabIndex === 1)
      getPlenListFinished(number);  
  }

  const tabChangeHandle = (value) => {
    setTodoList(null);
    setTabIndex(value);
    pagingAreaChange(value);
    setPage(1);
    setTotalPage(null);
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
  }

  const getPlanListFinishedSuccess = (res) => {
    if(!res['content'])
      return;
    const content = res['content'];
    let count = 0;
    let resultArr = [];
    for(let i =0;i<content.length;i++){
      if(content[i]['user']['id'] === localStorage.getItem('ID')){
        resultArr.push([content[i]['seq'],content[i]['user']['name'],content[i]['content'],<PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={content[i]['progress']} />,content[i]['end']]);
        count++;
      }
    }
    setTotalPage(Math.ceil(count === 0 ? 1 : count / 10));
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
  }

  const dateMonthCheck = (value) => {
    const check = value + '';
    if(check.length === 1)
      return "0"+check;
    return check;
  }

  const getPlanListUnFinishedSuccess = (res) => {
    if(!res['content'])
      return;
    const content = res['content'];
    let count = 0;
    let resultArr = [];
    for(let i =0;i<content.length;i++){
      if(content[i]['user']['id'] === localStorage.getItem("ID"))
      {
        resultArr.push([content[i]['seq'],content[i]['user']['name'],content[i]['content'],<PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={content[i]['progress']} />,content[i]['end']]);
        count++;
      }
    }
    setTotalPage(Math.ceil(count / 10));
    setTodoList(resultArr);
  }

  function topScroll(){
    try{
      document.getElementsByClassName("makeStyles-mainPanel-2 ps ps--active-y")[0].scrollTo(0,0)
    }catch{}
  }

  function updatePlanList(){
    if(tabIndex === 0){
      getPlanListUnFinished(0);
    }else{
      getPlenListFinished(0);
    }
  }

  function selectEventHandle(eventTarget){
    selectEventFilter(eventTarget);
    setShowSelectEventState(true);
  }

  function selectEventFilter(groupId){
    axiosGet.getNotContainsData("http://localhost:8090/api/teamManage/plan/"+groupId,selectEventSuccess);
  }
  
  function selectEventSuccess(res){
    console.log(res);
    setSelectEvent(res);
  }

  const messageBoxHandle = (show,content,time,level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content : content,
      time : time,
      level : level
    })
  }

  useEffect(()=>{
    getPlanListUnFinished(page);
    topScroll();
  },[]);

  return (
    <div>
      <ShowSelectEvent
      messageBoxHandle={messageBoxHandle}
      updatePlanList={updatePlanList}
      event={selectEvent}
      open={showSelectEventState}
      handleClose={()=>setShowSelectEventState(false)}/>
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
                    sellClick={selectEventHandle}
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
                    sellClick={selectEventHandle}
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
            {totalPage ? 
            <Pagination onChange={(event,number)=>pageMove(number)} count={totalPage} boundaryCount={2} />
            : <CircularProgress color="secondary" /> }
          </ThemeProvider>
        </GridItem>
      </GridContainer>
      <MessageBox
        open={showMessageState}
        content={MessageBoxState["content"]}
        level={MessageBoxState["level"]}
        time={MessageBoxState["time"]}
        handleClose={() => setShowMessageState(false)}
      />
    </div>
  );
}
