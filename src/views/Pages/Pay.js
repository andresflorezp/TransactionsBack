import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import Table from "components/Table/Table.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios';
import RemoveIcon from '@material-ui/icons/Remove';
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import desktopImage from '../images/FondoEasyLogin.png';
import ButtonO from '@material-ui/core/Button';
import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import Fab from '@material-ui/core/Fab';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import stylesT from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import "./fuente.css"
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import Car from "@material-ui/icons/Fastfood";
import IconButton from '@material-ui/core/IconButton';
import { async } from "q";
import SweetAlert from "react-bootstrap-sweetalert";
import TextField from '@material-ui/core/TextField';
import stylesB from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
const baseUrl = "https://ecommerce-payu.herokuapp.com/"
const baseUrl2 = "http://localhost:8080"
const useStyles = makeStyles(styles);
const useStylesT = makeStyles(stylesT);

const useStylesB = makeStyles(stylesB);

function GetPlatos() {

  axios.get(baseUrl + '/dish/all-dish')
    .then(function (response) {
      console.log(response.data)

    })
    .catch(function (error) {
      console.log(error);
    });


}


export default function CartPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const [alert, setAlert] = React.useState(null);
  const classes = useStyles();
  const classesT = useStylesT();
  const classesB = useStylesB();



  const Login = () => {
    const [email, setValueEmail] = React.useState(
      ""
    );
    const [password, setValuePass] = React.useState(
      ""
    );
    const initialState = {
      value: 0,

    };

    const onChangeEmail = event => setValueEmail(event.target.value);
    const onChangePass = event => setValuePass(event.target.value);

    const [data, setData] = useState([]);

    const [itemsA, setItemsA] = useState([]);
    const [total, setTotal] = useState(0);
    const warningWithConfirmAndCancelMessage = () => {

      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => successDelete()}
          onCancel={() => cancelDetele()}
          confirmBtnCssClass={classesB.button + " " + classesB.success}
          cancelBtnCssClass={classesB.button + " " + classesB.danger}
          confirmBtnText="Yes, pay now!"
          cancelBtnText="Cancel"
          showCancel
        >
          At this moment you will pay your order
        </SweetAlert>
      );
    };
    const successDelete = () => {
      setAlert(
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Sent!"
          onConfirm={() => hideAlertDelete()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classesB.button + " " + classesB.success}
        >
          Waiting while you arrive or place another order
        </SweetAlert>
      );
    };

    const titleAndTextAlert = (comments) => {
      localStorage.setItem("ITEMSA", itemsA)
      setAlert(
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Your comments were!!"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classesB.button + " " + classesB.info}
        >
          {comments}
        </SweetAlert>
      );
    };
    const llenarT = (datosF) => {
      var datosDish = [];
      for (var i = 0; i < datosF.platos.length; i++) {

        datosDish.push({
          id: datosF.platos[i].id,
          name: datosF.platos[i].name,
          price: datosF.platos[i].price,
          category: datosF.platos[i].category,
          description: datosF.platos[i].description,
          commentUser: datosF.platos[i].commentUser,
          cantidad: 1
        });
      }
      return datosDish
    }

    const hideAlert = () => {
      setAlert(null);
    };
    const hideAlertDelete = () => {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + '0' + today.getDate();
      axios.get(baseUrl + "/cart/obtain-cart/" + localStorage.getItem("mailLogged"))
        .then(response => {
          const datosF = response.data;
          const platoss = llenarT(datosF);
          console.log("YAYAYAYYAYAYAYYAYAYAAYYAYAYAYYAYAYAYAYYAYAYAYAYYAYAYAYAYAYYAYAYA OBTUVO CARRITO")
          axios.post(baseUrl + '/order/create-order', {
            fecha: date,
            carrito: {
              id: datosF.id,
              platos: platoss,
              dueño: localStorage.getItem("mailLogged"),
              total: total
            },
            entregado: false,
            tipo: localStorage.getItem("decideOrder"),
            mesa: localStorage.getItem("Mesa")

          }).
            then(response => {
              const a = ""
              console.log("YAYAYAYYAYAYAYYAYAYAAYYAYAYAYYAYAYAYAYYAYAYAYAYYAYAYAYAYAYYAYAYA CREO ORDEN")
            })
            .catch(function (er) {
              console.log(er)
            });

        });
      axios.post(baseUrl + '/cart/empty-cart/' + localStorage.getItem("mailLogged"))
        .then(response => {
          window.location = "/user/dashboard";
        }).catch(function (er) {
          console.log(er)
        });


    }

    const cancelDetele = () => {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classesB.button + " " + classesB.success}
        >
          When you're sure, pay. We'll wait for you. :)
        </SweetAlert>
      );
    };

    useEffect(() => {
      axios.get(baseUrl + '/cart/obtain-cart/' + localStorage.getItem("mailLogged"))
        .then(response => {
          const datos = response.data.platos;

          setData(datos);
          const temp = []
          var totalt = 0
          for (var k = 0; k < datos.length; k++) {
            temp.push({ id: k + 1, cantidad: 1, precio: datos[k].price })
            totalt += datos[k].price
          }

          setItemsA(itemsA.concat(temp))
          setTotal(totalt)

        })
        .catch(err => {
          console.log(err)
        })
    }, []);


    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };

    function crearData() {
      console.log(data)
      console.log("VAMOS ITEMS")
      console.log(itemsA)
      const tabla = []

      if (data != undefined) {
        var N = data.length;


        for (var i = 0; i < N; i++) {
          const temp = []
          const ur = "pass"
          temp.push(
            <span key="key">
              <a href="#jacket" className={classesT.tdNameAnchor}>
                {data[i].name}
              </a>
              <br />
              <h6>
                Cantidad: {itemsA[i] == undefined ? <div /> : itemsA[i].cantidad}
              </h6>

            </span>,
            <span key="key">
              <small className={classesT.tdNumberSmall}>{itemsA[i] == undefined ? <div /> : itemsA[i].precio * itemsA[i].cantidad}$</small>
            </span>
          )
          tabla.push(temp)

        }
      }
      return tabla;

    }
    crearData()

    return (

      <Card >
        <CardHeader
          className={`${classes.cardHeader} ${classes.textCenter}`}
          color="info"

        >
          <h2 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes.cardTitle}>Digit Credit Card<Car style={{ marginLeft: "10px" }} /></h2>

        </CardHeader>
        <CardBody>
          {alert}
          <TextField id="outlined-basic" label="CreditCard" variant="outlined" />
        </CardBody>
        <center>
          <h4>Total:{total}</h4>
        </center>
        <CardFooter className={classes.justifyContentCenter}>
          <Button onClick={warningWithConfirmAndCancelMessage} style={{ backgroundColor: "#2ECC40" }} round>
            Pay With Credit Card{" "}
            <KeyboardArrowRight className={classesT.icon} />
          </Button>
        </CardFooter>
      </Card>
    );
  };




  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <form>
            <Login />
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

