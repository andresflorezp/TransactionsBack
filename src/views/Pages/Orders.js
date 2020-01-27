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
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import desktopImage from '../images/FondoEasyLogin.png';
import ButtonO from '@material-ui/core/Button';
import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";
import product4 from "../../views/images/image1.png"
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
import Snackbar from "components/Snackbar/Snackbar.js";

import AddAlert from "@material-ui/icons/AddAlert";
const baseUrl = "https://easy-eat-oficial.herokuapp.com"
const baseUrl2 = "http://localhost:8080"
const useStyles = makeStyles(styles);
const useStylesT = makeStyles(stylesT);


export default function AdminOrders() {
  const baseUrl = "https://easy-eat-oficial.herokuapp.com"
  const baseUrl2 = "http://localhost:8080"
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const classesT = useStylesT();


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

    const [items, setItems] = useState([])
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


    const [data, setData] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [description, setDescription] = useState([]);
    // const [price, setPrice] = useState([]);

    useEffect(() => {
      axios.get(baseUrl + '/order/all-orders')
        .then(response => {
          console.log(response.data)
          const datos = response.data;
          setData(datos);
          //console.log(data)

        })
        .catch(err => {
          console.log(err)
        })
    }, []);

    String.prototype.replaceAll = function (search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };

    function modifyOrder(order){      
      axios.put(baseUrl + '/order/modifyOrder/'+order)
        .then(response => {          
          alert("Se modifico la orden correctamente")

        })
        .catch(err => {
          console.log(err)
        })

    }
  
    function crearData(){

      const n = data.length;
      const tabla=[]
      const tabla2=[]
      const temp=[]  
      const tempAux=[]            
      for (var x = 0; x < n; x++) {       
          if(data[x].entregado == false){
            const Carrito = data[x].carrito;    
            const temp2=[]    
            const dishes=[]  
            for (var i = 0; i < Carrito.platos.length ; i++) {
              dishes.push(Carrito.platos[i]);            
            }
            
            var N = dishes.length;
            
            for (var j = 0; j < N; j++) {  
              const temp=[]           
              const ur = "pass"     
              const m =""
              if(data[x].tipo == "PreOrder"){
                m= data[x].tipo;
                m= m + " / "+ Carrito.dueño
              }    
              else{
                m= data[x].mesa;
              }        
              
              temp.push(              
                <span key="key">
                  <a href="#jacket" className={classesT.tdNameAnchor}>
                    {dishes[j].name}
                  </a>
                  <br />
                  <br />
                </span>,          
               
                <span key="key2">
                  <small className={classesT.tdNumberSmall}>{m}</small>
                </span>,
              )                
              tabla.push(temp)    
            }
            temp2.push(              
              <center>
              <br />  
                <Button id={data[x].id}  onClick={(event) => modifyOrder(event.target.id)} color="info" round>                            
                </Button>
              </center>,
            )        
            tabla.push(temp2)  
          } 
          else{
            const Carrito = data[x].carrito;                  
            const dishes=[]  
            for (var i = 0; i < Carrito.platos.length ; i++) {
              dishes.push(Carrito.platos[i]);            
            }
            
            var N = dishes.length;
            
            for (var j = 0; j < N; j++) {  
              const tempAux=[]           
              const ur = "pass"     
              const m =""
              if(data[x].tipo == "PreOrder"){
                m= data[x].tipo;
                m= m + " / "+ Carrito.dueño
              }    
              else{
                m= data[x].mesa;
              }        
              
              tempAux.push(              
                <span key="key">
                  <a href="#jacket" className={classesT.tdNameAnchor}>
                    {dishes[j].name}
                  </a>
                  <br />
                  <br />
                </span>,          
                <span key="key2">
                  <small className={classesT.tdNumberSmall}>{m}</small>
                </span>,
              )                
              tabla2.push(tempAux)
            }
          }                 
           
      }
      const tablas=[]
      tablas.push(tabla,tabla2);
      return tablas;
    }
    crearData()

    return (
      <div>
      <Card >
        
        <CardHeader
          className={`${classes.cardHeader} ${classes.textCenter}`}
          color="info"

        >
        <h2 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes.cardTitle}>Orders</h2>

        </CardHeader>
        <CardBody>
          <Table
            tableHead={[
              "PRODUCT",
              "COSTUMER"         
            ]}
            tableData={crearData()[0]}            
          />      
          <br></br>          
        </CardBody>   
             
      </Card> 
     
      </div>
      
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
        <GridItem xs={12} sm={12} md={12}>
          <form>
            <Login />
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
  }
