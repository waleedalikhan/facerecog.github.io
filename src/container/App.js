import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';
import SignInForm from '../components/SigninForm/Signin';
import Register from '../components/Register/Register';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/imageForm/imageLinkForm'
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/face/recognition';
import '../container/App.css';

const app = new Clarifai.App({
  apiKey: '6bc6d3a522574c1587852ffb3ad93f06'
});

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({ box: box })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route })
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>

          : (
            route === 'signin'
            ? <SignInForm onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )

        }
      </div>
    )
  }
}

export default App;