import React, { useState } from "react";
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
import ImageUp from "./UploadImage"
import { widgetStories, bugs, website, server } from "variables/general.js";
import image from "assets/img/faces/card-profile1-square.jpg";
import { borders } from '@material-ui/system';
///Importaciones para subir imagenes
import PropTypes from "prop-types";
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import axios from 'axios';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";
import {
  createStyles,
  fade,
  Theme,
  withStyles,

} from "@material-ui/core/styles";
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


const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white"
    },
    "& input.Mui-focused": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    }
  }
})(TextField);

const theme = createMuiTheme({
  overrides: {


    MuiInputLabel: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: "white",

        "&$focused": { // increase the specificity for the pseudo class
          color: "white",

        },
        focused: {
          color: "white",

          "&$focused": {
            color: "white"
          },
          input: {
            color: "white"
          }
        },
        MuiOutlinedInput: { // Name of the component ⚛️ / style sheet
          color: "#fff",
          root: { // Name of the rule
            color: "white",

            "&$focused": { // increase the specificity for the pseudo class
              color: "white",

            },
            focused: {
              color: "white",

              "&$focused": {
                color: "white"
              },
              input: {
                color: "white"
              }
            }
          }
        }




      }
    }

  }
});

/* If the file that you want to delete it's in your bucket's root folder, don't provide any dirName in the config object */

//In this case the file that we want to delete is in the folder 'photos' that we referred in the config object as the dirName



const baseUrl = "https://easy-eat-oficial.herokuapp.com"
const baseUrl2 = "http://localhost:8081"
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};






export default function Widgets(props) {

  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
  const showNotification = place => {
    switch (place) {
      case "tl":
        if (!tl) {
          setTL(true);
          setTimeout(function () {
            setTL(false);
          }, 3000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function () {
            setTC(false);
          }, 3000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function () {
            setTR(false);
          }, 6000);
        }
        break;
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function () {
            setBL(false);
          }, 6000);
        }
        break;
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function () {
            setBC(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function () {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };
  function Postplato(nombrep, preciop, descripcionp, categoriap, imagenp) {


    console.log(nombrep)
    console.log(preciop)
    console.log(descripcionp)
    console.log(categoriap)
    axios.post(baseUrl2 + '/api/product/create-product', {
      name: nombrep,
      category: categoriap,
      description: descripcionp,
      price: Number(preciop),
      
    })
      .then(function (response) {
  
        let data = new FormData();
        //console.log(imagenp.raw)
        data.append('file', imagenp);
        axios.post(baseUrl+'/image/files/' + nombrep.replaceAll(" ", ""), data)
          .then(function (response) {
            showNotification("tc");
            console.log("file uploaded!", response);
  
          })
          .catch(function (error) {
            showNotification("tl");
            console.log("failed file upload", error);
          });
        console.log(response);
        //alert("Se creo el plato satisfactoriamente")
      })
      .catch(function (error) {
        showNotification("tl");
        console.log(error);
      });
  }
  


  const classes2 = useStyles();
  const classes = useStyles2();

  const [nombre, setnombre] = useState('')
  const [descripcion, setdescripcion] = useState('')
  const [categoria, setcategoria] = useState('')
  const [precio, setprecio] = useState(0)
  const [imagen, setImagen] = useState()

  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    defaultImage
  );
  let fileInput = React.createRef();
  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // eslint-disable-next-line
  const handleSubmit = e => {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(defaultImage);
    fileInput.current.value = null;
  };
  //let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;


  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const RegisterPlato = event => {
    event.preventDefault();
    Postplato(nombre, precio, descripcion, categoria, file)

  };


  const handleChange = (e) => {
    setImagen({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    })
  }
  let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
  return (

    <Card login className={classes2[cardAnimaton]} style={{ backgroundImage: `url(${imageDish})` }}>

      
      <CardHeader
        className={`${classes2.cardHeader} ${classes2.textCenter}`}
        color="info"
      >
        <h3 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes2.cardTitle}>Create Product</h3>

      </CardHeader>
      <CardBody >
        <div>
        <Snackbar
            place="tc"
            color="success"
            icon={AddAlert}
            message="Se creo el plato"
            open={tc}
            closeNotification={() => setTC(false)}
            close
          />
          <Snackbar
            place="tl"
            color="rose"
            icon={AddAlert}
            message="No se pudo crear e plato"
            open={tl}
            closeNotification={() => setTL(false)}
            close
          />
          <center>
            {/* <ImageUpload
                    onChange={handleChange}

                    addButtonProps={{
                      color: "rose",
                      round: true
                    }}
                    changeButtonProps={{
                      color: "rose",
                      round: true
                    }}
                    removeButtonProps={{
                      color: "danger",
                      round: true
                    }}
                  />
             */}
            {/* <input type="file" id="file" onChange={handleChange} /> */}
            <div className="fileinput text-center">
              <input type="file" onChange={handleImageChange} ref={fileInput} />
              <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                <img src={imagePreviewUrl} alt="..." />
              </div>
              <div>
                {file === null ? (
                  <Button color="rose" round="true" onClick={() => handleClick()}>
                    {avatar ? "Add Photo" : "Select image"}
                  </Button>
                ) : (
                    <span>
                      <Button color="rose" round="true" onClick={() => handleClick()}>
                        Change
            </Button>
                      {avatar ? <br /> : null}
                      <Button color="danger" round="true" onClick={() => handleRemove()}>
                        <i className="fas fa-times" /> Remove
            </Button>
                    </span>
                  )}
              </div>
            </div>
          </center>
          <ThemeProvider theme={theme}>


            <CssTextField

              id="outlined-name"
              label="Dish name"
              onChange={e => setnombre(e.target.value)}
              value={nombre}
              margin="normal"
              variant="outlined"
              fullWidth="100%"


            />
          </ThemeProvider>
          <br />

          <CssTextField
            id="outlined-name"
            label="Price"
            onChange={e => setprecio(e.target.value)}
            value={precio}
            margin="normal"
            variant="outlined"
            fullWidth="100%"
          />
          <br />
          <CssTextField
            id="outlined-name"
            label="Description"
            onChange={e => setdescripcion(e.target.value)}
            value={descripcion}
            margin="normal"
            variant="outlined"
            fullWidth="100%"
          />
          <br />

          <CssTextField
            id="outlined-name"
            label="Category"
            onChange={e => setcategoria(e.target.value)}
            value={categoria}
            margin="normal"
            variant="outlined"
            fullWidth="100%"

          />
          <br />
          <center>
            <br />
            <Button variant="contained" onClick={RegisterPlato} style={{ background: "#FF4136" }} className={classes.button}>
              Create
                </Button>
          </center>

        </div>
      </CardBody>

    </Card>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};
