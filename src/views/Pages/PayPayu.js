
import React, { Component } from 'react';


export default class PayPayu extends React.Component {

    render() {

        return (

            <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                <input name="merchantId" type="hidden" value="508029" />
                <input name="accountId" type="hidden" value="512326" />
                <input name="description" type="hidden" value="Ventas en linea" />
                <input name="referenceCode" type="hidden" value="PAGO001" />
                <input name="amount" type="hidden" value="130.5" />
                <input name="tax" type="hidden" value="0" />
                <input name="taxReturnBase" type="hidden" value="0" />
                <input name="currency" type="hidden" value="PEN" />
                <input name="signature" type="hidden" value="f783bee9ddf94ad34aa2bb4adb058418" />
                <input name="test" type="hidden" value="1" />
                <input name="buyerEmail" type="hidden" value="test@test.com" />
                <input name="responseUrl" type="hidden" value="http://localhost:3000" />
                <input name="confirmationUrl" type="hidden" value="http://localhost:3000/login" />
                <input name="Submit" type="submit" value="Pay" />
            </form>

        )
    }


}