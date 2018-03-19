import React, { Component} from 'react';
import Card, {CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import './styles/LocationCard.css'

class LocationGrid extends Component {
    render() {
      return(
        <Grid container className="locationGridContainer" justify="center" style={{flexGrow: 1}} spacing={40}>
          {[0,1,2,3].map(value =>(
            <Grid key={value} item>
              <LocationCard/>
            </Grid>
          ))}
        </Grid>
      )
    }
}

class LocationCard extends Component{

  render(){

    return(
      <div>
        <Card style={{width:"350px"}}>
          <CardMedia style={{height: 200}}
            image="http://www.uwgb.edu/UWGBCMS/media/Maps/images/map-icon.jpg"
            title="RestaurantName"
          />
          <CardContent>
            <Typography variant="headline" component="h2">
                City
            </Typography>
            <Typography component="p">
            44 Shirley Ave. West Chicago, IL 60185
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default LocationGrid;
