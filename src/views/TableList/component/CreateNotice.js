import React, { useEffect, useRef, useState, createElement } from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Chip,
  LinearProgress,
  FormGroup,
  Switch,
  Collapse,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import * as axiosPost from "@axios/post";

import FileUpload from "./FileUpload.js";
import ImageUpload from "./ImageUpload.js";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CreateNotice(props) {
  const name = useRef([]);
  const content = useRef([]);

  const [open, setOpen] = React.useState(false);
  const [progressState, setProgressState] = useState(false);
  const [imgProgressState, setImgProgressState] = useState(false);
  const [files, setFiles] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [imgByte, setImgByte] = useState([]);
  const [dateState, setDateState] = React.useState(false);
  const [flag, setFlag] = useState(false);

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };

  const btnSubmit = (event) => {
    event.preventDefault();
    if (name.current.value.trim() === "") {
      name.current.focus();
      return;
    }

    const CreateNoticeInfo = {
      name: name.current.value,
      content: content.current.value,
    };

    console.log(CreateNoticeInfo);
    console.log(files);
    console.log(imgs);

    // setTimeout(() => {
    //   axiosPost.postContainsData(
    //     '/api/professor/class',
    //     getResponse,
    //     CreateNoticeInfo
    //   );
    // }, 1000);
    // handleClose();
  };

  const getResponse = (res) => {
    if (files.length !== 0) {
      let formData = new FormData();
      formData.append("file", files);
      axiosPost.postFileUpload(
        "/api/professor/uploadFile/" + res.seq + "/classInfoExcel",
        fileUploadResult,
        formData
      );
    }
    window.scrollTo(0, 0);
  };

  async function imgUpload(file) {
    const fileName = file[0]["name"];
    let _fileLen = fileName.length;
    let _lastDot = fileName.lastIndexOf(".");
    let _fileExt = fileName.substring(_lastDot, _fileLen).toLowerCase();
    if (_fileExt !== ".jpg" && _fileExt !== ".jpeg" && _fileExt !== ".png") {
      return;
    }
    setTimeout(() => {
      let originImgs = imgs;
      let checkImgs = [];
      for (let j = 0; j < file.length; j++) {
        let chk = true;
        for (let i = 0; i < originImgs.length; i++) {
          if (originImgs[i]["name"] === file[j]["name"]) {
            chk = false;
            break;
          }
        }
        if (chk) {
          checkImgs.push(file[j]);
        }
      }
      let _imgByte = imgByte;
      for (let i = 0; i < checkImgs.length; i++) {
        getImgSource(checkImgs[i]).then((value) => {
          _imgByte.push({ name: checkImgs[i]["name"], imgByte: value });
        });
      }
      setImgs(imgs.concat(checkImgs));
      setImgByte(_imgByte);
      setImgProgressState(false);
      setTimeout(() => {
        setFlag(!flag);
      }, 100);
    }, 1000);
    setImgProgressState(true);
  }

  async function getImgSource(file) {
    return new Promise((resolve, reject) => {
      let contents = "";
      const reader = new FileReader();
      reader.onloadend = function(e) {
        contents = e.target.result;
        resolve(contents);
      };
      reader.readAsDataURL(file);
    });
  }

  const fileUpload = (file) => {
    const fileName = file[0]["name"];
    let _fileLen = fileName.length;
    let _lastDot = fileName.lastIndexOf(".");
    let _fileExt = fileName.substring(_lastDot, _fileLen).toLowerCase();
    if (
      _fileExt === ".exe" ||
      _fileExt === ".jpg" ||
      _fileExt === ".jpeg" ||
      _fileExt === ".png" ||
      _fileExt === ".gif"
    ) {
      return;
    }
    setTimeout(() => {
      let originFile = files;
      let checkFile = [];
      for (let i = 0; i < file.length; i++) {
        let chk = true;
        for (let j = 0; j < originFile.length; j++) {
          if (file[i]["name"] === originFile[j]["name"]) {
            chk = false;
            break;
          }
        }
        if (chk) {
          checkFile.push(file[i]);
        }
      }
      setFiles(files.concat(checkFile));
      setProgressState(false);
    }, 1000);
    setProgressState(true);
  };

  const fileUploadResult = (res) => {
    console.log(res);
  };

  const imgHandleDelete = (name) => {
    setImgByte(imgByte.filter((value) => value["name"] !== name));
    setImgs(imgs.filter((value) => value["name"] !== name));
  };

  const handleDelete = (name) => {
    setFiles(files.filter((value) => value["name"] != name));
  };

  const handleChange = () => {
    setDateState(!dateState);
  };

  useEffect(() => {
    setOpen(props["open"]);
    setFiles([]);
  }, [props["open"]]);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          공지사항 등록
          <br />
          <span style={{ fontSize: 15 }}>
            공지사항의 기본 정보를 입력합니다.
          </span>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={4}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TextField
                inputRef={name}
                variant="outlined"
                name="name"
                fullWidth
                label="제목*"
                defaultValue=" "
                placeholder="제목을 입력하세요."
              />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <ImageUpload addImg={imgUpload} files={files} />
              {imgProgressState ? (
                <LinearProgress color="secondary" style={{ marginTop: 5 }} />
              ) : null}
              <div
                style={{ display: "flex", overflowX: "auto", marginTop: 15 }}
              >
                {imgByte.length !== 0
                  ? imgByte.map((img, idx) => {
                      return (
                        <div key={idx}>
                          {img["name"]}
                          <br />
                          <img
                            style={{ width: 100, height: 100 }}
                            src={img["imgByte"]}
                          />
                          <IconButton
                            onClick={() => imgHandleDelete(img["name"])}
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </div>
                      );
                    })
                  : null}
              </div>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <FileUpload addFile={fileUpload} files={files} />
              {files.length !== 0
                ? files.map((file, idx) => {
                    return (
                      <div key={idx} style={{ textAlign: "center" }}>
                        <br />
                        <Chip
                          variant="outlined"
                          label={file["name"]}
                          color="secondary"
                          onDelete={() => handleDelete(file["name"])}
                        />
                      </div>
                    );
                  })
                : null}
              {progressState ? (
                <LinearProgress color="secondary" style={{ marginTop: 5 }} />
              ) : null}
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <TextField
                inputRef={content}
                label="내 용"
                multiline
                fullWidth
                rows="10"
                defaultValue=" "
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={btnSubmit} color="primary">
            등 록
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
