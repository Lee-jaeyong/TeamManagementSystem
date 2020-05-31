import React, { useState, useEffect, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Fade from "@material-ui/core/Fade";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import BigSizeImg from "@commons/component/BigSizeImg";

const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const ImgOne = memo(({ img, bigSizeImg }) => {
  const [isOver, setIsOver] = useState(false);
  useEffect(() => {
    setIsOver(false);
  }, []);
  return (
    <React.Fragment>
      <Fade
        style={{ position: "absolute" }}
        in={isOver}
        timeout={300}
        onClick={() => bigSizeImg(img["imgByte"])}
      >
        <div
          style={{
            cursor: "pointer",
          }}
        >
          <ImageSearchIcon
            style={{
              width: 130,
              height: 130,
              marginLeft: 200,
              marginTop: 10,
            }}
          />
        </div>
      </Fade>
      <Fade
        in={!isOver}
        timeout={300}
        onClick={() => bigSizeImg(img["imgByte"])}
      >
        <img
          onMouseOver={() => setIsOver(true)}
          onMouseLeave={() => setIsOver(false)}
          style={{ width: 500, height: 200, cursor: "pointer" }}
          src={img["imgByte"]}
        />
      </Fade>
    </React.Fragment>
  );
});

const ImageGridView = ({
  imges,
  deleteFile,
  originImages,
  deleteOriginImage,
  showBigSizeImage,
}) => {
  const classes = useStyles();
  const [bigSizeImg, setBigSizeImg] = useState(false);
  const [imgByte, setImgByte] = useState();

  const _showBigSizeImage = (imgByte) => {
    setImgByte(imgByte);
    setBigSizeImg(true);
  };

  const init = () => {
    setBigSizeImg(false);
    setImgByte(null);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <GridList className={classes.gridList}>
      <BigSizeImg
        imgByte={imgByte}
        open={bigSizeImg}
        handleClose={() => setBigSizeImg(false)}
      />
      {originImages
        ? originImages.map((img, idx) => (
            <GridListTile key={idx} style={{ width: 500 }}>
              <ImgOne {...{ img }} bigSizeImg={_showBigSizeImage} />
              <GridListTileBar
                title={img["name"]}
                {...(deleteFile
                  ? {
                      actionIcon: (
                        <IconButton
                          onClick={() => deleteOriginImage(img["name"])}
                        >
                          <HighlightOffIcon
                            color={"primary"}
                            className={classes.title}
                          />
                        </IconButton>
                      ),
                    }
                  : null)}
              />
            </GridListTile>
          ))
        : null}
      {imges.map((img, idx) => (
        <GridListTile key={idx} style={{ width: 500 }}>
          <ImgOne {...{ img }} bigSizeImg={_showBigSizeImage} />
          <GridListTileBar
            title={img["name"]}
            {...(deleteFile
              ? {
                  actionIcon: (
                    <IconButton onClick={() => deleteFile(img["name"])}>
                      <HighlightOffIcon
                        color={"primary"}
                        className={classes.title}
                      />
                    </IconButton>
                  ),
                }
              : null)}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default ImageGridView;
