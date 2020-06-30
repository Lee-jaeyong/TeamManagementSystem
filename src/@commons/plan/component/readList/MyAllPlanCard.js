import React, {memo} from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter";
import Typography from "@material-ui/core/Typography";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import MyAllPlanTable from './MyAllPlanTable';

const MyAllPlanCard=memo(()=>{

    return (
        <Card>
      <CardHeader color="primary">
        <Typography variant="h6" component="h6">
          나의 모든 일정
        </Typography>
      </CardHeader>
      <CardBody>
        <MyAllPlanTable/>
      </CardBody>
      {/* {props["isFinal"] ? null : ( */}
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
            //   onClick={()=>props['pageMove']()}
            >
              <MoreVertIcon fontSize="large" style={{ color: "#9c27b0" }} />
            </IconButton>
          </Grid>
        </CardFooter>
      {/* )} */}
    </Card>
    )
})

export default MyAllPlanCard;