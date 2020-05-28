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

import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';

import UpdateBoard from './component/UpdateBoard';

import * as axiosGet from '@axios/get';
import * as axiosDelete from '@axios/delete';

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
  const [updateBoardState,sestUpdateBoardState] = useState(false);
  const [deleteState,setDeleteState] = useState(false);

  const {data} = props;
  const [images,setImages] = useState([]);
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
      if (imgNum >= images.length - 1) return;
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

  const deleteYesClick = () => {
    axiosDelete.deleteNotContainsData("http://172.30.1.37:8090/api/teamManage/notice/" + props['data']['data']['seq'],deleteSuccess);
  }

  const deleteSuccess = (res) => {
    props.messageBoxHandle(true,"공지사항 삭제 완료",2000,'success');
    props.updateList();
    handleClose();
  }

  const speedDialhandleOpen = () => {
    setSpeedDialopen(true);
  };

  const deleteClick = () => {
    setDeleteState(true);
  }

  const updateClick = () => {
    sestUpdateBoardState(true);
  }

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

  const updateList = () => {
    props['updateList']();
    handleClose();
  }

  useEffect(() => {
    setOpen(props["open"]);
    setImages([]);
  }, [props["open"]]);

  useEffect(()=>{
    let images = [];
    if(props['data']){
      for(let i =0;i<props['data']['image'].length;i++){
        images.push("data:image/png;base64,"+props['data']['image'][i]);
      }
    }
    setImages(images);
  },[props['data']])

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
                    onClick={updateClick}
                  />
                  <SpeedDialAction
                    icon={<DeleteForeverIcon />}
                    tooltipTitle="삭제"
                    tooltipPlacement="bottom-end"
                    onClick={deleteClick}
                  />
                </SpeedDial>
              </ThemeProvider>
            }
            title={data ? data['data']['title'] : null}
            subheader={data ? data['data']['date'] : null}
          />
          {
            data ? data['data']['noticeFileAndImg'].map((files,idx)=>{
              if(files['type'] === 'FILE'){
                return (
                  <Chip
                    key={idx}
                    style={{ marginBottom: 10, marginLeft: 15 }}
                    avatar={<GetAppIcon />}
                    label={files['name']}
                    onClick={() => {
                      axiosGet.getFileDownload("http://172.30.1.37:8090/api/teamManage/notice/" + data['data']['seq'] + "/downloadFile/" + files['name'],files['name']);
                    }}
                    size="small"
                    variant="outlined"
                  />
                )
              }
            }) : null
          }
          {
            data ? data['image'].length === 0 ? null : data['image'].length === 1 ? (
              <CardMedia
                ref={cardImgRef}
                className={cardClasses.media}
                image={"data:image/png;base64," + data['image'][0]}
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
                      image={images[imgNum]}
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
            ) : null
          }
          <CardContent>
            <Typography paragraph>{data ? data['data']['content'] : null}</Typography>
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
        <UpdateBoard open={updateBoardState} messageBoxHandle={props['messageBoxHandle']} updateList={updateList} handleClose={()=>sestUpdateBoardState(false)} images={images} data={props['data']}/>
        <ConfirmDialog title={"공지사항 삭제"} content={"정말 공지사항을 삭제하시겠습니까?"} yseClick={deleteYesClick} open={deleteState} handleClose={()=>setDeleteState(false)}/>
      </Dialog>
    </div>
  );
}
