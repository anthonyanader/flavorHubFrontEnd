import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, {CardContent, CardMedia } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios'


class RestaurantGrid extends Component {

  constructor(props) {
    super(props)

    this.state = {
      'restaurants': [],
      'page': 0,
      'hasMore':true
    }
    // this.getRestaurants(this)
  }

  //getRestaurants = (context) => {
  //   axios.get('http://localhost:5000/restaurants').then(
  //     function (response) {
  //       if (response.status === 200) {
  //         context.setState({
  //           'restaurants': response.data
  //         })
  //       }
  //     }
  //   ).catch(function (error){
  //     console.log(error)
  //   })
  // }

  loadRestaurantInfiniteCards = (context) => {
    axios.get('http://localhost:5000/restaurant_on_scroll?page='+this.state.page).then(
      function (response) {
        if (response.status === 200) {
          var restaurants = context.state.restaurants;
            response.data.restaurants.map((restaurant) => {
               restaurants.push(restaurant)
            });
           context.setState({
             'restaurants': restaurants,
             'page': context.state.page+1,
             'hasMore': response.data.hasMore
           })
        }
      }
    ).catch(function (error){
      console.log(error)
    })
  }

  render() {

    var cards = []
    this.state.restaurants.map((restaurant, i) => {
        cards.push(
          <Grid key={restaurant.name} item>
            <Link to={"/restaurant/"+restaurant.name} style={{textDecoration: "none"}}>
              <RestaurantCard content={restaurant} contentChange={this.props.contentChange}/>
            </Link>
          </Grid>
        )
    })

    return (
      <div style={{}}>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => this.loadRestaurantInfiniteCards(this)}
          hasMore={this.state.hasMore}
          loader={<div className="loader">Loading ...</div>}
          threshold={500}
        >
          <Grid container className="RestaurantGridContainer" justify="center" style={{flexGrow: 1, marginTop: '25px'}} spacing={40}>
            {cards}
          </Grid>
        </InfiniteScroll>
      </div>
    )
  }
}

class RestaurantCard extends Component {
  render () {
    let locationText = `${this.props.content.locationCount} location` + (this.props.content.locationCount > 1 ? 's' : '')
    return (
      <div onClick={()=>this.props.contentChange("/restaurant")}>
        <Card className="restaurantCard" style={{minHeight: 300, width: 380}}>
          <CardMedia className="restaurantCardImage"
            style={{height: 200}}
            image={`http://localhost:5000/${this.props.content.imagePath}`}
            title="Restaurant X"
          />
          <CardContent className="restaurantCardText">
            <Typography className="restaurantCard" variant="headline">
              {this.props.content.name}
            </Typography>
            <div className="restaurantCardTypes">
              {this.props.content.cuisines.map(cuisineName => {
                return (
                  <Chip
                    key={cuisineName}
                    label={cuisineName}
                    style={{borderRadius:'0.3em', marginRight: '10px', marginBottom: '10px'}}
                  />
                );
              })}
            </div>
            <Typography className="restaurantCardLocations">
              {locationText}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default RestaurantGrid;
