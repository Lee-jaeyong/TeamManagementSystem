import React, { useEffect,useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function TodoList(props){
    const classes = useStyles();

    const {onClick} = props;

    useEffect(()=>{
    },[]);

    return (
        <Card>
            <CardActionArea onClick={onClick}>
                <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                    <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Todo List</p>
                <h3 className={classes.cardTitle}>TODO<br/>리스트</h3>
                <br />
                </CardHeader>
                <CardFooter stats>
                <div className={classes.stats}>
                    <Danger>
                    <Store />
                    </Danger>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    일정 보기
                    </a>
                </div>
                </CardFooter>
            </CardActionArea>
        </Card>
    )
}