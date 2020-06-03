import React, { memo } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ToolTip from "@material-ui/core/ToolTip";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";

import { excelUpload, getPlanListAll } from "@commons/plan/methods/PlanAccess";
import { showMessageHandle } from "@store/actions/MessageAction";
import { readPlanListHandle } from "@store/actions/Plan/PlanAction";
import { showConfirmHandle } from "@store/actions/ConfirmAction";

function parseDate(day) {
  let date = new Date(day);
  return (
    date.getFullYear() +
    "-" +
    plusZeroDate(date.getMonth() + 1) +
    "-" +
    plusZeroDate(date.getDate())
  );
}

function plusZeroDate(day) {
  return day < 10 ? "0" + day : day;
}

const TodoListMenu = memo(({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <ToolTip title={"등록 TodoList 보기"}>
        <IconButton onClick={handleClick}>
          <ArrowDropDownIcon />
        </IconButton>
      </ToolTip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {data.map((todo, idx) => (
          <MenuItem onClick={handleClose} key={idx}>
            - {todo["title"]}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
});

const DataTable = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>팀원 아이디</TableCell>
          <TableCell>일정 제목</TableCell>
          <TableCell>일정 시작일</TableCell>
          <TableCell>일정 종료일</TableCell>
          <TableCell>TodoList</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          ? data.map((row, idx) => {
              return (
                <TableRow hover key={idx}>
                  <TableCell>
                    <ToolTip title={row['user']['name']}>
                      <Avatar
                        src={"data:image/png;base64," + row["user"]["myImg"]}
                      />
                    </ToolTip>
                  </TableCell>
                  <TableCell>{row["user"]["id"]}</TableCell>
                  <TableCell>{row["tag"]}</TableCell>
                  <TableCell>{parseDate(row["start"])}</TableCell>
                  <TableCell>{parseDate(row["end"])}</TableCell>
                  <TableCell>
                    <TodoListMenu
                      data={row["todoList"] ? row["todoList"] : []}
                    />
                    {row["todoList"].length} 건
                  </TableCell>
                </TableRow>
              );
            })
          : null}
      </TableBody>
    </Table>
  );
};

export default function ExcelDataReadDialog({
  open,
  handleClose,
  excelDataFile,
  setExcelDataFile,
  data,
  teamCode,
}) {
  const dispatch = useDispatch();

  async function saveDatas() {
    const form = new FormData();
    form.append("file", excelDataFile);
    let res = await excelUpload(teamCode, form);
    let _data = {
      size: 200,
      page: 0,
    };
    const planList = await getPlanListAll(teamCode, _data);
    dispatch(readPlanListHandle(planList["content"]));
    dispatch(
      showMessageHandle({
        open: true,
        content: "엑셀 파일 업로드 완료",
        level: "success",
      })
    );
    setExcelDataFile(null);
    handleClose();
  }

  const uploadFile = () => {
    dispatch(
      showConfirmHandle({
        open: true,
        title: "엑셀 파일 업로드",
        content: "정말로 위 사항대로 엑셀 파일을 업로드 하시겠습니까?",
        yseClick: saveDatas,
      })
    );
  };

  return (
    <div>
      <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{"엑셀 파일 업로드"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {data ? <DataTable {...{ data }} /> : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={uploadFile}>
            모두 저장
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
