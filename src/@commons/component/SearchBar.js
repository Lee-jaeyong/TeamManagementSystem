import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBar = ({ onClick, title }) => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  return (
    <Paper component="div" className={classes.root}>
      <Button
        onClick={() => {
          setSearch("");
          onClick("");
        }}
        style={{ marginRight: 10 }}
        variant="outlined"
        color="secondary"
      >
        초기화
      </Button>{" "}
      <InputBase
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        onKeyUp={(e) => {
          if (window.event.keyCode === 13) {
            onClick(search);
          }
        }}
        className={classes.input}
        placeholder={"검색할 " + title + "을 입력해주세요"}
      />
      <IconButton
        type="button"
        className={classes.iconButton}
        onClick={() => onClick(search)}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  );
};

export default SearchBar;
