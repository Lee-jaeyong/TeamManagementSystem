import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Fade from "@material-ui/core/Fade";
import Chip from "@material-ui/core/Chip";
import StarsIcon from "@material-ui/icons/Stars";
import Tooltip from "@material-ui/core/Tooltip";

function plusZeroDate(day) {
  return day < 10 ? "0" + day : day;
}

function nowDateCompare(date) {
  let now = new Date();
  let compareDate = new Date(date);
  let _now = new Date(
    now.getFullYear() +
      "-" +
      plusZeroDate(now.getMonth() + 1) +
      "-" +
      plusZeroDate(now.getDate())
  );
  return compareDate.getTime() === _now.getTime();
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "seq",
    numeric: false,
    disablePadding: true,
    label: "글번호",
  },
  { id: "author", numeric: true, disablePadding: false, label: "글쓴이" },
  { id: "title", numeric: true, disablePadding: false, label: "제 목" },
  { id: "date", numeric: true, disablePadding: false, label: "날 짜" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{ width: 10 }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "desc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    padding: 30,
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const BoardTable = memo(
  ({
    size,
    page,
    totalCount,
    tableData,
    changePage,
    changeSize,
    cellClick,
  }) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState("desc");
    const [orderBy, setOrderBy] = React.useState("desc");
    const [selected, setSelected] = React.useState([]);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = tableData.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const sizeChangeHandle = (event, value) => {
      changeSize(page, value["key"]);
    };

    const pageChangeHandle = (event, value) => {
      changePage(value, size);
    };

    return (
      <div className={classes.root}>
        <TableContainer>
          <Table className={classes.table}>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
            />
            <TableBody>
              {!tableData || tableData.length === 0 ? (
                <Fade in={true} timeout={200}>
                  <TableCell align="center" colSpan={5}>
                    데이터가 존재하지 않습니다.
                  </TableCell>
                </Fade>
              ) : (
                stableSort(tableData, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <Fade key={index} in={true} timeout={index * 150}>
                        <TableRow
                          hover
                          {...(cellClick
                            ? {
                                style: { cursor: "pointer" },
                                onClick: () => {
                                  cellClick(row["seq"]);
                                },
                              }
                            : "")}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <Chip label={row.seq} />
                          </TableCell>
                          <TableCell align="right">
                            {row.user["name"]}
                          </TableCell>
                          <TableCell align="right">
                            {nowDateCompare(row.date) ? (
                              <Tooltip title={"신규 게시글"}>
                                <StarsIcon
                                  color={"primary"}
                                  style={{
                                    position: "relative",
                                    top: 5,
                                    marginRight: 10,
                                  }}
                                />
                              </Tooltip>
                            ) : null}
                            {row.title}
                          </TableCell>
                          <TableCell align="right">
                            <Chip label={row.date} />
                          </TableCell>
                        </TableRow>
                      </Fade>
                    );
                  }
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={size}
          page={page}
          onChangePage={pageChangeHandle}
          onChangeRowsPerPage={sizeChangeHandle}
        />
      </div>
    );
  }
);

export default BoardTable;
