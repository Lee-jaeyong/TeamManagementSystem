import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";

import ImageUpload from "./ImageUpload";

import * as axiosDelete from '@axios/delete';
import * as axiosPost from '@axios/post';

export default function ImgUpdateDlg(props) {
  const [open, setOpen] = useState(props["open"]);
  const [files, setFiles] = useState();
  const [imgByte, setImgByte] = useState();

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

  async function imgUpload(file) {
    file = file[0];
    const fileName = file["name"];
    let _fileLen = fileName.length;
    let _lastDot = fileName.lastIndexOf(".");
    let _fileExt = fileName.substring(_lastDot, _fileLen).toLowerCase();
    if (_fileExt !== ".jpg" && _fileExt !== ".jpeg" && _fileExt !== ".png") {
      alert("이미지 형식의 파일만 가능");
    } else {
      setFiles(file);
      getImgSource(file).then((res) => setImgByte(res));
    }
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

  const handleClose = () => {
    props.ImgUpdateDlgClose();
    setOpen(false);
  };

  const successUpdateImage = (res) => {
    props.updateImage(imgByte.substring(22,imgByte.length),res['data']['img']);
    handleClose();
  }

  const updateImage = () => {
    const data = new FormData();
    data.append('file',files);
    if(props['originImage']){
      axiosDelete.deleteNotContainsData('http://localhost:8090/api/users/image',()=>{
        axiosPost.postFileUpload('http://localhost:8090/api/users/image',(res)=>{successUpdateImage(res)},data);
      });
    }else{
      axiosPost.postFileUpload('http://localhost:8090/api/users/image',(res)=>{successUpdateImage(res)},data);
    }
  }

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

  useEffect(() => {
    setOpen(props["open"]);
    setImgByte(null);
    setFiles(null);
  }, [props["open"]]);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        style={{ background: "#3f51b5", color: "white" }}
        onClose={handleClose}
      >
        변경할 이미지를 등록해주세요
      </DialogTitle>
      <DialogContent>
        {imgByte ? (
          <div>
            <img style={{ width: "100%", height: "100%" }} src={imgByte} />
            <Divider />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              <span>
                <Button
                  style={{ width: 130, marginRight: 5 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setImgByte();
                    setFiles(null);
                  }}
                >
                  다시 업로드
                </Button>
                <Button
                  style={{ width: 130, marginLeft: 5 }}
                  onClick={updateImage}
                  variant="contained"
                  color="primary"
                >
                  저장
                </Button>
              </span>
            </Grid>
          </div>
        ) : (
          <ImageUpload addImg={imgUpload} files={files} />
        )}
      </DialogContent>
    </Dialog>
  );
}
