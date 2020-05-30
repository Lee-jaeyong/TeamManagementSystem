import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Fade from "@material-ui/core/Fade";

export default function UserListTable({ userList }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {userList.map((user, idx) => (
            <Fade key={idx} in={true} timeout={(idx + 1) * 200}>
              <TableRow hover>
                <TableCell component="th" scope="row">
                  <Avatar src={"data:image/png;base64," + user["myImg"]} />
                </TableCell>
                <TableCell align="right">{user["id"]}</TableCell>
                <TableCell align="right">{user["name"]}</TableCell>
                <TableCell align="right">{user["email"]}</TableCell>
              </TableRow>
            </Fade>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
