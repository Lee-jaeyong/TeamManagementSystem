import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Chip,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "components/Card/Card.js";
import { Typography, Grid, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CardHeader from "components/Card/CardHeader.js";
import ImageGridView from "@commons/component/ImageGridView";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Tooltip from "@material-ui/core/Tooltip";

import UpdateBoardDialog from "@commons/board/component/update/UpdateBoardDialog";
import DragableComponent from '@commons/component/DragableComponent';

import {
  deleteBoard as _deleteBoard,
  fileDownLoad as _fileDownLoad,
  fileAllDownload,
} from "@commons/board/methods/BoardAccess";

import { showConfirmHandle } from "@store/actions/ConfirmAction";
import { showMessageHandle } from "@store/actions/MessageAction";
import { deleteBoard } from "@store/actions/Board/BoardAction";

const TopInfo = memo(
  ({ userImg, author, date, isMy, deleteHandle, updateHandle }) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar
            {...(userImg ? { src: "data:image/png;base64," + userImg } : null)}
          />
        </ListItemAvatar>
        <ListItemText primary={author} secondary={date} />
        {isMy ? (
          <React.Fragment>
            <Button
              onClick={updateHandle}
              startIcon={<UpdateIcon />}
              size="small"
              variant="contained"
              style={{ marginRight: 10 }}
              color="primary"
            >
              수정
            </Button>
            <Button
              onClick={deleteHandle}
              startIcon={<DeleteIcon />}
              size="small"
              variant="contained"
              color="secondary"
            >
              삭제
            </Button>
          </React.Fragment>
        ) : null}
      </ListItem>
    );
  }
);

const MiddleInfo = memo(({ content }) => {
  return (
    <TextField
      style={{ marginTop: 30, marginBottom: 30 }}
      label="내 용"
      multiline
      fullWidth
      value={content}
      rows={10}
      variant="outlined"
    />
  );
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

const ImageArea = memo(({ images }) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <ImageGridView imges={images ? parseImg(images) : []} />
    </div>
  );
});

const FileDownLoadArea = memo(({ allFileDownload }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <Button
        onClick={allFileDownload}
        startIcon={<CloudUploadIcon />}
        color="primary"
        variant="contained"
      >
        모든 파일 다운로드
      </Button>
    </div>
  );
});

const fileDivider = (files, type) => {
  return files.filter((value) => value["type"] === type);
};

const FileArea = memo(({ files, fileDownLoad }) => {
  return (
    <div style={{ marginBottom: 30 }}>
      {files &&
        fileDivider(files, "FILE").map((file, idx) => {
          return (
            <React.Fragment key={idx}>
              <Tooltip title="파일 다운로드" placement={"right"}>
                <Chip
                  onClick={() => fileDownLoad(file["name"])}
                  icon={<GetAppIcon />}
                  clickable
                  variant="outlined"
                  label={file["name"]}
                  style={{ marginBottom: 10 }}
                />
              </Tooltip>
              <br />
            </React.Fragment>
          );
        })}
    </div>
  );
});

export const BoardReadDialog = memo(({ open, handleClose, board, type }) => {
  const dispatch = useDispatch();
  const [updateBoardDialogState, setUpdateBoardDialogState] = useState(false);

  const fileDownLoad = (fileName) => {
    _fileDownLoad(type, board["seq"], fileName);
  };

  const allFileDownload = () => {
    fileAllDownload(type, board["seq"], board["title"]);
  };

  const yseClick = () => {
    _deleteBoard(type, board["seq"]);
    dispatch(deleteBoard(board));
    dispatch(
      showMessageHandle({ open: true, content: "삭제 완료", level: "success" })
    );
    handleClose();
  };

  const deleteHandle = () => {
    dispatch(
      showConfirmHandle({
        open: true,
        title: "삭제",
        content: "정말 삭제하시겠습니까?",
        yseClick: yseClick,
      })
    );
  };

  const updateHandle = () => {
    setUpdateBoardDialogState(true);
  };

  return (
    <Dialog
      scroll={"body"}
      PaperComponent={DragableComponent}
      maxWidth={"md"}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <UpdateBoardDialog
        open={updateBoardDialogState}
        handleClose={() => setUpdateBoardDialogState(false)}
        {...{ board, type }}
      />
      <Card>
        <CardHeader
          id="draggable-dialog-title"
          color="info"
          style={{ cursor: "move" }}
        >
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                {board["title"]}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                size={"small"}
                aria-label="close"
                onClick={handleClose}
              >
                <CloseIcon
                  style={{
                    color: "white",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardHeader>
        <DialogContent>
          <TopInfo
            {...{ updateHandle, deleteHandle }}
            userImg={
              board["user"] && board["user"]["myImg"]
                ? board["user"]["myImg"]
                : null
            }
            author={
              board["user"] && board["user"]["name"]
                ? board["user"]["name"]
                : null
            }
            isMy={
              board["user"] && board["user"]["id"]
                ? board["user"]["id"] === localStorage.getItem("ID")
                : false
            }
            date={board["date"]}
          />
          <MiddleInfo content={board["content"]} />
          {board["fileList"] && board["fileList"].length > 0 ? (
            <FileDownLoadArea {...{ allFileDownload }} />
          ) : null}
          <ImageArea images={board["fileList"]} />
          <FileArea {...{ fileDownLoad }} files={board["fileList"]} />
        </DialogContent>
      </Card>
    </Dialog>
  );
});

export default BoardReadDialog;
