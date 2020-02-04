import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
//import Timeline from "@material-ui/icons/Timeline";
//import Code from "@material-ui/icons/Code";
//import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { Link, Redirect } from 'react-router-dom'
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import axios from 'axios';
import ButtonO from '@material-ui/core/Button';
import desktopImage from '../images/FondoEasy.png';
import "./fuente.css"
import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";
const useStyles = makeStyles(styles);


const baseUrl2 = "https://ecommerce-payu.herokuapp.com/"
const baseUrl = "http://localhost:8081"
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function RegisterPage() {

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
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function () {
            setTC(false);
          }, 6000);
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
  function PostUser(namec, passwordc, emailc, role) {

    console.log(namec)
    console.log(passwordc)
    console.log(emailc)
    console.log(role);
    var val = "USER"
    if (role) {
      val = "ADMIN"
    }
    axios.post(baseUrl + '/api/account/add-account', {
      email: emailc,
      password: passwordc,
      fullName: namec,
      enabled: true,
      role: val,
      balance: 20000
    })
      .then(function (response) {
        // console.log(response);
        // //alert("Se logeo")
        // window.location.assign("/login");
        axios.post(baseUrl + '/api/cart/add-cart', {
          account_id: 2
        })
          .then(function (response) {
            // console.log(response);
            // //alert("Se logeo")
            // window.location.assign("/login");

            alert("Entro a crear el carrito")
            showNotification("tr");
            window.location.assign("/login");

          })
          .catch(function (error) {
            console.log(error);
            showNotification("tc");
          });


        showNotification("tr");
        window.location.assign("/login");

      })
      .catch(function (error) {
        console.log(error);
        showNotification("tc");
      });
  }

  const [checkedItems, setCheckedItems] = React.useState({ Administrador: false }); //plain object as state
  const CheckboxExample = () => {

    const handleChange = (event) => {
      // updating an object instead of a Map
      setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
      console.log("checkedItems: ", checkedItems);

    }

    const checkboxes = [
      {
        name: 'Administrador',
        key: 'checkBox1',
        label: 'Check Box 1',
      }
      // {
      //   name: 'check-box-2',
      //   key: 'checkBox2',
      //   label: 'Check Box 2',
      // }
    ];




    return (
      <div>
        <lable>¿Eres Adminstrador?{checkedItems["Administrador"]} </lable> <br />
        {
          checkboxes.map(item => (
            <label key={item.key}>
              {item.name}
              <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
            </label>
          ))
        }
      </div>
    );
  };

  const NameLine = () => {

    const [name, setname] = React.useState("")
    React.useEffect(() => {
      localStorage.setItem('nameStorage', name)
      console.log(localStorage.getItem('nameStorage'))
    }, [name]);

    const onChange = event => setname(event.target.value);
    return (
      <CustomInput
        formControlProps={{
          value: name,
          onChange: onChange,
          fullWidth: true,
          className: classes.customFormControlClasses
        }}
        inputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              className={classes.inputAdornment}
            >
              <Face className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          placeholder: "Full Name..."
        }}
      />
    );
  };
  const EmailLine = () => {
    const [email, setemail] = React.useState(
      ""
    );
    React.useEffect(() => {
      localStorage.setItem('emailStorage', email)
      console.log(localStorage.getItem('emailStorage'))
    }, [email]);

    const onChange = event => setemail(event.target.value);
    return (
      <CustomInput
        formControlProps={{
          value: email,
          onChange: onChange,
          fullWidth: true,
          className: classes.customFormControlClasses
        }}
        inputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              className={classes.inputAdornment}
            >
              <Email className={classes.inputAdornmentIcon} />
            </InputAdornment>
          ),
          placeholder: "Email...",
        }}
      />
    );
  };
  const PasswordLine = () => {
    const [password, setpassword] = React.useState(
      ""
    );
    React.useEffect(() => {
      localStorage.setItem('passwordStorage', password)
      console.log(localStorage.getItem('passwordStorage'))
    }, [password]);

    const onChange = event => setpassword(event.target.value);
    return (
      <CustomInput
        formControlProps={{
          value: password,
          onChange: onChange,
          fullWidth: true,
          className: classes.customFormControlClasses
        }}
        inputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              className={classes.inputAdornment}
            >
              <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
            </InputAdornment>
          ),
          placeholder: "Password...",
          type: "password",
          autoComplete: "off"
        }}
      />

    );
  };
  /*AQUI VA PARA HACER EL AXIOS*/
  const RegisterUser = event => {
    event.preventDefault();
    PostUser(localStorage.getItem('nameStorage'), localStorage.getItem('passwordStorage'), localStorage.getItem('emailStorage'), checkedItems["Administrador"]);

  };
  const classes = useStyles();
  return (
    <div className={classes.container} >
      <Snackbar
        place="tr"
        color="success"
        icon={AddAlert}
        message="Se creo el usuario Satisfactoriamente"
        open={tr}
        closeNotification={() => setTR(false)}
        close
      />
      <Snackbar
        place="tc"
        color="rose"
        icon={AddAlert}
        message="No se pudo crear el usuario"
        open={tc}
        closeNotification={() => setTC(false)}
        close
      />
      <Snackbar
        place="tl"
        color="rose"
        icon={AddAlert}
        message="En el proceso no se pudo crear el carrito"
        open={tl}
        closeNotification={() => setTL(false)}
        close
      />
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={10}>
          <Card className={classes.cardSignup} style={{ backgroundImage: `url(${desktopImage})` }}>
            <h2 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes.cardTitle}>Register</h2>
            <CardBody>
              <GridContainer justify="center">

                <GridItem xs={12} sm={8} md={5}>
                  <div className={classes.center}>
                    <Button justIcon round color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    {` `}
                    <Button justIcon round color="dribbble">
                      <i className="fab fa-dribbble" />
                    </Button>
                    {` `}
                    <Button justIcon round color="facebook">
                      <i className="fab fa-facebook-f" />
                    </Button>
                    {` `}
                  </div>
                  <form className={classes.form}>
                    {/* Name */}
                    <NameLine />
                    <EmailLine />
                    <PasswordLine />
                    <CheckboxExample />
                    <br />
                    <br />

                    <div className={classes.center} >

                      <ButtonO variant="contained" color="secondary" onClick={RegisterUser} className={classes.button}>
                        Sign Up
                      </ButtonO>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
            <br />
            <br />
            <a href="/login" style={{ margin: "10px", color: "#fff", textAlign: "center" }} >Already Have an Account? Sign in </a>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
