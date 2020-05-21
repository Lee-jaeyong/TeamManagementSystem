import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter";
import Typography from "@material-ui/core/Typography";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function MyAllPlan(props) {
  const classes = useStyles();
  return (
    <Card className={classes.cardSize}>
      <CardHeader color="primary">
        <Typography variant="h6" component="h6">
          나의 모든 일정
        </Typography>
      </CardHeader>
      <CardBody>
        <Table //테이블 간격 조절하는방법 모르겠음ㅎ..
          // sellClick={}
          // pointer
          tableHeaderColor="primary"
          tableHead={["일정", "진척도", "날짜"]}
          tableData={props.tableData}
        />
      </CardBody>
      {props["isFinal"] ? null : (
        <CardFooter>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <IconButton
              style={{ color: "#9c27b0" }}
              aria-label="add to shopping cart"
              onClick={()=>props['pageMove']()}
            >
              <MoreVertIcon fontSize="large" style={{ color: "#9c27b0" }} />
            </IconButton>
          </Grid>
        </CardFooter>
      )}
    </Card>
  );
}
