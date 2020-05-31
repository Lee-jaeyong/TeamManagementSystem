import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { showMessageHandle } from "@store/actions/MessageAction";

import Dialog from "@material-ui/core/Dialog";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
  Divider,
  Chip,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "components/Card/Card.js";
import { Typography, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CardHeader from "components/Card/CardHeader.js";
import ImageGridView from "@commons/component/ImageGridView";
import GetAppIcon from "@material-ui/icons/GetApp";

const TopInfo = memo(({ userImg, author, date }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          {...(userImg ? { src: "data:image/png;base64," + userImg } : null)}
        />
      </ListItemAvatar>
      <ListItemText primary={author} secondary={date} />
    </ListItem>
  );
});

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

const fileDivider = (files, type) => {
  return files.filter((value) => value["type"] === type);
};

const FileArea = memo(({ files }) => {
  return (
    <div style={{ marginBottom: 30 }}>
      {files &&
        fileDivider(files, "FILE").map((file) => {
          return (
            <React.Fragment>
              <Chip
                icon={<GetAppIcon />}
                clickable
                variant="outlined"
                label={file["name"]}
                style={{ marginBottom: 10 }}
              />
              <br />
            </React.Fragment>
          );
        })}
    </div>
  );
});

export const BoardReadDialog = memo(({ open, handleClose, board }) => {
  const dispatch = useDispatch();

  const messageBoxHandle = useCallback((open, content, level) => {
    dispatch(showMessageHandle({ open: open, content: content, level: level }));
  }, []);

  return (
    <Dialog
      PaperComponent="div"
      maxWidth={"md"}
      fullWidth
      open={open}
      onClose={handleClose}
    >
      <Card>
        <CardHeader color="info">
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="h6">
                {board['title']}
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
            date={board["date"]}
          />
          <MiddleInfo content={board["content"]} />
          <ImageArea images={board["noticeFileAndImg"]} />
          <FileArea files={board["noticeFileAndImg"]} />
        </DialogContent>
      </Card>
    </Dialog>
  );
});

export default BoardReadDialog;
