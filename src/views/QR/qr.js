import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import { Redirect } from 'react-router-dom'
export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
  
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data) {
    this.setState({
      result: data,
    })
  }
  handleError(err) {
    console.error(err)
  }
  renderRedirect = () => {
    
   
      console.log(this.state.result);
      if (this.state.result!=null) {
        if (this.state.result.startsWith("Mesa")){
          localStorage.setItem("Mesa",this.state.result)
          return <Redirect to='/user/dashboard'/>
        }
        
      }
         
  }
  render() {
    const previewStyle = {
      height: "90%",
      width: "90%",
    }
    
    
    return (
      <div>
        {this.renderRedirect()}
        <QrReader
          facingMode='rear'
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}