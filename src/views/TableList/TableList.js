import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import { getBoardList, getBoard } from "@commons/board/methods/BoardAccess";

import { readBoardList, readBoard } from "@store/actions/Board/BoardAction";

import CreateBoardDialog from "@commons/board/component/insert/CreateBoardDialog";
import BoardTable from "@commons/board/component/readList/BoardTable";
import BoardReadDialog from "@commons/board/component/readOne/BoardReadDialog";

import { getTeam } from "@commons/team/methods/TeamAccess";
import { readTeamOneHandle } from "@store/actions/Team/TeamAction";

const BoardSection = memo(
  ({
    checkAddBtn,
    page,
    size,
    teamInfo,
    _getBoardList,
    totalCount,
    boardList,
    createBoardHandle,
    cellClick,
  }) => {
    return (
      <React.Fragment>
        <div style={{ float: "right" }}>
          {checkAddBtn ? (
            teamInfo ? (
              localStorage.getItem("ID") === teamInfo["teamLeader"]["id"] ? (
                <Button
                  onClick={createBoardHandle}
                  color="primary"
                  size="small"
                  variant="contained"
                  startIcon={<CreateIcon />}
                >
                  글쓰기
                </Button>
              ) : null
            ) : null
          ) : (
            <Button
              onClick={createBoardHandle}
              color="primary"
              size="small"
              variant="contained"
              startIcon={<CreateIcon />}
            >
              글쓰기
            </Button>
          )}
        </div>
        <BoardTable
          tableData={boardList}
          totalCount={totalCount}
          changePage={_getBoardList}
          changeSize={_getBoardList}
          {...{
            cellClick,
            page,
            size,
          }}
        />
      </React.Fragment>
    );
  }
);

export default function TableList(props) {
  const dispatch = useDispatch();
  const [createType, setCreateType] = useState("notice");
  const [createDialogState, setCreateDialogState] = useState(false);
  const [boardReadDialogState, setBoardReadDialogState] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const boardInfo = useSelector((state) => state["Board"]["board"], []);
  const boardList = useSelector((state) => state["Board"]["boardList"], []);
  const totalCount = useSelector((state) => state["Board"]["totalCount"], []);
  const teamInfo = useSelector(({ Team }) => Team["team"]["data"]);

  async function _getBoardList(_page, _size, type) {
    setPage(_page);
    setSize(_size);
    const pageable = {
      page: _page,
      size: _size,
    };
    let res = await getBoardList(
      type ? type : createType,
      props.match.params.idx,
      pageable
    );
    dispatch(readBoardList(res["content"], res["page"]["totalElements"]));
  }

  const tabChangeHandle = (value) => {
    let _createType = "notice";
    if (value === 1) {
      _createType = "referenceData";
    } else if (value === 2) {
      _createType = "freeBoard";
    }
    setCreateType(_createType);
    _getBoardList(0, 5, _createType);
  };

  const createBoardHandle = () => {
    setCreateDialogState(true);
  };

  async function cellClick(seq) {
    let res = await getBoard(createType, seq);
    dispatch(readBoard(res));
    setBoardReadDialogState(true);
  }

  async function getTeamInfo(data) {
    let res = await getTeam(data);
    dispatch(readTeamOneHandle(res));
  }

  useEffect(() => {
    if (!teamInfo) getTeamInfo(props.match.params.idx);
    _getBoardList(page, size);
  }, []);

  return (
    <Fade in timeout={1000}>
      <div>
        <BoardReadDialog
          type={createType}
          open={boardReadDialogState}
          handleClose={() => setBoardReadDialogState(false)}
          board={boardInfo}
        />
        <CreateBoardDialog
          open={createDialogState}
          type={createType}
          code={props.match.params.idx}
          handleClose={() => setCreateDialogState(false)}
        />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title=""
              containsPaging
              handleChange={(value) => tabChangeHandle(value)}
              tabs={[
                {
                  tabName: "공지사항",
                  tabIcon: NotificationsActiveIcon,
                  tabContent: (
                    <BoardSection
                      checkAddBtn
                      {...{
                        teamInfo,
                        cellClick,
                        boardList,
                        totalCount,
                        _getBoardList,
                        page,
                        size,
                        createBoardHandle,
                      }}
                    />
                  ),
                },
                {
                  tabName: "참고자료",
                  tabIcon: NotificationsActiveIcon,
                  tabContent: (
                    <BoardSection
                      {...{
                        teamInfo,
                        cellClick,
                        boardList,
                        totalCount,
                        _getBoardList,
                        page,
                        size,
                        createBoardHandle,
                      }}
                    />
                  ),
                },
                {
                  tabName: "일반게시글",
                  tabIcon: NotificationsActiveIcon,
                  tabContent: (
                    <BoardSection
                      {...{
                        teamInfo,
                        cellClick,
                        boardList,
                        totalCount,
                        _getBoardList,
                        page,
                        size,
                        createBoardHandle,
                      }}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </Fade>
  );
}
