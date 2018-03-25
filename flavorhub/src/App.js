import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';
import Typography from 'material-ui/Typography';
import Card, {CardContent} from 'material-ui/Card';
import NavBar from './layouts/NavBar';
import MiddleNavBar from './layouts/MiddleNavBar';
import SearchBar from './layouts/SearchBar';
import AuthenticationModal from './layouts/AuthenticationModal';
import RestaurantGrid from './components/restaurants/restaurants';
import Chip from 'material-ui/Chip';
import axios from 'axios'


class SplashContentArea extends Component {
  render() {
    return (
      <div className="splashContentArea">
        <SearchBar/>
        <RestaurantGrid contentChange={this.props.clickEvent}/>
      </div>
    )
  }
}

class RestaurantContentArea extends Component {

  constructor(props) {
    super(props)

    this.state = {
      'img_path': '',
      'locations': [],
      'cuisines': []

    }

    this.getImagePath(this)
  }

  getImagePath = (context) => {
    axios.get('http://localhost:5000/restaurant_information/'+context.props.match.params.restaurantName, {'headers':{'x-access-token': localStorage.getItem('JsonToken')}}
    ).then(function (response) {
      if (response.status === 200){
        context.setState({
          'img_path': response.data.img_pathfile,
          'locations': response.data.locations,
          'cuisines': response.data.cuisines
        })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    let styles = {
      background: (this.state.img_path !== '' ? `url(http://localhost:5000/${this.state.img_path})` : '') + 'no-repeat center center',
      backgroundSize: 'cover',
      overflow: 'hidden',
    }

    let locationText = `${this.state.locations.length} location` + (this.state.locations.length > 1 ? 's' : '')

    return (
      <div className="restaurantContentArea">
        <div className="restaurantImageBannerContainer" style={styles}>
          <Card className="restaurantContentAreaInformationBox">
            <CardContent>
              <Typography className="restaurantContentAreaRestaurantName">{this.props.match.params.restaurantName}</Typography>
              <div className="restaurantCardTypes">
                {this.state.cuisines.map(cuisineName => {
                  return (
                    <Chip
                      key={cuisineName}
                      label={cuisineName}
                      style={{borderRadius:'0.3em', marginRight: '10px', marginBottom: '10px'}}
                    />
                  )
                })}
              </div>
              <Typography className="restaurantContentAreaLocations">{locationText}</Typography>
            </CardContent>
          </Card>
        </div>
        <MiddleNavBar admin={this.props.admin} restaurantName={this.props.match.params.restaurantName} locations={this.state.locations}/>
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'displaySearchBar': window.location.pathname !== '/',
      'openRegistration': false,
      'openSignIn': false,
      'type': 'register',
      'userLoggedIn': this.checkToken(this)
    }
  }

  checkToken = (context) => {
    let tokenExists = 'JsonToken' in localStorage
      if (tokenExists) {
        let token = localStorage.getItem('JsonToken')
        axios.get('http://localhost:5000/check_token', {'headers':{'x-access-token': token}}).then(
          function (response) {
            if (response.status === 200) {
              localStorage.clear()
              localStorage.setItem('JsonToken', token)
              localStorage.setItem("fname", response.data.fname)
              localStorage.setItem("lname", response.data.lname)
              localStorage.setItem("isAdmin", response.data.isAdmin)
              context.setStateToLoggedIn()
            }
          }
        ).catch(function (error){
          console.log(error)
        })
    }
    else {
      return false
    }
  }

  setStateToLoggedIn = () => {
    this.setState({
      userLoggedIn: true
    })
  }

  onBackButtonEvent = (e) => {
    e.preventDefault();
    this.contentChange('/');
  }

  componentDidMount = () => {
    window.onpopstate = this.onBackButtonEvent;
  }

  contentChange = (navTo) => {
    this.setState({
      'displaySearchBar': navTo !== '/'
    })
  }

  openAuthModal = (type) => {
    this.setState({
      'openRegistration': true,
      'type': type
    })
  }

  closeAuthModal = () => {
    this.setState({
      'openRegistration': false
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      'userLoggedIn': false
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <AuthenticationModal type={this.state.type} open={this.state.openRegistration} onClose={this.closeAuthModal.bind(this)} setStateToLoggedIn={this.setStateToLoggedIn.bind(this)}/>
            <NavBar logoutAction={this.handleLogout.bind(this)} loggedInState={this.state.userLoggedIn} displaySearchBar={this.state.displaySearchBar} openAuthModal={this.openAuthModal.bind(this)} contentChange={this.contentChange.bind(this)}/>
            <div style={{marginTop: '25px'}}>
              <Route exact path="/" render={(props) => <SplashContentArea {...props} clickEvent={this.contentChange.bind(this)}/>}/>
              <Route path="/restaurant/:restaurantName" render={(props) => <RestaurantContentArea {...props} admin={this.state.userLoggedIn && (localStorage.getItem('isAdmin').toLowerCase() === 'true')}/>}/>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
