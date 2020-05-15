import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, sellClick, pointer, customButton } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData ? tableData.length !== 0 ? (
          tableData.map((prop, key) => {
            if (pointer) {
              return (
                <TableRow
                  onClick={() => sellClick(prop[0])}
                  style={{ cursor: 'pointer' }}
                  hover key={key} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            } else {
              return (
                <TableRow
                  hover key={key} className={classes.tableBodyRow}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }
          })) : (
            <TableRow className={classes.tableBodyRow}>
                <TableCell style={{textAlign:"center"}} colSpan="4">
                  <strong>* 글이 존재하지 않습니다.</strong>
                </TableCell>
            </TableRow>
          ) : (
            <TableRow className={classes.tableBodyRow}>
                <TableCell style={{textAlign:"center"}} colSpan="4">
                  <CircularProgress color="secondary" />
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {customButton ? customButton : null}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
};
