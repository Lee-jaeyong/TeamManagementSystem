import React, { useEffect, useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Slide from "@material-ui/core/Slide";

///////////////////////////////////////////
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import sampleImg from "assets/img/sidebar-2.jpg";
import { useForkRef } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const mockData = {
  name: "윤지원",
  date: "2020-04-18",
  content:
    "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet Heat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillover medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
  img: [
    "/images/sidebar-1.jpg",
    "/images/sidebar-2.jpg",
    "/images/sidebar-5.jpg",
  ],
  userImg: "img",
};
export default function BoardView(props) {
  const [open, setOpen] = useState(props["open"]);

  const cardClasses = useStyles();
  const [expanded, setExpanded] = useState(false);
  const cardImgRef = useRef();
  const [imgNum, setImgNum] = useState(0);
  const [slide, setSlide] = useState(true);
  const [slideDirection, setSlideDirection] = useState("left");

  // Prev And Next Button Handle
  const prevAndNextHandle = (type) => {
    if (!slide) return;
    let direction = type;
    let opDirection = type === "left" ? "right" : "left";
    setSlideDirection(direction);
    setSlide(false);
    setTimeout(() => {
      type === "left" ? setImgNum(imgNum + 1) : setImgNum(imgNum - 1);
      setSlideDirection(opDirection);
      setSlide(true);
    }, 300);
  };

  // Prev And Next Button Click Event
  const imgSliderHandle = (type) => {
    if (type === "prev") {
      if (imgNum == 0) return;
      prevAndNextHandle("right");
    } else {
      if (imgNum >= mockData.img.length - 1) return;
      prevAndNextHandle("left");
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };
  useEffect(() => {
    setOpen(props["open"]);
  }, [props["open"]]);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        scroll="body"
      >
        <Card className={cardClasses.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={cardClasses.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          {mockData.img ? (
            mockData.img.length === 1 ? (
              <CardMedia
                ref={cardImgRef}
                className={cardClasses.media}
                image={mockData.img}
                title="Paella dish"
              />
            ) : (
              <Grid container>
                <Grid item xs={2} md={1} sm={1}>
                  <Button
                    onClick={() => imgSliderHandle("prev")}
                    style={{ height: "100%" }}
                  >
                    <ChevronLeftIcon fontSize="large" />
                  </Button>
                </Grid>
                <Grid item xs={8} md={10} sm={10}>
                  <Slide direction={slideDirection} in={slide} mountOnEnter>
                    <CardMedia
                      style={{ borderRadius: "2%" }}
                      ref={cardImgRef}
                      className={cardClasses.media}
                      image={mockData.img[imgNum]}
                      title="Paella dish"
                    />
                  </Slide>
                </Grid>
                <Grid item xs={2} md={1} sm={1}>
                  <Button
                    onClick={() => imgSliderHandle("next")}
                    style={{ height: "100%" }}
                  >
                    <ChevronRightIcon fontSize="large" />
                  </Button>
                </Grid>
              </Grid>
            )
          ) : null}

          <CardContent>
            {/* <Typography variant="body2" component="p"> */}
            <Typography paragraph>{mockData.content}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(cardClasses.expand, {
                [cardClasses.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Dialog>
    </div>
  );
}
