import React, { useEffect, useState, useReducer } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
//import LockOutline from "@material-ui/icons/LockOutline";
// core components
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
import Car from "@material-ui/icons/ShoppingCart";
import IconButton from '@material-ui/core/IconButton';
import { async } from "q";
import SweetAlert from "react-bootstrap-sweetalert";
import stylesB from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import TextField from '@material-ui/core/TextField';
import PayPayu from "./PayPayu"
const baseUrl = "https://ecommerce-payu.herokuapp.com/"
const baseUrl2 = "https://easy-eat-oficial.herokuapp.com"
const baseUrl3 = "http://localhost:8081"
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

    const [creditCard,setCreditCard] = useState('');
    const [cvv,setCardCVV] = useState('');
    const [cardExpiration,setCardExpiration] = useState('');
    

    const [itemsA, setItemsA] = useState([]);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [nombre, setnombre] = useState('')
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
          confirmBtnText="Yes, Buy!"
          cancelBtnText="Cancel"
          showCancel
        >
          Start to Pay
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

    const successClose = (respuesta) => {
      setAlert(
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Sent!"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classesB.button + " " + classesB.success}
        >
          Your Transaction was APPROVED
        </SweetAlert>
      );
    };
    const WrongClose = (respuesta) => {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Sent!"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classesB.button + " " + classesB.success}
        >
          Your Transaction not was APPROVED
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
      //      console.log(localStorage.getItem("ITEMSA")[0])
      for (var i = 0; i < datosF.platos.length; i++) {

        datosDish.push({
          id: datosF.platos[i].id,
          name: datosF.platos[i].name,
          price: datosF.platos[i].price,
          category: datosF.platos[i].category,
          description: datosF.platos[i].description,
          commentUser: "",
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
      //
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + '0' + today.getDate();
      var cardExpiration2 = cardExpiration.replace("/","$")
      axios.post(baseUrl3 + "/api/transaction/add-product/"+ localStorage.getItem("mailLogged") + "/" + localStorage.getItem("mailLogged") + "/" + total+"/"+creditCard+"/"+cvv+"/"+cardExpiration2)
        .then(response => {
          //location.reload();
          console.log(response.data)
          if (response.data == "APPROVED") {
         
            axios.delete(baseUrl + '/api/cart/empty-cart/' + localStorage.getItem("mailLogged")).then(function (res) {
              hideAlert()
              successClose()
              //alert("TU TRANSACCION FUE APROVADA")
              //window.location="/user/dashboard";
            }).catch(function (er) {
              console.log(er)
            });
          }
          else {
            hideAlert()
            WrongClose()
            //alert("TU TRANSACCION NO FUE APROVADA")
            //window.location="/user/dashboard";
          
          }

        })
        .catch(function (er) {
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
          When you're sure, send it to us. We'll wait for you. :)
        </SweetAlert>
      );
    };

    // const [categories, setCategories] = useState([]);
    // const [description, setDescription] = useState([]);
    // const [price, setPrice] = useState ([]);

    useEffect(() => {
      axios.get(baseUrl+ '/api/cart/obtain-cart/' + localStorage.getItem("mailLogged"))
        .then(response => {
          const datos = response.data;

          setData(datos);
          //console.log(data)
          const temp = []
          var totalt = 0
          for (var k = 0; k < datos.length; k++) {
            temp.push({ id: k + 1, cantidad: 1, precio: datos[k].price })
            totalt += datos[k].price
          }

          setItemsA(itemsA.concat(temp))
          setTotal(totalt)


          //setItemsA(temp)
          console.log("ENTROOOOOOO")
          console.log(itemsA)

        })
        .catch(err => {
          console.log(err)
        })
    }, []);

    const addCart = (valor) => {
      const pass = valor.replaceAll("plus", "")
      //alert(pass)
      const temp = []
      for (var k = 0; k < itemsA.length; k++) {
        if (k == pass) {
          temp.push({ id: k + 1, cantidad: itemsA[k].cantidad + 1, precio: itemsA[k].precio })
          setTotal(total + itemsA[k].precio);
        }
        else {
          temp.push(itemsA[k])
        }
      }

      setItemsA(temp)
      localStorage.setItem("ITEMSA", temp)

    }

    const lessCart = (valor) => {
      const pass = valor.replaceAll("less", "")
      const temp = []
      //alert(pass)
      for (var k = 0; k < itemsA.length; k++) {
        if (k == pass) {
          if (itemsA[k].cantidad == 0) {
            temp.push({ id: k + 1, cantidad: 0, precio: itemsA[k].precio })
          }
          else {

            temp.push({ id: k + 1, cantidad: itemsA[k].cantidad - 1, precio: itemsA[k].precio })
            setTotal(total - itemsA[k].precio);
          }
        }
        else {
          temp.push(itemsA[k])
        }
      }

      setItemsA(temp)
      localStorage.setItem("ITEMSA", temp)


    }


    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };

    function crearData() {
      console.log(data)
      console.log("VAMOS ITEMS")
      console.log(itemsA)
      const tabla = []


      var N = data.length;


      for (var i = 0; i < N; i++) {
        const temp = []
        const ur = "pass"
        if (data[i].name === null) {

          ur = baseUrl2 + "/image/files/" + data[i].name
        }
        else {
          ur = baseUrl2 + "/image/files/" + data[i].name.replaceAll(" ", "")
        }

        temp.push(<div className={classesT.imgContainer} key="key">

          <img src={ur} alt="..." className={classesT.img} />

        </div>)
        temp.push(
          <span key="key">
            <a href="#jacket" className={classesT.tdNameAnchor}>
              {data[i].name}
            </a>
            <br />
            <h6>
              Cantidad: {itemsA[i] == undefined ? <div /> : itemsA[i].cantidad}
            </h6>

            <IconButton id={"plus" + i} onClick={(event) => addCart(event.target.id)} style={{ backgroundColor: "#2ECC40", color: "#2ECC40" }} className={classes.button} aria-label="delete">

            </IconButton>
            <IconButton id={"less" + i} onClick={(event) => lessCart(event.target.id)} style={{ backgroundColor: "#FF4136", color: "#FF4136" }} className={classes.button} aria-label="delete">

            </IconButton>


          </span>,
          <span key="key">
            <small className={classesT.tdNumberSmall}>{itemsA[i] == undefined ? <div /> : itemsA[i].precio * itemsA[i].cantidad}$</small>
          </span>
        )
        tabla.push(temp)

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
          <h2 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes.cardTitle}>Cart<Car style={{ marginLeft: "10px" }} /></h2>

        </CardHeader>
        <CardBody>
          {alert}
          <Table
            tableHead={[
              "",
              "PRODUCT",
              "PRICE",

            ]}
            tableData={crearData()}
            tableShopping
            customHeadCellClasses={[
              classes.center,
              classes.description,
              classes.description,
              classes.right,
              classes.right,
              classes.right
            ]}
            customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
            customCellClasses={[
              classes.tdName,
              classes.customFont,
              classes.customFont,
              classes.tdNumber,
              classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
              classes.tdNumber
            ]}
            customClassesForCells={[1, 2, 3, 4, 5, 6]}
          />
        </CardBody>
        <br></br><br></br><br></br><br></br>
        <CardFooter className={classes.justifyContentCenter}>
          <br/>
          <br/>
          <h3>Type your Credit Card</h3>
          <TextField id="outlined-basic" label="" variant="outlined" onChange={e => setCreditCard(e.target.value)} />
          <br/>
          <br/>
          <h3>Type your CV</h3>
          <TextField id="outlined-basic" label="" variant="outlined" onChange={e => setCardCVV(e.target.value)} />
          <br/>
          <br/>
          <h3>Expiration Date</h3>
          <TextField id="outlined-basic" label="" variant="outlined" onChange={e => setCardExpiration(e.target.value)} />
          <br/>
          <br/>
          <Button onClick={warningWithConfirmAndCancelMessage} style={{ backgroundColor: "#2ECC40" }} round>
            Send To Kitchen{" "}
            <KeyboardArrowRight className={classesT.icon} />
          </Button>
          <h4>Total:{total}</h4>
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

