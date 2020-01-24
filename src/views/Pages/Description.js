import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Home from "@material-ui/icons/Home";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FormatQuote from "@material-ui/icons/FormatQuote";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Timeline from "components/Timeline/Timeline.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import NavPills from "components/NavPills/NavPills.js";
import Tasks from "components/Tasks/Tasks.js";
import Card from "components/Card/Card.js";
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField'
import imageDish from "../images/CreateDish.png"
import Self from "../images/selforder.png"
import Pre from "../images/preorder.png"
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import Clear from '@material-ui/icons/Clear'
import { widgetStories, bugs, website, server } from "variables/general.js";
import Favorite from '@material-ui/icons/AddShoppingCart'
import image from "assets/img/faces/card-profile1-square.jpg";
import { borders } from '@material-ui/system';
import axios from 'axios';


const useStyles = makeStyles(styles);

const images = [
  {
    url: `${Pre}`,
    title: 'PreOrder',
    width: '50%',
    ton: '/user/dashboard'
  },
  {
    url: `${Self}`,
    title: 'SelfOrder',
    width: '50%',
    ton: '/qr'
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


const baseUrl = "https://easy-eat-oficial.herokuapp.com"
const baseUrl2 = "http://localhost:8080"
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Postplato(commentU) {

  
  axios.post(baseUrl+"/cart/add-cart/" + localStorage.getItem("mailLogged"), {
    id: localStorage.getItem('idDescripcion'),
    name: localStorage.getItem('nombreDescripcion'),
    category: localStorage.getItem('categoriaDescripcion'),
    description: localStorage.getItem('descripcionDescripcion'),
    price: Number(localStorage.getItem('precioDescripcion')),
    commentUser: commentU,
    cantidad:1
  }).then(function (resp) {
    console.log(resp)
    alert("Se creo el plato")
    //showNotification("tc");
    
  }).catch(function (er) {
    console.log(er);
    //showNotification("tl");
    alert("no se creo el plato")
  });

}


export default function Widgets(props) {
  const classes2 = useStyles();
  const classes = useStyles2();
  const [commentUser,setCommentUser] = useState('')
  const [data, setData] = useState('');

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  

  useEffect(() => {
    axios.get(baseUrl + '/dish/'+localStorage.getItem("nombreP"))
      .then(response => {
        const datos = response.data;
        localStorage.setItem('idDescripcion',datos.id)
        localStorage.setItem('nombreDescripcion',datos.name)
        localStorage.setItem('precioDescripcion',datos.price)
        localStorage.setItem('categoriaDescripcion',datos.category)
        localStorage.setItem('descripcionDescripcion',datos.description)
        console.log(datos)
        //ur = "http://localhost:8080/image/files/"+localStorage.getItem("nombreP")
        setData(datos);
        //console.log(data)

      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const RegisterPlato = event => {
    event.preventDefault();
    Postplato(commentUser)

  };

  const ur = baseUrl+"/image/files/"+localStorage.getItem("nombreP").replaceAll(" ","");


  return (

    <Card login className={classes2[cardAnimaton]} >
      <CardHeader

        className={`${classes2.cardHeader} ${classes2.textCenter}`}
        color="info"
      >
        <Link to="/user/dashboard" style={{ textDecoration: 'none', display: "block" }}>
          <Fab color="primary" style={{
            margin: "10px", position: "fixed",

            right: "0", backgroundColor: "#FF4136", color: "#fff", "z-index": "100"
          }} aria-label="add">

            <Clear style={{ color: "#fff" }} />

          </Fab>
        </Link>
        <h3 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes2.cardTitle}>Description</h3>


      </CardHeader>
      <CardBody >

        <Link to="/user/dashboard" style={{ textDecoration: 'none', display: "block" }}>

        </Link>
        <span>
          <center>
            <h3> {data.name} </h3>
          </center>
          <br></br>
          <img style={{ marginLeft: "20%", marginBottom: "5%", width: "50%", height: "50%", float: "center" }} src={ur} />
          <center>
            <br></br>
            <p>
              
              {data.description}
            </p>
            <br />
          </center>
          <br />
          <TextField
            id="outlined-dense-multiline"
            label="Escribe tus comentarios"
            fullWidth
            fullHeight
            margin="dense"
            variant="outlined"
            onChange={e => setCommentUser(e.target.value)}
            value={commentUser}
            multiline
            rowsMax="4"
          />
          <br /><br />

          <Link to="/user/Cart" style={{ textDecoration: 'none', display: "block" }}>
            <Button onClick={RegisterPlato} fullWidth color="success" className={classes.marginRight}>
              Añadir al carrito
                              <Favorite />
            </Button>
          </Link>
        </span>
      </CardBody>

    </Card>
  );
}
