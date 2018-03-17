import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import NavBar from './layouts/NavBar';
import MiddleNavBar from './layouts/MiddleNavBar';
import Restaurant from './components/Restaurant';
import SearchBar from './layouts/SearchBar';
import AuthenticationModal from './layouts/AuthenticationModal';

const imgArray = [
  "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Images-For-Desktop.jpg",
  "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Images-Free-Download.jpg",
  "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Wallpaper-Pictures.jpg",
  "https://www.pixelstalk.net/wp-content/uploads/2016/08/Desktop-Food-Images-Download.jpg",
  "https://www.pixelstalk.net/wp-content/uploads/2016/08/Photography-Kebab-Meat-Food-Wallpaper-HD-Desktop-Computer.jpg",
  "https://www.pixelstalk.net/wp-content/uploads/2016/08/Fresh-hot-delicious-food-wallpaper.jpg",
  "https://www.pixelstalk.net/wp-content/uploads/2016/08/HD-delicious-food-photos.jpg"
]


class ContentArea extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    //fix this when you will need to update this component on app change
    return false
  }

  render() {
    return (
      <div className="contentArea">
        <Router>
          <div>
            <Route exact path="/" render={(props) => <SplashContentArea {...props} clickEvent={this.props.contentChange}/>}/>
            <Route path="/restaurant/:restaurantId" component={RestaurantContentArea} />
          </div>
        </Router>
      </div>
    )
  }
}

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
  render() {
    let imgRequested = this.props.match.params.restaurantId

    let styles = {
      backgroundImage:`url(${imgArray[imgRequested]})`,
      backgroundSize: 'cover',
      overflow: 'hidden',
    }

    return (
      <div className="restaurantContentArea">
        <div className="restaurantImageBannerContainer" style={styles}>
          <Card className="restaurantContentAreaInformationBox">
            <CardContent>
              <Typography className="restaurantContentAreaRestaurantName">X restaurant</Typography>
              <Typography className="restaurantContentAreaTypes">Types</Typography>
              <Typography className="restaurantContentAreaLocations">X locations</Typography>
            </CardContent>
          </Card>
        </div>
        <MiddleNavBar/>
      </div>
    )
  }
}

class RestaurantGrid extends Component {
  render() {
    //Here the request happens to get x ammount of restaurants
    return (
      <Grid container className="RestaurantGridContainer" justify="center" style={{flexGrow: 1}} spacing={40}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 11, 1234567].map(value => (
          <Grid key={value} item>
            <Link to={"/restaurant/"+value} style={{textDecoration: "none"}}>
              <RestaurantCard contentChange={this.props.contentChange}/>
            </Link>
          </Grid>
        ))}
      </Grid>
    )
  }
}

class RestaurantCard extends Component {
  render () {
    return (
      <div onClick={()=>this.props.contentChange("/restaurant")}>
        <Card className="restaurantCard" style={{minHeight: 300, width: 380}}>
          <CardMedia className="restaurantCardImage"
            style={{height: 200}}
            image={imgArray[Math.floor(Math.random() * 7)]}
            title="Restaurant X"
          />
          <CardContent className="restaurantCardText">
            <Typography className="restaurantCard" variant="headline">
              Restaurant X
            </Typography>
            <Typography className="restaurantCardTypes">
              Types
            </Typography>
            <Typography className="restaurantCardLocations">
              X locations
            </Typography>
          </CardContent>
        </Card>
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
      'type': 'register'
    }
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

  render() {
    return (
      <div className="App">
        <AuthenticationModal type={this.state.type} open={this.state.openRegistration} onClose={this.closeAuthModal.bind(this)}/>
        <NavBar displaySearchBar={this.state.displaySearchBar} openAuthModal={this.openAuthModal.bind(this)} contentChange={this.contentChange.bind(this)}/>
        <ContentArea contentChange={this.contentChange.bind(this)}/>
      </div>
    )
  }
}

export default App;
