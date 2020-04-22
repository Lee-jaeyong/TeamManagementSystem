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
import SpeedDial from "@material-ui/lab/SpeedDial";
import CreateIcon from "@material-ui/icons/Create";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Chip from "@material-ui/core/Chip";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import GetAppIcon from "@material-ui/icons/GetApp";

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

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
  title: "오늘은 이러이러한 일과를 설정했습니다 확인해주세요",
  content:
    "Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet Heat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillHeat oil in a (14- to 16-inch) paella pan or a large, deep skillover medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.",
  img: [
    "/images/sidebar-1.jpg",
    "/images/sidebar-2.jpg",
    "/images/sidebar-5.jpg",
  ],
  userImg: "img",
  file: ["다음주 일정 정리표.xlsx", "결과 보고서 양식.hwp"],
};
export default function BoardView(props) {
  const [open, setOpen] = useState(props["open"]);
  const [speedDialopen, setSpeedDialopen] = useState(false);
  const cardClasses = useStyles();
  const [expanded, setExpanded] = useState(false);
  const cardImgRef = useRef();
  const [imgNum, setImgNum] = useState(0);
  const [slide, setSlide] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");

  // Prev And Next Button Handle
  const prevAndNextHandle = (type) => {
    if (!slide) return;
    let direction = type;
    let opDirection = type === "left" ? "right" : "left";
    setSlideDirection(direction);
    setSlide(false);
    setTimeout(() => {
      type === "left" ? setImgNum(imgNum - 1) : setImgNum(imgNum + 1);
      setSlideDirection(opDirection);
      setSlide(true);
    }, 300);
  };

  // Prev And Next Button Click Event
  const imgSliderHandle = (type) => {
    if (type === "prev") {
      if (imgNum == 0) return;
      prevAndNextHandle("left");
    } else {
      if (imgNum >= mockData.img.length - 1) return;
      prevAndNextHandle("right");
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    props.handleClose();
    setImgNum(0);
    setOpen(false);
  };

  const speedDialhandleClose = () => {
    setSpeedDialopen(false);
  };

  const speedDialhandleOpen = () => {
    setSpeedDialopen(true);
  };

  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiSpeedDial: {
        // Name of the rule
        fab: {
          // Some CSS
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 7px #150150150",
          width: "50px",
          height: "50px",
          color: "#8C8C8C",
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
        },
      },
    },
  });

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
                {mockData.userImg}
              </Avatar>
            }
            action={
              <ThemeProvider theme={theme}>
                <SpeedDial
                  ariaLabel="SpeedDial example"
                  hidden={hidden}
                  onClose={speedDialhandleClose}
                  onOpen={speedDialhandleOpen}
                  open={speedDialopen}
                  direction="left"
                  icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
                >
                  <SpeedDialAction
                    icon={<CreateIcon />}
                    tooltipTitle="수정"
                    tooltipPlacement="bottom-end"
                    onClick={speedDialhandleClose}
                  />
                  <SpeedDialAction
                    icon={<DeleteForeverIcon />}
                    tooltipTitle="삭제"
                    tooltipPlacement="bottom-end"
                    onClick={speedDialhandleClose}
                  />
                </SpeedDial>
              </ThemeProvider>
            }
            title={mockData.title}
            subheader={mockData.date}
          />
          {mockData.file
            ? mockData.file.map((file, idx) => {
                return (
                  <Chip
                    key={idx}
                    style={{ marginBottom: 10, marginLeft: 15 }}
                    avatar={<GetAppIcon />}
                    label={file}
                    onClick={() => {
                      alert("파일 다운로드url;");
                    }}
                    size="small"
                    variant="outlined"
                  />
                );
              })
            : null}

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
