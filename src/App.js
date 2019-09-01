import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Logo from './components/logo/logo';
import Signin from './components/Signin/Signin';
import Navigation from './components/navigation/navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: '4aea25be2dfb4c96b70e6707851ff974'
 });
 
const particlesOptions = {
  particles: {
    number: {
      value: 100000000, 
      density: {
        enable: true,
        value_area: 100
      }
    }
  }      
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
    }
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value})
    
     
  }
  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    },
    function(err) {
      // there was an error
    }
  );
  }
  render() 
  {
    return (
      <div className="App">
        <Particles className='particles'
          param={particlesOptions} />
        <Navigation/>
        <Signin/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>   
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
