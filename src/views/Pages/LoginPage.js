import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

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
import Snackbar from "components/Snackbar/Snackbar.js";
import "./fuente.css"
import AddAlert from "@material-ui/icons/AddAlert";
const baseUrl = "http://localhost:8081"
const baseUrl2 = "https://ecommerce-payu.herokuapp.com/"
const useStyles = makeStyles(styles);


// function LoginUser(emailx,passwordx){
//   console.log(emailx)
//   localStorage.setItem("usuario",emailx)
//   console.log(passwordx)
//   axios.get(baseUrl+'/user/isLogin/'+emailx+'/'+passwordx)
//   .then(function (response) {
//     console.log(response);
//     if(response.data === true){
//       localStorage.setItem("nUsuario",emailx)
//       window.location.assign("/user/dO")
//     }


//   })
//   .catch(function (error) {
//     console.log(error);
//   });


// }



export default function LoginPage() {

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
  function LoginUser(email, psw) {
    alert("Quizo hacer login")
    if (email !== "" && psw !== "") {
      
        axios.get(baseUrl+'/api/account/isLogin/' + email + "/" + psw).then(function (res) {
          const datos = res.data;
          console.log(datos)
          localStorage.setItem("mailLogged",email)
          if (datos.role === "ADMIN") {
            showNotification("tr");
            window.location.assign("/admin/orders")
          }
          else {
            showNotification("tr");
            localStorage.setItem("carrito", [])
            window.location.assign("/user/dashboard")

          }
          
        }).catch(function (er) {
          console.log(email + "  " + psw);
          showNotification("tc");

          console.log(er);
        });

  
    }
    else {

      showNotification("tl");
    }
  }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();


  const Login = () => {
    const [email, setValueEmail] = React.useState(
      ""
    );
    const [password, setValuePass] = React.useState(
      ""
    );
    const onChangeEmail = event => setValueEmail(event.target.value);
    const onChangePass = event => setValuePass(event.target.value);

    const Log = event => {
      event.preventDefault();

      LoginUser(email, password)
    };

    //NOTIFICACIONES
    const classes = useStyles();

    React.useEffect(() => {
      // Specify how to clean up after this effect:
      return function cleanup() {
        // to stop the warning of calling setState of unmounted component
        var id = window.setTimeout(null, 0);
        while (id--) {
          window.clearTimeout(id);
        }
      };
    });



    return (
      <>
        <Snackbar
          place="tr"
          color="success"
          icon={AddAlert}
          message="Te has logeado"
          open={tr}
          closeNotification={() => setTR(false)}
          close
        />
        <Snackbar
          place="tc"
          color="rose"
          icon={AddAlert}
          message="No es posible Logearse, esta mal tu usuario o contraseña"
          open={tc}
          closeNotification={() => setTC(false)}
          close
        />
        <Snackbar
          place="tl"
          color="rose"
          icon={AddAlert}
          message="No escribiste nada!!"
          open={tl}
          closeNotification={() => setTL(false)}
          close
        />
        <Card login className={classes[cardAnimaton]} style={{ backgroundImage: `url(${desktopImage})` }}>
          <CardHeader
            className={`${classes.cardHeader} ${classes.textCenter}`}
            color="info"
          >
            <h2 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes.cardTitle}>Log in</h2>
            <div className={classes.socialLine}>
              {[
                "fab fa-facebook-square",
                "fab fa-twitter",
                "fab fa-google-plus"
              ].map((prop, key) => {
                return (
                  <Button
                    color="transparent"
                    justIcon
                    key={key}
                    className={classes.customButtonClass}
                  >
                    <i className={prop} />
                  </Button>
                );
              })}
            </div>
          </CardHeader>
          <CardBody >
            <CustomInput
              labelText="Email..."
              id="email"
              formControlProps={{
                value: email,
                onChange: onChangeEmail,
                fullWidth: true,
                className: classes.customFormControlClasses
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                )
              }}
            />
            <CustomInput
              labelText="Password"
              id="password"
              formControlProps={{
                value: password,
                onChange: onChangePass,
                fullWidth: true
              }}
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className={classes.inputAdornmentIcon}>
                      lock_outline
              </Icon>
                  </InputAdornment>
                ),
                type: "password",
                autoComplete: "off"
              }}
            />
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            {/*<Button color="rose" simple size="lg" block  href={SessionLogin(email,password)}>
            Let{"'"}s Go
                </Button>*/}

            <ButtonO variant="contained" color="primary" onClick={Log} className={classes.button}>
              Sign In
                      </ButtonO>

          </CardFooter>
          <br />
          <a href="/" style={{ textDecoration: "none", margin: "10px", color: "#fff", textAlign: "center" }} >New to Ecommerce Payu? Register </a>



        </Card>
      </>
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
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Login />
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
