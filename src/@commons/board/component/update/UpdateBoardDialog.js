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

import {
  insertFile,
  deleteFile as _deleteFile,
  updateBoard as _updateBoard,
  getBoard,
} from "@commons/board/methods/BoardAccess";

import { readBoard, updateBoard } from "@store/actions/Board/BoardAction";

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

const parseImg = (images) => {
  let reuslt = [];
  images.map((img) => {
    if (img["type"] === "IMG")
      reuslt.push({
        imgByte: "data:image/png;base64," + img["imgByte"],
        name: img["name"],
      });
  });
  return reuslt;
};

const parseFile = (files) => {
  let reuslt = [];
  files.map((files) => {
    if (files["type"] === "FILE")
      reuslt.push({
        name: files["name"],
      });
  });
  return reuslt;
};

export default function UpdateBoardDialog({ open, type, board, handleClose }) {
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

  const deleteOriginFileHandle = (name) => {
    const _fileList = board["fileList"].filter((file) => file["name"] !== name);
    const _board = {
      ...board,
      fileList: _fileList,
    };
    dispatch(updateBoard(_board));
    _deleteFile(type, board["seq"], name);
    messageBoxHandle(true, "삭제 완료", "success");
  };

  const deleteOriginFile = (name) => {
    dispatch(
      showConfirmHandle({
        open: true,
        title: "파일 삭제",
        content: "정말 파일을 삭제하시겠습니까?",
        yseClick: () => deleteOriginFileHandle(name),
      })
    );
  };

  async function createBoardHandle() {
    let _type = "공지사항";
    if (type === "freeBoard") _type = "게시글";
    else if (type === "referenceData") _type = "참고자료";

    if (
      name.current.value === board["title"] &&
      content.current.value === board["content"] &&
      imgs.length === 0 &&
      files.length === 0
    ) {
      messageBoxHandle(true, _type + " 수정 완료", "success");
      handleClose();
      return;
    }

    if (name.current.value.trim() === "") {
      messageBoxHandle(true, "제목을 입력해주세요", "error");
      name.current.focus();
    } else if (content.current.value.trim() === "") {
      messageBoxHandle(true, "내용을 입력해주세요", "error");
      content.current.focus();
    } else {
      const updateInfo = {
        title: name.current.value,
        content: content.current.value,
      };
      let res = await _updateBoard(type, board["seq"], updateInfo);
      if (imgs.length > 0) {
        let data = new FormData();
        for (let i = 0; i < imgs.length; i++) {
          data.append("files", imgs[i]);
        }
        await insertFile("IMG", res["seq"], type, data);
      }
      if (files.length > 0) {
        let data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append("files", files[i]);
        }
        await insertFile("FILE", res["seq"], type, data);
      }
      messageBoxHandle(true, _type + " 수정 완료", "success");
      let updateRes = await getBoard(type, board["seq"]);
      dispatch(updateBoard(updateRes));
      handleClose();
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
                ? "공지사항 수정"
                : type === "referenceData"
                ? "참고자료 수정"
                : "일반 게시글 수정"}
            </Typography>
            <Button autoFocus color="inherit" onClick={createBoardHandle}>
              수 정
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} style={{ padding: 70 }}>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={board["title"]}
              inputRef={name}
              label="제 목"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              defaultValue={board["content"]}
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
            <ImageGridView
              originImages={
                board["fileList"] ? parseImg(board["fileList"]) : []
              }
              deleteOriginImage={deleteOriginFile}
              imges={imgByte}
              {...{ deleteFile }}
            />
          </Grid>
          <Grid item xs={12}>
            파일 등록 : <br />
            <br />
            <FileUpload {...{ files, setFiles }} />
          </Grid>
          <Grid item xs={12}>
            {board["fileList"]
              ? parseFile(board["fileList"]).map((file, idx) => {
                  return (
                    <Chip
                      key={idx}
                      style={{ marginRight: 20, marginTop: 10 }}
                      variant="outlined"
                      label={file["name"]}
                      color="secondary"
                      onDelete={() => deleteOriginFile(file["name"])}
                    />
                  );
                })
              : []}
            {files.length !== 0
              ? files.map((file, idx) => {
                  return (
                    <Chip
                      key={idx}
                      style={{ marginRight: 20, marginTop: 10 }}
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
