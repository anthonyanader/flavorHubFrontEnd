import React, { Component } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

class NavBar extends Component {
  render() {
    return (
      <AppBar className="navBarAppBar" position="static">
         <Toolbar className="navBarToolBar">
           <Typography className="navBarLogo" variant="title" style={{flex: 1}}>
             <span className="navBarFlavorLogo">Flavor</span>
             <span className="navBarHubLogo">Hub</span>
           </Typography>
           <Button className="navBarLogin" size="small" variant="raised">Sign in</Button>
           <Button className="navBarRegister" size="small" variant="raised">Register</Button>
         </Toolbar>
       </AppBar>
    )
  }
}

class SplashContentArea extends Component {
  render() {
    return (
      <div className="splashContentArea">
        <SearchBar/>
        <RestaurantGrid/>
      </div>
    )
  }
}

class RestaurantGrid extends Component {
  render() {
    //Here the request happens to get x ammount of restaurants
    return (
      <Grid container className="RestaurantGridContainer" justify="center" style={{flexGrow: 1}} spacing="40">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 11, 1234567].map(value => (
          <Grid key={value} item>
            <RestaurantCard/>
          </Grid>
        ))}
      </Grid>
    )
  }
}

class RestaurantCard extends Component {
  render () {
    let imgArray = [
      "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Images-For-Desktop.jpg",
      "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Images-Free-Download.jpg",
      "https://www.pixelstalk.net/wp-content/uploads/2016/08/Food-Wallpaper-Pictures.jpg",
      "https://www.pixelstalk.net/wp-content/uploads/2016/08/Desktop-Food-Images-Download.jpg",
      "https://www.pixelstalk.net/wp-content/uploads/2016/08/Photography-Kebab-Meat-Food-Wallpaper-HD-Desktop-Computer.jpg",
      "https://www.pixelstalk.net/wp-content/uploads/2016/08/Fresh-hot-delicious-food-wallpaper.jpg",
      "https://www.pixelstalk.net/wp-content/uploads/2016/08/HD-delicious-food-photos.jpg"
    ]
    return (
      <div>
        <Card className="restaurantCard" style={{minHeight: 300, width: 380}}>
          <CardMedia
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

class SearchBar extends Component {
  render() {
    return (
      <div className="searchBarContainer">
        <div className="searchBarUpperTextContainer">
          <Typography className="searchBarUpperText" variant="title" style={{flex: 1}}>
          </Typography>
        </div>

        <div className="searchBarInputRegion">
          <input className="searchBarrestaurantSearch" type="text" name="restaurantSearch" placeholder="Enter Restaurant Name"/>
          <Button className="searchBarSearchButton" size="small" variant="raised">Find</Button>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App" style={{flexGrow: 1}}>
        <NavBar/>
        <SplashContentArea/>
      </div>
    );
  }
}

export default App;
