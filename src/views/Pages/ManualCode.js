import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
import NavPills from "components/NavPills/NavPills.js"; 
import Home from "@material-ui/icons/Home";
import BugReport from "@material-ui/icons/BugReport";
import TextField from '@material-ui/core/TextField';
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FormatQuote from "@material-ui/icons/FormatQuote";
// core components
import FormLabel from "@material-ui/core/FormLabel";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Timeline from "components/Timeline/Timeline.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { widgetStories, bugs, website, server } from "variables/general.js";
import Image from 'material-ui-image'
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import Clear from '@material-ui/icons/Clear'
import Favorite from '@material-ui/icons/CheckBox'
//import image from "assets/img/faces/card-profile1-square.jpg";

import {
  cardTitle,
  roseColor
} from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  }
};

const useStyles = makeStyles(styles);

export default function Description() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer >
      

        <GridItem xs={12} sm={12} md={12} >
        
        <Link to="/qr" style={{textDecoration: 'none',display:"block"}}>
                    <Fab color="primary" style={{margin: "10px",position: "fixed",
                       
                        right: "0",backgroundColor:"#FF4136",color:"#fff", "z-index": "100"}} aria-label="add">
                      
                                <Clear style={{color:"#fff"}}/>
                                
                    </Fab>
                    </Link>     
          <Card >
        
            
            <CardBody fullHeight>
              <NavPills
                color="warning"
                tabs={[
                  
                  {
                    tabButton: "Code",
                    tabContent: (
                            <div>                            
                            <br></br>                            
                        <TextField
                        id="outlined-dense-multiline"
                        label="Type the table's code"
                        //className={clsx(classes.textField, classes.dense)}
                        fullWidth
                        fullHeight
                        margin="dense"
                        variant="outlined"
                        multiline
                        rowsMax="4"
                />
                        <br/><br/>
                        <Link to="/user/dashboard" style={{textDecoration: 'none',display:"block"}}>
                        <Button style={{bottom:"0px"}} fullWidth color="success">
                        OK! 
                        <Favorite/>
                        </Button>  
                        </Link>                      
                        </div>
                    )
                    
                  },
                
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
       
        
      </GridContainer>
    </div>
  );
}
