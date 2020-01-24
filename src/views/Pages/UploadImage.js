import React from 'react';
import axios from 'axios';

class ImageUp extends React.Component {
  state = {
    lo: false
  }
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit= this.handleInputSubmit.bind(this)
    
    
    
  }
  handleInputChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }

  handleInputSubmit(e) {
    e.preventDefault()
    let data = new FormData();
    console.log(this.state.file)
    data.append('file', this.state.file);

    axios.post('http://localhost:8080/image/files/'+this.props.nameImage.replace(" ",""), data)
      .then(function (response) {
        console.log("file uploaded!", response);
        
      })
      .catch(function (error) {
        console.log("failed file upload", error);
      });
  }

 

  render() {
    
    return (
      <div>
        <input type="file" id="file" onChange={this.handleInputChange} />
        <button onClick={this.handleInputSubmit}>
          Enviar
        </button>

        {/* <h1>Obtener Datos</h1>
        {/* <button onClick={this.handleObtain}>
          Mostrar Imagen
        </button> */}

        {/* <img src="http://localhost:8080/api/files/file" /> */} 
      </div>



    )

  }
}

export default ImageUp;
