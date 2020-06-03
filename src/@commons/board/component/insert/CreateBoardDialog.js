import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import ImageUpload from "../../../component/ImageUpload";
import FileUpload from "../../../component/FileUpload";
import ImageGridView from "../../../component/ImageGridView";

import { createBoard, insertFile } from "@commons/board/methods/BoardAccess";

import { insertBoard } from "@store/actions/Board/BoardAction";

import { showMessageHandle } from "@store/actions/MessageAction";
import { showConfirmHandle } from "@store/actions/ConfirmAction";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    padding: 20,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateBoardDialog({ open, type, code, handleClose }) {
  const name = useRef([]);
  const content = useRef([]);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [imgByte, setImgByte] = useState([]);

  const messageBoxHandle = (open, content, level) => {
    dispatch(
      showMessageHandle({
        open: open,
        content: content,
        level: level,
      })
    );
  };

  const handleDelete = (name) => {
    setFiles(files.filter((value) => value["name"] != name));
  };

  const deleteFile = (name) => {
    setImgByte(imgByte.filter((value) => value["name"] !== name));
    setImgs(imgs.filter((value) => value["name"] !== name));
  };

  async function _yseClick(createInfo) {
    let res = await createBoard(type, code, createInfo);
    if (imgs.length > 0) {
      let data = new FormData();
      for (let i = 0; i < imgs.length; i++) {
        data.append("files", imgs[i]);
      }
      insertFile("IMG", res["seq"], type, data);
    }
    if (files.length > 0) {
      let data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i]);
      }
      insertFile("FILE", res["seq"], type, data);
    }
    let _type = "공지사항";
    if (type === "freeBoard") _type = "게시글";
    else if (type === "referenceData") _type = "참고자료";
    messageBoxHandle(true, _type + " 등록 완료", "success");
    dispatch(insertBoard(res));
    handleClose();
  }

  async function createBoardHandle() {
    if (name.current.value.trim() === "") {
      messageBoxHandle(true, "제목을 입력해주세요", "error");
      name.current.focus();
    } else if (content.current.value.trim() === "") {
      messageBoxHandle(true, "내용을 입력해주세요", "error");
      content.current.focus();
    } else {
      const createInfo = {
        title: name.current.value,
        content: content.current.value,
      };
      dispatch(
        showConfirmHandle({
          open: true,
          title: "등록",
          content: "정말 위 사항대로 등록하시겠습니까?",
          yseClick: () => _yseClick(createInfo),
        })
      );
    }
  }

  const init = () => {
    setFiles([]);
    setImgByte([]);
    setImgs([]);
  };

  useEffect(() => {
    init();
  }, [open]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          color={
            type === "notice"
              ? "primary"
              : type === "referenceData"
              ? "secondary"
              : "inherit"
          }
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {type === "notice"
                ? "공지사항 등록"
                : type === "referenceData"
                ? "참고자료 등록"
                : "일반 게시글 등록"}
            </Typography>
            <Button autoFocus color="inherit" onClick={createBoardHandle}>
              등 록
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} style={{ padding: 70 }}>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={name}
              label="제 목"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={content}
              label="내 용"
              variant="outlined"
              fullWidth
              multiline
              rows={15}
            />
          </Grid>
          <Grid item xs={12}>
            이미지 등록 : <br />
            <br />
            <ImageUpload {...{ imgs, imgByte, setImgByte, setImgs }} />
          </Grid>
          <Grid item xs={12}>
            <ImageGridView imges={imgByte} deleteFile={deleteFile} />
          </Grid>
          <Grid item xs={12}>
            파일 등록 : <br />
            <br />
            <FileUpload {...{ files, setFiles }} />
          </Grid>
          <Grid item xs={12}>
            {files.length !== 0
              ? files.map((file, idx) => {
                  return (
                    <Chip
                      style={{ marginRight: 20 }}
                      variant="outlined"
                      label={file["name"]}
                      color="secondary"
                      onDelete={() => handleDelete(file["name"])}
                    />
                  );
                })
              : null}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
