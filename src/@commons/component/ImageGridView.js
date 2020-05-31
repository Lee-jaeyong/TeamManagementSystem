import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
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

const ImageGridView = ({ imges, deleteFile }) => {
  const classes = useStyles();
  return (
    <GridList className={classes.gridList}>
      {imges.map((img, idx) => (
        <GridListTile key={idx} style={{ width: 500 }}>
          <img style={{ width: 500, height: 500 }} src={img["imgByte"]} />
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
