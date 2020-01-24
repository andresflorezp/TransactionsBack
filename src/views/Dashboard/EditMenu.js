import React, { useEffect, useState } from "react";

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



function GetPlatos() {

    axios.get(baseUrl + '/dish/all-dish')
        .then(function (response) {
            console.log(response.data)

        })
        .catch(function (error) {
            console.log(error);
        });


}




export default function MenuPage() {
    const baseUrl = "https://easy-eat-oficial.herokuapp.com"
    const baseUrl2 = "http://localhost:8080"
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const classesT = useStylesT();
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
    function delDish(nameD) {
        console.log(nameD)
        axios.delete(baseUrl + '/dish/delete/' + nameD, {

        })
            .then(function (response) {
                console.log(response);
                //alert("Se elimino el plato satisfactoriamente")
                showNotification("tc");
            })
            .catch(function (error) {
                console.log(error);
                showNotification("tl");
            });
    }
    const Login = () => {
        const [email, setValueEmail] = React.useState(
            ""
        );
        const [password, setValuePass] = React.useState(
            ""
        );


        const onChangeEmail = event => setValueEmail(event.target.value);
        const onChangePass = event => setValuePass(event.target.value);

        const [data, setData] = useState([]);
        // const [categories, setCategories] = useState([]);
        // const [description, setDescription] = useState([]);
        // const [price, setPrice] = useState([]);

        useEffect(() => {
            axios.get(baseUrl + '/dish/all-dish')
                .then(response => {
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
        function crearData() {
            console.log(data)
            const tabla = []
            var N = data.length;
            for (var i = 0; i < N; i++) {
                const temp = []
                const ur = "pass"
                if (data[i].name === null) {

                    ur = baseUrl+"/image/files/" + data[i].name
                }
                else {
                    ur = baseUrl+"/image/files/" + data[i].name.replaceAll(" ", "")
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
                        <small className={classesT.tdNameSmall}>
                            {data[i].category}
                        </small>
                        <br />
                        <Fab size="medium" href="/description" style={{ backgroundColor: "#FFDC00", width: "35px", height: "30px", margin: "4px" }} aria-label="add" className={classes.margin}>
                            <InfoIcon style={{ color: "#fff" }} />
                        </Fab>
                        <Button id={data[i].name} onClick={(event) => delDish(event.target.id)} style={{ backgroundColor: "#FF0000" }} round>
                            Remove{" "}
                        </Button>
                    </span>,
                    <span key="key">
                        <small className={classesT.tdNumberSmall}>{data[i].price}</small>
                    </span>,
                )
                tabla.push(temp)

            }
            return tabla;

        }
        crearData()

        return (

            <Card >
                <Snackbar
                    place="tl"
                    color="rose"
                    icon={AddAlert}
                    message="No se pudo eliminar el plato"
                    open={tl}
                    closeNotification={() => setTL(false)}
                    close
                />
                <Snackbar
                    place="tc"
                    color="success"
                    icon={AddAlert}
                    message="Se elimino el plato"
                    open={tc}
                    closeNotification={() => setTC(false)}
                    close
                />
                <CardHeader
                    className={`${classes.cardHeader} ${classes.textCenter}`}
                    color="info"

                >
                    <h2 style={{ color: "#fff", fontFamily: "'Dancing Script'" }} className={classes.cardTitle}>Edit Menu</h2>

                </CardHeader>
                <CardBody>
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
                <CardFooter className={classes.justifyContentCenter}>
                    <Button href="/user/Cart" color="info" round>
                        Go to Cart{" "}
                        <KeyboardArrowRight className={classesT.icon} />
                    </Button>
                </CardFooter>
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
                <GridItem xs={12} sm={12} md={12}>
                    <form>
                        <Login />
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    );
}
