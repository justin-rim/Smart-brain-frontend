import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
//import Footer from './footer.js';
import Logo from './components/Logo/logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import './App.css';


const ParticleOptions = {
  particles: {
	        "number": {
	            "value": 450,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 10,

	            "random": true,
	            "anim": {
	                "speed": 4,
	                "size_min": 0.3
					}
	        },
           "shape": {
            	type: "polygon"
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1.5,
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "slow"
	            }
	        },
	        "modes": {
	            "slow": {
	                "distance": 300,
	                "duration": 10
	            }
	        }
	    }
}


const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {
	constructor () {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
	}	

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	calculateFaceLocation = (data) => {
		const clarifaiFaces = data.outputs[0].data.regions[0].region_info.bounding_box;
		const faceImage = document.getElementById('inputimage');
		const width = Number(faceImage.width);
		const height = Number(faceImage.height);
		return {
			leftCol: clarifaiFaces.left_col * width,
			topRow: clarifaiFaces.top_row * height,
			rightCol: width - (clarifaiFaces.right_col * width),
			bottomRow: height - (clarifaiFaces.bottom_row * height)
		};
	};

	faceBox = (box) => {
		this.setState({ box: box});
	}

	onPictureSubmit = () => {
    	this.setState({imageUrl: this.state.input});
			fetch('https://polar-spire-59817.herokuapp.com/imageurl', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						input: this.state.input		
					})
			})
			.then(response => response.json())
     	 	.then(response => {
			if (response) {
				fetch('https://polar-spire-59817.herokuapp.com/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id		
					})
				})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, { entries: count}))
					})
					.catch(console.log)
			}
			this.faceBox(this.calculateFaceLocation(response))
		  })
       .catch(err => console.log(err));
  	}
	
	onRouteChange = (route) => {
		if (route === 'signin') {
			this.setState(initialState)
		} else if (route === 'home') {
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

   render() {
		const { imageUrl, box, isSignedIn, route} = this.state; 
		return (
   	  <div className = "App">
   	    <Particles className = 'particles'
   	         params={ParticleOptions}
   	    />
   	    <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
				{route === 'home' 
					? <div>
							<Logo />
							<Rank 
									name={this.state.user.name} 
									entries={this.state.user.entries}
							/>
							<ImageLinkForm 
									onInputChange = {this.onInputChange}
									onPictureSubmit = {this.onPictureSubmit}
							/>
							<FaceRecognition box={box} imageUrl={imageUrl} />
					  </div>
					: (
						  route === 'signin'
						  ? <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
						  : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
					  )	
				}
   	  	{/*<Footer />*/}
   	  </div>
   	);
	}

}


export default App;
