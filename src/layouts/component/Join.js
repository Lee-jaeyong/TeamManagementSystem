import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function FormDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(props['open']);
  
  const handleClose = () => {
    setOpen(false);
    props['handleClose']();
  };
  
  useEffect(()=>{
    if(props['open']){
      setOpen(true);
    }
  },[props['open']]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>회원 가입</h4>
                  <p className={classes.cardCategoryWhite}>사용자의 기본 정보를 입력합니다.</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="아이디"
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="이메일"
                        id="email-address"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="이름"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="비밀번호"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="비밀번호 재입력"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            회원가입
          </Button>
          <Button onClick={handleClose} color="primary">
            취 소
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}