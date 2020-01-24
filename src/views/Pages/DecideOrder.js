import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { Link, Redirect } from 'react-router-dom'
// @material-ui/icons
import Email from "@material-ui/icons/Email";
//import LockOutline from "@material-ui/icons/LockOutline";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import desktopImage from '../images/FondoEasyLogin.png';
import ButtonO from '@material-ui/core/Button';
import "./fuente.css"
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Self from "../images/selforder.png"
import Pre from "../images/preorder.png"
const baseUrl = "https://easy-eat-oficial.herokuapp.com"
const useStyles = makeStyles(styles);

const images = [
    {
        url: `${Pre}`,
        title: 'PreOrder',
        width: '50%',
        ton:'/user/dashboard',                   
    },
    {
        url: `${Self}`,
        title: 'SelfOrder',
        width: '50%',
        ton:'/qr',                
    }
];


const useStyles2 = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

export default function ChoiceOrderPage() {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);

    const classes2 = useStyles();
    const classes = useStyles2();

    const handleClick=(red)=> {
        if('/user/dashboard'==red){
            localStorage.setItem("decideOrder","PreOrder")

            window.location.assign(red);
        }
        else{
            localStorage.setItem("decideOrder","SelfOrder")
            window.location.assign(red);
        }
    }


    const Order = () => {

        const Log = event => {
            event.preventDefault();

        };
        return (
            <Card login className={classes2[cardAnimaton]}>
                <CardHeader
                    className={`${classes2.cardHeader} ${classes2.textCenter}`}
                    color="info"
                >
                    <h3 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes2.cardTitle}>Choice Your Order Type</h3>

                </CardHeader>
                <CardBody >
                    <div className={`${classes.root} ${classes2.cardHeader}`}>
                        {images.map(image => (
                            
                            <ButtonBase
                                onClick={() => handleClick(image.ton)}  
                                href={image.ton}
                                focusRipple
                                key={image.title}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}                                
                                style={{
                                    width: image.width,
                                }}
                                
                            >                                
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                        backgroundImage: `url(${image.url})`,
                                    }}
                                />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                        {image.title}
                                        <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>
                            
                        ))}
                    </div>
                </CardBody>

            </Card>
        );
    };


    const SessionLogin = (email, password) => {
        if (localStorage.getItem('emailStorage') === email && localStorage.getItem('passwordStorage') === password) {
            return (
                "/dO"
            );
        }
    };

    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                    <form>
                        <Order />
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    );
}
